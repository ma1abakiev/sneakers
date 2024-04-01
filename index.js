function fetchData(api) {
  return fetch(api)
    .then((response) => response.json())
    .catch((error) => console.error('У тебя ошибка, исправляй', error));
}

function fetchOrders() {
  return fetch('https://5c782080f150df17.mokky.dev/orders')
    .then((response) => response.json())
    .catch((error) => console.error('Ошибка получения заказов', error));
}

function renderSneakers(data, orders) {
  let wrapper = document.querySelector('.sneakers-wrapper');
  wrapper.innerHTML = data
    .map((item) => {
      const isOrdered = orders.some((order) => order.itemId === item.id);
      return `
        <div class="sneakers-card">
        <button class="sneakers__card-like">
          <img
            src="./images/${item.isLike ? 'like-2.svg' : 'like-1.svg'}"
            data-is-like="${item.isLike ? 'true' : 'false'}"
            alt=""
            class="card-like"
            data-sneaker-id="${item.id}"
          />
        </button>
        <img 
          src="./images${item.imageUrl}"
          alt=""
          class="sneakers__card-img"
        />
        <h4 class="sneakers__card-title">
          ${item.title}
        </h4>
        <div class="sneakers__card-actions">
          <div class="sneakers__action-price">
            <p>Цена</p>
            <b>${item.price}$</b>
          </div>
            <img src="./images/${
              isOrdered ? 'checked.svg' : 'plus.svg'
            }" alt="" class="card-plus" />
        </div>
      </div>`;
    })
    .join('');
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('card-like')) {
    const sneakerId = target.dataset.sneakerId;
    const isLiked = target.dataset.isLike === 'true';

    fetch(`https://5c782080f150df17.mokky.dev/items/${sneakerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isLike: !isLiked }),
    })
      .then((response) => response.json())
      .then(() => {
        target.dataset.isLike = String(!isLiked);
        target.setAttribute(
          'src',
          `./images/${!isLiked ? 'like-2.svg' : 'like-1.svg'}`
        );
      })
      .catch((error) => {
        console.error('Исправляй ошибку', error);
      });
  }
});

fetchData('https://5c782080f150df17.mokky.dev/items').then((data) => {
  fetchOrders().then((orders) => {
    renderSneakers(data, orders);
  });
});

// document.addEventListener('click', (event) => {
//   const target = event.target;
//   if (target.classList.contains('card-plus')) {
//     if (target.getAttribute('src') === './images/plus.svg') {
//       const card = target.closest('.sneakers-card');
//       const sneakerId = card.querySelector('.card-like').dataset.sneakerId;
//       const title = card.querySelector('.sneakers__card-title').innerText;
//       const price = card
//         .querySelector('.sneakers__action-price b')
//         .innerText.replace('$', '');
//       console.log(price);
//       const imageUrl = card
//         .querySelector('.sneakers__card-img')
//         .getAttribute('src')
//         .replace('./images/', '');

//       const orderData = {
//         itemId: Number(sneakerId),
//         title: title,
//         price: Number(price),
//         imageUrl: imageUrl,
//       };

//       fetch('https://5c782080f150df17.mokky.dev/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           target.dataset.orderId = data.id;
//           target.setAttribute('src', './images/checked.svg');
//         })
//         .catch((error) => {
//           console.error('Ошибка:', error);
//         });
//     } else {
//       const orderId = target.dataset.orderId;
//       target.setAttribute('src', './images/plus.svg');
//       fetch(`https://5c782080f150df17.mokky.dev/orders/${orderId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//         })
//         .catch((err) => console.log(err));
//     }
//   }
// });

document.addEventListener('click', function (event) {
  let target = event.target;
  if (target.classList.contains('card-plus')) {
    const card = target.closest('.sneakers-card');
    let title = card.querySelector('.sneakers__card-title').innerText;
    let price = card
      .querySelector('.sneakers__action-price b')
      .innerText.replace('$', '');
    let img = card
      .querySelector('.sneakers__card-img')
      .getAttribute('src')
      .replace('./images', '');
    let sneakerId = card.querySelector('.card-like').dataset.sneakerId;

    fetch('https://5c782080f150df17.mokky.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: Number(sneakerId),
        title: title,
        price: Number(price),
        imageUrl: img,
      }),
    })
      .then((response) => response.json())
      .then((data) => target.setAttribute('src', './images/checked.svg'))
      .catch((err) => console.log(err));
  }
});



let nums = [1, 5, 6, 7];
let newNums = nums.slice(0, -3);
console.log(newNums);
