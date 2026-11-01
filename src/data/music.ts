// ─────────────────────────────────────────────────────────────────────────
//  MUSIC  ·  "On repeat" favourites, played in-page from local audio files
//  (public/music). Used by the home-page player and the terminal `play`
//  command.
// ─────────────────────────────────────────────────────────────────────────

export type Track = {
  title: string;
  artist: string;
  // Audio file served from /public/music.
  src: string;
  // Gradient used for the album-art tile.
  gradient: string;
};

export const favorites: Track[] = [
  {
    title: "Espresso",
    artist: "Sabrina Carpenter",
    src: "/music/espresso.mp3",
    gradient: "linear-gradient(135deg, #f59e0b, #b45309)",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "/music/blinding-lights.mp3",
    gradient: "linear-gradient(135deg, #ef4444, #7f1d1d)",
  },
  {
    title: "Moth To A Flame",
    artist: "Swedish House Mafia, The Weeknd",
    src: "/music/moth-to-a-flame.mp3",
    gradient: "linear-gradient(135deg, #6366f1, #312e81)",
  },
  {
    title: "Castle",
    artist: "Harddope, Clarx (NCS Release)",
    src: "/music/castle.mp3",
    gradient: "linear-gradient(135deg, #10b981, #065f46)",
  },
];
