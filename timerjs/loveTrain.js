const loveTrainText = ["I love you the most!", "A surprise...", "Guess whats coming!", "Get ready for love, laughter, and memories!"];
let lastIndex = 0;

function getRandomInt(max) {
    let i = Math.floor(Math.random() * max);
    if (i == lastIndex) (i >= max) ? i-- : i++;
    lastIndex = i;
    return i;
}
function updateText(textStr) {
    let h1 = document.getElementById("trainText");
    if (!h1) {
        clearInterval(interval);
        return;
    }

    wavyText(h1, textStr, "trainwavy", 30);
}

updateText(loveTrainText[getRandomInt(3)]);
let interval = setInterval(() => {
    updateText(loveTrainText[getRandomInt(3)]);
}, 30 * 1000)