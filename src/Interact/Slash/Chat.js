const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Groq = require('groq-sdk');
const { MongoClient } = require('mongodb');
const config = require('../../config.json');
const ai = require('../../ai.config.json');

const models = {
    'llama': 'llama-3.3-70b-versatile',
    'deepseek': 'deepseek-r1-distill-qwen-32b',
    'mixtral': 'mixtral-8x7b-32768'
};
const groq = new Groq({ apiKey: config.groq });
const mongoClient = new MongoClient(config.mongoURI);
const db = mongoClient.db('botDB');
const usersCollection = db.collection('users');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Ask an AI a question.')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Your question for the AI')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('model')
                .setDescription('Choose an AI model')
                .setRequired(true)
                .addChoices(
                    { name: 'Llama 3.3', value: 'llama' },
                    { name: 'Deepseek R1', value: 'deepseek' }
                )),
    async execute(interaction) {
        await interaction.deferReply({ flags: 0 });

        const userId = interaction.user.id;
        const query = interaction.options.getString('query');
        const modelKey = interaction.options.getString('model');
        const model = models[modelKey];

        if (!model) {
            return interaction.editReply({ content: 'Invalid model selected.', flags: 64 });
        }

        try {
            await mongoClient.connect();
            let user = await usersCollection.findOne({ userId });

            
            const isDeveloper = config.xyz && Array.isArray(config.xyz) && config.xyz.includes(userId);

            if (!isDeveloper) {
                
                if (!user) {
                    user = { userId, usesLeft: config.default_limit };
                    await usersCollection.insertOne(user);
                }
                if (user.usesLeft <= 0) {
                    return interaction.editReply({ content: 'You have no uses left. Please wait for a reset or contact support.', flags: 64 });
                }
                await usersCollection.updateOne({ userId }, { $inc: { usesLeft: -1 } });
            }
            

            const responseStream = await groq.chat.completions.create({
                messages: [
                    { role: 'system', content: ai.brain },
                    { role: 'user', content: query }
                ],
                model: model,
                temperature: 1,
                max_completion_tokens: 1024,
                top_p: 1,
                stream: true,
                stop: null
            });
            let response = '';
            for await (const chunk of responseStream) {
                response += chunk.choices[0]?.delta?.content || '';
            }
            const codeBlockMatch = response.match(/```(.*?)\n([\s\S]*?)```/);
            let formattedResponse;
            if (codeBlockMatch) {
                formattedResponse = `\n\n\`\`\`${codeBlockMatch[1] || 'plaintext'}\n${codeBlockMatch[2]}\n\`\`\``;
            } else {
                formattedResponse = `\`\`\`plaintext\n${response}\n\`\`\``;
            }
            const embed = new EmbedBuilder()
                .setColor(config.color)
                .setDescription(formattedResponse);
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'Error while fetching AI response.', flags: 64 });
        }
    }
};