let container = document.querySelector(".container");

(async function () {
  try {
    let response = await fetch("http://localhost:3000/likeds");
    let products = await response.json();

    console.log(products);

    products.forEach((product) => {
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
      let delet = card.querySelector("#delete");
      delet.addEventListener("click", () => {
        fetch(`http://localhost:3000/likeds/${product.id}`, {
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
  } catch (error) {
    console.error("Error:", error);
  }
})();
