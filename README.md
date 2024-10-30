# GitHub Pull Request Verifier

This is a Node.js application that connects to the GitHub API, allowing users to log in with their GitHub accounts and verify if they have made a pull request (PR) to a specified repository. It also checks whether the PR has been merged by the repository owner.

## Features

- User authentication via GitHub OAuth
- Fetch user pull requests for a specified repository
- Check if a pull request has been merged

## Prerequisites

- Node.js and npm installed on your machine
- A GitHub account
- A registered GitHub OAuth application (with client ID and client secret)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/github-verifier.git
cd github-verifier
```

2. Install Dependencies

```bash
npm install
```

3. Configure Environment Variables
   Create a .env file in the root directory of the project and add your GitHub OAuth credentials:

```bash
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
REDIRECT_URI=http://localhost:3000/auth/github/callback
```

4. Run the Application

```bash
node app.js
```

5. Authentication Flow

```bash
Visit http://localhost:3000/auth/github to log in with your GitHub account.
After successful authentication, you will receive an access token.
```
