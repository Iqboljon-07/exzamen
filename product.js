//npm install -g json -server
// json-server --watch db.json

let add = document.querySelector("#add");
let container = document.querySelector(".container");
let search = document.querySelector("#search");
let input1 = document.querySelector("#input1");

let input2 = document.querySelector("#input2");

let input3 = document.querySelector("#input3");

let input4 = document.querySelector("#input4");

let form = document.querySelector("form");

(async function () {
  try {
    let response = await fetch("http://localhost:3000/products");
    let products = await response.json();
    console.log(products);
    products.forEach((product) => {
      console.log(product);
      let card = document.createElement("div");
      card.classList.add("card", "bg-success");

      card.innerHTML = `
        <div class="card text-center " style="width: 18rem;height:400px;display:grid; grid-template-rows:200px 80px 50px 70px  ">
    <img style="height:200px" src="${product.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"> ${product.name}</h5>
      <p class="card-text">${product.info}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item fw-bold">$${product.price}</li>
      
    </ul>
    <div class="card-body">
      <button id="like" class="btn btn-danger">like</button>
      <button id="delete" class="btn btn-primary">delete</button>
    </div>
  </div>`;

      container.append(card);

      let like = card.querySelector("#like");

      like.addEventListener("click", async function () {
        like.innerHTML = "";
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-heart");
        like.classList.add("bg-info");
        like.append(icon);

        try {
          fetch(`http://localhost:3000/products?id=${product.id}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              data.forEach((data) => {
                console.log(data);
                let img = data.img;
                let name = data.name;
                let info = data.info;
                let price = data.price;
                let liked = data.liked;

                fetch("http://localhost:3000/likeds", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    img,
                    name,
                    info,
                    price,
                    liked,
                  }),
                });
                console.log(img, name, info, price);
              });
            });
        } catch (error) {
          console.error("Error adding new product:", error);
        }
      });

      ///////////////////////////////////////////////////
      let delet = card.querySelector("#delete");
      delet.addEventListener("click", () => {
        fetch(`http://localhost:3000/products/${product.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: product.id }),
        }).then((response) => {
          if (response.ok) {
            card.remove();
          } else {
            throw new Error("Xatolik");
          }
        });
      });
    });

    // Add event listeners to like and delete buttons
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  search.addEventListener("keydown", async (e) => {
    container.innerHTML = "";
    let serachText = search.value.trim();
    try {
      let response = await fetch(`http://localhost:3000/products`);
      let products1 = await response.json();
      let products2 = products1.filter((product) =>
        product.name.toLowerCase().includes(serachText.toLowerCase())
      );

      products2.forEach((product) => {
        let card = document.createElement("div");
        card.classList.add("card", "bg-success");

        card.innerHTML = `
        <div class="card text-center " style="width: 18rem;height:400px;display:grid; grid-template-rows:200px 80px 50px 70px  ">
    <img style="height:200px" src="${product.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"> ${product.name}</h5>
      <p class="card-text">${product.info}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item fw-bold">$${product.price}</li>
      
    </ul>
    <div class="card-body">
      <button id="like" class="btn btn-danger">like</button>
      <button id="delete" class="btn btn-primary">delete</button>
    </div>
  </div>`;
        container.append(card);
      });
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  });

  /////////////////////////////////////////////////////
})();

add.addEventListener("click", () => {
  let name = input1.value;
  let info = input2.value;
  let price = input3.value;
  let img = input4.value;

  if (!name || !info || !price || !img) {
    alert("Jadvalni to'ldiring");
    return; // Agar ma'lumotlar to'liq bo'lmasa, funksiyani to'xtatish
  }

  try {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        info,
        price,
        img,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        if ((name, info, price, img)) {
          let card = document.createElement("div");
          card.classList.add("card", "bg-success");

          card.innerHTML = `
            <div class="card text-center " style="width: 18rem;height:400px;display:grid; grid-template-rows:200px 80px 50px 70px  ">
              <img style="height:200px" src="${response.img}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title"> ${response.name}</h5>
                <p class="card-text">${response.info}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item fw-bold">$${response.price}</li>
              </ul>
              <div class="card-body">
                <button class="btn btn-danger">like</button>
                <button id="delete" class="btn btn-primary">delete</button>
              </div>
            </div>`;

          container.append(card);

          location.replace("./product.html");
        }
      });
  } catch (error) {
    console.error("Error adding new product:", error);
  }
});
