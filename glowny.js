const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./botconfig.json");
const fs = require("fs");
const prefix = require('./botconfig.json');
const ytdl = require('ytdl-core');

const queue = new Map();

bot.commands = new Discord.Collection();


fs.readdir("./komendy/", (err, files) => {
	if(err) console.log(err)
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
		console.log("Brak Komendy");
		return;
	}
	
	jsfile.forEach((f, i) => {
		let props = require(`./komendy/${f}`);
		console.log(`${f} Został załadowany!`);
		bot.commands.set(props.help.name, props);
	});
	
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} jest dostępny na ${bot.guilds.size} serwerach!`);
    bot.user.setActivity("LoL Zone", {type: "WATCHING"});
// 	void UpdatePresence()
//   {
//     DiscordRichPresence discordPresence;
//     memset(&discordPresence, 0, sizeof(discordPresence));
//     discordPresence.details = "W czy mogę pomóc?";
//     discordPresence.largeImageKey = "braum";
//     discordPresence.largeImageText = "LoL Zone";
//     discordPresence.smallImageKey = "braum";
//     discordPresence.smallImageText = "Rogue - Level 56";
//     discordPresence.partyId = "ae488379-351d-4a4f-ad32-2b9b01c91657";
//     discordPresence.partyMax = 0;
//     discordPresence.spectateSecret = "MTIzNDV8MTIzNDV8MTMyNDU0";
//     discordPresence.joinSecret = "MTI4NzM0OjFpMmhuZToxMjMxMjM= ";
//     Discord_UpdatePresence(&discordPresence);
//   }
});

bot.on('guildMemberAdd', member => {
    let count = member.guild.memberCount.toString() 
    const channel = member.guild.channels.find(chnl => chnl.name === 'powitalnia');
    const memberavatar = member.user.displayAvatarURL
        if (!channel) {
          console.log("Channel Not found.");
          return;
        };
        
        let str = `Witaj **${member.user.username}** na **${member.guild}**! \nJesteś naszym **${count}** użytkownikiem!`
        const embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, memberavatar)
        .setColor('#4286f4')
        .setDescription(str)
        .setThumbnail(memberavatar) // using member.user.displayAvatarURL
        .setTimestamp();
        channel.send(embed);
    
    console.log(`${member}`, "dolaczyl na " + `${member.guild.name}`)
});

// bot.on('message', async message =>{
// if (!message.content.startsWith(prefix)) return;

// const serverQueue = queue.get(message.guild.id);

// if (message.content.startsWith(`${prefix}play`)) {
//  execute(message, serverQueue);
//  return;
// } else if (message.content.startsWith(`${prefix}skip`)) {
//  skip(message, serverQueue);
//  return;
// } else if (message.content.startsWith(`${prefix}stop`)) {
//  stop(message, serverQueue);
//  return;
// } else {
//  message.channel.send('You need to enter a valid command!')
// }
// const queue = new Map();
// async function execute(message, serverQueue) {
//  const args = message.content.split(' ');
//  const voiceChannel = message.member.voiceChannel;
//  if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
//   const permissions =     voiceChannel.permissionsFor(message.bot.user);
//  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
//   return message.channel.send('I need the permissions to join and speak in your voice channel!');
//  }
// }
// const songInfo = await ytdl.getInfo(args[1]);
// const song = {
//  title: songInfo.title,
//  url: songInfo.video_url,
// };
// if (!serverQueue) {
  
// }else {
//  serverQueue.songs.push(song);
//  console.log(serverQueue.songs);
//  return message.channel.send(`${song.title} has been added to the queue!`);
// }
// // Creating the contract for our queue
// const queueContruct = {
//  textChannel: message.channel,
//  voiceChannel: voiceChannel,
//  connection: null,
//  songs: [],
//  volume: 5,
//  playing: true,
// };
// // Setting the queue using our contract
// queue.set(message.guild.id, queueContruct);
// // Pushing the song to our songs array
// queueContruct.songs.push(song);

// try {
//  // Here we try to join the voicechat and save our connection into our object.
//  var connection = await voiceChannel.join();
//  queueContruct.connection = connection;
//  // Calling the play function to start a song
//  play(message.guild, queueContruct.songs[0]);
// } catch (err) {
//  // Printing the error message if the bot fails to join the voicechat
//  console.log(err);
//  queue.delete(message.guild.id);
//  return message.channel.send(err);
// }

// function play(guild, song) {
//  const serverQueue = queue.get(guild.id);
//  if (!song) {
//   serverQueue.voiceChannel.leave();
//   queue.delete(guild.id);
//   return;
//  }
// }

// const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
//  .on('end', () => {
//   console.log('Music ended!');
//   // Deletes the finished song from the queue
//   serverQueue.songs.shift();
//   // Calls the play function again with the next song
//   play(guild, serverQueue.songs[0]);
// })
//  .on('error', error => {
//   console.error(error);
//  });
// dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

// function stop(message, serverQueue) {
//  if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
//  serverQueue.songs = [];
//  serverQueue.connection.dispatcher.end();
// }

// bot.on('message', async message => {
// 	if (message.author.bot) return;
// 	if (!message.content.startsWith(prefix)) return;

// 	const serverQueue = queue.get(message.guild.id);

// 	if (message.content.startsWith(`${prefix}play`)) {
// 		execute(message, serverQueue);
// 		return;
// 	} else if (message.content.startsWith(`${prefix}skip`)) {
// 		skip(message, serverQueue);
// 		return;
// 	} else if (message.content.startsWith(`${prefix}stop`)) {
// 		stop(message, serverQueue);
// 		return;
// 	} else {
// 		message.channel.send('You need to enter a valid command!')
// 	}
// });

// async function execute(message, serverQueue) {
// 	const args = message.content.split(' ');

// 	const voiceChannel = message.member.voiceChannel;
// 	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
// 	const permissions = voiceChannel.permissionsFor(message.bot.user);
// 	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
// 		return message.channel.send('I need the permissions to join and speak in your voice channel!');
// 	}

// 	const songInfo = await ytdl.getInfo(args[1]);
// 	const song = {
// 		title: songInfo.title,
// 		url: songInfo.video_url,
// 	};

// 	if (!serverQueue) {
// 		const queueContruct = {
// 			textChannel: message.channel,
// 			voiceChannel: voiceChannel,
// 			connection: null,
// 			songs: [],
// 			volume: 5,
// 			playing: true,
// 		};

// 		queue.set(message.guild.id, queueContruct);

// 		queueContruct.songs.push(song);

// 		try {
// 			var connection = await voiceChannel.join();
// 			queueContruct.connection = connection;
// 			play(message.guild, queueContruct.songs[0]);
// 		} catch (err) {
// 			console.log(err);
// 			queue.delete(message.guild.id);
// 			return message.channel.send(err);
// 		}
// 	} else {
// 		serverQueue.songs.push(song);
// 		console.log(serverQueue.songs);
// 		return message.channel.send(`${song.title} has been added to the queue!`);
// 	}

// }

// function skip(message, serverQueue) {
// 	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
// 	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
// 	serverQueue.connection.dispatcher.end();
// }

// function stop(message, serverQueue) {
// 	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
// 	serverQueue.songs = [];
// 	serverQueue.connection.dispatcher.end();
// }

// function play(guild, song) {
// 	const serverQueue = queue.get(guild.id);

// 	if (!song) {
// 		serverQueue.voiceChannel.leave();
// 		queue.delete(guild.id);
// 		return;
// 	}

// 	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
// 		.on('end', () => {
// 			console.log('Music ended!');
// 			serverQueue.songs.shift();
// 			play(guild, serverQueue.songs[0]);
// 		})
// 		.on('error', error => {
// 			console.error(error);
// 		});
// 	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
// }

// bot.on("message", msg => {
//     if (msg.content.toLowerCase().startsWith(config.prefix + "clearmsg")) {
//         async function clear() {
//             msg.delete();
//             const fetched = await msg.channel.fetchMessages({limit:99});
//             msg.channel.bulkDelete(fetched);
//         }
//         clear();
//     }
// });

const PREFIX = "!"

bot.on("message", function(message) { // when a message is sent
    if (message.author.equals(bot.user)) return; // if the message is sent by a bot, ignore

    if (!message.content.startsWith(PREFIX)) return; // if the message doesn't contain PREFIX (*), then ignore

    var args = message.content.substring(PREFIX.length).split(" "); // removes the prefix from the message
    var command = args[0].toLowerCase(); // sets the command to lowercase (making it incase sensitive)

    if (command == "say") { // creates command say
        if (!message.member.roles.some(r=>["root"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var sayMessage = message.content.substring(4)
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }
});

bot.on("message", msg => {
  if (msg.content.toLowerCase().startsWith(config.prefix + "clearchat")) {
      async function clear() {
          msg.delete();
          const fetched = await msg.channel.fetchMessages({limit: 99});
          msg.channel.bulkDelete(fetched);
      }
      clear();
  }
});

bot.on('message', message => {
  // If the message content starts with "!kick"
  if (message.content.startsWith(config.prefix + 'kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at     
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick(`Opcjonalny powód, który zostanie wyświetlony w dziennikach kontrol`).then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`${user.tag} został Wyrzucony`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply(`Nie byłem w stanie wyrzucić członka`);
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply(`sn\t in this guild`);
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply(`Przepraszamy ale nie masz uprawnień by kogoś wyrzucić.`);
    }
  }
});

bot.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith(config.prefix + 'ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'Głupia Pizda',
        }).then(() => {
// We let the message author know we were able to ban the person
          message.reply(`Zbanował <@${user.id}>`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('Nie mogłem zablokować członka');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('Przepraszamy ale nie masz uprawnień by kogoś zbanować.');
    }
  }
});

const setupCMD = "!Zweryfikowany";
const initialMessage = `**Proszę  zapoznać z regulaminem **`;
const embedMessage = `
React to the emoji that matches the role you wish to receive.
If you would like to remove the role, simply remove your reaction!
`;
const embedFooter = "Role Reactions"; // Must set this if "embed" is set to true
const roles = ["Zweryfikowany"];
const reactions = ["✅"]; // For custom emojis, provide the name of the emoji
const embed = false; // Set to "true" if you want all roles to be in a single embed
const embedColor = "#dd2423"; // Set the embed color if the "embed" variable is set to true
const embedThumbnail = true; // Set to "true" if you want to set a thumbnail in the embed
const embedThumbnailLink = "https://i.imgur.com/P8PD7DD.png"; // The link for the embed thumbnail
/**
 * You'll have to set this up yourself! Read more below:
 * 
 * https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
 */

// Import constructords and login the bot

// If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

// Function to generate the role messages, based on your settings
function generateMessages() {
    let messages = [];
    for (const role of roles) messages.push({ role, message: `
§1.1 Na LoL Zone jest calkowity zakaz spamowania.
§1.2 Nie piszemy capsem.
§1.3 Zakaz przeklinania na kanałach tekstowych a także głosowych.
§1.4 Zakaz obrazania na kanalach glosowych i tekstowych.
§1.5 Zakaz wykorzystywania, oszukiwania i szantażowania innych użytkowników.
§1.6 Zakaz trollowania.
§1.7 Zakaz obrażania graczy, administracji i serwera.
§1.8 Reklamowanie jakichkolwiek serwerów minecraft, stron www, serwerów discord itp. bez zgody administracji jest karane.
§1.9 Zakaz wykorzystywania możliwych błędów na serwerze, należy je natychmiast zgłosić.
§1.10 Zakazane jest poruszanie tematów wulgarnych/erotycznych/religijnych/rasistowskich itp. 
§1.11 Podszywanie się pod graczy będzie karane kickiem a podszywanie się pod administrację będzie skutkowało banem.
§1.12 Komend można używać tylko na kanale do tego stworzonym.
§1.13 Zakaz pisania rzeczy niezgodnych z tematyką kanału.
§1.14 Zabronione jest wysyłanie linków lub plików zawierających treści wulgarne/rasistowskie/pornograficzne/religijne itp.
§1.15 Awatar, nick oraz nazwa gry nie może zawierać treści obrażliwych/rasistwoskich/wulgarnych itp. Nie może także zawierać  znaków interpunkcyjnych ani znaczków.
§1.16 Karą za złe używanie emotikonów jest warn.
§1.17 Przeszkadzanie administracji jest surowo karane.
Jeżeli zgadzasz sie z regualminem kliknij ✅ , a dostaniesz **"${role}"**` }); //DONT CHANGE THIS
    return messages;
}

// Function to generate the embed fields, based on your settings and if you set "const embed = true;"
function generateEmbedFields() {
    return roles.map((r, e) => {
        return {
            emoji: reactions[e],
            role: r
        };
    });
}
}

function checkRole(guild, role) {
    const checkRole = guild.roles.find(r => r.name === role);
    if (checkRole) return true;
    else return false;
}

// bot events to let you know if the bot is online and to handle any Discord.js errors
bot.on('error', console.error);

// Handles the creation of the role reactions. Will either send the role messages separately or in an embed
bot.on("message", message => {
    if (message.content.toLowerCase() == setupCMD && message.member.hasPermission("MANAGE_MESSAGES")) {

        if (!embed) {
            if (!initialMessage) throw "The 'initialMessage' property is not set. Please do this!";

            message.channel.send(initialMessage);

            const messages = generateMessages();
            messages.forEach((obj, react) => {
                if (!checkRole(message.guild, obj.role)) throw `The role '${obj.role}' does not exist!`;

                message.channel.send(obj.message).then(async m => {
                    const emoji = reactions[react];
                    const customEmote = bot.emojis.find(e => e.name === emoji);
                    
                    if (!customEmote) await m.react(emoji);
                    else await m.react(customEmote.id);
                });
            });
        } else {
            if (!embedMessage) throw "The 'embedMessage' property is not set. Please do this!";
            if (!embedFooter) throw "The 'embedFooter' property is not set. Please do this!";

            const roleEmbed = new RichEmbed()
                .setDescription(embedMessage)
                .setFooter(embedFooter);

            if (embedColor) roleEmbed.setColor(embedColor);
            if (embedThumbnail) roleEmbed.setThumbnail(embedThumbnailLink);

            const fields = generateEmbedFields();
            if (fields.length >= 25) throw "That maximum roles that can be set for an embed is 25!";

            for (const f of fields) {
                if (!checkRole(message.guild, f.role)) throw `The role '${role}' does not exist!`;

                const emoji = f.emoji;
                const customEmote = bot.emojis.find(e => e.name === emoji);
                
                if (!customEmote) roleEmbed.addField(emoji, f.role, true);
                else roleEmbed.addField(customEmote, f.role, true);
            }

            message.channel.send(roleEmbed).then(async m => {
                for (const r of reactions) {
                    const emoji = r;
                    const customEmote = bot.emojis.find(e => e.name === emoji);
                    
                    if (!customEmote) await m.react(emoji);
                    else await m.react(customEmote.id);
                }
            });
        }
    }
});

// This makes the events used a bit more readable
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

// This event handles adding/removing users from the role(s) they chose
bot.on('raw', async event => {

    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = bot.users.get(data.user_id);
    const channel = bot.channels.get(data.channel_id);

    const message = await channel.fetchMessage(data.message_id);
    const member = message.guild.members.get(user.id);

    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        // Create an object that can be passed through the event like normal
        const emoji = new Emoji(bot.guilds.get(data.guild_id), data.emoji);
        reaction = new MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
    }

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

    if (message.author.id === bot.user.id && (message.content !== initialMessage || (message.embeds[0] && (embedFooterText !== embedFooter)))) {

        if (!embed) {
            const re = `\\*\\*"(.+)?(?="\\*\\*)`;
            const role = message.content.match(re)[1];

            if (member.id !== bot.user.id) {
                const roleObj = message.guild.roles.find(r => r.name === role);

                if (event.t === "MESSAGE_REACTION_ADD") {
                    member.addRole(roleObj.id);
                } else {
                    member.removeRole(roleObj.id);
                }
            }
        } else {
            const fields = message.embeds[0].fields;

            for (let i = 0; i < fields.length; i++) {
                if (member.id !== bot.user.id) {
                    const role = message.guild.roles.find(r => r.name === fields[i].value);

                    if ((fields[i].name === reaction.emoji.name) || (fields[i].name === reaction.emoji.toString())) {
                        if (event.t === "MESSAGE_REACTION_ADD") {
                            member.addRole(role.id);
                            break;
                        } else {
                            member.removeRole(role.id);
                            break;
                        }
                    }
                }
            }
        }
    }
});

bot.login(config.token);