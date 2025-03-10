const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, '../config.json');
const slashPath = path.resolve(__dirname, './Slash.js');

module.exports = async (client) => {
    let currentConfig = require(configPath);

    fs.watchFile(configPath, async (curr, prev) => {
        try {
            delete require.cache[require.resolve(configPath)];
            const newConfig = require(configPath);

            const updatedKeys = Object.keys(newConfig).filter(
                key => newConfig[key] !== currentConfig[key]
            );

            if (updatedKeys.length > 0) {
                console.log(`{ Refreshed Configs: ${updatedKeys.join(', ')} }`);
                client.config = newConfig;
                currentConfig = newConfig;
                delete require.cache[require.resolve(slashPath)];
                const loadSlashCommands = require(slashPath);
                await loadSlashCommands(client);

                console.log('[Slash] Reloaded Slash Commands');
            }
        } catch (error) {
            console.error(`[ERROR] Failed to reload config: ${error.message}`);
        }
    });
};
