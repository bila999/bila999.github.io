// 1. Ner palindrome esehiig shalgah
function isPalindromeName(name) {
  const clean = name.toLowerCase();
  return clean === clean.split('').reverse().join('');
}

let nameInput = prompt("Ner oruulna uu:");
if (isPalindromeName(nameInput)) {
  alert("Palindrome baina");
} else {
  alert("Palindrome bish");
}

// 2. Too oruulaad tsifruudiin niilber ol
function sumOfDigits(num) {
  return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

let numInput = Number(prompt("Too oruulna uu:"));
alert("Tsifruudiin niilber: " + sumOfDigits(numInput));

// 3. Toog anhnii toonuudiin niilber bolgoh
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function primeSumMinimal(n) {
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) primes.push(i);
  }

  // Backtracking to find minimal length combination
  let best = null;

  function backtrack(sum, combo, start) {
    if (sum === n) {
      if (!best || combo.length < best.length) {
        best = [...combo];
      }
      return;
    }
    if (sum > n) return;

    for (let i = start; i < primes.length; i++) {
      combo.push(primes[i]);
      backtrack(sum + primes[i], combo, i); // allow reuse of same prime
      combo.pop();
    }
  }

  backtrack(0, [], 0);
  return best || ["Zadlah bolomjgui"];
}

// 🧪 Туршилт
let input = Number(prompt("Toog anhnii toonuudiin niilbert zadlakh:"));
let output = primeSumMinimal(input);
alert("Anhnii toonuudiin niilber: " + output.join(", "));


// 4. Chono 25km/h, tuulai 18km/h, zaigaar heden min sec dotor guitseh ve?
function chaseTime(distance) {
  const relativeSpeed = 25 - 18; // km/h
  const hours = distance / relativeSpeed;
  const totalSeconds = hours * 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return { minutes, seconds };
}

let dist = Number(prompt("Chono, tuulai hoorondoh zai (km):"));
let time = chaseTime(dist);
alert(`Guitsene: ${time.minutes} minut ${time.seconds} sekund`);

// 5. Array dahi utguudiig tegsh sondgoi gej yalgah
function evenOddSplit(arr) {
  const even = arr.filter(n => n % 2 === 0);
  const odd = arr.filter(n => n % 2 !== 0);
  return { even, odd };
}

let arrInput = prompt("Too oruulna uu (hooson zaigaaraa salgaj):").split(" ").map(Number);
let result = evenOddSplit(arrInput);
alert("Tegsh: " + result.even.join(", ") + "\nSondgoi: " + result.odd.join(", "));

// 6. Tootoor davhar orts haalga oloh
function apartmentInfo(toot) {
  const doorsPerFloor = 4;
  const floorsPerEntrance = 9;
  const apartmentsPerEntrance = doorsPerFloor * floorsPerEntrance;

  const orts = Math.ceil(toot / apartmentsPerEntrance);
  const rem = toot - (orts - 1) * apartmentsPerEntrance;
  const davhar = Math.ceil(rem / doorsPerFloor);
  const haalga = rem % doorsPerFloor || doorsPerFloor;

  return { orts, davhar, haalga };
}

let toot = Number(prompt("Toot oruulna uu:"));
let info = apartmentInfo(toot);
alert(`Orts: ${info.orts}, Davhar: ${info.davhar}, Haalga: ${info.haalga}`);

// 7. Ogloo orohoi tsag shalgaj 2 tsegtee yalgatai haragdah
function showBoxByTime() {
  const hour = new Date().getHours();
  const box = document.createElement('div');
  box.style.width = '50px';
  box.style.height = '50px';
  box.style.position = 'fixed';

  if (hour < 12) {
    box.style.backgroundColor = 'green';
    box.style.top = '0';
    box.style.left = '0';
  } else {
    box.style.backgroundColor = 'red';
    box.style.bottom = '0';
    box.style.right = '0';
  }

  document.body.appendChild(box);
}

showBoxByTime();

// 8. Petya game
function petyaGame(n, k) {
  if (k >= n) return 0;
  const r = (n - 1) % (k + 1);
  return r === 0 ? 0 : r;
}

let n = Number(prompt("Niit zоosnii too:"));
let k = Number(prompt("Petya heden zоос avch boloh max too:"));
alert("Petya ehleed avah zоосnii too: " + petyaGame(n, k));