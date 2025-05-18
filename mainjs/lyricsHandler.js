async function main() {
    const lyricsElem = document.getElementById("lyrics");
    const pattern = /\[(\d+:\d+\.\d+)](.*)/g;
    const lyrics = await (await fetch("assets/lyrics/fly_me_to_the_moon.lrc")).text();

    let durations = Array.from(lyrics.matchAll(pattern), m => m[1]).map((t) => {
        t = t.split(/[:\.]/);
        return (+t[0]) * 60 + (+t[1]) + (+t[2]) / 1000;
    });
    let lines = Array.from(lyrics.matchAll(pattern), m => m[2]);
    let currentLine = 0;

    function playLyrics() {
        const currentDur = durations[currentLine];
        const nextDur = ((currentLine + 1) < durations.length) ? durations[currentLine + 1] : 9999;

        if ((currentDur < bgMusic.currentTime) && (nextDur > bgMusic.currentTime)) {
            if (lines[currentLine] == "#") {
                wavyText(lyricsElem, "♫ - Fly Me To The Moon - ♫", "rainbowlightwavy", 60);
            } else {
                lyricsElem.textContent = lines[currentLine];
                wavyText(lyricsElem, lyricsElem.textContent, "lightwavy", 60);
            }
            currentLine++;
        }
        if (currentLine >= durations.length) {
            currentLine = 0
            console.log("RESET");
            wavyText(lyricsElem, "♫ - Fly Me To The Moon - ♫", "rainbowlightwavy", 60);
        };

        requestAnimationFrame(playLyrics);
    }

    requestAnimationFrame(playLyrics);
}
main();