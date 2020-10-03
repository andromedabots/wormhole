module.exports.run = async (client, message, args) => {
    const re = message.re
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
      description:`Create a new wormhole`,
      syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <name>`,
      alias:[],
      module:`${__dirname.split(`/`).pop()}`,
      access: {level: 1, mm: null}
  }