// sticky header
const sectionHeroEl = document.querySelector("#hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-160px",
  }
  );
obs.observe(sectionHeroEl);

// Get all the main navigation links
const navLinks = document.querySelectorAll(".main-nav-link");

// Add a scroll event listener to the window
window.addEventListener("scroll", () => {
  // Get the current scroll position
  const currentScrollPos = window.pageYOffset;

  // Loop through all the main navigation links
  navLinks.forEach((link) => {
    // Get the section corresponding to the link's href attribute
    const section = document.querySelector(link.hash);

    // Check if the section is in view
    if (
      section.offsetTop <= currentScrollPos + 200 &&
      section.offsetTop + section.offsetHeight > currentScrollPos + 200
    ) {
      // Add the "active" class to the link
      link.classList.add("active");
    } else {
      // Remove the "active" class from the link
      link.classList.remove("active");
}
});
});

// buy products //

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
function purchaseClicked() {
  var cartItems = document.getElementsByClassName('cart-items')[0];
  if (cartItems.children.length === 0) {
      alert('Sorry, your cart is empty!');
      return;
  }

  // Store email and total values in localStorage
  localStorage.setItem('email', document.getElementById('email-value').value);
  localStorage.setItem("total-price", document.getElementById("total-price").innerHTML);

  // Redirect to the paymentgateway page
  window.location.href = 'paymentgateway.html';

  // Clear the cart items and update the cart total
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();

  // Clear the email textbox
  document.getElementById('email-value').value = '';

}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartItemNames = document.querySelectorAll('.cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].textContent === title) {
        alert('This item is already added to the cart');
        return;
      }
    }
  
    // Create new cart item element
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
      <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;

    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
  
    // Append new cart item to cart
    document.querySelector('.cart-items').appendChild(cartRow);
  }
  

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
