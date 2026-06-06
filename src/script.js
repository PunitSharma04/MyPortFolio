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

// if (window.matchMedia("(pointer: coarse)").matches) {
//   // Touch device — skip everything
// } else{
//   // ── Matrix Text Reveal on Mouse Follower ──

// const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩアイウエオカキクケコ';

// // Build a full-screen canvas of random encrypted characters
// const canvas = document.createElement('canvas');
// canvas.id = 'matrix-canvas';
// Object.assign(canvas.style, {
//   position: 'fixed',
//   top: '0',
//   left: '0',
//   width: '100%',
//   height: '100%',
//   pointerEvents: 'none',
//   zIndex: '0',
//   opacity: '0',            // hidden by default — revealed by mask
// });
// document.body.prepend(canvas);

// const ctx = canvas.getContext('2d');
// const FONT_SIZE = 14;
// let cols, rows, grid = [];

// function resizeCanvas() {
//   canvas.width  = window.innerWidth;
//   canvas.height = window.innerHeight;
//   cols = Math.ceil(canvas.width  / FONT_SIZE);
//   rows = Math.ceil(canvas.height / FONT_SIZE);
//   grid = Array.from({ length: cols * rows }, () => randomChar());
// }

// function randomChar() {
//   return CHARS[Math.floor(Math.random() * CHARS.length)];
// }

// // Scramble a random portion of chars each frame for "live" effect
// function scrambleGrid() {
//   const count = Math.floor(cols * rows * 0.03); // scramble 3% per frame
//   for (let i = 0; i < count; i++) {
//     const idx = Math.floor(Math.random() * grid.length);
//     grid[idx] = randomChar();
//   }
// }

// function drawMatrix() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.font = `${FONT_SIZE}px monospace`;

//   for (let c = 0; c < cols; c++) {
//     for (let r = 0; r < rows; r++) {
//       const char = grid[c + r * cols];

//       // Give each character a slightly different green/cyan shade
//       const hue  = 140 + Math.floor((c * r) % 60);   // 140–200 = green to cyan
//       const light = 45 + Math.floor((c + r) % 30);   // brightness variation
//       ctx.fillStyle = `hsl(${hue}, 100%, ${light}%)`;

//       ctx.fillText(char, c * FONT_SIZE, r * FONT_SIZE + FONT_SIZE);
//     }
//   }
// }

// window.addEventListener('resize', resizeCanvas);
// resizeCanvas();

// // ── Mouse follower (the reveal mask circle) ──
// const follower = document.getElementById('mouse-follower');
// let mouseX = window.innerWidth  / 2;
// let mouseY = window.innerHeight / 2;
// let currentX = mouseX, currentY = mouseY;
// let hasHovered = false;

// document.addEventListener('mousemove', (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
//   hasHovered = true;
// });
// document.addEventListener('mouseleave', () => follower.style.opacity = '0');
// document.addEventListener('mouseenter', () => follower.style.opacity = '1');

// function lerp(a, b, t) { return a + (b - a) * t; }

// // ── CSS mask on the canvas so text only shows inside the circle ──
// function updateMask(x, y) {
//   const r = 220; // reveal radius in px
//   canvas.style.webkitMaskImage =
//   canvas.style.maskImage =
//     `radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, black 60%, transparent 100%)`;
//   canvas.style.opacity = '1';
// }

// (function animate() {
//   if (mouseX !== null) {
//     currentX = lerp(currentX, mouseX, 0.10);
//     currentY = lerp(currentY, mouseY, 0.10);
//   }

//   follower.style.transform =
//     `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

//   scrambleGrid();
//   drawMatrix();

//   // Only show mask after first hover
//   if (hasHovered) {
//     updateMask(currentX, currentY);
//   } else {
//     canvas.style.opacity = '0';  // fully hidden until mouse enters
//   }

//   requestAnimationFrame(animate);
// })();
// }


if (window.matchMedia('(pointer: coarse)').matches) {
  // Touch device — skip everything
} else {

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

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasHovered = true;
  });
  document.addEventListener('mouseleave', () => follower.style.opacity = '0');
  document.addEventListener('mouseenter', () => follower.style.opacity = '1');

  function lerp(a, b, t) { return a + (b - a) * t; }

  function updateMask(x, y) {
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