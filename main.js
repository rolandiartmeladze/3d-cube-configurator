import './global.css';
import { initCube } from './app/initCube.js';
import { initText } from './app/init3DText.js';

function menuOpen() {
    const menuBtn = document.querySelector("#hamburg-menu");
    const sidebar = document.getElementById("sidebar");
    if (!menuBtn || !sidebar) return;
    let isOpen = false;

    menuBtn.addEventListener("click", () => {
        isOpen = !isOpen;
        menuBtn.classList.toggle("hamburg-open", isOpen);
        sidebar.classList.toggle("sidebar-open", isOpen);
        sidebar.classList.toggle("hidden", !isOpen);
    });
}

menuOpen();

initCube();
initText();