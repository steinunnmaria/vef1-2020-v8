/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  const m = n % 32;
  const upperCaseStr = str.toLocaleUpperCase();
  const newLetters = alphabet.split('');
  str.split('');
  let newStr = '';

  for (let i = 0; i < upperCaseStr.length; i += 1) {
    const currentLetter = upperCaseStr[i];
    if (currentLetter === ' ') {
      newStr += currentLetter;
      continue;
    }
    const currentIndex = newLetters.indexOf(currentLetter);
    if (currentIndex >= 0 && currentIndex < alphabet.length) {
      let newIndex = currentIndex + m;
      if (newIndex > (alphabet.lenght - 1)) {
        newIndex -= alphabet.length;
      }
      if (newIndex < 0) {
        newIndex += alphabet.length;
      }
      if (str[i] === str[i].toLocaleLowerCase()) {
        newStr += newLetters[newIndex].toLocaleLowerCase();
      } else {
        newStr += newLetters[newIndex];
      }
    }
  }
  return newStr;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  const m = n % 32;
  const upperCaseStr = str.toLocaleUpperCase();
  const newLetters = alphabet.split('');
  str.split('');
  let newStr = '';

  for (let i = 0; i < upperCaseStr.length; i += 1) {
    const currentLetter = upperCaseStr[i];
    if (currentLetter === ' ') {
      newStr += currentLetter;
      continue;
    }
    const currentIndex = newLetters.indexOf(currentLetter);
    if (currentIndex >= 0 && currentIndex < alphabet.length) {
      let newIndex = currentIndex - m;
      if (newIndex > (alphabet.length - 1)) {
        newIndex = newIndex - alphabet.length - 1;
      }
      if (newIndex < 0) {
        newIndex += alphabet.length;
      }
      if (str[i] === str[i].toLocaleLowerCase()) {
        newStr += newLetters[newIndex].toLocaleLowerCase();
      } else {
        newStr += newLetters[newIndex];
      }
    }
  }

  return newStr;
}

function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;
  let shiftValue;
  let shiftElement;

  let text;

  let result;

  function writeResult() {
    const p = document.createElement('p');
    let coded;
    if (type === 'encode') {
      coded = encode(text, shift, alphabet);
      p.textContent = coded;
    } else if (type === 'decode') {
      coded = decode(text, shift, alphabet);
      p.textContent = coded;
    }

    empty(result);
    result.appendChild(p);
  }

  function updateAlphabet(e) {
    alphabet = e.target.value;
    shiftElement.setAttribute('max', alphabet.length);
    writeResult();
  }

  // brotnar þegar lengdin á alphabet er undir 3, laga

  function codeOrDecode(e) {
    type = e.target.value;
    writeResult();
  }

  function updateShift(e) {
    shift = e.target.value;
    shiftValue.textContent = shift;
    writeResult();
  }

  function updateText(e) {
    text = e.target.value;
    writeResult();

    // loopa í gegnum strenginn og taka alla stafi sem eru ekki í stafrófinu, HENDA ÞEIM ÚT
  }

  function init(el) {
    // Setja event handlera á viðeigandi element
    el.querySelector('#alphabet').addEventListener('input', updateAlphabet);
    const radioButtons = el.querySelectorAll('[name=type]');
    for (let i = 0; i < radioButtons.length; i += 1) {
      radioButtons[i].addEventListener('change', codeOrDecode);
    }
    el.querySelector('#shift').addEventListener('input', updateShift);
    shiftValue = el.querySelector('.shiftValue');
    shiftElement = el.querySelector('#shift');
    el.querySelector('#input').addEventListener('input', updateText);
    result = el.querySelector('.result');
  }

  // append til að update-a

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
