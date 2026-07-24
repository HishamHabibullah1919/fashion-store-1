
  document.addEventListener('DOMContentLoaded', () => {
    // Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    if (filterBtns.length && productItems.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filterValue = btn.getAttribute('data-filter');

          productItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 50);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.95)';
              setTimeout(() => {
                item.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }

    // Add-to-Cart Bootstrap Success Modal Logic
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
