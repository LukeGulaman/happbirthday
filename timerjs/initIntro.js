const body = document.body;
const welcomeText = document.getElementById("welcomeText");
const timeDesc = document.getElementById("timedesc");
const bgMusic = document.getElementById("bgMusic");

bgMusic.volume = 1.;
bgMusic.loop = true;


let hasClicked = false;

wavyText(timeDesc, timeDesc.textContent, "defaultWavy", 30);

function clickScreen(elem) {
    if (hasClicked) return;

    hasClicked = true;
    body.style.overflow = "hidden";

    elem.style.width = "300vw";
    elem.style.height = "300vw";
    elem.style.backgroundColor = "rgba(255,255,255,0)";

    welcomeText.style.opacity = 0;
    startClock();
    bgMusic.play();

    setTimeout(() => {
        elem.remove();
    }, 2500)
}