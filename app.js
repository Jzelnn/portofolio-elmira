/**
 * Main Application Logic for Elmira Jacinda Wahid's Portfolio
 * Handles:
 * - Live fetching from GitHub API with intelligent fallback
 * - Merging live data with local curated details (supporting offline-only/private resume projects)
 * - Dynamic card rendering with dates, roles, project screenshots, and entrance animations
 * - Interactive Glassmorphic Modal details drawer on project card click
 * - Real-time filtering and searching
 * - Interactive UI states (mobile menu, sticky nav, scroll reveals)
 * - Contact form simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- UI Elements ---
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const toggleIcon = document.getElementById('toggle-icon');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const projectsGrid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('project-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback-message');
  const btnSubmit = document.getElementById('btn-submit-form');

  // --- Modal UI Elements ---
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-project-img');
  const modalTitle = document.getElementById('modal-project-title');
  const modalMeta = document.getElementById('modal-project-meta');
  const modalDetails = document.getElementById('modal-project-details');
  const modalFeatures = document.getElementById('modal-project-features');
  const modalTags = document.getElementById('modal-project-tags');
  const modalBadge = document.getElementById('modal-project-badge');
  const modalBtnGithub = document.getElementById('modal-btn-github');
  const modalBtnDemo = document.getElementById('modal-btn-demo');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  let allProjects = []; // Store merged projects list

  // --- Initialize Lucide Icons ---
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================================================
  // NAVIGATION & MOBILE MENU LOGIC
  // ==========================================================================
  
  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    toggleIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
  });

  // Close Mobile Menu on Nav Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // Active Link Highlighter on Scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120; // Offset for header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Scroll Reveals Animation: Handled via high-performance IntersectionObserver in index.html

  // ==========================================================================
  // GITHUB API & DATA INTEGRATION LOGIC
  // ==========================================================================

  /**
   * Fetch public repositories from Jzelnn's GitHub profile.
   */
  async function fetchGitHubRepos() {
    try {
      const response = await fetch('https://api.github.com/users/Jzelnn/repos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const rawRepos = await response.json();
      return rawRepos;
    } catch (e) {
      console.warn("Failed to fetch live GitHub repos. Using local mock fallback.", e);
      return null;
    }
  }

  /**
   * Merge live GitHub API data with local curated details.
   * Handles local-only projects (like Movie Rental System) which are in the resume
   * but not public on GitHub yet.
   */
  function mergeProjectData(gitRepos) {
    const processedProjects = [];
    const matchedCuratedKeys = new Set();

    // Map lowercase key strings to their original-cased CURATED_PROJECTS keys
    const curatedKeysMap = {};
    Object.keys(CURATED_PROJECTS).forEach(key => {
      curatedKeysMap[key.toLowerCase()] = key;
    });

    if (gitRepos) {
      // 1. Process projects returned by the GitHub API
      gitRepos.forEach(repo => {
        const repoNameLower = repo.name.toLowerCase();
        // Skip displaying the portfolio website project itself in the projects grid
        if (repoNameLower === 'portofolio-elmira' || repoNameLower === 'portofolio' || repoNameLower === 'porto1') {
          return;
        }
        const originalKey = curatedKeysMap[repoNameLower];
        const local = originalKey ? CURATED_PROJECTS[originalKey] : null;
        
        if (local) {
          matchedCuratedKeys.add(originalKey);
          processedProjects.push({
            name: repo.name,
            displayName: local.displayName,
            date: local.date,
            role: local.role,
            image: local.image,
            description: local.brief,
            details: local.details,
            features: local.features,
            language: repo.language || local.tech[0],
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            html_url: repo.html_url,
            demo_url: local.demoUrl,
            tech: local.tech,
            icon: local.icon,
            isCurated: true,
            isLocalOnly: false
          });
        } else {
          // Fallback for any repository without local curated data
          processedProjects.push({
            name: repo.name,
            displayName: repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            date: "",
            role: "Developer",
            image: "",
            description: repo.description || "A software development repository managed on GitHub.",
            details: repo.description || "Software development project.",
            features: ["Structured Git version control", "Modular code organization"],
            language: repo.language || "HTML",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            html_url: repo.html_url,
            demo_url: "#",
            tech: repo.language ? [repo.language] : ["Web"],
            icon: "code",
            isCurated: false,
            isLocalOnly: false
          });
        }
      });
    }

    // 2. Add all local curated projects that were NOT returned by the GitHub API (e.g., Movie Rental System)
    Object.keys(CURATED_PROJECTS).forEach(key => {
      if (!matchedCuratedKeys.has(key)) {
        const local = CURATED_PROJECTS[key];
        processedProjects.push({
          name: key,
          displayName: local.displayName,
          date: local.date,
          role: local.role,
          image: local.image,
          description: local.brief,
          details: local.details,
          features: local.features,
          language: local.tech[0],
          stars: 0,
          forks: 0,
          html_url: local.githubUrl || `https://github.com/Jzelnn/${key}`,
          demo_url: local.demoUrl,
          tech: local.tech,
          icon: local.icon,
          isCurated: true,
          isLocalOnly: true
        });
      }
    });

    // Sort projects: local-only or highly curated ones first
    return processedProjects.sort((a, b) => {
      if (a.isCurated && !b.isCurated) return -1;
      if (!a.isCurated && b.isCurated) return 1;
      return 0;
    });
  }

  /**
   * Check if a project belongs to a filter category
   */
  function matchesCategory(project, filter) {
    if (filter === 'all') return true;
    
    const tags = project.tech.map(t => t.toLowerCase());
    const lang = project.language ? project.language.toLowerCase() : '';

    if (filter === 'ai-python') {
      return lang === 'python' || tags.includes('nlp') || tags.includes('generative ai') || tags.includes('pytorch') || tags.includes('transformers') || tags.includes('image processing') || tags.includes('speech analysis') || tags.includes('machine learning basics');
    }
    if (filter === 'web-ts') {
      return lang === 'typescript' || lang === 'javascript' || tags.includes('react') || tags.includes('typescript') || tags.includes('javascript') || tags.includes('lovable platform');
    }
    if (filter === 'backend') {
      return lang === 'php' || lang === 'java' || tags.includes('mysql') || tags.includes('database integration') || tags.includes('firebase') || tags.includes('android studio') || tags.includes('oop');
    }
    if (filter === 'docs') {
      return lang === 'markdown' || lang === '' || tags.includes('markdown') || tags.includes('technical writing');
    }
    return false;
  }

  /**
   * Render projects to grid
   */
  function renderProjects(projectsToRender) {
    projectsGrid.innerHTML = '';

    if (projectsToRender.length === 0) {
      projectsGrid.innerHTML = `
        <div class="no-projects" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
          <i data-lucide="folder-open" style="width: 48px; height: 48px; margin-bottom: 15px; color: var(--color-indigo);"></i>
          <p>No projects found matching your search query or selected filter.</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    projectsToRender.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.style.animation = `fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`;
      
      const techTagsHTML = project.tech
        .slice(0, 3) // Limit to 3 tags in cards for perfect sizing
        .map(t => `<span class="project-tag">${t}</span>`)
        .join('');

      // Dynamic Badge based on live vs local status (made clickable directly to GitHub)
      const badgeHTML = project.isLocalOnly 
        ? `<span class="github-badge" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.25); color: #d8b4fe;">Featured</span>`
        : `<a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="github-badge clickable-badge" title="Open GitHub Code" style="text-decoration: none; cursor: pointer;"><img src="image/github.png" alt="GitHub">GitHub Live</a>`;

      // Set fallback unsplash visual matching the project
      const unsplashUrl = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop`;

      card.innerHTML = `
        <div class="project-img-wrapper">
          <img src="${project.image || ''}" alt="${project.displayName}" class="project-card-img" onerror="this.src='${unsplashUrl}'">
        </div>
        <div class="card-top">
          <div class="card-header-icon">
            <div class="project-icon-wrapper">
              <i data-lucide="${project.icon}"></i>
            </div>
            ${badgeHTML}
          </div>
          <h3 class="project-title">${project.displayName}</h3>
          ${project.date ? `<span class="project-meta-details">${project.date} &bull; ${project.role}</span>` : ''}
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">${techTagsHTML}</div>
        </div>
        <div class="card-footer">
          <div class="card-stats">
            <span class="stat-item" title="GitHub Stars">
              <i data-lucide="star"></i>
              <span>${project.stars}</span>
            </span>
            <span class="stat-item" title="GitHub Forks">
              <i data-lucide="git-fork"></i>
              <span>${project.forks}</span>
            </span>
          </div>
          <div class="card-links">
            <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="card-link" title="Open GitHub Code" aria-label="GitHub Code">
              <img src="image/github.png" alt="GitHub">
            </a>
            ${project.demo_url !== '#' ? `
            <a href="${project.demo_url}" target="_blank" rel="noopener noreferrer" class="card-link" title="Open Live Demo" aria-label="Live Demo">
              <i data-lucide="external-link"></i>
            </a>
            ` : ''}
          </div>
        </div>
      `;

      // Click card opens details Modal, EXCEPT if clicking links/badges
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('.card-link') || e.target.closest('.clickable-badge')) {
          return;
        }
        openProjectModal(project);
      });

      projectsGrid.appendChild(card);
    });

    // Re-trigger Lucide icon replacement for dynamic code
    lucide.createIcons();
  }

  // ==========================================================================
  // PREMIUM MODAL BOX POPUP LOGIC
  // ==========================================================================
  
  function openProjectModal(project) {
    modalTitle.textContent = project.displayName;
    modalMeta.innerHTML = project.date ? `${project.date} &bull; ${project.role}` : 'Developer';
    modalDetails.textContent = project.details;
    
    // Set Visual Modal Image
    const unsplashUrl = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop`;
    modalImg.src = project.image || '';
    modalImg.onerror = function() {
      this.src = unsplashUrl;
    };
    
    // Features list
    modalFeatures.innerHTML = project.features
      .map(feat => `
        <li style="gap: 12px; align-items: flex-start; display: flex;">
          <i data-lucide="check-circle-2" style="color: var(--color-purple); width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px;"></i>
          <span style="font-size: 0.95rem; color: var(--text-muted);">${feat}</span>
        </li>
      `)
      .join('');
      
    // Tech tags
    modalTags.innerHTML = project.tech
      .map(t => `<span class="project-tag">${t}</span>`)
      .join('');
      
    // Badge status
    if (project.isLocalOnly) {
      modalBadge.className = 'github-badge';
      modalBadge.style.background = 'rgba(168, 85, 247, 0.08)';
      modalBadge.style.borderColor = 'rgba(168, 85, 247, 0.25)';
      modalBadge.style.color = '#d8b4fe';
      modalBadge.innerHTML = 'Featured Project';
    } else {
      modalBadge.className = 'github-badge';
      modalBadge.style.background = '';
      modalBadge.style.borderColor = '';
      modalBadge.style.color = '';
      modalBadge.innerHTML = '<img src="image/github.png" alt="GitHub"> GitHub Live';
    }
    
    // Links buttons
    modalBtnGithub.href = project.html_url;
    
    if (project.demo_url !== '#') {
      modalBtnDemo.style.display = 'inline-flex';
      modalBtnDemo.href = project.demo_url;
    } else {
      modalBtnDemo.style.display = 'none';
    }
    
    // Show Modal with slide animation
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock main page scroll
    
    // Re-trigger Lucide icons inside modal
    lucide.createIcons();
  }
  
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Unlock scroll
  }
  
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // ==========================================================================
  // FILTERS & SEARCH CONTROL INTEGRATIONS
  // ==========================================================================

  /**
   * Filter and search implementation
   */
  function handleFilterAndSearch() {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

    const filtered = allProjects.filter(project => {
      const matchesCat = matchesCategory(project, activeFilter);
      
      const matchesSearch = 
        project.displayName.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery) ||
        project.tech.some(t => t.toLowerCase().includes(searchQuery)) ||
        (project.language && project.language.toLowerCase().includes(searchQuery));

      return matchesCat && matchesSearch;
    });

    renderProjects(filtered);
  }

  // Smooth scroll offset helper to prevent scrolling too far up (under the sticky header)
  function scrollToProjectsHeader() {
    const controls = document.querySelector('.projects-controls');
    if (controls) {
      const offset = 95; // Account for the sticky header height (70px scrolled) + 25px gap
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = controls.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // --- Filter Button Event Listeners ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      handleFilterAndSearch();
      // Smoothly align the projects header
      setTimeout(scrollToProjectsHeader, 50); // Small timeout to let the grid redraw first
    });
  });

  // --- Search Input Listener ---
  searchInput.addEventListener('input', handleFilterAndSearch);

  // Prevent default Enter behavior and align search controls under navbar
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      scrollToProjectsHeader();
    }
  });

  // --- Main Initialization ---
  async function init() {
    // 1. Fetch live repos
    const gitRepos = await fetchGitHubRepos();
    
    // 2. Merge with local data
    allProjects = mergeProjectData(gitRepos);
    
    // 3. Render
    renderProjects(allProjects);
  }

  // Run initial load
  init();

  // ==========================================================================
  // CONTACT FORM LOGIC (Sleek Toast Simulations)
  // ==========================================================================
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI state loading
    btnSubmit.disabled = true;
    const originalBtnText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = `
      <span>Sending...</span>
      <div class="spinner" style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: float 1s infinite linear;"></div>
    `;

    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    // Construct form data for Web3Forms API
    const formData = {
      access_key: "86f96165-eb71-46ed-9c3f-45bf743bb4c8", // Ganti dengan Access Key Web3Forms milikmu
      name: name,
      email: email,
      subject: `Portfolio Contact: ${subject}`,
      message: message,
      from_name: name
    };

    // Ensure feedback element is visible
    formFeedback.style.display = 'block';

    try {
      // If the access key is still the default placeholder, fallback to simulation for demo/testing
      if (formData.access_key === "YOUR_WEB3FORMS_ACCESS_KEY" || formData.access_key.trim() === "") {
        console.warn("Web3Forms Access Key is not configured yet. Running offline simulation.");
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to submit");
        }
      }

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i data-lucide="check-circle-2"></i>
          <span>Hi ${name}! Your message has been sent successfully. Thank you!</span>
        </div>
      `;
      contactForm.reset();
    } catch (err) {
      console.error("Form Submission Error:", err);
      formFeedback.className = 'form-feedback error';
      formFeedback.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i data-lucide="alert-triangle"></i>
          <span>Sorry, an error occurred while sending your message. Please try again.</span>
        </div>
      `;
    }

    // Reset button state
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = originalBtnText;
    
    // Trigger Lucide on feedback icon
    lucide.createIcons();

    // Fade out feedback message after 6 seconds
    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 6000);
  });
});
