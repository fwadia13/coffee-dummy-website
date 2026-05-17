// ========================================
//   THE COPPER KETTLE — JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ------- MOBILE NAV TOGGLE -------
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  // ------- STICKY HEADER SHADOW -------
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 24px rgba(26,15,7,0.6)';
    } else {
      header.style.boxShadow = 'none';
    }
  });


  // ------- MENU TABS -------
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const menuGrids = document.querySelectorAll('.menu-grid');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show correct grid
      const target = btn.dataset.tab;
      menuGrids.forEach(grid => {
        if (grid.id === `tab-${target}`) {
          grid.classList.remove('hidden');
          // Animate cards in
          grid.querySelectorAll('.menu-card').forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 60);
          });
        } else {
          grid.classList.add('hidden');
        }
      });
    });
  });


  // ------- SCROLL REVEAL -------
  const revealEls = document.querySelectorAll(
    '.menu-card, .testimonial, .gallery-item, .story-text, .story-visual, ' +
    '.contact-detail, .contact-form-wrap, .section-header, .stat'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings a little
        const siblings = Array.from(entry.target.parentElement.children);
        const index    = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ------- ACTIVE NAV LINK ON SCROLL -------
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${entry.target.id}`) {
            a.style.color = 'var(--copper)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  // ------- CONTACT FORM -------
  const sendBtn     = document.getElementById('sendBtn');
  const formSuccess = document.getElementById('formSuccess');
  const nameInput   = document.getElementById('name');
  const emailInput  = document.getElementById('email');
  const msgInput    = document.getElementById('message');

  sendBtn.addEventListener('click', () => {
    const name  = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg   = msgInput.value.trim();

    // Simple validation
    if (!name || !email || !msg) {
      shake(sendBtn);
      showError('Please fill in all fields.');
      return;
    }
    if (!isValidEmail(email)) {
      shake(sendBtn);
      showError('Please enter a valid email address.');
      return;
    }

    // Success
    sendBtn.textContent = 'Sending...';
    sendBtn.disabled    = true;

    setTimeout(() => {
      nameInput.value  = '';
      emailInput.value = '';
      msgInput.value   = '';
      sendBtn.textContent = 'Send Message';
      sendBtn.disabled    = false;
      formSuccess.classList.remove('hidden');
      setTimeout(() => formSuccess.classList.add('hidden'), 4000);
    }, 1200);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(msg) {
    const existing = document.querySelector('.form-error');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'form-error';
    err.textContent = msg;
    err.style.cssText = 'color: #a0392e; font-size: 0.82rem; margin-top: 0.6rem; font-family: var(--ff-label);';
    sendBtn.insertAdjacentElement('afterend', err);
    setTimeout(() => err.remove(), 3000);
  }

  function shake(el) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.4s ease';
    el.addEventListener('animationend', () => el.style.animation = '', { once: true });
  }

  // Inject shake keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);


  // ------- GALLERY ITEM HOVER TILT -------
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      item.style.transform = `scale(1.02) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  console.log('☕ The Copper Kettle — Est. 1923. Welcome!');
});
