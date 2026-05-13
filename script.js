// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle?.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('nav-open'));
});

// Booking form submission
const form = document.getElementById('bookingForm');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = Object.fromEntries(new FormData(form));

  // Formspree endpoint — replace XXXXXXXX with your Formspree form ID
  // Get free at formspree.io — takes 2 minutes, sends to your email
  const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      form.innerHTML = `
        <div class="form-success">
          <div style="font-size:2.5rem;margin-bottom:16px">✅</div>
          <h3>Request Received.</h3>
          <p>I'll reach out within 24 hours to confirm your strategy call. Check your email — ${data.email}</p>
        </div>
      `;
    } else {
      throw new Error('Submission failed');
    }
  } catch {
    btn.textContent = 'Request My Free Strategy Call';
    btn.disabled = false;
    alert('Something went wrong. Please call directly: 1-800-383-5393');
  }
});

// Smooth scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
