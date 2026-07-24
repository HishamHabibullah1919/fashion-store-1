
  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successAlert = document.getElementById('contactSuccessAlert');
    const closeAlertBtn = document.getElementById('closeAlertBtn');

    if (closeAlertBtn && successAlert) {
      closeAlertBtn.addEventListener('click', () => {
        successAlert.classList.add('d-none');
        successAlert.classList.remove('d-flex');
      });
    }

    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');

        // Regex Validations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}$/;

        let isValid = true;

        // Custom validation check for Email format
        if (emailInput && !emailRegex.test(emailInput.value.trim())) {
          emailInput.setCustomValidity('Invalid');
          isValid = false;
        } else if (emailInput) {
          emailInput.setCustomValidity('');
        }

        // Custom validation check for Phone format
        if (phoneInput && !phoneRegex.test(phoneInput.value.trim())) {
          phoneInput.setCustomValidity('Invalid');
          isValid = false;
        } else if (phoneInput) {
          phoneInput.setCustomValidity('');
        }

        if (!contactForm.checkValidity() || !isValid) {
          contactForm.classList.add('was-validated');
        } else {
          contactForm.classList.remove('was-validated');
          contactForm.reset();

          // Show Bootstrap Success Alert
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
    }
  });
