document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Toggle Drawer
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      navToggle.classList.toggle('active');
      siteNav.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (siteNav.classList.contains('open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          siteNav.classList.remove('open');
          siteNav.removeAttribute('style');
        }
      });
    });
  }

  // 3. Scroll Reveal (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Command Center Main Tab Switching
  const consoleTabBtns = document.querySelectorAll('.console-tab-btn');
  const consolePanes = document.querySelectorAll('.console-pane');

  consoleTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // Toggle active classes on buttons
      consoleTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Toggle active classes on panes
      consolePanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `pane-${tabId}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // 5. Shadow Ministries Sidebar Navigation
  const minBtns = document.querySelectorAll('.min-btn');
  const minPanes = document.querySelectorAll('.ministry-detail-pane');

  minBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const minId = btn.getAttribute('data-min');
      
      // Toggle active classes on buttons
      minBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Toggle active classes on panes
      minPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `min-${minId}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // 6. District Command: Dynamic Monospace Feed & Command Parser
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-user-input');
  const clearTerminalBtn = document.getElementById('clear-terminal-btn');

  // List of mock log lines to add periodically
  const mockLogs = [
    { type: 'INFO', location: 'Delhi Central', message: 'Core policy assembly convened. Reviewing primary school audit records.' },
    { type: 'SUCCESS', location: 'Patna Central', message: 'Audit scorecard submitted. Regional media coverage confirmed.' },
    { type: 'WARN', location: 'Ranchi North', message: 'Local vocational center audit flagged. Identified funding mismatch.' },
    { type: 'INFO', location: 'Pune West', message: 'Formulating structural alternatives for municipal waste pipelines.' },
    { type: 'SUCCESS', location: 'Chennai South', message: 'District Listening workshop scheduled for 18 local coordinators.' },
    { type: 'WARN', location: 'Srinagar Central', message: 'Temperature tracking active. Tier-2 climate advisory drafted.' },
    { type: 'INFO', location: 'Mumbai Suburbs', message: 'Initiated open data ledger template for local gram panchayats.' }
  ];

  // Helper to add lines to terminal
  function appendTerminalLine(text, tag = 'INFO', location = '') {
    if (!terminalBody) return;
    
    const now = new Date();
    const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    
    let tagClass = 't-info';
    if (tag === 'WARN') tagClass = 't-warn';
    if (tag === 'SUCCESS') tagClass = 't-success';
    if (tag === 'FAIL') tagClass = 't-fail';

    const lineP = document.createElement('p');
    lineP.className = 't-line';
    
    if (location) {
      lineP.innerHTML = `<span class="t-time">${timeStr}</span> <span class="t-tag ${tagClass}">[${tag}]</span> Chapter: <span class="t-location">${location}</span> - ${text}`;
    } else {
      lineP.innerHTML = `<span class="t-time">${timeStr}</span> <span class="t-tag ${tagClass}">[${tag}]</span> ${text}`;
    }
    
    terminalBody.appendChild(lineP);
    
    // Auto-scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Add random log every 8 seconds
  setInterval(() => {
    // Only add if terminal element is rendered and pane is visible/exist
    if (terminalBody && document.querySelector('#pane-district.active')) {
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      appendTerminalLine(randomLog.message, randomLog.type, randomLog.location);
    }
  }, 8000);

  // Command input listener
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        if (!cmd) return;

        appendTerminalLine(`Executing command: ${cmd}`, 'INFO');

        setTimeout(() => {
          if (cmd === 'help') {
            appendTerminalLine('Available commands: status, active, audit, clear', 'INFO');
          } else if (cmd === 'status') {
            appendTerminalLine('SYSTEM: ONLINE. All 28 chapters communicating. Grid density: 100%.', 'SUCCESS');
          } else if (cmd === 'active') {
            appendTerminalLine('Active Hubs: New Delhi, Karnataka (Bangalore), Maharashtra (Mumbai), Bihar (Patna).', 'SUCCESS');
          } else if (cmd === 'audit') {
            appendTerminalLine('Ongoing Audits: Bihar Vocational Mapping (64%), Panchayat Open-Data (91%), Urban Heat advisory (12%).', 'WARN');
          } else if (cmd === 'clear') {
            terminalBody.innerHTML = '';
            appendTerminalLine('Terminal buffer cleared.', 'INFO');
          } else {
            appendTerminalLine(`Command not recognized: "${cmd}". Type "help" for options.`, 'FAIL');
          }
        }, 300);
      }
    });
  }

  if (clearTerminalBtn && terminalBody) {
    clearTerminalBtn.addEventListener('click', () => {
      terminalBody.innerHTML = '';
      appendTerminalLine('Terminal buffer cleared.', 'INFO');
    });
  }

  // 7. Enlistment Portal Form Handler
  const enlistForm = document.getElementById('enlistment-form');
  const formSuccess = document.getElementById('form-success');

  if (enlistForm && formSuccess) {
    enlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform simple animation transition
      enlistForm.style.transition = 'opacity 0.3s ease';
      enlistForm.style.opacity = '0';
      
      setTimeout(() => {
        enlistForm.style.display = 'none';
        formSuccess.style.display = 'flex';
      }, 300);
    });
  }
});
