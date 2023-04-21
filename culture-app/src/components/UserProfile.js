import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography, Paper, Grid } from "@mui/material";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

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

  const [selectedTab, setSelectedTab] = useState(0);

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

  const InfoBox = ({ label, value }) => {
    const displayValue = Array.isArray(value)
      ? value.join("<br/>")
      : value.startsWith("[") && value.endsWith("]")
      ? value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/"/g, ""))
          .join("<br/>")
      : value;

    return (
      <Grid item xs={12} md={6}>
        <div style={{ marginBottom: "1rem" }}>
          <Typography variant="body1">{label}</Typography>
          <Paper
            sx={{
              padding: "0.5rem",
              marginTop: "0.5rem",
              width: "30%",
              textAlign: "center",
            }}
            elevation={1}
          >
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: displayValue }}
            />
          </Paper>
        </div>
      </Grid>
    );
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
          <InfoBox label="Username" value={userProfile.username} />
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
    </div>
  );
};

export default UserProfile;
