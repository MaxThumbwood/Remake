export function setupJoystick(player) {
  let startX = 0;
  let startY = 0;
  let active = false;

  window.addEventListener("touchstart", (e) => {
    active = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  window.addEventListener("touchmove", (e) => {
    if (!active) return;
    const dx = (e.touches[0].clientX - startX) / 50;
    const dy = (e.touches[0].clientY - startY) / 50;
    player.move(dx, dy);
  });

  window.addEventListener("touchend", () => {
    active = false;
    player.move(0, 0);
  });
}