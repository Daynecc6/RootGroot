import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from "@mui/material";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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
        <div style={{ marginBottom: "1rem" }}>
          <Typography variant="body1">{label}</Typography>
          <Paper
            sx={{
              padding: "0.5rem",
              marginTop: "0.5rem",
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
        "http://localhost:3001/api/update-user-profile",
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

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Basic Information" />
        <Tab label="Country Information" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={2}>
          <InfoBox
            label="Username"
            value={editedProfile.username}
            editable
            onChange={(e) =>
              setEditedProfile({ ...editedProfile, username: e.target.value })
            }
          />
          <InfoBox label="Email" value={userProfile.email} />
          <InfoBox label="First Name" value={userProfile.first_name} />
          <InfoBox label="Last Name" value={userProfile.last_name} />
          <InfoBox label="Preferred Name" value={userProfile.preferred_name} />
          <InfoBox label="Age" value={userProfile.age} />
          <InfoBox label="Gender" value={userProfile.gender} />
          <InfoBox label="Birth Country" value={userProfile.birth_country} />
        </Grid>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={2}>
          <InfoBox
            label="Countries Worked"
            value={userProfile.countries_worked}
          />

          <InfoBox
            label="Countries Lived"
            value={userProfile.countries_lived}
          />

          <InfoBox
            label="Countries studied"
            value={userProfile.countries_studied}
          />
          <InfoBox
            label="Countries volunteered"
            value={userProfile.countries_volunteered}
          />
          <InfoBox
            label="Countries traveled"
            value={userProfile.countries_traveled}
          />
        </Grid>
      </TabPanel>
      <Button variant="contained" color="primary" onClick={updateProfile}>
        Update Profile
      </Button>
    </div>
  );
};

export default UserProfile;
