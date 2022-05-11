const {Markup} = require('telegraf');

module.exports = function getStartMenu() {
    // Стартовая клавиатура, кнопка: PLAY
    return Markup.keyboard([['PLAY']]).resize();
};