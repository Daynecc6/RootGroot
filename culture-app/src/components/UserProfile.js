import React, { useState, useEffect } from "react";

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

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      <p>First Name: {userProfile.first_name}</p>
      <p>Last Name: {userProfile.last_name}</p>
      <p>Preferred Name: {userProfile.preferred_name}</p>
      <p>Age: {userProfile.age}</p>
      <p>Gender: {userProfile.gender}</p>
      <p>Languages Spoken: {userProfile.languages_spoke}</p>
      <p>Birth Country: {userProfile.birth_country}</p>
      <p>Countries Worked: {userProfile.countries_worked}</p>
      <p>Countries Lived: {userProfile.countries_lived}</p>
      <p>Countries Studied: {userProfile.countries_studied}</p>
      <p>Countries Volunteered: {userProfile.countries_volunteered}</p>
      <p>Countries Traveled: {userProfile.countries_traveled}</p>
      <p>Countries Bucket List: {userProfile.countries_bucket}</p>
    </div>
  );
};

export default UserProfile;
