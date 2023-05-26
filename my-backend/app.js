const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
//const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
const corsOptions = {
	origin: "https://rootgroot.netlify.app",
	optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

require("dotenv").config();
const mysql = require("mysql2");

const DATABASE_URL =
	'mysql://86kgr3fznfyjheynp1dm:pscale_pw_PG7SGrJqfrn7jPBMjts1p3srImBRASDBt7GJ5kHscqK@aws.connect.psdb.cloud/rootgroot?ssl={"rejectUnauthorized":true}';
const connection = mysql.createConnection(DATABASE_URL);

(async () => {
	try {
		connection.execute("SELECT * FROM users", (error, rows, fields) => {
			if (error) {
				console.error("Error executing query:", error);
			} else {
				console.log(rows);
			}
			// Close the connection when you're done with your database operations
			connection.end();
		});
	} catch (error) {
		console.error("Error connecting to the database:", error);
	}
})();

//Register route
app.post("/api/register", async (req, res) => {
	console.log("Registration request received:", req.body);

	const {
		email,
		username,
		password,
		first_name,
		last_name,
		preferred_name,
		age,
		gender,
		languages_spoke,
		birth_country,
		countries_worked,
		countries_lived,
		countries_studied,
		countries_volunteered,
		countries_traveled,
		countries_bucket,
	} = req.body.formData;

	// Check for null values
	if (
		email === null ||
		username === null ||
		password === null ||
		first_name === null ||
		last_name === null ||
		preferred_name === null ||
		age === null ||
		gender === null ||
		languages_spoke === null ||
		birth_country === null ||
		countries_worked === null ||
		countries_lived === null ||
		countries_studied === null ||
		countries_volunteered === null ||
		countries_traveled === null ||
		countries_bucket === null
	) {
		console.log("Null value found in form data");
		return res.status(400).json({ error: "Form data contains a null value" });
	}

	try {
		const connection = await mysql.createConnection(DATABASE_URL);

		// Hash the password and insert the new user
		const hashedPassword = await bcrypt.hash(password, 10);
		connection.execute(
			"INSERT INTO users (email, username, first_name, last_name, preferred_name, gender, languages_spoke, birth_country, countries_worked, countries_lived, countries_studied, countries_volunteered, countries_traveled, countries_bucket, password, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				email,
				username,
				first_name,
				last_name,
				preferred_name,
				gender,
				languages_spoke,
				birth_country,
				countries_worked,
				countries_lived,
				countries_studied,
				countries_volunteered,
				countries_traveled,
				countries_bucket,
				hashedPassword,
				age,
			],
			(error) => {
				if (error) {
					console.error("Error executing query:", error);
					res
						.status(500)
						.json({ error: "An error occurred while accessing the database." });
				} else {
					// Automatically log the user in and send a token
					const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, {
						expiresIn: "1h",
					});

					console.log("User registered, sending token:", token);
					res.json({ token });
				}
				// Close the connection when you're done with your database operations
				connection.end();
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res
			.status(500)
			.json({ error: "An error occurred while accessing the database." });
	}
});

app.post("/api/check-email-username", async (req, res) => {
	const { email, username } = req.body;

	try {
		const connection = await mysql.createConnection(DATABASE_URL);
		connection.execute(
			"SELECT * FROM users WHERE email = ? OR username = ?",
			[email, username],
			(error, rows) => {
				if (error) {
					console.error("Error executing query:", error);
					res
						.status(500)
						.json({ error: "An error occurred while accessing the database." });
				} else {
					if (rows.length > 0) {
						return res
							.status(400)
							.json({ error: "Email or username already in use" });
					}

					res.json({ message: "Email and username are available" });
				}
				// Close the connection when you're done with your database operations
				connection.end();
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res
			.status(500)
			.json({ error: "An error occurred while accessing the database." });
	}
});

// Login route
app.post("/api/login", async (req, res) => {
	console.log("Login request received:", req.body);

	const { username, password } = req.body;

	// Connect to the database and fetch the user
	try {
		const connection = await mysql.createConnection(
			'mysql://86kgr3fznfyjheynp1dm:pscale_pw_PG7SGrJqfrn7jPBMjts1p3srImBRASDBt7GJ5kHscqK@aws.connect.psdb.cloud/rootgroot?ssl={"rejectUnauthorized":true}'
		);

		connection.execute(
			"SELECT * FROM users WHERE username = ?",
			[username],
			async (error, rows, fields) => {
				if (error) {
					console.error("Error executing query:", error);
					return res
						.status(500)
						.json({ error: "An error occurred while accessing the database." });
				} else {
					console.log(rows);

					if (rows.length === 0) {
						console.log("User not found:", username);
						return res.status(400).json({ error: "Invalid credentials" });
					}

					const user = rows[0];
					console.log(user);
					const validPassword = await bcrypt.compare(password, user.password);
					if (!validPassword) {
						console.log("Invalid password for user:", username);
						return res.status(400).json({ error: "Invalid credentials" });
					}

					const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, {
						expiresIn: "1h",
					});

					res.json({ token });
				}
				// Close the connection when you're done with your database operations
				connection.end();
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res
			.status(500)
			.json({ error: "An error occurred while accessing the database." });
	}
});

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;
		return next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
};

//User profile data
app.get("/api/user-profile", authMiddleware, async (req, res) => {
	try {
		const connection = await mysql.createConnection(DATABASE_URL);
		connection.execute(
			"SELECT * FROM users WHERE username = ?",
			[req.userId],
			(error, rows) => {
				if (error) {
					console.error("Error executing query:", error);
					res
						.status(500)
						.json({ error: "An error occurred while accessing the database." });
				} else {
					if (rows.length === 0) {
						return res.status(404).json({ error: "User not found" });
					}

					const user = rows[0];
					delete user.password; // Remove sensitive data before sending the response
					res.json(user);
				}
				// Close the connection when you're done with your database operations
				connection.end();
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res
			.status(500)
			.json({ error: "An error occurred while accessing the database." });
	}
});

const fetchStoryAndConversation = (subtheme) => {
	return new Promise(async (resolve, reject) => {
		const query = `
      SELECT s.subtheme_name, sc.scenario_text, c.speaker, c.message, c.order_number
      FROM subthemes s
      JOIN scenarios sc ON sc.subtheme_id = s.id
      JOIN conversations c ON c.scenario_id = sc.id
      WHERE s.subtheme_name = ?
      ORDER BY c.order_number;
    `;

		try {
			const connection = await mysql.createConnection(DATABASE_URL);
			connection.execute(query, [subtheme], (error, results) => {
				if (error) {
					console.error("Error executing query:", error);
					reject(new Error("An error occurred while accessing the database."));
				} else {
					const storyData = {
						scenario_text: results[0]?.scenario_text,
						conversations: results.map((row) => ({
							speaker: row.speaker,
							message: row.message,
						})),
					};
					resolve(storyData);
				}
				connection.end();
			});
		} catch (error) {
			console.error("Error connecting to the database:", error);
			reject(new Error("An error occurred while accessing the database."));
		}
	});
};

app.get("/api/story/:subtheme", async (req, res) => {
	const { subtheme } = req.params;
	try {
		const result = await fetchStoryAndConversation(subtheme);
		res.json(result);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "Failed to fetch story and conversation data." });
	}
});

// Add this endpoint to your backend code
app.post("/api/stories", async (req, res) => {
	console.log("Story upload request received:", req.body);

	const {
		country,
		purpose,
		theme,
		subtheme,
		title,
		scenario,
		freeresp,
		conversations,
		questions,
	} = req.body;

	// You may want to add checks for null values or validation here

	try {
		const connection = await mysql.createConnection(DATABASE_URL);

		connection.execute(
			"INSERT INTO stories (country, purpose, theme, subtheme, title, scenario, freeresp) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[country, purpose, theme, subtheme, title, scenario, freeresp],
			async (error, result) => {
				if (error) {
					console.error("Error executing query:", error);
					res
						.status(500)
						.json({ error: "An error occurred while accessing the database." });
					connection.end();
					return;
				}

				const storyId = result.insertId;

				for (
					let order_number = 0;
					order_number < conversations.length;
					order_number++
				) {
					const { speaker, message } = conversations[order_number];
					await connection.execute(
						"INSERT INTO conversations (story_id, speaker, message, order_number) VALUES (?, ?, ?, ?)",
						[storyId, speaker, message, order_number]
					);
				}

				for (const question of questions) {
					const { question: questionText, choices, answer } = question;
					const [questionResult] = await connection.execute(
						"INSERT INTO questions (story_id, question_text, choices, answer, explanation) VALUES (?, ?, ?, ?, ?)",
						[
							storyId,
							question.question,
							JSON.stringify(question.choices),
							question.answer,
							question.explanation,
						]
					);

					const questionId = questionResult.insertId;

					for (const choice of choices) {
						await connection.execute(
							"INSERT INTO choices (question_id, choice) VALUES (?, ?)",
							[questionId, choice]
						);
					}
				}

				console.log("Story uploaded successfully!");
				res.json({ message: "Story uploaded successfully!" });
				connection.end();
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res
			.status(500)
			.json({ error: "An error occurred while accessing the database." });
	}
});

app.listen(3001, () => {
	console.log("Server is running on port 3001");
});

app.get("/api/stories", authMiddleware, async (req, res) => {
	const { country, purpose, theme, subtheme, story_id } = req.query;
	const { userId } = req;

	let query;
	let queryParams;

	if (story_id) {
		query = "SELECT * FROM stories WHERE id = ?";
		queryParams = [story_id];
	} else {
		query = `
    SELECT * FROM stories
    WHERE country = ? AND purpose = ? AND theme = ? AND subtheme = ?
    AND id NOT IN (SELECT id FROM stories WHERE FIND_IN_SET(id, (SELECT completed_stories FROM users WHERE username = ?)) > 0)
    LIMIT 1;
    
    `;
		queryParams = [country, purpose, theme, subtheme, userId];
	}

	try {
		const connection = await mysql.createConnection(DATABASE_URL);

		connection.execute(query, queryParams, async (error, storyRows) => {
			if (error) {
				console.error("Error executing query:", error);
				res.status(500).send("Error querying stories.");
			} else {
				if (storyRows.length === 0) {
					res.status(404).send("No story found.");
					connection.end();
					return;
				}

				const story = storyRows[0];

				const [conversationRows] = await connection.execute(
					"SELECT * FROM conversations WHERE story_id = ? ORDER BY order_number",
					[story.id]
				);

				const [questionRows] = await connection.execute(
					"SELECT * FROM questions WHERE story_id = ?",
					[story.id]
				);

				const combinedData = {
					...story,
					conversations: conversationRows,
					questions: questionRows,
				};

				res.json(combinedData);
			}
			connection.end();
		});
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res
			.status(500)
			.json({ error: "An error occurred while accessing the database." });
	}
});

app.get("/next-story-by-speaker", authMiddleware, async (req, res) => {
	const speakerName = req.query.speakerName;
	const { userId } = req;

	const query = `
    SELECT * FROM conversations
    WHERE speaker = ?
    AND story_id NOT IN (SELECT id FROM stories WHERE FIND_IN_SET(id, (SELECT completed_stories FROM users WHERE username = ?)) > 0)
    AND id > (SELECT id FROM conversations WHERE speaker = ? ORDER BY id LIMIT 1)
    ORDER BY id
    LIMIT 1;
  `;

	try {
		const connection = await mysql.createConnection(DATABASE_URL);
		connection.execute(
			query,
			[speakerName, userId, speakerName],
			(error, results) => {
				connection.end();
				if (error) {
					console.error("Error querying next story by speaker:", error);
					res.status(500).send("Error querying next story by speaker.");
					return;
				}

				if (results.length > 0) {
					res.json(results[0].story_id);
				} else {
					res.status(404).send("No next story found.");
				}
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res.status(500).send("Error connecting to the database.");
	}
});

app.post("/api/free-response", async (req, res) => {
	try {
		const { storyId, question, response } = req.body;

		const connection = await mysql.createConnection(DATABASE_URL);

		connection.execute(
			"INSERT INTO free_responses (story_id, question, response) VALUES (?, ?, ?)",
			[storyId, question, response],
			(error) => {
				if (error) {
					console.error(error);
					res
						.status(500)
						.json({ message: "Error connecting to the database." });
				} else {
					res.status(201).json({ message: "Free response saved." });
				}

				connection.end();
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res.status(500).json({ message: "Error connecting to the database." });
	}
});

app.get("/api/countries-highlighted", async (req, res) => {
	const query = `SELECT country FROM stories;`;

	try {
		const connection = await mysql.createConnection(DATABASE_URL);

		connection.execute(query, (error, results) => {
			if (error) {
				console.error("No countries found:", error);
				res.status(500).send("No countries found.");
			} else {
				if (results.length > 0) {
					res.json(results);
				} else {
					res.status(404).send("No countries found.");
				}
			}

			connection.end();
		});
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res.status(500).json({ message: "Error connecting to the database." });
	}
});

app.post("/update-completed-stories", async (req, res) => {
	const { userId, storyId } = req.body;

	try {
		const connection = await mysql.createConnection(DATABASE_URL);

		connection.execute(
			"SELECT completed_stories FROM users WHERE username = ?",
			[userId],
			async (error, rows) => {
				if (error) {
					console.error("Error updating completed stories:", error);
					res.sendStatus(500);
				} else {
					let completedStories = rows[0].completed_stories
						? rows[0].completed_stories.split(",")
						: [];

					if (!completedStories.includes(storyId.toString())) {
						completedStories.push(storyId);
						const updatedCompletedStories = completedStories.join(",");

						connection.execute(
							"UPDATE users SET completed_stories = ? WHERE username = ?",
							[updatedCompletedStories, userId],
							(updateError) => {
								if (updateError) {
									console.error(
										"Error updating completed stories:",
										updateError
									);
									res.sendStatus(500);
								} else {
									res.sendStatus(200);
								}
								connection.end();
							}
						);
					} else {
						res.sendStatus(200);
						connection.end();
					}
				}
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res.sendStatus(500);
	}
});

app.post("/api/update-user-rating", authMiddleware, async (req, res) => {
	try {
		const { userId, rating } = req.body;

		const connection = await mysql.createConnection(DATABASE_URL);

		connection.execute(
			"UPDATE users SET rating = ? WHERE username = ?",
			[rating, userId],
			(error, result) => {
				connection.end();

				if (error) {
					console.error("Error connecting to the database:", error);
					res
						.status(500)
						.json({ error: "An error occurred while accessing the database." });
				} else if (result.affectedRows === 0) {
					res.status(404).json({ error: "User not found" });
				} else {
					res.json({ message: "User rating updated successfully" });
				}
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res
			.status(500)
			.json({ error: "An error occurred while accessing the database." });
	}
});

app.get("/api/stories-icons", async (req, res) => {
	try {
		const connection = await mysql.createConnection(DATABASE_URL);

		connection.execute("SELECT * FROM stories", (error, storyRows) => {
			connection.end();

			if (error) {
				console.error("Error querying stories:", error);
				res.status(500).send("Error querying stories.");
			} else {
				res.json(storyRows);
			}
		});
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res.status(500).send("Error connecting to the database.");
	}
});

app.post("/api/story-submissions", async (req, res) => {
	try {
		const { story, firstName, email, contactPreference } = req.body;

		const connection = await mysql.createConnection(DATABASE_URL);

		connection.execute(
			"INSERT INTO story_submissions (story, first_name, email, contact_preference) VALUES (?, ?, ?, ?)",
			[story, firstName, email, contactPreference],
			(error, result) => {
				connection.end();

				if (error) {
					console.error("Error connecting to the database:", error);
					res
						.status(500)
						.json({ error: "An error occurred while accessing the database." });
				} else {
					res.status(201).json({ message: "Story submitted successfully" });
				}
			}
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		res
			.status(500)
			.json({ error: "An error occurred while accessing the database." });
	}
});
