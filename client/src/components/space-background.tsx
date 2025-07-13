import { useEffect } from "react";

export function SpaceBackground() {
  useEffect(() => {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;

    // Clear existing stars
    starsContainer.innerHTML = "";

    // Create 100 stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 2 + "s";
      starsContainer.appendChild(star);
    }
  }, []);

  return <div className="stars" id="stars" />;
}
