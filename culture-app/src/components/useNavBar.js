import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../pages/Login/redux/authActions";

const useNavBar = () => {
  const storeToken = useSelector((state) => state.auth.token);
  const [token, setToken] = useState(storeToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setToken(storeToken);
  }, [storeToken]);

  const handleLogout = () => {
    if (token) {
      dispatch(logout());
      navigate("/home");
    }
  };

  return { token, handleLogout };
};

export default useNavBar;
