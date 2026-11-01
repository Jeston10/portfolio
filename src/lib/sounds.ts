// Tiny Web Audio sound effects — no audio assets needed. Everything is
// synthesized on a single lazily-created AudioContext, resumed on the user
// gesture that triggers each sound.

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Short, crisp key "tick" — played on each terminal keystroke. */
export function playKeyClick() {
  try {
    const c = audio();
    if (!c) return;
    const t = c.currentTime;
    const dur = 0.028;

    const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      // decaying white noise burst
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const src = c.createBufferSource();
    src.buffer = buf;

    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2400;
    bp.Q.value = 0.9;

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.14, t + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    src.connect(bp);
    bp.connect(g);
    g.connect(c.destination);
    src.start(t);
    src.stop(t + dur);
  } catch {
    /* audio unavailable */
  }
}

/** A mechanical key switch "thock": a sharp contact click + a low body. */
export function playMechanicalPress() {
  try {
    const c = audio();
    if (!c) return;
    const t = c.currentTime;

    // 1) Contact click — a very short, bright noise burst.
    const clickDur = 0.014;
    const nb = c.createBuffer(
      1,
      Math.ceil(c.sampleRate * clickDur),
      c.sampleRate
    );
    const nd = nb.getChannelData(0);
    for (let i = 0; i < nd.length; i++) {
      nd[i] = (Math.random() * 2 - 1) * (1 - i / nd.length);
    }
    const ns = c.createBufferSource();
    ns.buffer = nb;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2800;
    bp.Q.value = 1.3;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.28, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + clickDur);
    ns.connect(bp);
    bp.connect(ng);
    ng.connect(c.destination);
    ns.start(t);
    ns.stop(t + clickDur);

    // 2) Body "thock" — low triangle with a fast decay, low-passed.
    const osc = c.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(92, t + 0.06);
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    const og = c.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(0.32, t + 0.004);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.085);
    osc.connect(lp);
    lp.connect(og);
    og.connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  } catch {
    /* audio unavailable */
  }
}
