module.exports = (client, member) => {
    // Canal où envoyer le message de bienvenue (ici #bienvenue)
    const channel = member.guild.channels.cache.get('1343942020061990994');

    if (!channel) return; // Si le canal n'existe pas, on arrête

    // Message de bienvenue
    const sigma_emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'sigma');
    const mathy_emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'mathy');
    channel.send(`Bienvenue sur le serveur, **${member.user.username}** ! ${sigma_emoji}${mathy_emoji} Nous sommes heureux de t'accueillir !`);
};
