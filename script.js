const list = document.getElementById('list');
const form = document.getElementById('form');
const name = document.getElementById('name');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');

const localStorageemployees = JSON.parse(
  localStorage.getItem('employees')
);

let employees =
  localStorage.getItem('employees') !== null ? localStorageemployees : [];

// Add employee
function addemployee(e) {
  e.preventDefault();

  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (name.value.trim() === '' || mobile.value.trim() === '' || mobile.value <0 || email.value.trim() === '' || !(email.value.match(mailformat))) {
    alert('Please add a valid name, mobile and email');
  } else {
    const employee = {
      id: generateID(),
      name: name.value,
      mobile: mobile.value,
      email: email.value
    };

    employees.push(employee);

    addemployeeDOM(employee);

    updateLocalStorage();

    name.value = '';
    mobile.value = '';
    email.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add employees to DOM list
function addemployeeDOM(employee) {
  const item = document.createElement('table');

  item.innerHTML = `
    <tr>
      <td class="header">Name</td>
      <td class="header mobile">Mobile No.</td>
    </tr>

    <tr>
      <td class="text">${employee.name}</td>
      <td class="text">${employee.mobile}</td>
    </tr>

    <tr>
      <td class="header">Email ID</td>
    </tr>

    <tr>
      <td class="text">${employee.email}</td>
      <td><button class="btn" onclick="removeemployee(${employee.id})">Delete</button></td>
    </tr>

    <tr class="spaces"></tr>
    `;

  list.appendChild(item);
}

// Remove employee by ID
function removeemployee(id) {
  employees = employees.filter(employee => employee.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage employees
function updateLocalStorage() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

function init() {
  list.innerHTML = '';

  employees.forEach(addemployeeDOM);
}

init();

form.addEventListener('submit', addemployee);
