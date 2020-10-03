module.exports.run = async (client, message, args) => {
    const re = message.re
    return
    let prompt = await message.author.send(
        new Discord.MessageEmbed()
          .setTitle("Custom Game Setup")
          .setDescription(
            `Use default settings?`
          )
      )
      await prompt.react(fn.getEmoji(client, 'green tick'))
      await prompt.react(fn.getEmoji(client, 'red tick'))
      let reactions = await prompt.awaitReactions(
        (r, u) =>
          (r.emoji == "👍") &&
          u.id == message.author.id,
        { time: 30*1000, max: 1, errors: ['time'] }
      ).catch(() => {})
      if (!reactions)
        return await message.author.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Prompt timed out.")
        )
    
    let admincheck = await re.db.wormhole.findOne({'admin.discord': message.author.id}).exec()
    if(admincheck) return message.channel.send(`You already have a wormhole with an ID of ${admincheck._id} and a name of ${admincheck.name}!`)
    if(!args[0]) return message.channel.send("You must specify a name for this wormhole!")
    await re.db.wormhole({name: args[0], admin: {discord: message.author.id}}).save()
    let wh = await re.db.wormhole.findOne({name: args[0]}).exec()
    message.channel.send(`Success! Your new wormhole with an ID of ${wh._id} and a name of ${args[0]} was created!`)
    re.fn.jsm(message, wh)
  }
  
  module.exports.help = {
      name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
      description:`Link a channel to your wormhole`,
      syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <name>`,
      alias:[],
      module:`${__dirname.split(`/`).pop()}`,
      access: {level: 1, mm: null}
  }