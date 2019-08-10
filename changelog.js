const Discord = require("discord.js");
module.exports.run = async(bot, message, args, msg) => {

    let sicon = message.guild.name;
    let embeda = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setThumbnail(message.author.avatarURL)
    .addField(`${message.member.displayName}`, `Odmowa dostępu`)
    .setFooter(sicon)
    .setTimestamp()
    if (!message.member.roles.find(r => r.name === "👑|OWNER")) return message.channel.send(embeda);
    // if (!message.member.roles.find(r => r.name === "Administracja")) return message.channel.send("❌ Błąd | Nie posiadasz roli  ``Administracja``");//  

          const tekst = args.join(' '); //argument oddzielony spacją
          if (!tekst) return message.channel.send("Podaj tekst ogłoszenia"); // tutaj jak nic nie wpisze sie to bot pisze:
          let reportEmbed = new Discord.RichEmbed() // tutaj tabelka sie tworzy
            .setTitle("📝ChangeLog") // tytuł
            .setColor(`RANDOM`) // kolor
            .addField("Autor ChangeLoga", `${message.author}`)
            .addField("Opis ChangeLoga", tekst)
            .setFooter(sicon) // tutaj footer (podspodem)
            .setThumbnail(message.author.avatarURL)
            .setTimestamp() // tutaj data xd
             
            message.delete().catch(O_o=>{});
            message.guild.channels.get(`598989617429217295`).sendMessage(reportEmbed);
        
            return;        
    }
    
    
    module.exports.help = {
    
      name:"changelog"
    
    }