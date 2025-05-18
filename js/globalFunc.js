const wavyClasses = Array.from(document.getElementsByClassName("applywavy"));

wavyClasses.forEach((elm, _) => {
    wavyText(elm, elm.textContent, elm.dataset.wavy, elm.dataset.delay);
})

function wavyText(id, text, className, delay) {
    id.innerHTML = text
    .split("")
    .map(letter => {
        return `<span>` + letter + `</span>`;
    })
    .join("");

    Array.from(id.children).forEach((span, index) => {
        span.classList.add(className);
        span.style.animationDelay = `${-index * delay}ms`;
        if (span.textContent == " ") span.style.display = "inline";
    });

    id.innerHTML = id.innerHTML
    .split(/( )(?:<\/span[^>]*>)/gm)
    .map(letter => {
        if (letter != " ") return `<div style="display: inline-block;">` + letter + `</div>`;
    })
    .join(" ");
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 