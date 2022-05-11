const {Markup} = require('telegraf');

module.exports = function getPlayMenu() {
    // Игровая клавиатура
    return Markup.keyboard([['🗿', '✌️', '🧻 '], ['RESTART']]).resize();
};