document.addEventListener("DOMContentLoaded", () => {
  const profileOverlay = document.getElementById("profileOverlay");
  const openProfileBtn = document.getElementById("openProfileBtn");
  const closeProfileBtn = document.getElementById("closeProfileBtn");

  if (openProfileBtn && profileOverlay) {
    openProfileBtn.addEventListener("click", () => {
      profileOverlay.classList.remove("hidden");
      profileOverlay.classList.add("flex");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeProfileBtn && profileOverlay) {
    closeProfileBtn.addEventListener("click", () => {
      profileOverlay.classList.add("hidden");
      profileOverlay.classList.remove("flex");
      document.body.style.overflow = "auto";
    });
  }

  if (profileOverlay) {
    profileOverlay.addEventListener("click", (e) => {
      if (e.target === profileOverlay) {
        profileOverlay.classList.add("hidden");
        profileOverlay.classList.remove("flex");
        document.body.style.overflow = "auto";
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && profileOverlay) {
      profileOverlay.classList.add("hidden");
      profileOverlay.classList.remove("flex");
      document.body.style.overflow = "auto";
    }
  });
});

// Watch Me Hover
const follower = document.getElementById('mouse-follower');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX, currentY = mouseY;
 
    const gradients = [
  ['#00ff41', '#003b00'],   // bright matrix green → deep green
  ['#00e5ff', '#003340'],   // cyan → dark teal
  ['#39ff14', '#004d00'],   // neon green → forest green
  ['#00ffcc', '#002b22'],   // aqua mint → dark emerald
  ['#7dff6b', '#1a4d00'],   // lime green → dark olive
];
    let gIdx = 0, gTimer = 0;
 
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    document.addEventListener('mouseleave', () => follower.style.opacity = '0');
    document.addEventListener('mouseenter', () => follower.style.opacity = '1');
 
    function lerp(a, b, t) { return a + (b - a) * t; }
 
    (function animate() {
      currentX = lerp(currentX, mouseX, 0.10);
      currentY = lerp(currentY, mouseY, 0.10);
      follower.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
 
      if (++gTimer > 180) {
        gTimer = 0;
        gIdx = (gIdx + 1) % gradients.length;
        const [c1, c2] = gradients[gIdx];
        follower.style.background = `radial-gradient(circle, ${c1}55 0%, ${c2}33 40%, transparent 70%)`;
        follower.style.transition = 'background 1.5s ease';
      }
      requestAnimationFrame(animate);
    })();