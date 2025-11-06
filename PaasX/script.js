// // script.js

// // Function to display saved passwords from localStorage
// function showPasswords() {
//     let table = document.querySelector("table");
//     let saved = JSON.parse(localStorage.getItem("passwords")) || [];

//     // Remove old rows except header
//     table.innerHTML = `
//     <tr>
//         <th>Website</th>
//         <th>Username</th>
//         <th>Password</th>
//         <th>Delete</th>
//     </tr>
//   `;

//     saved.forEach((item, index) => {
//         let row = `
//       <tr>
//         <td>${item.website}</td>
//         <td>${item.username}</td>
//         <td>${item.password}</td>
//         <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
//       </tr>
//     `;
//         table.innerHTML += row;
//     });

//     // Add delete functionality
//     document.querySelectorAll(".deleteBtn").forEach((btn) => {
//         btn.addEventListener("click", (e) => {
//             let index = e.target.dataset.index;
//             saved.splice(index, 1);
//             localStorage.setItem("passwords", JSON.stringify(saved));
//             showPasswords();
//         });
//     });
// }

// // Function to add a new password
// document.querySelector(".btn").addEventListener("click", (e) => {
//     e.preventDefault();

//     let username = document.querySelector("#Username").value.trim();
//     let website = document.querySelector("#website").value.trim();
//     let password = document.querySelector("#password").value.trim();

//     if (username === "" || website === "" || password === "") {
//         alert("Please fill all fields!");
//         return;
//     }

//     let saved = JSON.parse(localStorage.getItem("passwords")) || [];

//     saved.push({ username, website, password });

//     localStorage.setItem("passwords", JSON.stringify(saved));

//     document.querySelector("#Username").value = "";
//     document.querySelector("#website").value = "";
//     document.querySelector("#password").value = "";

//     showPasswords();
// });

// // Load passwords on page load
// document.addEventListener("DOMContentLoaded", showPasswords);



// script.js — Password Manager Local Storage System

// Function to show saved passwords in the table
function displayPasswords() {
    const table = document.querySelector("table");
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

    // Keep only the header row
    table.innerHTML = `
    <tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>
  `;

    passwords.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${item.website}</td>
      <td>${item.username}</td>
      <td>${item.password}</td>
      <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
    `;
        table.appendChild(row);
    });

    // Delete button event listener
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            passwords.splice(index, 1);
            localStorage.setItem("passwords", JSON.stringify(passwords));
            displayPasswords(); // refresh table
        });
    });
}

// Function to handle adding new password
function addPassword(e) {
    e.preventDefault();

    // const username = document.querySelector("#Username").value.trim();
    // const website = document.querySelector("#website").value.trim();
    // const password = document.querySelector("#password").value.trim();

    const username = document.querySelector("#username").value.trim();
    const website = document.querySelector("#website").value.trim();
    const password = document.querySelector("#password").value.trim();


    if (!username || !website || !password) {
        alert("⚠️ Please fill out all fields before submitting!");
        return;
    }

    const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.push({ username, website, password });
    localStorage.setItem("passwords", JSON.stringify(passwords));

    // Clear inputs
    document.querySelector("#Username").value = "";
    document.querySelector("#website").value = "";
    document.querySelector("#password").value = "";

    displayPasswords();
}

// Initialize everything on page load
document.addEventListener("DOMContentLoaded", () => {
    displayPasswords();
    document.querySelector(".btn").addEventListener("click", addPassword);
});
