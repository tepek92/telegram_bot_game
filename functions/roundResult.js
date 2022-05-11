module.exports = function roundResult(winner, exit, userScore, botScore) {
    // Результат одного раунда игры
    let result = '';
    if (winner == 1 && exit == 0) {
        userScore++;
    result = "Удача на твоей стороне!\n\n<b>Счет:</b>\nИгрок - " + userScore + "\nБот - " + botScore;
    } else if (winner == 0 && exit == 0) {
        botScore++;
    result ="В этот раз не повезло.\n\n<b>Счет:</b>\nИгрок - " + userScore + "\nБот - " + botScore;
    } else if (winner == 2 && exit == 0) {
    result ="Ничья.\n\n<b>Счет:</b>\nИгрок - " + userScore + "\nБот - " + botScore;
    }
    return [result, userScore, botScore];
}