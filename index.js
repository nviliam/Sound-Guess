// Hangfájlok listája
const audioFiles = [
    'Sounds/Dumbbell on the parquet floor.m4a',
    'Sounds/Door opening.m4a',
    'Sounds/Starting a car.m4a',
    'Sounds/Car key unlocking.m4a',
    'Sounds/Electric toothbrush.m4a',
    'Sounds/Door code.m4a',
    'Sounds/Coughing.m4a',
    'Sounds/Keychain in the air.m4a',
    'Sounds/Key on the metal mailbox.m4a',
    'Sounds/Bouncing the ball.m4a',
    'Sounds/Pen click.m4a',
    'Sounds/Throat grinding.m4a',
    'Sounds/Stairs.m4a',
    'Sounds/Glass jogging with key.m4a',
    'Sounds/Electric light switch.m4a',
    'Sounds/Monster sound - kid.m4a',
    'Sounds/Mouse click.m4a',
    'Sounds/Quick scroll.m4a',
    'Sounds/Mosquito repellent spray.m4a',
];

let remainingAudioFiles = [...audioFiles]; // A még nem lejátszott hangfájlok másolata
let currentAudioFile = '';
let correctCount = 0;
let totalCount = 0;

// Véletlenszerű hangfájl kiválasztása és lejátszása
function playRandomAudio() {
    if (remainingAudioFiles.length === 0) {
        remainingAudioFiles = [...audioFiles]; // Töltsd újra a listát, ha minden fájl le lett játszva
    }

    const randomIndex = Math.floor(Math.random() * remainingAudioFiles.length);
    currentAudioFile = remainingAudioFiles[randomIndex];
    remainingAudioFiles.splice(randomIndex, 1); // Távolítsd el a kiválasztott hangfájlt a listából

    const audio = document.getElementById('audioPlayer');
    audio.src = currentAudioFile;
    audio.play();
}

// Az audio elemhez eseménykezelő hozzárendelése, hogy a hang lejátszása után megjelenjenek a gombok és az input
document.getElementById('audioPlayer').addEventListener('ended', function() {
    document.getElementById('tip').style.display = 'block';
    setTimeout(() => document.getElementById('replayButton').style.display = 'block', 2000);
    setTimeout(() => document.getElementById('solutionButton').style.display = 'block', 3000);
});

// A gomb eseménykezelője
document.querySelector('.playButton').addEventListener('click', function() {
    playRandomAudio();
    document.getElementById('solutionButton').style.display = 'none';
    document.getElementById('replayButton').style.display = 'none';
    document.getElementById('tip').style.display = 'none';
    document.getElementById('solutionText').textContent = '';
    document.getElementById('solutionText').style.display = 'block'; // Ezzel újra láthatóvá tesszük a megoldás szövegét
    document.getElementById('resultButtons').style.display = 'none';
});

// Az "Újra" gomb eseménykezelője
document.getElementById('replayButton').addEventListener('click', function() {
    const audio = document.getElementById('audioPlayer');
    audio.play();
});

// A "Megoldás" gomb eseménykezelője
document.getElementById('solutionButton').addEventListener('click', function() {
    const fileName = currentAudioFile.replace('Sounds/', '').replace('.m4a', '');
    document.getElementById('solutionText').textContent = fileName;
    document.getElementById('resultButtons').style.display = 'block';
    document.querySelector('.playButton').innerText = 'Next sound';
});

// A "Eltaláltam" gomb eseménykezelője
document.getElementById('correctButton').addEventListener('click', function() {
    correctCount++;
    totalCount++;
    updateCounter();
    document.getElementById('resultButtons').style.display = 'none';
    document.getElementById('solutionText').style.display = 'none';
    document.getElementById('solutionButton').style.display = 'none';
    document.getElementById('replayButton').style.display = 'none';
    document.getElementById('tip').style.display = 'none';
});

// A "Nem találtam el" gomb eseménykezelője
document.getElementById('incorrectButton').addEventListener('click', function() {
    totalCount++;
    updateCounter();
    document.getElementById('resultButtons').style.display = 'none';
    document.getElementById('solutionText').style.display = 'none';
    document.getElementById('solutionButton').style.display = 'none';
    document.getElementById('replayButton').style.display = 'none';
    document.getElementById('tip').style.display = 'none';
});

function updateCounter() {
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('totalCount').textContent = totalCount;
} 