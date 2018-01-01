const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = "!" 

var eightball = [
    ":8ball: Yes",
    ":8ball: No",
    ":8ball: Maybe",
    ":8ball: Certain",
    ":8ball: Maybe?",
    ":8ball: probably",
    ":8ball: I don't think so.",
    ":8ball: never!",
    ":8ball: you can try...",
    ":8ball: up to you!",
    ":8ball: Something I can't tell"
];

client.on("ready", function() { 
client.user.setGame("Use !info") 
console.log("Booted up!") 
});

client.on('ready', () => {
    console.log('Link: https://discordapp.com/oauth2/authorize?client_id=393625556782022666&scope=bot&permissions=8');
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " **Welcome to the Cave!**");

    member.addRole(member.guild.roles.find("name", "Member"));
  });

client.on("message", function(message) { 
    if (message.author.equals(client.user)) return; 

    if (!message.content.startsWith(PREFIX)) return; 

    var args = message.content.substring(PREFIX.length).split(" "); 
    var command = args[0].toLowerCase(); 
    var mutedrole = message.guild.roles.find("name", "muted");
    var mutedrole = message.guild.roles.find("name", "Muted");

    if (command == "help") { 
        var embedhelpmember = new Discord.RichEmbed() 
            .setTitle("**List of Commands**\n") 
            .setAuthor("Kaydos v3.0", "https://cdn.discordapp.com/avatars/393625556782022666/d2e118ec0cb2d4697f31e9d99798b04b.png")
            .addField(" - help", "Displays this message (Correct usage: !help)") 
            .addField(" - info", "Tells info about myself") 
            .addField(" - ping", "Tests your ping (Correct usage: !ping)") 
            .addField(" - 8ball", "Answers to all of your questions! (Correct usage: !8ball [question])") 
            .setColor(0x00AE86) 
            .setFooter("Kaydos.tf") 
            message.channel.send(embedhelpmember); 
            if(message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.channel.send(embedhelpadmin); 
    }

    if (command == "helpop") {
        var embedhelpadmin = new Discord.RichEmbed()
            .setTitle("**List of Staff Commands**\n") 
            .setAuthor("Kaydos v3.0", "https://cdn.discordapp.com/avatars/393625556782022666/d2e118ec0cb2d4697f31e9d99798b04b.png")
            .addField(" - helpop", "Displays this message (Correct usage: !helpop)") 
            .addField(" - say", "Makes the bot say whatever you want (Correct usage: !say [message])")
            .addField(" - mute", "Mutes a desired member with a reason (Coorect usage: !mute @username [reason])") 
            .addField(" - unmute", "Unmutes a muted player (Correct usage: !unmute @username)")
            .addField(" - kick", "Kicks a desired member with a reason (Correct usage: !kick @username [reason])")
            .addField(" - ban", "Bans a desired member with a reason (Correct usage: !ban @username [reason])")  
            .addField(" - say", "Makes me say anything in your desire (Correct usage: !say [message])") 
            .setColor(0x00AE86) 
            .setFooter("Kaydos.tf")
        message.channel.send(embedhelpmember); 
        if(message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.channel.send(embedhelpadmin); 
    }

    if (command == "info") {
        message.channel.send("Hey! I'm **Kaydos Bot** I fight crime and much more! Check out my commands by doing !help")
    }

    if (command == "ping") { 
        message.channel.send("Pong!"); 
    }

    if (command == "8ball") { 
        if (args[1] != null) message.reply(eightball[Math.floor(Math.random() * eightball.length).toString(16)]); 
        else message.channel.send("Fellow Citizen what is your question? (Correct usage: !8ball [question])"); 
    }

    if (command == "say") {
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var sayMessage = message.content.substring(4)
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }

    if (command == "mute") { 
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var mutedmember = message.mentions.members.first(); 
        if (!mutedmember) return message.reply("Please mention a valid member of this server!") 
        if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("I cannot mute this member!")
        var mutereasondelete = 10 + mutedmember.user.id.length
        var mutereason = message.content.substring(mutereasondelete).split(" ");
        var mutereason = mutereason.join(" ");
        if (!mutereason) return message.reply("Please indicate a reason for the mute!") 
        mutedmember.addRole(mutedrole) 
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`));
        message.reply(`${mutedmember.user} has been muted by ${message.author} Reason: ${mutereason}`); 
    }

    if (command == "unmute") { 
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var unmutedmember = message.mentions.members.first();
        if (!unmutedmember) return message.reply("Please mention a valid member of this server!")
        unmutedmember.removeRole(mutedrole)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); 
        message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`);
    }

    if (command == "rules") {
        var embedhelpmember = new Discord.RichEmbed()
        .setTitle("**Welcome to the Cave!**")
        .setAuthor("Kaydos v3.0", "https://cdn.discordapp.com/avatars/393625556782022666/d2e118ec0cb2d4697f31e9d99798b04b.png")
        .setDescription("This is a friendly community, have fun, but keep it friendly!")  
            .addField(" ⠀⠀⠀⠀⠀⠀", "**-----------------------------------------------------------------------**")
            .addField(" - *Always Respect.*", " - *No spamming links, images, mentions, etc.*")
            .addField(" - *No Racism and Sexism.*", " - *Never assume things.*")
            .addField(" - **NO NSFW/ AT ALL**", " - *Always follow given instructions from Staff*")
            .addField(" - *No Advertising in general, or in PM*", " - *No advertising Cheats, Macros & Potential Viruses.*")
            .addField(" - *Use Common Sense.*", " - *No large/spammy/intrusive/offensive names*")
            .addField(" - *Don't tag anyone randomly*", " - *No Threats*")
            .addField(" - *No Haters*", " **-----------------------------------------------------------------------**")
            .setColor(0x00AE86) 
            .setFooter("Kaydos' Cave™")
        message.channel.send(embedhelpmember); 
        if(message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.channel.send(embedhelpadmin); 
    }

    if (command == "kick") { 
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); 
        var kickedmember = message.mentions.members.first(); 
        if (!kickedmember) return message.reply("Please mention a valid member of this server!") 
        if (!kickedmember.kickable) return message.reply("I cannot kick this member!") 
        var kickreasondelete = 10 + kickedmember.user.id.length 
        var kickreason = message.content.substring(kickreasondelete).split(" "); 
        var kickreason = kickreason.join(" "); 
        if (!kickreason) return message.reply("Please indicate a reason for the kick!")
        kickedmember.kick(kickreason) 
            .catch(error => message.reply(`Sorry, I couldn't kick because of : ${error}`)); 
        message.reply(`${kickedmember.user.username} has been kicked by ${message.author.username} Reason: ${kickreason}`); 
    }

    if (command == "ban") { 
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); 
        var bannedmember = message.mentions.members.first(); 
        if (!bannedmember) return message.reply("Please mention a valid member of this server!") 
        if (!bannedmember.bannable) return message.reply("I cannot ban this member!") 
        var banreasondelete = 10 + bannedmember.user.id.length 
        var banreason = message.content.substring(banreasondelete).split(" "); 
        var banreason = banreason.join(" "); 
        if (!banreason) return message.reply("Please indicate a reason for the ban!")
        bannedmember.ban(banreason) 
            .catch(error => message.reply(`Sorry @${message.author} I couldn't ban because of : ${error}`)); 
        message.reply(`${bannedmember.user.username} has been banned by ${message.author.username} Reason: ${banreason}`); 
    }

});

client.login(process.env.BOT_TOKEN);
