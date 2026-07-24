


document.addEventListener('DOMContentLoaded', () => {
  'use strict';


  /* ==========================================================================
   Highlight Active Navigation Link Automatically Based on Current Page
   ========================================================================== */
  const initActiveNavLink = () => {
  // ১. বর্তমান পেজের ফাইল নেম বের করুন (যেমন: 'products.html')
  const fullPath = window.location.pathname;

  let currentPage = fullPath.substring(fullPath.lastIndexOf('/') + 1);


  // যদি রুট ডোমেইনে থাকে (যেমন: http://site.com/) তবে সেটিকে index.html ধরে নিন
  // if (currentPage === '' || currentPage === '/') {
  //   currentPage = 'index.html';
  // }
  
  console.log(currentPage)
  // ২. নেভবারের সবকটি লিংক সিলেক্ট করুন
  const navLinks = document.querySelectorAll('.navbar-luxury .nav-link');

  navLinks.forEach(link => {
    // আগের বিদ্যমান active এবং gold-text ক্লাস রিমুভ করুন
    link.classList.remove('active', 'gold-text');

    // লিংকের href অ্যার্টিবিউট বের করুন
    const linkHref = link.getAttribute('href');

    // বর্তমান পেজের সাথে লিংকের URL মিলে গেলে 'active' এবং 'gold-text' ক্লাস অ্যাড করুন
    if (linkHref === currentPage) {
      link.classList.add('active', 'gold-text');
    }
  });
};

  /* ==========================================================================
     1. Current Date and Time
     ========================================================================== */
  const initDateTimeDisplay = () => {
    const dateTimeContainer = document.getElementById('currentDateTime');
    if (!dateTimeContainer) return;

    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      dateTimeContainer.textContent = now.toLocaleDateString('en-US', options);
    };

    updateDateTime();
    setInterval(updateDateTime, 1000);
  };

  /* ==========================================================================
     2. Add to Cart Success Modal
     ========================================================================== */
  const initAddToCartModal = () => {
    const cartButtons = document.querySelectorAll('.js-open-cart-modal');
    const modalElement = document.getElementById('addToCartSuccessModal');

    if (!cartButtons.length || !modalElement) return;

    // Utilize Bootstrap Modal Instance (assumes Bootstrap 5 JS bundle is loaded)
    let cartModal;
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      cartModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    }

    const modalProductName = document.getElementById('modalProductName');

    cartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = button.getAttribute('data-product') || 'Selected Item';

        if (modalProductName) {
          modalProductName.textContent = productName;
        }

        if (cartModal) {
          cartModal.show();
        }
      });
    });
  };

  /* ==========================================================================
     3. Contact Form Validation
     ========================================================================== */
  const initContactFormValidation = () => {
    const contactForm = document.getElementById('contactForm');
    const successAlert = document.getElementById('contactSuccessAlert');
    const closeAlertBtn = document.getElementById('closeAlertBtn');

    if (closeAlertBtn && successAlert) {
      closeAlertBtn.addEventListener('click', () => {
        successAlert.classList.add('d-none');
        successAlert.classList.remove('d-flex');
      });
    }

    if (!contactForm) return;

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');

      // Regular Expression Rules
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}$/;

      let isCustomValid = true;

      // Validate Email Format
      if (emailInput) {
        if (!emailRegex.test(emailInput.value.trim())) {
          emailInput.setCustomValidity('Invalid');
          isCustomValid = false;
        } else {
          emailInput.setCustomValidity('');
        }
      }

      // Validate Phone Format
      if (phoneInput) {
        if (!phoneRegex.test(phoneInput.value.trim())) {
          phoneInput.setCustomValidity('Invalid');
          isCustomValid = false;
        } else {
          phoneInput.setCustomValidity('');
        }
      }

      if (!contactForm.checkValidity() || !isCustomValid) {
        contactForm.classList.add('was-validated');
      } else {
        contactForm.classList.remove('was-validated');
        contactForm.reset();

        // Display Success Alert
        if (successAlert) {
          successAlert.classList.remove('d-none');
          successAlert.classList.add('d-flex');

          window.scrollTo({
            top: successAlert.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    }, false);
  };

  /* ==========================================================================
     4. Smooth Scroll
     ========================================================================== */
  const initSmoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  /* ==========================================================================
     5. Back To Top Button
     ========================================================================== */
  const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.classList.remove('show');
        backToTopBtn.style.display = 'none';
      }
    };

    window.addEventListener('scroll', toggleBackToTop);

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  /* ==========================================================================
     6. Mobile Navbar Close on Click
     ========================================================================== */
  const initMobileNavbarClose = () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');

    if (!navbarCollapse) return;

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Do not close collapse if toggling a dropdown menu
        if (link.classList.contains('dropdown-toggle')) return;

        if (navbarCollapse.classList.contains('show')) {
          if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          } else {
            navbarCollapse.classList.remove('show');
          }
        }
      });
    });
  };

  /* ==========================================================================
     Initialize All Modules
     ========================================================================== */
  initActiveNavLink();
  initDateTimeDisplay();
  initAddToCartModal();
  initContactFormValidation();
  initSmoothScroll();
  initBackToTop();
  initMobileNavbarClose();

});