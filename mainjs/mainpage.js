const bgMusic = document.getElementById("music"),
    white = document.getElementById("white"),
    whiteText = document.querySelector("#white div"),
    title = document.getElementById("title");

bgMusic.volume = 0.5;
// bgMusic.playbackRate = 8.0;
bgMusic.loop = true;

wavyText(whiteText, whiteText.textContent, "strongwavy", 60);

addEventListener("click", (_) => {
    white.style.opacity = 0;
    title.style.animation = "openTitle 4s ease 1s 1 normal forwards";

    bgMusic.play();
}, {once: true});
