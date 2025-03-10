const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help levelling with Lunr.'),

    async execute(interaction) {
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Documentation')
                .setStyle(ButtonStyle.Link)
                .setURL('https://docs.isabe.xyz'),
            new ButtonBuilder()
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/NkpKEJGeQX'),
            new ButtonBuilder()
                .setLabel('Status')
                .setStyle(ButtonStyle.Link)
                .setURL('https://status.isabe.xyz')
        );
        await interaction.reply({
            content: `
If you're looking for help with the bot, check out its official documentation or join the support server for further assistance. You can also check the current status of the bot through the button link below.
            `,
            components: [buttons],
            flags: 0
        });
    },
};
