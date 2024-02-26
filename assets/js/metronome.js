import { tempo, volume, frequency } from './main.js';

export const ac = new AudioContext();
const source = ac.createBufferSource();
const gainNode = ac.createGain();

/**
 * This function, derived from Paul Adenot's "Metro.JS" (@see https://github.com/padenot/metro/
 * & @see https://blog.paul.cx/post/metronome/ ), uses the Web Audio API to loop an
 * audio sound (which is synthesized within the function) at an interval according to
 * the current {@link tempo}.
 */
export const setup = () => {
  const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
  const channel = buf.getChannelData(0);

  gainNode.gain.value = volume;

  let phase = 0;
  let amp = 1;
  const durationFrames = ac.sampleRate / 50;

  for (let i = 0; i < durationFrames; i += 1) {
    channel[i] = Math.sin(phase) * amp;
    phase += (2 * Math.PI * frequency) / ac.sampleRate;
    if (phase > 2 * Math.PI) {
      phase -= 2 * Math.PI;
    }
    amp -= 1 / durationFrames;
  }

  source.buffer = buf;
  source.loop = true;
  source.loopEnd = 1 / (tempo / 60);
  source.connect(gainNode).connect(ac.destination);
  source.start(0);
  ac.suspend();
};

/**
 * Updates the loopEnd value according to the current tempo value.
 * This allows us to change the tempo speed whilst it's playing without
 * any overlapping or sudden change in tempo.
 */
export const updateTempo = () => {
  source.loopEnd = 1 / (tempo / 60);
};

/**
 * Updates the volume according to the imported {@link volume} variable's value
 */
export const updateVolume = () => {
  gainNode.gain.value = volume;
};
