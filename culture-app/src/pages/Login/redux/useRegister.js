import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "./authActions";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    verify_password: "",
    first_name: "",
    last_name: "",
    preferred_name: "",
    age: "",
    gender: "",
    languages_spoke: [],
    birth_country: "",
    countries_worked: [],
    countries_lived: [],
    countries_studied: [],
    countries_volunteered: [],
    countries_traveled: [],
    countries_bucket: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState({});

  const handleNextClick = async () => {
    if (step === 1) {
      const requiredFields = [
        "email",
        "username",
        "password",
        "verify_password",
      ];
      const errors = {};
      let hasError = false;

      for (const field of requiredFields) {
        if (!formData[field]) {
          const fieldName = field.replace(/_/g, " ");
          errors[field] = `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
          hasError = true;
        }
      }

      if (hasError) {
        setInputError(errors);
        return;
      }
    }

    if (step === 1) {
      const { email, username } = formData;
      const result = await checkEmailUsername(email, username);

      if (result.error) {
        setErrorMessage(result.error);
        return;
      } else {
        setErrorMessage(""); //clear the error message
      }
    }

    if (step === 2) {
      const requiredFields = [
        "first_name",
        "last_name",
        "preferred_name",
        "age",
        "gender",
      ];
      const errors = {};
      let hasError = false;

      for (const field of requiredFields) {
        if (!formData[field]) {
          const fieldName = field.replace(/_/g, " ");
          errors[field] = `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
          hasError = true;
        }
      }

      if (hasError) {
        setInputError(errors);
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); //clear the error message

    if (e.target.name === "password" || e.target.name === "verify_password") {
      if (formData.password !== formData.verify_password) {
        setErrorMessage("Passwords do not match");
      }
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "languages_spoke",
      "birth_country",
      "countries_worked",
      "countries_lived",
      "countries_studied",
      "countries_volunteered",
      "countries_traveled",
      "countries_bucket",
    ];
    const errors = {};
    let hasError = false;

    for (const field of requiredFields) {
      if (!formData[field]) {
        const fieldName = field.replace(/_/g, " ");
        errors[field] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
        hasError = true;
      }
    }

    if (hasError) {
      setInputError(errors);
      return;
    }

    try {
      const token = await dispatch(register(formData));
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: token });

      if (token) {
        console.log("here");
        navigate("/home"); // Redirect the user to the main content page
      }
      return token;
    } catch (error) {
      console.error("Registration failed:", error.message);
      setErrorMessage("Registration failed: " + error.message);
    }
  };

  const checkEmailUsername = async (email, username) => {
    try {
      const response = await fetch(
        "https://rootgroot-ht6a.onrender.com/api/check-email-username",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  };

  const handlePasswordBlur = () => {
    if (formData.password !== formData.verify_password) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };

  return {
    step,
    setStep,
    formData,
    setFormData,
    errorMessage,
    inputError,
    setInputError,
    handleNextClick,
    handleBackClick,
    handleInputChange,
    handleSubmit,
    checkEmailUsername,
    handlePasswordBlur,
  };
};
