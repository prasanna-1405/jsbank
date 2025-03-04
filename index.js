let users = [];
let user = {};

function showHeader() {
    document.getElementById('auth-btn').innerHTML = user.email 
        ? `<button class="btn btn-danger" onclick="showLogout()">Logout</button>` 
        : `<button class="btn btn-warning" onclick="showLogin()">Login</button>`;
}

function showUser() {
    let selUser = document.getElementById("selUser");
    if (document.getElementById("type").value == "3") {
        selUser.style.display = "block";
        let str = "<option value='0'>--Select--</option>";
        users.forEach(u => {
            if (u.email !== user.email) {
                str += `<option value="${u.email}">${u.name}</option>`;
            }
        });
        selUser.innerHTML = str;
    } else {
        selUser.style.display = "none";
    }
}

function saveData() {
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    users.forEach(u => {
        if (u.email === user.email) {
            if (type === "1") {
                u.balance += amount;
            } else if (type === "2") {
                if (u.balance >= amount) {
                    u.balance -= amount;
                } else {
                    alert("Insufficient funds!");
                    return;
                }
            } else if (type === "3") {
                let newUser = document.getElementById("selUser").value;
                let recipient = users.find(usr => usr.email === newUser);
                if (recipient) {
                    u.balance -= amount;
                    recipient.balance += amount;
                }
            }
            document.getElementById("spBalance").innerText = u.balance;
        }
    });
}

function showLogout() {
    user = {};
    showHeader();
    showHome();
}

function home() {
    showHeader();
    document.getElementById("root").innerHTML = `
        <div class="card p-4">
            <h3>Welcome, ${user.name}</h3>
            <button class="btn btn-danger my-2" onclick="showLogout()">Logout</button>
            <select id="type" class="form-control my-2" onchange="showUser()">
                <option value="0">--Select--</option>
                <option value="1">Deposit</option>
                <option value="2">Withdraw</option>
                <option value="3">Transfer</option>
            </select>
            <select id="selUser" class="form-control my-2" style="display:none"></select>
            <input type="number" id="amount" class="form-control my-2" placeholder="Enter Amount">
            <button onclick="saveData()" class="btn btn-success w-100 my-2">Submit</button>
            <p><b>Current Balance: <span id="spBalance">${user.balance}</span></b></p>
        </div>
    `;
}

function addUser() {
    let newUser = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value,
        balance: 0,
    };
    users.push(newUser);
    showLogin();
}

function chkUser() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
        user = foundUser;
        home();
    } else {
        document.getElementById("msg").innerHTML = `<p class="text-danger">Access Denied</p>`;
    }
}

function showForm() {
    document.getElementById("root").innerHTML = `
        <div class="card p-4">
            <h2>Registration Form</h2>
            <input type="text" class="form-control my-2" id="name" placeholder="Name">
            <input type="text" class="form-control my-2" id="email" placeholder="Email">
            <input type="password" class="form-control my-2" id="password" placeholder="Password">
            <input type="date" class="form-control my-2" id="dob">
            <button onclick="addUser()" class="btn btn-success w-100 my-2">Submit</button>
            <p>Already a member? <button onclick="showLogin()" class="btn btn-primary w-100 my-2">Login Here</button></p>
        </div>
    `;
}

function showLogin() {
    document.getElementById("root").innerHTML = `
        <div class="card p-4">
            <h2>Login Form</h2>
            <div id="msg"></div>
            <input type="text" id="email" class="form-control my-2" placeholder="Email">
            <input type="password" id="password" class="form-control my-2" placeholder="Password">
            <button onclick="chkUser()" class="btn btn-primary w-100 my-2">Log In</button>
            <button onclick="showForm()" class="btn btn-success w-100 my-2">Create Account</button>
        </div>
    `;
}

function showHome() {
    document.getElementById("root").innerHTML = `
        <div class="card p-4">
            <h3>Welcome to My Bank</h3>
            <p>Manage your finances easily with our services.</p>
            <button onclick="showForm()" class="btn btn-primary w-100">Create Account</button>
        </div>
    `;
}

showHome();
