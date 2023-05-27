import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const StorySubmission = () => {
	const [story, setStory] = useState("");
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [contactPreference, setContactPreference] = useState(false);
	const navigate = useNavigate();

	const handleChangeStory = (e) => {
		setStory(e.target.value);
	};

	const handleChangeFirstName = (e) => {
		setFirstName(e.target.value);
	};

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangeContactPreference = (e) => {
		setContactPreference(e.target.value);
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
					},
					body: JSON.stringify({ story, firstName, email, contactPreference }),
				}
			);

			if (!response.ok) {
				const error = await response.json();
				console.error(error);
			} else {
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
				p: 2,
				pb: "200px",
			}}
		>
			<Typography
				variant="h3"
				fontWeight="bold"
				sx={{
					fontFamily: "Lobster",
					textAlign: "center",
					marginBottom: 2,
				}}
			>
				Submit your own story
			</Typography>

			<TextField
				label="First Name"
				variant="outlined"
				value={firstName}
				onChange={handleChangeFirstName}
				InputLabelProps={{
					style: { color: "black" },
				}}
				sx={{
					width: "80%",
					marginBottom: 2,
					"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
						borderColor: "black",
					},
					"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
						borderColor: "black",
					},
					"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: "black",
						},
				}}
			/>
			<TextField
				label="Email"
				variant="outlined"
				value={email}
				onChange={handleChangeEmail}
				InputLabelProps={{
					style: { color: "black" },
				}}
				sx={{
					width: "80%",
					marginBottom: 2,
					"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
						borderColor: "black",
					},
					"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
						borderColor: "black",
					},
					"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: "black",
						},
				}}
			/>
			<FormControl variant="outlined" sx={{ width: "80%", marginBottom: 2 }}>
				<InputLabel style={{ color: "black" }}>Contact Preference</InputLabel>
				<Select
					label="Contact Preference"
					value={contactPreference}
					onChange={handleChangeContactPreference}
					sx={{
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: "black",
						},
						"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: "black",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "black",
							},
						"& .Mui-focused": {
							color: "black",
						},
						"& .MuiOutlinedInput-input": {
							color: "black",
						},
					}}
				>
					<MenuItem value="yes">Yes</MenuItem>
					<MenuItem value="no">No</MenuItem>
				</Select>
			</FormControl>
			<TextField
				label="Your Story"
				multiline
				rows={6}
				variant="outlined"
				value={story}
				onChange={handleChangeStory}
				InputLabelProps={{
					style: { color: "black" },
				}}
				sx={{
					width: "80%",
					marginBottom: 2,
					"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
						borderColor: "black",
					},
					"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
						borderColor: "black",
					},
					"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: "black",
						},
				}}
			/>
			<Button type="submit" variant="contained" sx={{ marginBottom: 2 }}>
				Submit
			</Button>
		</Box>
	);
};

export default StorySubmission;
