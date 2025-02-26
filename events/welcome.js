module.exports = (client, member) => {

    const channel = member.guild.channels.cache.get('1343942020061990994');

    if (!channel) return;

    const sigma_emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'sigma');
    const mathy_emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'mathy');


    channel.send(`Bienvenue sur le serveur, **${member.user.username}** ! ${sigma_emoji}${mathy_emoji} Nous sommes heureux de t'accueillir !`);
};
