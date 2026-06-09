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




if (window.matchMedia('(pointer: coarse)').matches) {
  // Touch device — skip everything
} else {
  
const hero = document.getElementById("hero");

  const SOURCE_TEXT = `Hi , I'm Punit Sharma — ECE student at NIT Warangal, MERN dev, interned at Samsung, working at DP World. I build, I solve , I ship. Click Profile to know more. `;

  const FONT_SIZE = 14;
  const LINE_HEIGHT = 22;
  const RADIUS = 100; // ← change this one number to resize the circle
  let scrollY = 0;

  // ── Create canvas ──
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none',
    zIndex: '0',
    opacity: '0',
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // ── Draw text word-wrapped inside the circle, repeating when it ends ──
  function drawMatrix(cx, cy) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${FONT_SIZE}px monospace`;

  const startX = cx - RADIUS + 10;
  const endY   = cy + RADIUS - 10;
  const charsPerLine = Math.floor((RADIUS * 2 - 20) / (FONT_SIZE * 0.605));

  // Build enough wrapped lines to always fill circle + scroll buffer
  const totalLines = Math.ceil((RADIUS * 2) / LINE_HEIGHT) + 2;
  const allLines = [];
  let charIndex = 0;

  for (let l = 0; l < totalLines * 3; l++) {
    let line = '';
    let lastSpace = -1;
    for (let i = 0; i < charsPerLine; i++) {
      const ch = SOURCE_TEXT[charIndex % SOURCE_TEXT.length];
      if (ch === ' ') lastSpace = i;
      line += ch;
      charIndex++;
    }
    if (lastSpace > 0) {
      const overflow = line.length - lastSpace - 1;
      line = line.slice(0, lastSpace);
      charIndex -= overflow;
    }
    allLines.push(line);
  }

  // Scroll offset in pixels — smooth float
  const offset = scrollY % (allLines.length * LINE_HEIGHT);
  const startLineIndex = Math.floor(offset / LINE_HEIGHT);
  const pixelOffset = offset % LINE_HEIGHT;

  for (let i = 0; i < totalLines + 1; i++) {
    const lineIndex = (startLineIndex + i) % allLines.length;
    const line = allLines[lineIndex];
    const y = cy - RADIUS + 10 + (i * LINE_HEIGHT) - pixelOffset;
    if (y > endY + LINE_HEIGHT) continue;

    let x = startX;
    for (let j = 0; j < line.length; j++) {
      const hue   = 140 + ((j * 3) % 60);
      const light = 45  + (j % 25);
      ctx.fillStyle = `hsl(${hue}, 100%, ${light}%)`;
      ctx.fillText(line[j], x, y);
      x += FONT_SIZE * 0.605;
    }
  }
}

  // ── Mouse follower ──
  const follower = document.getElementById('mouse-follower');
  let mouseX = null, mouseY = null;
  let currentX = 0, currentY = 0;
  let hasHovered = false;

  hero.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasHovered = true;
  });
  hero.addEventListener('mouseleave', () => follower.style.opacity = '0');
  hero.addEventListener('mouseenter', () => follower.style.opacity = '1');

  function lerp(a, b, t) { return a + (b - a) * t; }

  function updateMask(x, y) {
  const heroRect = hero.getBoundingClientRect();
  
  // If current position is outside hero, hide everything
  if (x < heroRect.left || x > heroRect.right || y < heroRect.top || y > heroRect.bottom) {
    canvas.style.opacity = '0';
    follower.style.opacity = '0';
    return;
  }

  canvas.style.webkitMaskImage =
  canvas.style.maskImage =
    `radial-gradient(circle ${RADIUS}px at ${x}px ${y}px, black 0%, black 65%, transparent 100%)`;
  canvas.style.opacity = '1';
}

  (function animate() {
    if (mouseX !== null) {
      currentX = lerp(currentX, mouseX, 0.10);
      currentY = lerp(currentY, mouseY, 0.10);
    }

    follower.style.transform =
      `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

    if (hasHovered) scrollY += 1; // ← speed: lower = slower, higher = faster
drawMatrix(currentX, currentY);

    if (hasHovered) {
      updateMask(currentX, currentY);
    } else {
      canvas.style.opacity = '0';
    }

    requestAnimationFrame(animate);
  })();

}

const architectureModal = document.getElementById("architectureModal");
const videoTubeImage = document.getElementById("videoTubeImage");
const closeArchitectureModal = document.getElementById("closeArchitectureModal");

videoTubeImage.addEventListener("click", (e) => {
  e.preventDefault();
  architectureModal.classList.remove("hidden");
  architectureModal.classList.add("flex");
});

closeArchitectureModal.addEventListener("click", () => {
  architectureModal.classList.remove("flex");
  architectureModal.classList.add("hidden");
});

architectureModal.addEventListener("click", (e) => {
  if (e.target === architectureModal) {
    architectureModal.classList.remove("flex");
    architectureModal.classList.add("hidden");
  }
});

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));