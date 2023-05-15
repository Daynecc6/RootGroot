import React from "react";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import { useUserProfile } from "./useUserProfile";
import { Alert } from "@mui/material";

const UserProfile = () => {
  const { userProfile, selectedTab, handleChange, TabPanel, InfoBox } =
    useUserProfile();

  if (!userProfile) {
    return (
      <div>
        <Alert
          severity="error"
          sx={{ backgroundColor: "black", color: "white" }}
        >
          You need to be logged in to see this information.
        </Alert>
      </div>
    );
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
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.15)",
          ".MuiTabs-indicator": {
            backgroundColor: "black",
          },
          ".MuiTab-root": {
            color: "black",
          },
        }}
      >
        <Tab label="Basic Information" />
        <Tab label="Country Information" />
      </Tabs>

      <TabPanel value={selectedTab} index={0}>
        <Box p={0} maxWidth={400}>
          <Grid container spacing={0} sx={{ marginX: -1 }}>
            <InfoBox label="Username" value={userProfile.username} />
            <InfoBox label="Email" value={userProfile.email} />
            <InfoBox label="First Name" value={userProfile.first_name} />
            <InfoBox label="Last Name" value={userProfile.last_name} />
            <InfoBox
              label="Preferred Name"
              value={userProfile.preferred_name}
            />
            <InfoBox label="Age" value={userProfile.age} />
            <InfoBox label="Gender" value={userProfile.gender} />
            <InfoBox label="Birth Country" value={userProfile.birth_country} />
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Box p={0} maxWidth={500}>
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
        </Box>
      </TabPanel>
    </div>
  );
};

export default UserProfile;
