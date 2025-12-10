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
