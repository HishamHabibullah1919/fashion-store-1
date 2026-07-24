
  document.addEventListener('DOMContentLoaded', () => {
    // 7. Live Date & Time Engine
    function updateLiveDateTime() {
      const displayElement = document.getElementById('liveDateTimeDisplay');
      if (!displayElement) return;

      const now = new Date();
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };

      displayElement.textContent = now.toLocaleString('en-US', options);
    }

    updateLiveDateTime();
    setInterval(updateLiveDateTime, 1000);

    // 8. Add-to-Cart Bootstrap Success Modal Logic
    const cartButtons = document.querySelectorAll('.js-open-cart-modal');
    const modalElement = document.getElementById('addToCartSuccessModal');
    
    if (cartButtons.length && modalElement) {
      const cartModal = new bootstrap.Modal(modalElement);
      const modalProductName = document.getElementById('modalProductName');

      cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const productName = button.getAttribute('data-product') || 'Item';
          if (modalProductName) {
            modalProductName.textContent = productName;
          }
          cartModal.show();
        });
      });
    }
  });

