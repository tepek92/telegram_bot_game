module.exports = function gameResult(userScore, botScore, exit) {
    // Результа всей игры
    result = '';
    if (userScore - botScore == 2 || botScore - userScore == 2) {
        if (userScore > botScore) {
            result = "<b>\n🏆Поздравляю! Ты победил 🏆\n</b>";
        } else if (botScore > userScore) {
            result = "<b>\nК сожалению ты проиграл 🙁\n</b>";
        }
        exit = 1;
    } else if (exit == 0) {
        result = '\nКамень \nНожницы \nБумага \nРаз, два, три!\n';
    }
    return [result, exit];
}