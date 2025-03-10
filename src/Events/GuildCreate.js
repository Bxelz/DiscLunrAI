const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.on('guildCreate', async (guild) => {
        if (!guild?.available) return;
        const owner = await client.users.fetch(guild.ownerId);

        let embed = new EmbedBuilder()
            .setAuthor({ name: "Added to a new server!", iconURL: owner?.displayAvatarURL({ dynamic: true }) })
            .addFields([
                { name: "Name", value: `\`${guild.name}\`` },
                { name: "ID", value: `\`${guild.id}\`` },
                { name: "Owner", value: `\`${owner?.username} (${owner?.id})\`` },
                { name: "Creation Date", value: `<t:${(guild.createdTimestamp / 1000).toString().split('.')[0]}> (<t:${(guild.createdTimestamp / 1000).toString().split('.')[0]}:R>)` },
                { name: "Member Count", value: `\`${guild.memberCount.toLocaleString()}\` Members` }, // using toLocaleString() for formatting numbers
            ])
            .setTimestamp()
            .setColor("Green");

        if (guild.iconURL()) {
            embed.setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }));
        } else {
            embed.setThumbnail(client.user.displayAvatarURL({ size: 1024 }));
        }

        const logChannel = await client.channels.fetch('1279351150105202708'); 
        if (logChannel) {
            logChannel.send({ username: 'Guilds Logs', avatarURL: 'https://lapisbot.dev/assets/Lapis.png', embeds: [embed] }).catch(() => {});
        }

        const channeltosend = guild.channels.cache.find(ch => ch.type === 'GUILD_TEXT' && ch.permissionsFor(client.user.id).has("SEND_MESSAGES"));
        if (!channeltosend) return;

        try {
            await channeltosend.send({
                content: `Thank you for adding ${client.user.displayName} to your server! For more information on how to use ${client.user.displayName}, use the </help:1314041116441579573> command. Feel free to join our support server for additional help: [Support Discord (Click Here)](<https://discord.gg/NkpKEJGeQX>)`
            });
        } catch (err) {
            console.error('Error sending message to new server:', err);
        }
    });
};
