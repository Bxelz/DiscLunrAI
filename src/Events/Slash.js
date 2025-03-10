const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
    client.commands = new Map();
    const commandsPath = path.join(__dirname, '../Interact/Slash');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    let successCount = 0;
    let failCount = 0;

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if (!command.data || !command.execute) {
            console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            failCount++;
            continue;
        }
        client.commands.set(command.data.name, command);
        successCount++;
    }

    console.log(`[/] Successful: ${successCount} | Failed: ${failCount}`);

    const commandsData = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());
    await client.application.commands.set(commandsData)
        .catch(console.error);
};
