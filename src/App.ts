import Bot from "~/framework/structures/Bot";
require('dotenv').config()
const token: string | undefined = process.env.TOKEN

function start() {
    if (!token) return console.log(`No token provided!`)

    const app = new Bot(token);
    app.start()
}

start()