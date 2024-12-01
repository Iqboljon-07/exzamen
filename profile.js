let main = document.querySelector("main");

(async function () {
  let response = await fetch("http://localhost:3000/profile");

  let profile = await response.json();
  console.log(profile);
  main.innerHTML = `
<div class=" w-50 card border-primary mb-3 text-primary" ;">
  <div class="card-header">User profile</div>
  <div class="card-body text-black">
    <h5 class="card-title d-flex">Name:  <p class="text-danger">${profile.name}</p>  </h5>
     <h5 class="card-title d-flex">Email:  <p  class="text-danger" >${profile.email}</p>  </h5>
      <h5 class="card-title d-flex">Address:  <p   class="text-danger">${profile.address}</p>  </h5>
 
        <h5 class="card-title d-flex">Phone:  <p   class="text-danger">${profile.phone}</p>  </h5>
    

        <button id="btn" class="btn btn-primary">Edit profile</button>
  </div>
</div>

`;

  let btn = document.getElementById("btn");
  btn.addEventListener("click", async () => {
    let newName = prompt("Enter new name:");
    let newEmail = prompt("Enter new email:");
    let newAddress = prompt("Enter new address:");
    let newPhone = prompt("Enter new phone:");
    location.reload();
    try {
      let response = await fetch("http://localhost:3000/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          address: newAddress,
          phone: newPhone,
        }),
      });

      if ((name, email, address, phone)) {
        let updatedProfile = await response.json();

        updatedProfile.name = name;
        updatedProfile.email = email;
        updatedProfile.address = address;
        updatedProfile.phone = phone;
      }
    } catch (err) {
      console.log("Xatolik", err);
    }
  });
})();
