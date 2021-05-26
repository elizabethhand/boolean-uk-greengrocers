let state = {
  products:
    [
      {
        id: "001-beetroot",
        name: "beetroot",
        price: 0.35
      },
      {
        id: "002-carrot",
        name: "carrot",
        price: 0.50
      },
      {
        id: "003-apple",
        name: "apple",
        price: 0.60
      },
      {
        id: "004-apricot",
        name: "apricot",
        price: 0.70
      },
      {
        id: "005-avocado",
        name: "avocado",
        price: 0.90
      },
      {
        id: "006-bananas",
        name: "bananas",
        price: 0.20
      },
      {
        id: "007-bell-pepper",
        name: "bell-peppers",
        price: 0.70
      },
      {
        id: "008-berry",
        name: "berry",
        price: 1.40
      },
      {
        id: "009-blueberry",
        name: "blueberry",
        price: 3.00
      },
      {
        id: "010-eggplant",
        name: "eggplant",
        price: 0.80
      }
    ],
  cart: []

}


function renderProducts(array) {
  let storeSection = document.querySelector('#store')
  let storeItemList = document.querySelector('.store--item-list')
  for (const product of array) {
    let storeItem = renderProduct(product)
    storeItemList.append(storeItem)
  }
  storeSection.append(storeItemList)
}


function renderProduct(product) {
  let iconContainer = document.createElement('div')
  iconContainer.setAttribute("class", "store--item-icon")

  let productPicture = document.createElement('img')
  productPicture.setAttribute("src", `assets/icons/${product.id}.svg`)

  let addToCartBtn = document.createElement('button')
  addToCartBtn.innerText = "Add to cart"

  iconContainer.append(productPicture, addToCartBtn)

  addToCartBtn.addEventListener("click", function () {
    addItemToCart(product)

  });

  return iconContainer
}

function addItemToCart(targetItem) {

  let itemIsInCart = false;
  for (const item of state.cart) {
    if (item.id === targetItem.id) {
      itemIsInCart = true;
      item.quantity++;
    }
  }
  if (!itemIsInCart) {
    //make cart object
    let itemToAddToCart = {
      name: targetItem.name,
      id: targetItem.id,
      price: targetItem.price,
      quantity: 1
    }
    state.cart.push(itemToAddToCart)
  }

  renderCartList(state.cart)
  updateTotal()
}


function renderCartList(cart) {
  let cartItemContainer = document.querySelector('.cart--item-list-container')
  let cartItemList = document.querySelector('.cart--item-list')
  cartItemList.innerText = " "

  for (const item of cart) {
    let cartListItem = renderCartItem(item)
    cartItemList.append(cartListItem)
  }
  cartItemContainer.append(cartItemList)
}

function renderCartItem(item) {
  let cartLi = document.createElement('li')

  let cartItemIcon = document.createElement('img')
  cartItemIcon.setAttribute("class", "cart--item-icon")
  cartItemIcon.setAttribute("src", `assets/icons/${item.id}.svg`)

  let itemName = document.createElement('p')
  itemName.innerText = item.name

  let removeBtn = document.createElement('button')
  removeBtn.classList.add("quantity-btn", "remove-btn", "center")
  removeBtn.innerText = "-"

  removeBtn.addEventListener("click", function () {
    item.quantity--
    if (item.quantity <= 0) {
      const indexToRemove = state.cart.findIndex(function (targetItem) {
        return targetItem.id === item.id
      });
      state.cart.splice(indexToRemove, 1);
    }
    renderCartList(state.cart)
    updateTotal()
  });


  let itemQuantity = document.createElement('span')
  itemQuantity.classList.add("quantity-text", "center")
  itemQuantity.innerText = item.quantity

  let addBtn = document.createElement('button')
  addBtn.classList.add("quantity-btn", "add-btn", "center")
  addBtn.innerText = "+"

  addBtn.addEventListener("click", function () {
    item.quantity++
    renderCartList(state.cart)
    updateTotal()
  });

  cartLi.append(cartItemIcon, itemName, removeBtn, itemQuantity, addBtn)
  return cartLi
}

function updateTotal(item) {
  let total = 0
  //select element
  let totalPriceEl = document.querySelector('.total-number')
  //iterate through cart items and add price
  for (const item of state.cart) {
    total += (item.quantity * item.price)

    var totalPrice = total.toFixed(2);
    totalPriceEl.innerText = `£${totalPrice}`
  }

}

renderProducts(state.products)
renderCartList(state.cart)

