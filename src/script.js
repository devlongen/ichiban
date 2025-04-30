const cart = [];

function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

function updateCartModal() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.qty}x ${item.name} - R$ ${(item.price * item.qty).toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  cartTotal.textContent = total.toFixed(2);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCartCount();
  });
});

document.getElementById('openCart').addEventListener('click', () => {
  updateCartModal();
  document.getElementById('cart-modal').classList.remove('hidden');
});

document.getElementById('closeCart').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.add('hidden');
});

document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Pedido finalizado! Obrigado por comprar na Ichiban!');
  cart.length = 0;
  updateCartCount();
  document.getElementById('cart-modal').classList.add('hidden');
});