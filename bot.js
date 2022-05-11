// Загрузить на сервер
// Подключить базу данных для статистики

require('dotenv').config();
const { Telegraf, Markup, session } = require('telegraf');
const move = require('./functions/movesAndPlay');
const getRandomInRange = require('./functions/randomValue');
const getPlayMenuKeyboard = require('./keyboard/playMenuKeyboard');
const getStartMenuKeyboard = require('./keyboard/startMenuKeyboard');
const roundResult = require('./functions/roundResult');
const gameResult = require('./functions/gameResult');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
startText = `Победитель определяется по правилам:
— камень затупляет ножницы
— ножницы разрезают бумагу
— бумага заворачивает камень
— ничья, если у игроков одновременно показан одинаковый знак

Играем до 2х побед подряд.

/help - помощь
/start - перезапустить бота

Для старта игры нажми <b>PLAY</b>
Удачи 😉`;

bot.start(async (ctx) => {
    await ctx.replyWithHTML(`<b>👋🏻 Привет ${ctx.message.from.first_name}!
Это знакомая тебе игра: Камень, ножницы, бумага.</b>
`, getStartMenuKeyboard());
    await ctx.replyWithHTML(startText);
});

bot.hears('PLAY', ctx => {
    ctx.reply(`Камень
Ножницы
Бумага
Раз, два, три!`, getPlayMenuKeyboard());
})

bot.hears('/help', ctx => {
    ctx.replyWithHTML(startText, getStartMenuKeyboard());
})

bot.on('text', async ctx => {
    try {
        let rockScissorsPaper = ['🗿', '✌️', '🧻'];
        ctx.session ??= {
            roundResultMessage: '',
            gameResultMessage: '',
            userScore: 0,
            botScore: 0,
            userMove: 0,
            botMove: 0,
            winner: 0,
            exit: 0
        };

        const keyboard = getPlayMenuKeyboard();
        ctx.session.userMove = await ctx.message.text; // Получаем ход игрока
        ctx.session.botMove = await rockScissorsPaper[getRandomInRange(0, 2)]; // Получаем ход бота
        [ctx.session.winner, ctx.session.exit] = move(ctx.session.userMove, ctx.session.botMove); // Обрабатываем ход

        if (ctx.session.exit == 0) {
            await ctx.reply(ctx.session.botMove); // Выводим ход бота

            [ctx.session.roundResultMessage, ctx.session.userScore, ctx.session.botScore]
                = roundResult(ctx.session.winner, ctx.session.exit, ctx.session.userScore, ctx.session.botScore);
            await ctx.replyWithHTML(ctx.session.roundResultMessage); // Вывод результата раунда

            [ctx.session.gameResultMessage, ctx.session.exit]
                = gameResult(ctx.session.userScore, ctx.session.botScore, ctx.session.exit);
            await ctx.replyWithHTML(ctx.session.gameResultMessage); // Вывод результата игры
        }
        if (ctx.session.exit == 1) { // Игра закончилась либо рестарт
            ctx.session.userScore = 0;
            ctx.session.botScore = 0;
            ctx.reply('Еще разок?', getStartMenuKeyboard());
        } else if (ctx.session.exit == 2) { // Ошибочный ввод
            ctx.reply('Кажется ты нажал не туда, попробуй еще ;)', getPlayMenuKeyboard());
        }
        ctx.session.exit = 0;
        ctx.session.winner = 0;
    } catch (e) {
        console.error(e);
    }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));