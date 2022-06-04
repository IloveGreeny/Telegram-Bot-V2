const { Telegraf } = require("telegraf");
const {BOT_TOKEN} = process.env;
const bot = new Telegraf(BOT_TOKEN);
const say = require("say");

let waits_for_text = false;

bot.start(ctx => {
    ctx.reply('Programming is cool!')
});

bot.command('audio', ctx => {
    waits_for_text = true
    ctx.reply('Enter your text!')
});

bot.on('text', ctx => {
    if (!waits_for_text) {
        return ctx.reply('I did not expect any more input.')
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
