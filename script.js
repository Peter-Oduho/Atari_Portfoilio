
// JavaScript to power click / keyboard / modal features
  (function () {
    const circle = document.querySelector('.circle');
    const img = circle.querySelector('img');
    const modal = document.getElementById('imgModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    // Open modal function
    function openModal() {
      modalImage.src = img.src;                 // use same image (could use a hi-res src)
      modalImage.alt = img.alt || 'Preview image';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      // put keyboard focus on close button for accessibility
      setTimeout(() => modalClose.focus(), 50);
      // prevent page scroll while modal is open
      document.documentElement.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modalImage.src = '';
      document.documentElement.style.overflow = '';
      // return focus to the thumbnail
      circle.focus();
    }

    // Click or Enter/Space to open
    circle.addEventListener('click', openModal);
    circle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        openModal();
      }
    });

    // Close on overlay click (but not when clicking the inner image)
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target === modalClose) closeModal();
    });

    // Close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // Optional: close when the image finishes loading if you'd like to auto-close (usually not)
    modalImage.addEventListener('error', () => {
      // If the modal image fails, close modal and optionally show a message
      closeModal();
      console.warn('Modal image failed to load.');
    });

    // Prevent accidental drag of the image on mobile
    img.addEventListener('dragstart', (e) => e.preventDefault());
  })();
document.addEventListener('DOMContentLoaded', function () {

  // Reveal Animation
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Theme Switch
  const lightBtn = document.getElementById('lightBtn');
  const darkBtn = document.getElementById('darkBtn');

  function setLight() {
    document.documentElement.style.setProperty('--text', '#0b1220');
    document.documentElement.style.setProperty('--muted', 'rgba(11,17,28,0.75)');
    document.body.style.background = '#f6f8fb';
  }

  function setDark() {
    document.documentElement.style.setProperty('--text', 'rgba(255,255,255,0.96)');
    document.documentElement.style.setProperty('--muted', 'rgba(255,255,255,0.75)');
    document.body.style.background = '';
  }

  lightBtn.addEventListener('click', setLight);
  darkBtn.addEventListener('click', setDark);

  // CTA Buttons
  document.getElementById('primaryCta').addEventListener('click', () => {
    alert('Primary CTA clicked — hook this to your signup flow!');
  });

  document.getElementById('secondaryCta').addEventListener('click', () => {
    document.querySelector('.more').scrollIntoView({ behavior: 'smooth' });
  });

  // Contact Form Submit
  function submitForm(event) {
    event.preventDefault();
    alert('Message sent successfully!');
  }

  window.submitForm = submitForm;
});
