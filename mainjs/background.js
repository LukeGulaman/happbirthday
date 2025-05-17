const heartParticle = document.getElementsByClassName("heartParticles")[0];

const durationTime = 90 * 1000;
let delayTime = 90 * 1000;

const clientrect = heartParticle.getBoundingClientRect();
const offsetwidth = clientrect.width / 2;
const offsetheight = clientrect.height / 2;

const detail = 90;
const decayRate = 1.2;
const angleRate = 0.15;

while (delayTime > 0) {
    const h = heartParticle.cloneNode();

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    let heartKeyframes = [];
    let angle = getRandomNumber(0, 360);
    let radius = 1;

    for (let i = 0; i < 90; i++) {
        angle += angleRate;
        radius *= decayRate;

        const x = (centerX - offsetwidth) + radius * Math.cos(angle);
        const y = (centerY - offsetheight) + radius * Math.sin(angle);
        const scale = (radius / 2000) * 4;
        const skew = Math.min(1.25, (radius / 2000));
        const alpha = (1-(i / 45))*0.5;

        heartKeyframes.push({ transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${angle * 50 + 90}deg) skew(${skew}rad)`, opacity: alpha })
    }

    const heartTiming = {
        duration: durationTime,
        iterations: 1,
        easing: "linear",
        fill: "forwards",
        delay: -delayTime
    }

    document.body.appendChild(h);
    h.style.visibility = "visible";
    h.animate(
        heartKeyframes,
        heartTiming
    )

    setTimeout(() => {
        h.remove();
    }, (durationTime - delayTime) * 0.75);

    delayTime -= 1500;
}

setInterval(() => {
    const h = heartParticle.cloneNode();

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    let heartKeyframes = [];
    let angle = getRandomNumber(0, 360);
    let radius = 1;

    for (let i = 0; i < 90; i++) {
        angle += angleRate;
        radius *= decayRate;

        const x = (centerX - offsetwidth) + radius * Math.cos(angle);
        const y = (centerY - offsetheight) + radius * Math.sin(angle);
        const scale = (radius / 2000) * 4;
        const skew = Math.min(1.25, (radius / 2000));
        const alpha = (1-(i / 45))*0.5;
        heartKeyframes.push({ transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${angle * 50 + 90}deg) skew(${skew}rad)`, opacity: alpha })
    }

    const heartTiming = {
        duration: durationTime,
        iterations: 1,
        easing: "linear",
        fill: "forwards",
    }

    document.body.appendChild(h);
    h.style.visibility = "visible";
    h.animate(
        heartKeyframes,
        heartTiming
    )

    setTimeout(() => {
        h.remove();
    }, durationTime * 0.75);
}, 1500);