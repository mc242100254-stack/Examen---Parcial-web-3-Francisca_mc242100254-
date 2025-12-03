const words = [
    'BASE DE DATOS',
    'PROGRAMACION',
    'JAVASCRIPT',
    'HTML',
    'CSS',
    'SERVIDOR',
    'MULTIMEDIA',
    'ALGORITMO',
    'CONSULTA',
    'TABLA'
];

let currentWord = '';
let guessedLetters = [];
let remainingAttempts = 6;

function initGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    displayWord();
    createLetterButtons();
    updateStatus();
}

function displayWord() {
    const display = currentWord.split('').map(letter => {
        if (letter === ' ') return ' / ';
        return guessedLetters.includes(letter) ? letter : '_';
    }).join(' ');
    document.getElementById('word-display').textContent = display;
}

function createLetterButtons() {
    const container = document.getElementById('letters-container');
    container.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    alphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.className = 'letter-btn';
        btn.onclick = () => guessLetter(letter, btn);
        container.appendChild(btn);
    });
}

function guessLetter(letter, btn) {
    btn.disabled = true;
    guessedLetters.push(letter);

    if (currentWord.includes(letter)) {
        displayWord();
        checkWin();
    } else {
        remainingAttempts--;
        updateStatus();
        checkLose();
    }
}

function updateStatus() {
    const status = document.getElementById('game-status');
    status.textContent = `Intentos restantes: ${remainingAttempts}`;
    status.style.color = remainingAttempts <= 2 ? '#e74c3c' : '#667eea';
}

function checkWin() {
    const isWon = currentWord.split('').every(letter => 
        letter === ' ' || guessedLetters.includes(letter)
    );

    if (isWon) {
        document.getElementById('game-status').innerHTML = 
            '🎉 ¡Felicidades! ¡Has ganado!';
        document.getElementById('game-status').style.color = '#27ae60';
        disableAllButtons();
    }
}

function checkLose() {
    if (remainingAttempts <= 0) {
        document.getElementById('game-status').innerHTML = 
            `😢 Game Over. La palabra era: <strong>${currentWord}</strong>`;
        document.getElementById('game-status').style.color = '#e74c3c';
        disableAllButtons();
    }
}

function disableAllButtons() {
    document.querySelectorAll('.letter-btn').forEach(btn => {
        btn.disabled = true;
    });
}

function resetGame() {
    initGame();
}

// Iniciar el juego al cargar la página
window.onload = initGame;