const body = document.body;
const welcomeText = document.getElementById("welcomeText");
const timeDesc = document.getElementById("timedesc");
const bgMusic = document.getElementById("bgMusic");
const isMobile = window.mobileCheck();

let cssHref = "pc";
let hasClicked = false;

if (isMobile) {
    cssHref = "mobile"
}

var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');

link.rel = 'stylesheet';
link.type = 'text/css';
link.href = `timercss/style-${cssHref}.css`;
head.appendChild(link);

bgMusic.volume = 1.;
bgMusic.loop = true;

wavyText(timeDesc, timeDesc.textContent, "wavy", 30);

function clickScreen(elem) {
    if (hasClicked) return;

    hasClicked = true;
    body.style.overflow = "hidden";

    if (isMobile) {
        elem.style.width = "500vw";
        elem.style.height = "500vw";
    } else {
        elem.style.width = "300vw";
        elem.style.height = "300vw";
    }

    elem.style.backgroundColor = "rgba(255,255,255,0)";

    welcomeText.style.opacity = 0;
    startClock();
    bgMusic.play();

    setTimeout(() => {
        elem.remove();
    }, 2500)
}