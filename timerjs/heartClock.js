const root = document.querySelector(":root"),
    timeText = document.getElementById("time"),
    heartTick = document.getElementById("heartTick"),
    trainText = document.getElementById("trainText"),
    whiteGlow = document.getElementById("whiteGlow"),
    white = document.getElementById("white"),
    heartParticle = document.getElementsByClassName("heartParticles")[0],

    birthdayDate = new Date("2025-05-20T00:00:00"),
    startOfFile = new Date("2025-04-27T12:00:00"),

    splashBuildup = new Audio("assets/sounds/splash_buildup.ogg"),
    whooshlong = new Audio("assets/sounds/whoosh_long.ogg"),
    introPad = new Audio("assets/music/introPad1.ogg"),
    tick1 = new Audio("assets/sounds/tick1.mp3"),
    tick2 = new Audio("assets/sounds/tick2.mp3");

const oneDay = 24 * 60 * 60 * 1000;

let intervalId;
let tick = 0;
let transitioning = false;
let changePage = false;

tick1.volume = tick2.volume = 0.5;

function getSoundAndFadeAudio(audiosnippetId) {
    var sound = document.getElementById(audiosnippetId);
    var fadeAudio = setInterval(function () {
        if (sound.volume > 0) {
            sound.volume = Math.round((sound.volume - 0.05) * 100) / 100;
        }
        if (sound.volume <= 0) {
            clearInterval(fadeAudio);
        }
    }, 200);
}

function changeTime(startDate, endDate) {
    let diff = new Date(endDate).getTime() - new Date(startDate).getTime();
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;

    while (diff > 1) {
        if (diff > 8.64e+7) { // days
            d++; diff -= 8.64e+7;
            continue;
        }
        if (diff > 3.6e+6) { // hours
            h++; diff -= 3.6e+6;
            continue;
        }
        if (diff > 60000) { // minutes
            m++; diff -= 60000;
            continue;
        }
        if (diff > 1000) { // seconds
            s++; diff -= 1000;
            continue;
        }
        diff -= diff;
    }

    timeText.textContent = `${d} day${(d > 1) ? "s" : ""}, ${h} hour${(h > 1) ? "s" : ""}, ${m} minute${(m > 1) ? "s" : ""}, ${s} second${(s > 1) ? "s" : ""} left`
}
function timePercentage(startDate, currentDate, endDate) {
    const startTime = new Date(startDate).getTime();
    const sp1 = new Date(endDate).getTime() - startTime;
    const sp2 = new Date(currentDate).getTime() - startTime;

    return Math.round(sp2 / sp1 * 10000) / 100;
}

function transitionToPage() {
    if (transitioning) return;
    transitioning = true;

    clearInterval(intervalId);
    intervalId = null;
    splashBuildup.play();
    introPad.play();

    getSoundAndFadeAudio("bgMusic");

    whiteGlow.style.animation = "20s ease-in whiteGlowGrow";
    whiteGlow.style.animationFillMode = "forwards";
    white.style.animation = "whiteFade 3s ease 17s 1 normal forwards";
    heartTick.style.opacity = 0;

    let durationTime = 6000;
    let intervalTime = 300;

    const clientrect = heartParticle.getBoundingClientRect();
    const offsetwidth = clientrect.width / 2;
    const offsetheight = clientrect.height - 15;

    let heartParticleInt = function () {
        if (changePage) return;
        const h = heartParticle.cloneNode();

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        let heartKeyframes;
        let angle = getRandomNumber(0, 360);
        let radius = 2000;
        let decayRate = 0.925;
        const angleRate = 0.15;

        function createSpiralKeyframes() {
            const keyframes = [];
            
            for (let i = 0; i < 60; i++) {
                angle += angleRate;
                radius *= decayRate;

                const x = (centerX - offsetwidth) + radius * Math.cos(angle);
                const y = (centerY - offsetheight) + radius * Math.sin(angle);
                const scale = (radius / 2000) * 4;
                const skew = (radius / 2000) * 1.25;
                keyframes.push({ transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${angle * 50 + 90}deg) skew(${skew}rad)` })
                decayRate -= 0.005;
            }

            return keyframes;
        }

        heartKeyframes = createSpiralKeyframes();
        const heartTiming = {
            duration: durationTime,
            iterations: 1,
            easing: "ease-in",
            fill: "forwards"
        }

        heartDiv.appendChild(h);
        h.style.visibility = "visible";
        h.animate(
            heartKeyframes,
            heartTiming
        )

        if (intervalTime > 60) {
            const whoosh = new Audio("assets/sounds/whoosh.ogg");
            whoosh.volume = 0.2;
            setTimeout(() => {
                whoosh.play(); h.remove();
            }, durationTime * 0.75);
        }

        durationTime = Math.max(0.1, durationTime - 30);
        intervalTime = Math.max(50, intervalTime * 0.98);
        
        setTimeout(heartParticleInt, intervalTime);
    };

    setTimeout(heartParticleInt, intervalTime);
    setTimeout(() => whooshlong.play(), 14000);

    setTimeout(() => {
        changePage = true;
        heartParticleInt = null;

        // fetch("new.html").then(response => response.text()).then(text => {
        //     document.querySelector('html').innerHTML = text;
        //     nodeScriptReplace(document.getElementsByTagName("body")[0]);
        // });
        window.location.replace(
            "new.html"
        );
    }, 25000)
}
function startClock() {
    setTimeout(() => {
        // synced clock
        heartTick.style.animation = "1s rotateGradient infinite linear";
        intervalId = setInterval(() => {
            const date = new Date();
            timeLeft = timePercentage(startOfFile, date, birthdayDate);
            root.style.setProperty("--degree", `${(360 * (timeLeft / 100)).toFixed(2)}deg`);

            changeTime(date, birthdayDate);
            document.title = `${Math.round(Math.abs((date - birthdayDate) / oneDay))} days left :3`;

            if (timeLeft >= 100) {
                timeText.textContent = "Surprise!!!!!!!!!!!!!!!!!!!!!!!!!!"
                return transitionToPage();
            }

            if ((tick % 2) == 0) tick1.play(); else tick2.play();
            tick++;
        }, 1000)
    }, 1000 - new Date().getMilliseconds()); ``
}

changeTime(new Date(), birthdayDate);