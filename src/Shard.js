const config = require('./config.json');
const { ShardingManager } = require('discord.js');
const path = require('path');


const manager = new ShardingManager(path.resolve(__dirname, './index.js'), {
    token: config.token,
    totalShards: 'auto',
});


manager.on('shardCreate', (shard) => {
    console.log(`Shard Launched ${shard.id}`);
});


manager.on('shardError', (error, shardId) => {
    console.error(`Shard ${shardId} encountered an error:`, error);

    
    console.error('Forcefully stopping the application due to shard failure...');
    process.exit(1); 
});


manager.on('shardDisconnect', (event, shardId) => {
    console.warn(`Shard ${shardId} disconnected:`, event);

    
    console.error('Forcefully stopping the application due to shard disconnection...');
    process.exit(1);
});


manager.on('shardReconnecting', (shardId) => {
    console.log(`Shard ${shardId} is reconnecting...`);
});


manager.on('shardDeath', (process, shardId) => {
    console.error(`Shard ${shardId} died with PID ${process.pid}`);

    
    console.error('Forcefully stopping the application due to shard death...');
    process.exit(1);
});


manager.spawn().catch((err) => {
    console.error('Error spawning shards:', err);

    
    console.error('Forcefully stopping the application due to spawning failure...');
    process.exit(1);
});