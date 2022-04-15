//necessary packages
require('dotenv').config();
const Discord = require("discord.js"); 
const https = require('https');

// API URL (price in USD)
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd' 

// creating a Discord client
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    //logs out the username of the bot. Nothing fancy
    console.log(`Logged in as: ${client.user.tag}`)
})

//listen for the /price and reples out with the current price
client.on("messageCreate", (message) => {
    if (message.content == 'price') {
        let SOL_PRICE = "" // used let keyword cause the price will chance (mutable)
        https.get(API_URL, (response) => {
            response.on('data', (object) => {
                SOL_PRICE += object;
            }) 
            
            response.on('end', () => {
                /*console.log(SOL_PRICE)*/

                // replies out with the current price
                message.reply(`The price of SOL is: $${JSON.parse(SOL_PRICE).solana.usd}`) 
            })
        })
        // error handling
        .on('error', (error) => {
            console.log(error)
        })    
    }
})

// logins with the provided TOKEN of the bot created
client.login(process.env.TOKEN);