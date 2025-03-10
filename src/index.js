const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const config = require('./config.json');
const loadSlashCommands = require('./Events/Slash');
const loadTextCommands = require('./Events/Text');
const guildCreate = require('./Events/GuildCreate');
const guildDelete = require('./Events/GuildDelete');
const refreshConfig = require('./Events/Refresh');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.commands = new Map();

client.once('ready', async () => {
    console.log(`[Login] ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: config.status, type: ActivityType.Watching }],
        status: 'online',
    });

    await loadSlashCommands(client);
    await loadTextCommands(client);
    guildCreate(client);
    guildDelete(client);
    refreshConfig(client);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;
    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply('There was an error while executing this command!');
    }
});

client.login(config.dev === "true" ? config.devtoken : config.token);
