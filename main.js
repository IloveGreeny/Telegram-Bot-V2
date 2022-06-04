const { Telegraf } = require("telegraf");
const {BOT_TOKEN} = process.env;
const bot = new Telegraf(BOT_TOKEN);
const say = require("say");

let waits-for-text = false;

bot.start(ctx => {
    ctx.reply("Programming is cool!")
});

bot.command('audio', ctx => {
    waits-for-text = true
    ctx.reply("Enter your text!")
});

bot.on('text', ctx => {
    if (!waits-for-text) {
        return ctx.reply("What?.")
    }

    say.export(ctx.message.text, '', 0.75, 'audio.wav', (err) => {
        if (err) {
            return console.error(err)
        }
        ctx.replyWithVoice({
            source: './audio.wav'
        });
    });
});

bot.launch();
