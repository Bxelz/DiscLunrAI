const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.on('guildDelete', async (guild) => {
        if (!guild?.available) return;

        try {
            const owner = await client.users.fetch(guild.ownerId);

            let embed = new EmbedBuilder()
                .setAuthor({ name: "Removed from a server!", iconURL: owner?.displayAvatarURL({ dynamic: true }) })
                .setColor("Red")
                .setTimestamp()
                .addFields([
                    { name: "Name", value: `\`${guild.name}\`` },
                    { name: "ID", value: `\`${guild.id}\`` },
                    { name: "Owner", value: `\`${owner?.username} (${owner?.id})\`` },
                    { name: "Creation Date", value: `<t:${(guild.createdTimestamp / 1000).toString().split('.')[0]}> (<t:${(guild.createdTimestamp / 1000).toString().split('.')[0]}:R>)` },
                    { name: "Member Count", value: `\`${guild.memberCount.toLocaleString()}\` Members` }, // using toLocaleString() for formatting numbers
                ]);

            if (guild.iconURL()) {
                embed.setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }));
            } else {
                embed.setThumbnail(client.user.displayAvatarURL({ size: 1024 }));
            }

            const channelId = '1279351150105202708';
            const channel = await client.channels.fetch(channelId);
            if (channel) {
                channel.send({ embeds: [embed] });
            } else {
                console.log('Channel not found.');
            }
        } catch (error) {
            console.error('Error in handling guild delete:', error);
        }
    });
};
