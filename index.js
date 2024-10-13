// List of sound files
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

let remainingAudioFiles = [...audioFiles]; // Copies of audio files not yet played
let currentAudioFile = '';
let correctCount = 0;
let totalCount = 0;

// Random sound file selection and playback
function playRandomAudio() {
    if (remainingAudioFiles.length === 0) {
        remainingAudioFiles = [...audioFiles];
    }

    const randomIndex = Math.floor(Math.random() * remainingAudioFiles.length);
    currentAudioFile = remainingAudioFiles[randomIndex];
    remainingAudioFiles.splice(randomIndex, 1);

    const audio = document.getElementById('audioPlayer');
    audio.src = currentAudioFile;
    audio.play();
}

// Assign an event handler to the audio element: after the sound is played, the buttons and input appears
document.getElementById('audioPlayer').addEventListener('ended', function() {
    setTimeout(() => document.getElementById('tip').style.display = 'block', 500);
    setTimeout(() => document.getElementById('replayButton').style.display = 'block', 1000);
    setTimeout(() => document.getElementById('solutionButton').style.display = 'block', 1500);
});

// Event handler for the play button
document.querySelector('.playButton').addEventListener('click', function() {
    playRandomAudio();
    document.querySelector('.playButton').innerText = 'Next sound';

    // Elrejti az összes gombot és az inputot
    document.getElementById('solutionButton').style.display = 'none';
    document.getElementById('replayButton').style.display = 'none';
    document.getElementById('tip').style.display = 'none';
    document.getElementById('solutionText').textContent = '';
    document.getElementById('solutionText').style.display = 'block';
    document.getElementById('resultButtons').style.display = 'none';

    // Gombok megjelenésének újraindítása időzítéssel
    setTimeout(() => document.getElementById('tip').style.display = 'block', 500);
    setTimeout(() => document.getElementById('replayButton').style.display = 'block', 1000);
    setTimeout(() => document.getElementById('solutionButton').style.display = 'block', 1500);
});

// Event handler for the replay button
document.getElementById('replayButton').addEventListener('click', function() {
    const audio = document.getElementById('audioPlayer');
    audio.play();
});

// Event handler for the solution button
document.getElementById('solutionButton').addEventListener('click', function() {
    const fileName = currentAudioFile.replace('Sounds/', '').replace('.m4a', '');
    document.getElementById('solutionText').textContent = fileName;
    document.getElementById('resultButtons').style.display = 'block';
    document.querySelector('.playButton').innerText = 'Next sound';
});

// Event handler for the correct button
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

// Event handler for the incorrect button
document.getElementById('incorrectButton').addEventListener('click', function() {
    totalCount++;
    updateCounter();
    document.getElementById('resultButtons').style.display = 'none';
    document.getElementById('solutionText').style.display = 'none';
    document.getElementById('solutionButton').style.display = 'none';
    document.getElementById('replayButton').style.display = 'none';
    document.getElementById('tip').style.display = 'none';
});

// Update Counter
function updateCounter() {
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('totalCount').textContent = totalCount;
} 