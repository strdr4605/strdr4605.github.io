// Initialize Swiper
const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  slidesPerView: 1,
  speed: 500,
  mousewheel: {
    sensitivity: 1,
    thresholdDelta: 30,
  },
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  on: {
    slideChange: function() {
      // Hide swipe hint after first swipe
      const hint = document.querySelector('.swipe-hint');
      if (hint && this.activeIndex > 0) {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.3s';
      }
    }
  }
});

// Space/Enter to advance
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    swiper.slideNext();
  }
});

// Tap to reveal
document.querySelectorAll('.reveal-container').forEach(container => {
  container.addEventListener('click', () => {
    if (container.dataset.revealed === 'false') {
      container.dataset.revealed = 'true';

      // Animate counters in this container
      container.querySelectorAll('.stat-number').forEach((el, i) => {
        setTimeout(() => {
          animateCounter(el, parseInt(el.dataset.target));
        }, i * 100);
      });

      // Animate bars in this container
      container.querySelectorAll('.bar').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 150);
      });

      // Animate emoji bars
      container.querySelectorAll('.emoji-bar').forEach((bar, i) => {
        setTimeout(() => {
          let width = parseInt(bar.dataset.width);
          // Scale up small percentages for visibility
          if (width < 20) {
            width = width * 10;
          }
          bar.style.width = Math.min(width, 100) + '%';
        }, i * 150);
      });

      // Animate repo bars
      container.querySelectorAll('.repo-bar').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 150);
      });

      // Animate day bars
      container.querySelectorAll('.day-bar').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 100);
      });
    }
  });
});

// Counter animation
function animateCounter(element, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

console.log('Planable Wrapped loaded!');
