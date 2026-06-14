
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const header = document.querySelector('.site-header');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuGrids = document.querySelectorAll('.menu-grid');
  const menuCards = Array.from(document.querySelectorAll('.menu-card'));
  const menuSearch = document.getElementById('menuSearch');
  const clearSearch = document.getElementById('clearSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cartBtn = document.getElementById('cartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const emptyCartBtn = document.getElementById('emptyCartBtn');
  const checkoutFromCartBtn = document.getElementById('checkoutFromCartBtn');
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItems');
  const emptyCartMessage = document.getElementById('emptyCartMessage');
  const drawerTotalItems = document.getElementById('drawerTotalItems');
  const drawerTotalAmount = document.getElementById('drawerTotalAmount');
  const itemModal = document.getElementById('itemModal');
  const closeItemModal = document.getElementById('closeItemModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalName = document.getElementById('modalName');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalQty = document.getElementById('modalQty');
  const modalQtyPlus = document.getElementById('modalQtyPlus');
  const modalQtyMinus = document.getElementById('modalQtyMinus');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const toastContainer = document.getElementById('toastContainer');
  const orderConfirmOverlay = document.getElementById('orderConfirmOverlay');
  const confirmOrderId = document.getElementById('confirmOrderId');
  const confirmCustomer = document.getElementById('confirmCustomer');
  const confirmAddress = document.getElementById('confirmAddress');
  const confirmPayment = document.getElementById('confirmPayment');
  const confirmTotal = document.getElementById('confirmTotal');
  const confirmEta = document.getElementById('confirmEta');
  const confirmDoneBtn = document.getElementById('confirmDoneBtn');
  const checkoutName = document.getElementById('checkoutName');
  const checkoutMobile = document.getElementById('checkoutMobile');
  const checkoutEmail = document.getElementById('checkoutEmail');
  const checkoutAddress = document.getElementById('checkoutAddress');
  const checkoutHouse = document.getElementById('checkoutHouse');
  const checkoutStreet = document.getElementById('checkoutStreet');
  const checkoutArea = document.getElementById('checkoutArea');
  const checkoutCity = document.getElementById('checkoutCity');
  const checkoutState = document.getElementById('checkoutState');
  const checkoutPincode = document.getElementById('checkoutPincode');
  const checkoutUpi = document.getElementById('checkoutUpi');
  const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const upiGroup = document.getElementById('upiGroup');
  const checkoutSummaryList = document.getElementById('checkoutSummaryList');
  const checkoutTotalItems = document.getElementById('checkoutTotalItems');
  const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const checkoutError = document.getElementById('checkoutError');
  const ordersList = document.getElementById('ordersList');
  const emptyOrdersMsg = document.getElementById('emptyOrdersMsg');
  const exportDataBtn = document.getElementById('exportDataBtn');
  const sendBtn = document.getElementById('sendBtn');
  const formSuccess = document.getElementById('formSuccess');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const msgInput = document.getElementById('message');

  let cart = loadCart();
  let orders = loadOrders();
  let activeFilter = 'all';
  let currentModalItem = null;

  function setActiveTab(tabName) {
    tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
    menuGrids.forEach(grid => grid.classList.toggle('hidden', grid.id !== `tab-${tabName}`));
    if (!document.querySelector(`.tab-btn.active`)) tabBtns[0].classList.add('active');
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 50 ? '0 4px 24px rgba(26,15,7,0.6)' : 'none';
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveTab(btn.dataset.tab);
      animateMenuCards();
    });
  });

  function animateMenuCards() {
    const activeGrid = document.querySelector('.menu-grid:not(.hidden)');
    if (!activeGrid) return;
    activeGrid.querySelectorAll('.menu-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });
  }

  menuCards.forEach(card => {
    card.addEventListener('click', () => openItemModal(card.dataset));
    card.addEventListener('keypress', event => {
      if (event.key === 'Enter') openItemModal(card.dataset);
    });
  });

  function openItemModal(data) {
    currentModalItem = {
      id: data.id,
      name: data.name,
      price: Number(data.price),
      desc: data.desc,
      icon: data.category === 'coffee' ? '☕' : data.category === 'tea' ? '🍵' : '🥐'
    };
    modalIcon.textContent = currentModalItem.icon;
    modalName.textContent = currentModalItem.name;
    modalPrice.textContent = `₹${currentModalItem.price}`;
    modalDesc.textContent = currentModalItem.desc;
    modalQty.textContent = '1';
    itemModal.classList.remove('hidden');
  }

  function closeItemModalFn() {
    itemModal.classList.add('hidden');
  }

  closeItemModal.addEventListener('click', closeItemModalFn);
  itemModal.addEventListener('click', event => {
    if (event.target === itemModal) closeItemModalFn();
  });

  modalQtyPlus.addEventListener('click', () => {
    modalQty.textContent = String(Number(modalQty.textContent) + 1);
  });
  modalQtyMinus.addEventListener('click', () => {
    const value = Math.max(1, Number(modalQty.textContent) - 1);
    modalQty.textContent = String(value);
  });

  addToCartBtn.addEventListener('click', () => {
    const qty = Number(modalQty.textContent);
    addItemToCart({ ...currentModalItem, qty });
    closeItemModalFn();
  });

  cartBtn.addEventListener('click', showCartDrawer);
  drawerBackdrop.addEventListener('click', hideCartDrawer);
  closeCartBtn.addEventListener('click', hideCartDrawer);
  continueShoppingBtn.addEventListener('click', hideCartDrawer);
  emptyCartBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
    updateCartDisplay();
    showToast('Cart emptied.');
  });
  checkoutFromCartBtn.addEventListener('click', () => {
    hideCartDrawer();
    window.location.hash = '#checkout';
  });

  function showCartDrawer() {
    cartDrawer.classList.remove('hidden');
    drawerBackdrop.classList.remove('hidden');
  }

  function hideCartDrawer() {
    cartDrawer.classList.add('hidden');
    drawerBackdrop.classList.add('hidden');
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem('copperKettleCart')) || [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem('copperKettleCart', JSON.stringify(cart));
  }

  function loadOrders() {
    try {
      return JSON.parse(localStorage.getItem('copperKettleOrders')) || [];
    } catch {
      return [];
    }
  }

  function saveOrders() {
    localStorage.setItem('copperKettleOrders', JSON.stringify(orders));
  }

  function addItemToCart(item) {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.push({ ...item });
    }
    saveCart();
    updateCartDisplay();
    showToast(`Added ${item.qty} × ${item.name} to cart.`);
  }

  function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
    showToast('Item removed from cart.');
  }

  function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartCount.textContent = String(totalItems);
    drawerTotalItems.textContent = `${totalItems}`;
    drawerTotalAmount.textContent = `₹${totalAmount}`;
    checkoutTotalItems.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;
    checkoutTotalAmount.textContent = `₹${totalAmount}`;
    renderCartItems();
    renderCheckoutSummary();
  }

  function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      emptyCartMessage.classList.remove('hidden');
      return;
    }
    emptyCartMessage.classList.add('hidden');
    cart.forEach(item => {
      const card = document.createElement('div');
      card.className = 'cart-item';
      card.innerHTML = `
        <h4>${item.name}</h4>
        <p>₹${item.price} each</p>
        <p>Subtotal: ₹${item.price * item.qty}</p>
        <div class="cart-quantity">
          <button data-action="decrease" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button data-action="increase" data-id="${item.id}">＋</button>
        </div>
        <button class="remove-item" data-action="remove" data-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(card);
    });
  }

  cartItemsContainer.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const action = button.dataset.action;
    const id = button.dataset.id;
    const item = cart.find(item => item.id === id);
    if (!item) return;
    if (action === 'increase') {
      item.qty += 1;
      saveCart();
      updateCartDisplay();
    }
    if (action === 'decrease') {
      item.qty = Math.max(1, item.qty - 1);
      saveCart();
      updateCartDisplay();
    }
    if (action === 'remove') {
      removeFromCart(id);
    }
  });

  function renderCheckoutSummary() {
    checkoutSummaryList.innerHTML = '';
    if (cart.length === 0) {
      checkoutSummaryList.innerHTML = '<p style="color: var(--muted);">Your order summary will appear here once you add items.</p>';
      return;
    }
    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'summary-item';
      row.innerHTML = `<div><p><strong>${item.name}</strong></p><span>${item.qty} × ₹${item.price}</span></div><div><p><strong>₹${item.qty * item.price}</strong></p></div>`;
      checkoutSummaryList.appendChild(row);
    });
  }

  function filteredMenu() {
    const searchTerm = menuSearch.value.trim().toLowerCase();
    menuCards.forEach(card => {
      const text = `${card.dataset.name} ${card.dataset.desc}`.toLowerCase();
      const matchesSearch = !searchTerm || text.includes(searchTerm);
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      card.style.display = matchesSearch && matchesFilter ? '' : 'none';
    });
    menuGrids.forEach(grid => {
      const visibleCards = Array.from(grid.querySelectorAll('.menu-card')).filter(card => card.style.display !== 'none');
      const noResults = grid.querySelector('.no-results');
      if (noResults) noResults.classList.toggle('hidden', visibleCards.length > 0);
    });
  }

  menuSearch.addEventListener('input', filteredMenu);
  clearSearch.addEventListener('click', () => {
    menuSearch.value = '';
    filteredMenu();
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
      activeFilter = button.dataset.filter;
      if (activeFilter !== 'all') setActiveTab(activeFilter);
      filteredMenu();
    });
  });

  function setPaymentOptions() {
    const selected = Array.from(paymentRadios).find(radio => radio.checked)?.value;
    upiGroup.style.display = selected === 'UPI' ? 'grid' : 'none';
  }

  paymentRadios.forEach(radio => radio.addEventListener('change', setPaymentOptions));
  setPaymentOptions();

  placeOrderBtn.addEventListener('click', () => {
    const validation = validateCheckout();
    if (!validation.isValid) {
      showCheckoutError(validation.message);
      return;
    }
    if (cart.length === 0) {
      showCheckoutError('Add items to your cart before placing an order.');
      return;
    }
    const paymentMethod = Array.from(paymentRadios).find(radio => radio.checked).value;
    if (paymentMethod === 'UPI' && !checkoutUpi.value.trim()) {
      showCheckoutError('Please enter your UPI ID.');
      return;
    }
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = paymentMethod === 'UPI' ? 'Processing UPI...' : 'Placing order...';

    setTimeout(() => {
      const order = createOrder(paymentMethod);
      orders.unshift(order);
      saveOrders();
      cart = [];
      saveCart();
      updateCartDisplay();
      renderOrders();
      clearCheckoutForm();
      showOrderConfirmation(order);
      placeOrderBtn.disabled = false;
      placeOrderBtn.textContent = 'Place Order';
    }, paymentMethod === 'UPI' ? 1200 : 700);
  });

  function validateCheckout() {
    if (!checkoutName.value.trim()) return { isValid: false, message: 'Full Name is required.' };
    if (!checkoutMobile.value.trim() || !/^\+?\d{7,15}$/.test(checkoutMobile.value.trim())) return { isValid: false, message: 'Enter a valid Mobile Number.' };
    if (!isValidEmail(checkoutEmail.value.trim())) return { isValid: false, message: 'Enter a valid Email Address.' };
    if (!checkoutAddress.value.trim()) return { isValid: false, message: 'Complete Delivery Address is required.' };
    if (!checkoutHouse.value.trim()) return { isValid: false, message: 'House / Flat Number is required.' };
    if (!checkoutStreet.value.trim()) return { isValid: false, message: 'Street is required.' };
    if (!checkoutArea.value.trim()) return { isValid: false, message: 'Area is required.' };
    if (!checkoutCity.value.trim()) return { isValid: false, message: 'City is required.' };
    if (!checkoutState.value.trim()) return { isValid: false, message: 'State is required.' };
    if (!checkoutPincode.value.trim() || !/^\d{4,6}$/.test(checkoutPincode.value.trim())) return { isValid: false, message: 'Enter a valid Pincode.' };
    return { isValid: true };
  }

  function showCheckoutError(message) {
    checkoutError.textContent = message;
    checkoutError.classList.remove('hidden');
    setTimeout(() => checkoutError.classList.add('hidden'), 4000);
  }

  function createOrder(paymentMethod) {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const id = `CK${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 900 + 100)}`;
    const address = `${checkoutHouse.value.trim()}, ${checkoutStreet.value.trim()}, ${checkoutArea.value.trim()}, ${checkoutCity.value.trim()}, ${checkoutState.value.trim()} - ${checkoutPincode.value.trim()}`;
    return {
      id,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      customer: checkoutName.value.trim(),
      mobile: checkoutMobile.value.trim(),
      email: checkoutEmail.value.trim(),
      address,
      paymentMethod,
      upiId: checkoutUpi.value.trim(),
      amount: totalAmount,
      items: cart.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
      status: paymentMethod === 'COD' ? 'Confirmed' : 'Paid',
      eta: '30-45 minutes'
    };
  }

  function showOrderConfirmation(order) {
    confirmOrderId.textContent = order.id;
    confirmCustomer.textContent = order.customer;
    confirmAddress.textContent = order.address;
    confirmPayment.textContent = `${order.paymentMethod}${order.paymentMethod === 'UPI' ? ` • ${order.upiId}` : ''}`;
    confirmTotal.textContent = `₹${order.amount}`;
    confirmEta.textContent = order.eta;
    orderConfirmOverlay.classList.remove('hidden');
  }

  confirmDoneBtn.addEventListener('click', () => {
    orderConfirmOverlay.classList.add('hidden');
    window.location.hash = '#menu';
  });

  orderConfirmOverlay.addEventListener('click', event => {
    if (event.target === orderConfirmOverlay) {
      orderConfirmOverlay.classList.add('hidden');
      window.location.hash = '#menu';
    }
  });

  function clearCheckoutForm() {
    checkoutName.value = '';
    checkoutMobile.value = '';
    checkoutEmail.value = '';
    checkoutAddress.value = '';
    checkoutHouse.value = '';
    checkoutStreet.value = '';
    checkoutArea.value = '';
    checkoutCity.value = '';
    checkoutState.value = '';
    checkoutPincode.value = '';
    checkoutUpi.value = '';
    paymentRadios[0].checked = true;
    setPaymentOptions();
  }

  function renderOrders() {
    ordersList.innerHTML = '';
    if (orders.length === 0) {
      emptyOrdersMsg.classList.remove('hidden');
      return;
    }
    emptyOrdersMsg.classList.add('hidden');
    orders.forEach(order => {
      const card = document.createElement('div');
      card.className = 'order-card';
      const items = order.items.map(item => `${item.qty}× ${item.name}`).join(', ');
      card.innerHTML = `
        <h4>Order ${order.id}</h4>
        <p><strong>Date:</strong> ${order.date}</p>
        <p><strong>Items:</strong> ${items}</p>
        <p><strong>Amount:</strong> ₹${order.amount}</p>
        <p><strong>Payment:</strong> ${order.paymentMethod}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      `;
      ordersList.appendChild(card);
    });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function animateReveal() {
    const revealEls = document.querySelectorAll(
      '.menu-card, .testimonial, .story-text, .story-visual, .contact-detail, .contact-form-wrap, .section-header, .stat'
    );
    revealEls.forEach(el => el.classList.add('reveal'));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  function observeSections() {
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--copper)' : '';
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => sectionObserver.observe(s));
  }

  function setupSendMessage() {
    sendBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const msg = msgInput.value.trim();
      if (!name || !email || !msg) {
        shake(sendBtn);
        showFormError('Please fill in all fields.');
        return;
      }
      if (!isValidEmail(email)) {
        shake(sendBtn);
        showFormError('Please enter a valid email address.');
        return;
      }
      sendBtn.textContent = 'Sending...';
      sendBtn.disabled = true;
      setTimeout(() => {
        nameInput.value = '';
        emailInput.value = '';
        msgInput.value = '';
        sendBtn.textContent = 'Send Message';
        sendBtn.disabled = false;
        formSuccess.classList.remove('hidden');
        setTimeout(() => formSuccess.classList.add('hidden'), 4000);
      }, 1200);
    });
  }

  function showFormError(msg) {
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
    el.offsetHeight;
    el.style.animation = 'shake 0.4s ease';
    el.addEventListener('animationend', () => el.style.animation = '', { once: true });
  }

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

  animateMenuCards();
  animateReveal();
  observeSections();
  setupSendMessage();
  setupExportData();
  filteredMenu();
  updateCartDisplay();
  renderOrders();

  console.log('☕ The Copper Kettle — Est. 1923. Welcome!');
});
