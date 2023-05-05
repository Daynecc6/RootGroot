import React from "react";
import { Tabs, Tab, Button, Grid } from "@mui/material";
import { useUserProfile } from "./useUserProfile";
import CompletedStories from "./CompletedStories";

const UserProfile = () => {
  const {
    userProfile,
    selectedTab,
    handleChange,
    updateProfile,
    TabPanel,
    InfoBox,
  } = useUserProfile();

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
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.15)",
          ".MuiTabs-indicator": {
            backgroundColor: "primary.main",
          },
          ".Mui-selected": {
            color: "primary.main",
          },
          ".MuiTab-root": {
            color: "text.secondary",
          },
        }}
      >
        <Tab label="Basic Information" />
        <Tab label="Country Information" />
        <Tab label="Completed Stories" />
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
      <TabPanel value={selectedTab} index={2}>
        <CompletedStories completedStories={userProfile.completed_stories} />
      </TabPanel>
    </div>
  );
};

export default UserProfile;
