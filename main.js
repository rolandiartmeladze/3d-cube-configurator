import './global.css';
import { initCube } from './app/initCube.js';
import { initText } from './app/init3DText.js';

function menuOpen() {
  const menuBtn = document.querySelector("#hamburg-menu");

  if (!menuBtn) return;

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("hamburg-open");
  });
}

menuOpen();

initCube();
initText();