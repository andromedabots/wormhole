const Discord = require(`discord.js`)
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "USER"] })
const merge = require('deepmerge')
const db = require("../global/db.js")

let localconfig = require("./config.json")
const globalconfig = require("../global/config.json")
const config = merge(localconfig, globalconfig)

let localvars = {
  config: config
}
const globalvars = require("../global/vars.js")
const vars = merge(localvars, globalvars)


const fn = require("../global/fn.js")

const prefix = config.prefix

exports.data = {
  vars: vars,
  fn: fn,
  func: fn,
  prefix: prefix,
  db: db,
  client: client,
  Discord: Discord,
  config: vars.config,
  moment: require("moment")
}

exports.data.list = Object.getOwnPropertyNames(exports.data)