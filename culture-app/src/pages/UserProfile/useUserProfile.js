import { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, TextField } from "@mui/material";

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://root-groot-webservice.onrender.com/api/user-profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error);
        }

        const userData = await response.json();
        setUserProfile(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  const InfoBox = ({ label, value, isEditable, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value || "");

    const displayValue = value
      ? value.startsWith("[") && value.endsWith("]")
        ? value.slice(1, -1).replace(/['"]/g, "").replace(/,/g, ", ")
        : value
      : "";

    return (
      <Grid item xs={12} md={6}>
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">{label}</Typography>
          <Paper
            sx={{
              padding: "0.25rem",
              marginTop: "0rem",
              width: "100%",
              textAlign: "center",
            }}
            elevation={1}
            onClick={() => isEditable && setIsEditing(true)}
          >
            {isEditable && isEditing ? (
              <TextField
                value={inputValue}
                fullWidth
                onChange={(e) => {
                  setInputValue(e.target.value);
                  onChange && onChange(e);
                }}
                onBlur={() => setIsEditing(false)}
                InputProps={{ disableUnderline: true }}
                autoFocus
              />
            ) : (
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: displayValue }}
              />
            )}
          </Paper>
        </div>
      </Grid>
    );
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://root-groot-webservice.onrender.com/api/update-user-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedProfile),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const updatedUserData = await response.json();
      setUserProfile(updatedUserData);
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

  return {
    userProfile,
    editedProfile,
    setEditedProfile,
    selectedTab,
    handleChange,
    updateProfile,
    TabPanel,
    InfoBox,
  };
};
