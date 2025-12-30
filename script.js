

// Background music controls
const bgm = new Audio('assets/bgm.mp3');
bgm.loop = true;
bgm.volume = 0.28;
bgm.preload = 'auto';
let musicPlaying = false;

function updateMusicButton() {
  const btn = document.getElementById('music-toggle');
  if (!btn) return;
  btn.textContent = musicPlaying ? '🔊 Music ON' : '🔈 Music OFF';
  btn.setAttribute('aria-pressed', musicPlaying ? 'true' : 'false');
}

function playMusic() {
  bgm.play().then(() => {
    musicPlaying = true;
    updateMusicButton();
    localStorage.setItem('bgmPlaying', '1');
  }).catch(() => {
    // Autoplay blocked; wait for user interaction
    musicPlaying = false;
    updateMusicButton();
  });
}

function pauseMusic() {
  bgm.pause();
  musicPlaying = false;
  updateMusicButton();
  localStorage.setItem('bgmPlaying', '0');
}

function toggleMusic() {
  if (musicPlaying) pauseMusic(); else playMusic();
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('music-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    toggleMusic();
  });

  // Restore preference if user previously enabled music
  const saved = localStorage.getItem('bgmPlaying');
  if (saved === '1') {
    // Many browsers block autoplay; try to play on first user gesture
    const tryPlay = () => {
      playMusic();
      window.removeEventListener('click', tryPlay);
    };
    window.addEventListener('click', tryPlay);
  } else {
    updateMusicButton();
  }
});
