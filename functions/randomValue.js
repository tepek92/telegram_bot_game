module.exports = function getRandomInRange(min, max) {
    // Рандомное число в нужно диапазоне
    return Math.floor(Math.random() * (max - min + 1)) + min;
}