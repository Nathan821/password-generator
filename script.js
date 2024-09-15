const lengthEl = document.querySelector("#length");
const upperEl = document.querySelector("#uppercase");
const lowerEl = document.querySelector("#lowercase");
const symbolsEl = document.querySelector("#symbols");
const numbersEl = document.querySelector("#numbers");
const generateEl = document.querySelector(".btn");
const passwordEl = document.querySelector("#password");
const copyEl = document.querySelector(".copy-btn");

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  numbers: getRandomNumber,
  symbols: getRandomSymbol
}

// Generator functions

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97));
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
}


function getRandomNumber() {
  return Math.floor(Math.random() * (9 - 0) + 0);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*-+?><";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//Events

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasUpper = upperEl.checked;
  const hasLower = lowerEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  passwordEl.value = generatePassword(hasUpper, hasLower, hasNumber, hasSymbols, length);
})

//Generate password

function generatePassword(upper, lower, numbers, symbols, length) {
  let password = "";
  const typesCount = upper + lower + numbers + symbols;
  const typesArr = [{ upper }, { lower }, { numbers }, { symbols }].filter
  (
    item => Object.values(item)[0]
  );


  if (typesCount === 0) {
    return "";
  }

  for (let i=0; i<length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      password += randomFunc[funcName]();
    })
  }

  const finalPassword = password.slice(0, length);
  return finalPassword;

}


// Copy password
copyEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const pass = passwordEl.value;

  if (!pass) {
    console.log("Error!");
    return;
  } 

  textarea.value = pass;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  
  const copyImg = document.querySelector(".copy-btn");
  copyImg.classList.add("animated", "heartBeat");
});