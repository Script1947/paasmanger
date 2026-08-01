const form = document.getElementById("passwordForm");
const website = document.getElementById("website");
const username = document.getElementById("username");
const password = document.getElementById("password");

const tableBody = document.querySelector("#passwordTable tbody");
const search = document.getElementById("search");
const count = document.getElementById("count");
const empty = document.getElementById("emptyMessage");
const togglePassword = document.getElementById("togglePassword");

const popup = document.getElementById("loginPopup");
const masterInput = document.getElementById("masterPassword");
const unlockBtn = document.getElementById("unlockBtn");

const MASTER_PASSWORD = "Victus@2026";

let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
let editIndex = -1;

unlockBtn.addEventListener("click", () => {

    if (masterInput.value === MASTER_PASSWORD) {

        popup.style.display = "none";

    } else {

        alert("Incorrect Master Password");

        masterInput.value = "";

        masterInput.focus();

    }

});

masterInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        unlockBtn.click();

    }

});

function saveData() {

    localStorage.setItem("passwords", JSON.stringify(passwords));

}

function updateCounter() {

    count.innerText = passwords.length;

    if (passwords.length === 0) {

        empty.style.display = "block";

    } else {

        empty.style.display = "none";

    }

}

function displayPasswords(data = passwords) {

    tableBody.innerHTML = "";

    updateCounter();

    data.forEach((item, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
<td>
<a href="${item.website.startsWith("http") ? item.website : "https://" + item.website}" target="_blank">
${item.website}
</a>
</td>

<td>${item.username}</td>

<td>
<input
type="password"
id="pass${index}"
class="tablePassword"
value="${item.password}"
readonly>

<button
class="showBtn"
onclick="toggleTablePassword(${index})">
👁
</button>
</td>

<td>
<button
class="copyBtn"
onclick="copyPassword('${item.password}')">
📋
</button>
</td>

<td>
<button
class="editBtn"
onclick="editPassword(${index})">
✏
</button>
</td>

<td>
<button
class="deleteBtn"
onclick="deletePassword(${index})">
🗑
</button>
</td>

<td>
<a href="${item.website.startsWith("http") ? item.website : "https://" + item.website}" target="_blank">
<button class="openBtn">
🔓
</button>
</a>
</td>
`;

        tableBody.appendChild(row);

    });

}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const data = {

        website: website.value.trim(),
        username: username.value.trim(),
        password: password.value.trim()

    };

    if (!data.website || !data.username || !data.password) {

        alert("Please fill all fields.");

        return;

    }

    if (editIndex === -1) {

        passwords.push(data);

    } else {

        passwords[editIndex] = data;

        editIndex = -1;

    }

    saveData();

    displayPasswords();

    form.reset();

});

function deletePassword(index) {

    if (confirm("Delete this password?")) {

        passwords.splice(index, 1);

        saveData();

        displayPasswords();

    }

}

function editPassword(index) {

    website.value = passwords[index].website;

    username.value = passwords[index].username;

    password.value = passwords[index].password;

    editIndex = index;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function copyPassword(pass) {

    navigator.clipboard.writeText(pass);

    alert("Password Copied Successfully");

}

function toggleTablePassword(index) {

    const input = document.getElementById("pass" + index);

    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";

    }

}

search.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const filtered = passwords.filter(item =>

        item.website.toLowerCase().includes(value) ||

        item.username.toLowerCase().includes(value)

    );

    displayPasswords(filtered);

});

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");

        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");

        togglePassword.classList.add("fa-eye");

    }

});

window.addEventListener("load", function () {

    displayPasswords();

    masterInput.focus();

});

