let nickname = "";
let currentWord = "";
let displayLetters = [];
let wrongGuesses = 0;
let correctGuesses = 0;
let timer = 60;
let score = 0;
let interval;
let wordList = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("words.json")
    .then(res => res.json())
    .then(data => wordList = data);

  const nicknameContainer = document.getElementById("nickname-container");
  const gameContainer = document.getElementById("game-container");
  const playerName = document.getElementById("player-name");
  const wordBox = document.getElementById("word-box");
  const canvas = document.getElementById("hangman-canvas");
  const result = document.getElementById("result");
  const ctx = canvas.getContext("2d");
  const timerElement = document.getElementById("timer");

  document.getElementById("start-btn").addEventListener("click", () => {
    nickname = document.getElementById("nickname").value.trim();
    if (!nickname) return alert("Нэрээ оруулна уу");
    document.cookie = `nickname=${nickname}; path=/`;
    nicknameContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    playerName.textContent = nickname;
    startGame();
  });

  function startGame() {
    resetCanvas();
    wrongGuesses = 0;
    correctGuesses = 0;
    result.textContent = "";
    displayLetters = [];

    let wordObj = wordList[Math.floor(Math.random() * wordList.length)];
    document.getElementById("question").textContent = wordObj.question;
    currentWord = wordObj.answer.toUpperCase();
    wordBox.innerHTML = "";
    for (let i = 0; i < currentWord.length; i++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      box.textContent = "";
      wordBox.appendChild(box);
      displayLetters.push(box);
    }

    clearInterval(interval);
    timer = 60;
    timerElement.textContent = timer;
    interval = setInterval(() => {
      timer--;
      timerElement.textContent = timer;
      if (timer <= 0) {
        clearInterval(interval);
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    result.textContent = "Тоглоом дууслаа!";
    updateScore();
    document.getElementById("restart-btn").classList.remove("hidden");
  }

  function updateScore() {
    let players = JSON.parse(localStorage.getItem("topPlayers") || "[]");
    players.push({ name: nickname, score });
    players.sort((a, b) => b.score - a.score);
    players = players.slice(0, 10);
    localStorage.setItem("topPlayers", JSON.stringify(players));

    if (players.some(p => p.name === nickname && p.score === score)) {
      alert("Баяр хүргэе! Та шилдэг 10-д багтлаа.");
    }
  }

  function drawPart() {
    const drawSteps = [
      () => ctx.beginPath(),
      () => { ctx.moveTo(10, 190); ctx.lineTo(190, 190); ctx.stroke(); },
      () => { ctx.moveTo(50, 190); ctx.lineTo(50, 20); ctx.stroke(); },
      () => { ctx.lineTo(150, 20); ctx.stroke(); },
      () => { ctx.lineTo(150, 40); ctx.stroke(); },
      () => { ctx.beginPath(); ctx.arc(150, 60, 20, 0, Math.PI * 2); ctx.stroke(); },
      () => { ctx.moveTo(150, 80); ctx.lineTo(150, 130); ctx.stroke(); },
      () => { ctx.lineTo(130, 160); ctx.stroke(); },
      () => { ctx.moveTo(150, 130); ctx.lineTo(170, 160); ctx.stroke(); }
    ];

    if (wrongGuesses < drawSteps.length) {
      drawSteps[wrongGuesses]();
    }
    wrongGuesses++;
    if (wrongGuesses === drawSteps.length) {
      result.textContent = `Та хожигдлоо! Үг: ${currentWord}`;
      clearInterval(interval);
      document.getElementById("restart-btn").classList.remove("hidden");
    }
  }

  function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  document.addEventListener("keydown", e => {
    if (!gameContainer.classList.contains("hidden") && /^[А-ЯӨҮҮ]$/i.test(e.key)) {
      let letter = e.key.toUpperCase();
      let found = false;
      for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter && displayLetters[i].textContent === "") {
          displayLetters[i].textContent = letter;
          correctGuesses++;
          found = true;
        }
      }
      if (!found) {
        drawPart();
      }
      if (correctGuesses === currentWord.length) {
        score += currentWord.length;
        startGame();
      }
    }
  });

  document.getElementById("restart-btn").addEventListener("click", () => {
    score = 0;
    startGame();
    document.getElementById("restart-btn").classList.add("hidden");
  });

  document.getElementById("scoreboard-btn").addEventListener("click", () => {
    const scoreboard = document.getElementById("scoreboard");
    const players = JSON.parse(localStorage.getItem("topPlayers") || "[]");
    scoreboard.innerHTML = "";
    players.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name}: ${p.score} оноо`;
      scoreboard.appendChild(li);
    });
    scoreboard.classList.toggle("hidden");
  });
});
