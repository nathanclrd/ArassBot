/**
 * @file Main entry point for the Discord bot
 * @author Your Name
 */

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('./config.json');
const welcome = require('./events/welcome'); 

/**
 * Create a new Discord client instance with specified intents
 * @type {Client}
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// Initialize commands collection
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

/**
 * Load all command files from the commands directory
 * Commands are organized in subfolders and must have both 'data' and 'execute' properties
 */
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

/**
 * Event handler for when the client is ready
 * @param {Client} readyClient - The client that is ready
 */
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

/**
 * Event handler for new members joining the guild
 * @param {GuildMember} member - The member that joined
 */
client.on('guildMemberAdd', member => welcome(client, member));

/**
 * Event handler for handling slash command interactions
 * @param {Interaction} interaction - The interaction created
 */
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ 
                content: 'There was an error while executing this command!', 
                flags: MessageFlags.Ephemeral 
            });
        } else {
            await interaction.reply({ 
                content: 'There was an error while executing this command!', 
                flags: MessageFlags.Ephemeral 
            });
        }
    }
});

// Log in to Discord with the client's token
client.login(token);
