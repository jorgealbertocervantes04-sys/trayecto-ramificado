export function useSound() {
  const playTone = (
    frequency: number,
    duration: number,
    type: OscillatorType = "sine"
  ) => {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }).webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    oscillator.connect(gain);
    gain.connect(context.destination);

    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      context.currentTime + duration
    );

    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  };

  const success = () => {
    playTone(660, 0.12, "triangle");
    setTimeout(() => playTone(880, 0.18, "triangle"), 100);
  };

  const error = () => {
    playTone(160, 0.35, "sawtooth");
  };

  const click = () => {
    playTone(520, 0.06, "triangle");
  };

  return { success, error, click };
}