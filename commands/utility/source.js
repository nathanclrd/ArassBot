const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('source')
		.setDescription('Mon code source !'),
	async execute(interaction) {
		await interaction.reply("Tu peux retrouver mon code source sur GitHub : https://github.com/nathanclrd/ArassBot");
	},
};
