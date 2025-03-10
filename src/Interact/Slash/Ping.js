const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s latency and heartbeat.'),

    async execute(interaction) {
        const latency = Date.now() - interaction.createdTimestamp;
        const heartbeat = interaction.client.ws.ping;

        const embed = new EmbedBuilder()
            .setDescription('Pong? This information may not be 100% accurate due to Discord\'s shard usage.')
            .setColor(config.color)
            .addFields(
                { name: 'Latency', value: `\`${latency}ms\``, inline: true },
                { name: 'Heartbeat', value: `\`${heartbeat}ms\``, inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
