import themeToggle from './themetoggle.js';
import { setup, updateTempo, ac, updateVolume } from './metronome.js';

const tempoForm = document.querySelector('[data-counter]');
const tempoInput = document.querySelector('[data-counter-input]');
const tempoSlider = document.querySelector('[data-tempo-slider]');
const addButton = document.querySelector('[data-add]');
const subtractButton = document.querySelector('[data-subtract]');
const resetButton = document.querySelector('[data-reset]');
const tempoItalianName = document.querySelector('[data-tempo-italian]');
const themeButton = document.querySelector('[data-theme]');
const startButton = document.querySelector('[data-start]');
const settingsButton = document.querySelector('[data-settings]');
const settingsPanel = document.querySelector('[data-settings-panel]');
const volumeSlider = document.querySelector('[data-volume-slider]');

export let tempo = 120; // Beats Per Minute. Default 120
export const frequency = 600;
export let volume = 1;

setup(); // Needs to run on init

/**
 * Triggers {@link themeSwitch}, which toggles the theme between light and dark.
 */
themeButton.addEventListener('click', themeToggle);

/**
 * Sets the counter to display the Italian name for the current tempo value.
 */
const setTempoItalian = () => {
  let name = '';
  if (tempo >= 20 && tempo < 40) {
    name = 'Grave';
  } else if (tempo >= 40 && tempo < 60) {
    name = 'Largo';
  } else if (tempo >= 60 && tempo < 66) {
    name = 'Larghetto';
  } else if (tempo >= 66 && tempo < 76) {
    name = 'Adagio';
  } else if (tempo >= 76 && tempo < 108) {
    name = 'Andante';
  } else if (tempo >= 108 && tempo < 120) {
    name = 'Moderato';
  } else if (tempo >= 120 && tempo < 156) {
    name = 'Allegro';
  } else if (tempo >= 156 && tempo < 176) {
    name = 'Vivace';
  } else if (tempo >= 176 && tempo < 200) {
    name = 'Presto';
  } else if (tempo >= 200) {
    name = 'Prestissimo';
  }
  tempoItalianName.innerText = name;
};

/**
 * This function sets the tempo counter (or input field, rather) to the user input value and
 * returns the new value as variable {@link tempo}. If the input value is less than 20 or
 * more than 240, it gets clamped to the min or max value respectively. The function also
 * sets the tempo slider value to reflect the new input value.
 * @param {*} event
 * @returns {number}
 */
const submitHandler = (event) => {
  event.preventDefault();
  if (tempoInput.value < 20) {
    tempo = 20;
  } else if (tempoInput.value > 240) {
    tempo = 240;
  } else {
    tempo = tempoInput.value;
  }
  tempoInput.value = tempo;
  tempoSlider.value = tempo;
  setTempoItalian();
  updateTempo();
  return tempo;
};
tempoForm.addEventListener('submit', submitHandler);

/**
 * Sets the tempo variable and counter equal to the slider value, updating it as you drag.
 * @returns {number} tempo
 */
const setCounterSlider = () => {
  tempo = tempoSlider.value;
  tempoInput.value = tempoSlider.value;
  setTempoItalian();
  updateTempo();
  return tempo;
};
tempoSlider.addEventListener('input', setCounterSlider);

/**
 * Plus button increases the tempo variable and counter by 1, and sets the input and
 * slider values accordingly
 * @returns {number} tempo
 */
const addHandler = () => {
  if (tempo >= 240) {
    return tempo;
  }
  tempo++;
  tempoInput.value = tempo;
  tempoSlider.value = tempo;
  setTempoItalian();
  updateTempo();
  return tempo;
};
addButton.addEventListener('click', addHandler);

/**
 * Minus button decreases the tempo variable and counter by 1, and sets the input and
 * slider values accordingly
 * @returns {number} tempo
 */
const subtractHandler = () => {
  if (tempo <= 20) {
    return tempo;
  }
  tempo--;
  tempoInput.value = tempo;
  tempoSlider.value = tempo;
  setTempoItalian();
  updateTempo();
  return tempo;
};
subtractButton.addEventListener('click', subtractHandler);

/**
 * Toggles the start (resume) and stop (suspend) of the AudioContext, and changes
 * the button's innerText accordingly.
 */
const startHandler = () => {
  updateTempo();
  if (ac.state === 'running') {
    ac.suspend();
    startButton.innerText = 'start';
  } else {
    ac.resume();
    startButton.innerText = 'stop';
  }
};
startButton.addEventListener('click', startHandler);

/**
 * Reset button sets all values back to their initial state and suspends the AudioContext.
 */
const resetHandler = () => {
  tempo = 120;
  tempoInput.value = tempo;
  tempoSlider.value = tempo;
  setTempoItalian();
  updateTempo();
  ac.suspend();
  startButton.innerText = 'start';
};
resetButton.addEventListener('click', resetHandler);

/**
 * Toggle settings panel hidden or not
 */
const settingsHandler = () => {
  if (settingsPanel.classList.contains('hidden')) {
    settingsPanel.classList.remove('hidden');
  } else {
    settingsPanel.classList.add('hidden');
  }
};

settingsButton.addEventListener('click', settingsHandler);

/**
 * Sets the volume variable equal to the slider value, updating it as you drag.
 * @returns {number} tempo
 */
const setVolumeSlider = () => {
  volume = volumeSlider.value / 100;
  console.log(volume);
  updateVolume();
  return volume;
};
volumeSlider.addEventListener('input', setVolumeSlider);
