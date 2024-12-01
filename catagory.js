let container = document.querySelector(".container");
let ul = document.querySelector("#ul");
let search = document.querySelector("#search");
ul.classList.add("ullist");
(async function () {
  try {
    let response = await fetch("http://localhost:3000/categories");
    let data = await response.json();
    console.log(data);
    data.forEach((category) => {
      let li = document.createElement("li");
      let h2 = document.createElement("h2");
      let div = document.createElement("div");
      let btn1 = document.createElement("button");
      let btn2 = document.createElement("button");
      btn1.innerText = "Edit";

      div.append(btn1, btn2);
      div.classList.add("d-flex", "gap-3");
      div.style.width = "auto";
      btn1.classList.add("btn", "btn-primary");
      btn2.classList.add("btn", "btn-danger");
      btn2.innerText = "Delete";
      li.append(h2, div);
      h2.textContent = category.name;
      li.style.width = "80%";
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.justifyContent = "center";
      li.style.justifyContent = "space-between";
      li.style.borderRadius = "5px";
      li.style.border = "3px solid blue";
      ul.appendChild(li);
      li.style.backgroundColor = "#FFFFFF";
      //////////////////////////////////////////////////////////////////
      btn2.addEventListener("click", function () {
        fetch(`http://localhost:3000/categories/${category.id}`, {
          method: "DELETE",
        }).then((response) => {
          console.log(response);
          if (response.ok) {
            li.remove();
          }
        });
      });

      btn1.addEventListener("click", () => {
        let newName = prompt("Enter new name:");

        if (newName) {
          fetch(`http://localhost:3000/categories/${category.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newName }),
          }).then((response) => {
            console.log(response);
            response.json().then((data) => {
              console.log(data);
              h2.textContent = data.name;
            });
          });
        }
      });
    });

    search.addEventListener("keydown", async (e) => {
      ul.innerHTML = "";
      try {
        let response = await fetch("http://localhost:3000/categories");
        let products = await response.json();

        let datas = products.filter((product) =>
          product.name.toLowerCase().includes(search.value.trim().toLowerCase())
        );
        datas.forEach((category) => {
          console.log(category);
          let li = document.createElement("li");
          let h2 = document.createElement("h2");
          let div = document.createElement("div");
          let btn1 = document.createElement("button");
          let btn2 = document.createElement("button");

          btn1.innerText = "Edit";

          div.append(btn1, btn2);
          div.classList.add("d-flex", "gap-3");
          div.style.width = "20%";
          btn1.classList.add("btn", "btn-primary");
          btn2.classList.add("btn", "btn-danger");
          btn2.innerText = "Delete";
          li.append(h2, div);
          h2.textContent = category.name;
          li.style.width = "80%";
          li.style.display = "flex";
          li.style.alignItems = "center";
          li.style.justifyContent = "center";
          li.style.justifyContent = "space-between";
          li.style.borderRadius = "5px";
          li.style.border = "3px solid blue";
          ul.appendChild(li);
          li.style.backgroundColor = "#FFFFFF";
        });
      } catch (error) {
        console.log("Xatolik", error);
      }
    });
  } catch (error) {
    console.log(error);
  }
})();

// search.addEventListener("keydown", () => {
//   let input = search.value.toLowerCase();
//   let items = document.querySelectorAll(".ullist li");
//   items.forEach((item) => {
//     let name = item.querySelector("h2").textContent.toLowerCase();
//     if (name.includes(input)) {
//       item.style.display = "flex";
//     } else {
//       ul.style.display = "none";
//     }
//   });
// });
