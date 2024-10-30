require("dotenv").config();
const express = require("express");
const axios = require("axios");
const github = require("./github");

const app = express();
const PORT = 3000;

// Redirect to GitHub OAuth for login
app.get("/auth/github", (req, res) => {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=repo`;
  res.redirect(redirectUri);
});

// GitHub OAuth callback
app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const accessToken = await github.getAccessToken(code);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: "GitHub login failed" });
  }
});

// Verify if the user has a merged PR
app.get("/verify-pr", async (req, res) => {
  const { accessToken, repoOwner, repoName, githubUsername } = req.query;
  try {
    const userPrs = await github.getUserPullRequests(
      accessToken,
      repoOwner,
      repoName,
      githubUsername
    );
    if (userPrs.length === 0) {
      return res.json({ message: "No pull request found for the user." });
    }

    const mergedPr = await github.checkIfMerged(userPrs, repoOwner, repoName);
    res.json({ mergedPr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
