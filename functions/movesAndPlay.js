module.exports = function play(userMove, botMove) {
    // Определяем кто победил в данном ходе.
    let userRock = 0;
    let userScissors = 0;
    let userPapper = 0;
    let botRock = 0;
    let botScissors = 0;
    let botPapper = 0;
    let winner = 0;
    let exit = 0;

    // Проверяем ход игрока
    if (userMove == '🗿') {
        userRock = 1;
    } else if (userMove == '✌️') {
        userScissors = 1;
    } else if (userMove == '🧻') {
        userPapper = 1;
    } else if (userMove == 'RESTART') {
        exit = 1;
    } else {
        exit = 2;
    }
    // Проверяем ход бота
    if (botMove == '🗿') {
        botRock = 1;
    } else if (botMove == '✌️') {
        botScissors = 1;
    } else if (botMove == '🧻') {
        botPapper = 1;
    }
    //  Определяем кто победил
    if ((userRock && botRock) ||
        (userScissors && botScissors) ||
        (userPapper && botPapper)) {
        winner = 2;
    } else if ((userRock && botScissors) ||
        (userScissors && botPapper) ||
        (userPapper && botRock)) {
        winner = 1;
    } else if ((userRock && botPapper) ||
        (userScissors && botRock) ||
        (userPapper && botScissors)) {
        winner = 0;
    }

    return [winner, exit];
}
