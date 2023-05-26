import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

const StorySubmission = () => {
	const [story, setStory] = useState("");
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [contactPreference, setContactPreference] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setStory(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"https://rootgroot-ht6a.onrender.com/api/story-submissions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						// Add the required authorization header, e.g.:
						// "Authorization": `Bearer ${yourAuthToken}`,
					},
					body: JSON.stringify({ story, firstName, email, contactPreference }),
				}
			);

			if (!response.ok) {
				const error = await response.json();
				console.error(error);
			} else {
				// Navigate back to the world map after saving the story
				navigate("/world-map");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
			}}
		>
			<Typography
				variant="h3"
				fontWeight="bold"
				style={{
					fontFamily: "Lobster",
					textAlign: "center",
					display: "block",
					margin: "auto",
				}}
			>
				Submit your own story
			</Typography>
			<TextField
				label="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				// ... other props ...
			/>
			<TextField
				label="Contact Preference"
				value={contactPreference}
				onChange={(e) => setContactPreference(e.target.value)}
				// ... other props ...
			/>

			<TextField
				label="Your Story"
				multiline
				rows={6}
				variant="outlined"
				value={story}
				onChange={handleChange}
				sx={{
					width: "80%",
					marginBottom: 2,
					"& .Mui-focused": {
						color: "black",
					},
					"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: "black",
						},
				}}
			/>
			<Button type="submit" variant="contained">
				Submit
			</Button>
		</Box>
	);
};

export default StorySubmission;
