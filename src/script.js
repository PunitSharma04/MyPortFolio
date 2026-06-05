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