# Lunr | Open Source

---

### Lunr is an AI-powered Discord chatbot developed by Hatred's Angel, created as a personal project to explore AI and Discord integration.

## Features
- **AI-driven chat responses**
- **Customizable model selection** (Llama, Deepseek, Mixtral)
- **MongoDB integration for user management**

---

## Installation Instructions

Follow these steps to set up and run Lunr on your own machine:

### 1. **Clone the Repository**

First, clone the Lunr repository to your local machine using Git:

```bash
git clone https://github.com/Bxelz/Lunr.git
cd Lunr
```

### 2. **Create a MongoDB Database**

Lunr uses MongoDB to manage user data. To set it up, follow these steps:

- Go to [MongoDB's website](https://www.mongodb.com) and sign up for an account.
- Create a new database in MongoDB's dashboard.
- Obtain the connection URI for your MongoDB instance.

Once you have the MongoDB URI, you will need to configure it in your `config.json` file.

### 3. **Install Dependencies**

Install the necessary dependencies using `npm`:

```bash
npm install
```

### 4. **Obtain API Tokens**

You'll need both a Groq token (for AI model integration) and a Discord bot token.

#### Get API Token from Groq:
- Sign up at [Groq's website](https://groq.com) and generate a new token.
- Save your Groq token for the next step.

#### Obtain a Discord Bot Token:
- Go to the [Discord Developer Portal](https://discord.com/developers/applications).
- Create a new application, then navigate to the "Bot" tab to generate your bot token.
- Save your Discord bot token for the next step.

### 5. **Configure the Bot**

Once you have your tokens and MongoDB URI, you need to configure them in the `config.json` file.

- Open the `config.json` file in your project directory.
- Add your Groq token, Discord bot token, and MongoDB URI like this:

```json
{
  "groq": "your_groq_token_here",
  "token": "your_discord_bot_token_here",
  "mongoURI": "your_mongodb_connection_uri_here"
}
```

### 6. **Start the Bot**

After configuring the tokens and database, move the `src` folder files into your main project folder and start the bot:

```bash
npm start index.js
```

Now your AI-powered Discord chatbot is ready to go!

---

## Contributing

We welcome contributions to Lunr! If you'd like to contribute, please follow these steps:

1. **Submit a pull request** to the main repository, explaining your changes.
2. **Join The Discord** with the included discord link at the top of this page.

We’ll review your contribution and merge it if it aligns with the project’s goals.

---

Thank you for being part of the Lunr project! If you have any questions or suggestions, feel free to open an issue.