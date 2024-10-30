const axios = require("axios");

async function getAccessToken(code) {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data.access_token;
}

async function getUserPullRequests(
  accessToken,
  repoOwner,
  repoName,
  githubUsername
) {
  const response = await axios.get(
    `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.filter((pr) => pr.user.login === githubUsername);
}

async function checkIfMerged(prs, repoOwner, repoName) {
  for (const pr of prs) {
    const response = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/pulls/${pr.number}/merge`,
      {
        validateStatus: false,
      }
    );

    if (response.status === 204) {
      return { merged: true, prNumber: pr.number };
    }
  }
  return { merged: false };
}

module.exports = {
  getAccessToken,
  getUserPullRequests,
  checkIfMerged,
};
