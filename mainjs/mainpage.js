const bgMusic = document.getElementById("music"),
    white = document.getElementById("white"),
    whiteText = document.querySelector("#white div"),
    title = document.getElementById("title"),
    isMobile = window.mobileCheck();

let cssHref = "pc";
console.log(isMobile)

if (isMobile) {
    cssHref = "mobile"
}

var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');

link.rel = 'stylesheet';
link.type = 'text/css';
link.href = `maincss/style-${cssHref}.css`;
head.appendChild(link);

bgMusic.volume = 0.5;
bgMusic.loop = true;

wavyText(whiteText, whiteText.textContent, "wavy", 60);

addEventListener("click", (_) => {
    white.style.opacity = 0;
    title.style.animation = "openTitle 4s ease 1s 1 normal forwards";

    bgMusic.play();
}, { once: true });
