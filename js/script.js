// ===================================
// Modern Portfolio JavaScript
// ===================================

(function() {
   'use strict';

   // ===================================
   // Mobile Menu Toggle
   // ===================================
   const hamburger = document.getElementById('hamburger');
   const navMenu = document.getElementById('nav-menu');
   const navLinks = document.querySelectorAll('.nav-link');

   if (hamburger) {
      hamburger.addEventListener('click', () => {
         hamburger.classList.toggle('active');
         navMenu.classList.toggle('active');
         document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      });
   }

   // Close menu when clicking on a link
   navLinks.forEach(link => {
      link.addEventListener('click', () => {
         hamburger.classList.remove('active');
         navMenu.classList.remove('active');
         document.body.style.overflow = '';
      });
   });

   // Close menu when clicking outside
   document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
         hamburger.classList.remove('active');
         navMenu.classList.remove('active');
         document.body.style.overflow = '';
      }
   });

   // ===================================
   // Typing Animation
   // ===================================
   const typingText = document.getElementById('typing-text');
   const titles = ['AI/ML Engineer', 'Web Developer', 'Automation Specialist', 'Data Scientist'];
   let titleIndex = 0;
   let charIndex = 0;
   let isDeleting = false;

   function typeText() {
      if (!typingText) return;

      const currentTitle = titles[titleIndex];

      if (isDeleting) {
         typingText.textContent = currentTitle.substring(0, charIndex - 1);
         charIndex--;
      } else {
         typingText.textContent = currentTitle.substring(0, charIndex + 1);
         charIndex++;
      }

      if (!isDeleting && charIndex === currentTitle.length) {
         setTimeout(() => {
            isDeleting = true;
         }, 2000);
      } else if (isDeleting && charIndex === 0) {
         isDeleting = false;
         titleIndex = (titleIndex + 1) % titles.length;
      }

      const typingSpeed = isDeleting ? 50 : 100;
      setTimeout(typeText, typingSpeed);
   }

   // Start typing animation after page load
   if (typingText) {
      setTimeout(typeText, 1000);
   }

   // ===================================
   // Header Scroll Effect
   // ===================================
   const header = document.getElementById('header');
   let lastScroll = 0;

   window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
         header.classList.add('scrolled');
      } else {
         header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
   });

   // ===================================
   // Active Navigation Link
   // ===================================
   const sections = document.querySelectorAll('section[id]');

   function activateNavLink() {
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
         const sectionHeight = section.offsetHeight;
         const sectionTop = section.offsetTop - 100;
         const sectionId = section.getAttribute('id');

         if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
               link.classList.remove('active');
               if (link.getAttribute('href') === `#${sectionId}`) {
                  link.classList.add('active');
               }
            });
         }
      });
   }

   window.addEventListener('scroll', activateNavLink);

   // ===================================
   // Smooth Scrolling
   // ===================================
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));

         if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
               top: offsetPosition,
               behavior: 'smooth'
            });
         }
      });
   });

   // ===================================
   // Scroll to Top Button
   // ===================================
   const scrollTopBtn = document.getElementById('scroll-top');

   window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
         scrollTopBtn.classList.add('visible');
      } else {
         scrollTopBtn.classList.remove('visible');
      }
   });

   if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });
      });
   }

   // ===================================
   // Skills Section Animation
   // ===================================
   const skillTags = document.querySelectorAll('.skill-tag');
   const skillsSection = document.querySelector('.about-skills');

   function animateSkills() {
      if (!skillsSection) return;

      const skillsSectionTop = skillsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (skillsSectionTop < windowHeight - 100) {
         skillTags.forEach((tag, index) => {
            setTimeout(() => {
               tag.style.opacity = '1';
               tag.style.transform = 'translateY(0)';
            }, index * 50);
         });
      }
   }

   // Initialize skill tags with hidden state
   skillTags.forEach(tag => {
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(10px)';
      tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
   });

   window.addEventListener('scroll', animateSkills);
   animateSkills(); // Check on load

   // ===================================
   // Contact Form Handling
   // ===================================
   const contactForm = document.getElementById('contact-form');

   if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
         e.preventDefault();

         const submitBtn = this.querySelector('button[type="submit"]');
         const originalText = submitBtn.innerHTML;
         
         // Disable button and show loading state
         submitBtn.disabled = true;
         submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

         try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
               method: 'POST',
               body: formData,
               headers: {
                  'Accept': 'application/json'
               }
            });

            if (response.ok) {
               // Show success message
               submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
               submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
               this.reset();

               setTimeout(() => {
                  submitBtn.innerHTML = originalText;
                  submitBtn.style.background = '';
                  submitBtn.disabled = false;
               }, 3000);
            } else {
               throw new Error('Form submission failed');
            }
         } catch (error) {
            // Show error message
            submitBtn.innerHTML = '<span>Error! Try Again</span> <i class="fas fa-exclamation-triangle"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

            setTimeout(() => {
               submitBtn.innerHTML = originalText;
               submitBtn.style.background = '';
               submitBtn.disabled = false;
            }, 3000);
         }
      });
   }

   // ===================================
   // Portfolio Item Animation on Scroll
   // ===================================
   const portfolioItems = document.querySelectorAll('.portfolio-item');

   const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
   };

   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
         }
      });
   }, observerOptions);

   portfolioItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
   });

   // ===================================
   // Service Cards Hover Effect
   // ===================================
   const serviceCards = document.querySelectorAll('.service-card');

   serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
         this.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function() {
         this.style.transform = 'translateY(0) scale(1)';
      });
   });

   // ===================================
   // Timeline Animation
   // ===================================
   const timelineItems = document.querySelectorAll('.timeline-item');

   const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
         if (entry.isIntersecting) {
            setTimeout(() => {
               entry.target.style.opacity = '1';
               entry.target.style.transform = 'translateX(0)';
            }, index * 200);
         }
      });
   }, {
      threshold: 0.2
   });

   timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      timelineObserver.observe(item);
   });

   // ===================================
   // Parallax Effect for Home Section
   // ===================================
   const homeImage = document.querySelector('.home-image');
   const homeContent = document.querySelector('.home-content');

   if (homeImage && homeContent) {
      window.addEventListener('scroll', () => {
         const scrolled = window.pageYOffset;
         const rate = scrolled * 0.5;

         if (scrolled < window.innerHeight) {
            homeImage.style.transform = `translateY(${rate}px)`;
            homeContent.style.transform = `translateY(${rate * 0.3}px)`;
         }
      });
   }

   // ===================================
   // Counter Animation for Stats
   // ===================================
   const statNumbers = document.querySelectorAll('.stat-item h3');
   const statsSection = document.querySelector('.home-stats');

   function animateCounters() {
      if (!statsSection) return;

      const statsTop = statsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (statsTop < windowHeight && statsTop > -200) {
         statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            if (target && !stat.classList.contains('counted')) {
               stat.classList.add('counted');
               let current = 0;
               const increment = target / 50;
               const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                     stat.textContent = stat.textContent.replace(/\d+/, target);
                     clearInterval(timer);
                  } else {
                     stat.textContent = stat.textContent.replace(/\d+/, Math.floor(current));
                  }
               }, 30);
            }
         });
      }
   }

   window.addEventListener('scroll', animateCounters);
   animateCounters(); // Check on load

   // ===================================
   // Initialize AOS on load
   // ===================================
   window.addEventListener('load', () => {
      if (typeof AOS !== 'undefined') {
         AOS.refresh();
      }
   });

   // ===================================
   // Preloader (Optional - can be added if needed)
   // ===================================
   window.addEventListener('load', () => {
      document.body.classList.add('loaded');
   });

   console.log('Portfolio website loaded successfully! 🚀');

})();
