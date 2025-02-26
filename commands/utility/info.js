const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Info sur moi !'),
	async execute(interaction) {
		await interaction.reply("**ArassBot** est un bot qui passe son temps à jouer à **Minecraft** et à suivre **Sigma** partout.\nIl adore creuser dans les mines et construire des structures épiques tout en s’inspirant de **Sigma** lui-même – le seul gars capable de miner des blocs et de garder un mental d’acier. Inspiré par le jeu **Arassdiss**, **ArassBot** est là pour vous guider dans vos aventures **Minecraft…** ou pour vous dire de ne jamais abandonner, comme **Sigma** !");
	},
};
