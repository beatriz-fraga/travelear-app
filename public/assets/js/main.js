const hotelListEl = document.getElementById("hotels-area");
const noHotelEl = document.querySelector(".no-hotels");
const hotelnameInputEl = document.getElementById("hotel-name");
const hotelAddressEl = document.getElementById("hotel-address");
const hotelImgEl = document.getElementById("hotel-img");
const hotelTelefoneEl = document.getElementById("hotel-telefone");
const actionBtn = document.getElementById("action-btn");

actionBtn.addEventListener("click", () => {
  const hotelNamevalue = hotelnameInputEl.value;
  const hotelAddressvalue = hotelAddressEl.value;
  const hotelImgvalue = hotelImgEl.value;
  const hotelTelefoneValue = hotelTelefoneEl.value;

  createHotel(
    hotelNamevalue,
    hotelAddressvalue,
    hotelImgvalue,
    hotelTelefoneValue
  ).then(() => {
    hotelnameInputEl.value = "";
    hotelAddressEl.value = "";
    hotelImgEl.value = "";
    hotelTelefoneEl.value = "";
  });
});

function addHotel(hotel) {
  const hotelEl = document.createElement("div");
  const hotelImgEl = document.createElement("img");
  const hoteltextsEl = document.createElement("div");
  const hotelTitleEl = document.createElement("h2");
  const hotelAddressEl = document.createElement("p");
  const hotelPhoneEl = document.createElement("p");
  const deleteHotelEl = document.createElement("button");
  hotelEl.classList = "hotel";
  hotelImgEl.src = hotel.img;
  hotelTitleEl.innerHTML = hotel.name;
  hotelAddressEl.innerHTML = hotel.address;
  hotelPhoneEl.innerHTML = hotel.telefone;
  hoteltextsEl.classList = "hotel-texts";
  deleteHotelEl.classList = "delete-btn";
  deleteHotelEl.innerHTML = '<i class="ri-delete-bin-6-line"></i>';
  deleteHotelEl.addEventListener("click", () => {
    deleteHotel(hotel.id);
  });

  hoteltextsEl.appendChild(hotelTitleEl);
  hoteltextsEl.appendChild(hotelAddressEl);
  hoteltextsEl.appendChild(hotelPhoneEl);

  hotelEl.appendChild(hotelImgEl);
  hotelEl.appendChild(hoteltextsEl);
  hotelEl.appendChild(deleteHotelEl);

  hotelListEl.appendChild(hotelEl);
}

function getAllHotels() {
  fetch("http://localhost:3333/api/hotels")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (!data || data.length == 0) {
        hotelListEl.innerHTML = `<p class="no-hotels active">Nenhum hotel cadastrado.</p>`;
      } else {
        hotelListEl.innerHTML = "";
        data.forEach(addHotel);
      }
    });
}

function createHotel(
  hotelNamevalue,
  hotelAddressvalue,
  hotelImgvalue,
  hotelTelefoneValue
) {
  return fetch("http://localhost:3333/api/hotels", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      img: hotelImgvalue,
      name: hotelNamevalue,
      address: hotelAddressvalue,
      telefone: hotelTelefoneValue,
    }),
  }).then(() => {
    getAllHotels();
  });
}

function deleteHotel(id) {
  fetch("http://localhost:3333/api/hotels/" + id, { method: "DELETE" }).then(
    () => {
      getAllHotels();
    }
  );
}

getAllHotels();
