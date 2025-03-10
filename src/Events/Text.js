const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
    const textCommandsPath = path.join(__dirname, '../Interact/Text');
    const commandFiles = fs.readdirSync(textCommandsPath).filter(file => file.endsWith('.js'));

    let successCount = 0;
    let failCount = 0;
    let errors = [];

    for (const file of commandFiles) {
        try {
            const command = require(path.join(textCommandsPath, file));
            client.commands.set(command.name, command);

            if (command.aliases && Array.isArray(command.aliases)) {
                for (const alias of command.aliases) {
                    client.commands.set(alias, command);
                }
            }

            successCount++;
        } catch (error) {
            failCount++;
        }
    }

    console.log(`[T] Successful: ${successCount} | Failed: ${failCount}`);
    
    if (errors.length > 0) {
        console.log(`[T E] Errors:`);
        errors.forEach(err => console.log(`     - ${err}`));
    }
};
