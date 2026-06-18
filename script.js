const totalamount = document.getElementById("total-amount");
const setBudgetButton = document.getElementById("set-budget");
const budgetp = document.getElementById("budget");
const itemName = document.getElementById("title");
const costProduct = document.getElementById("cost");
const checkamountbutton = document.getElementById("check-amount");
const list = document.getElementById("list");
const errorMessage = document.getElementById("error-message");
const clearallbutton = document.getElementById("clearall");
const priceallp = document.getElementById("priceall");

let products = [];

function setBudget() {
  const budgetValue = Number(totalamount.value);
  budgetp.innerHTML = "budget: " + budgetValue + "$";
  totalamount.value = "";
}
setBudgetButton.addEventListener("click", setBudget);

function validateEmpty(nameItem, cost) {
  if (nameItem === "" || cost === "") {
    errorMessage.textContent =
      "Please complete both fields before adding a product!";
    errorMessage.className = "error-text";
    return false;
  }
  return true;
}

function update() {
  let suma = 0;
  products.forEach((product) => {
    suma += Number(product.cena);
  });
  priceallp.innerHTML = "price of all products: " + suma + "$";
}

function edit() {
  const editInput = document.createElement("input");
}

function addItem() {
  const nameItem = itemName.value;
  const cost = costProduct.value;
  if (!validateEmpty(nameItem, cost)) return;
  errorMessage.textContent = "";
  const newProduct = { id: Date.now(), nazwa: nameItem, cena: cost };
  products.push(newProduct);
  const newElement = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.textContent = nameItem + " - " + cost + "$";
  newElement.appendChild(textSpan);
  const actionsContainer = document.createElement("div");
  actionsContainer.className = "expense-actions";
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", function () {
    products = products.filter((p) => p.id !== newProduct.id);
    newElement.remove();
    update();
  });
  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.className = "edit-button";
  editButton.addEventListener("click", function () {
    products = products.filter((p) => p.id !== newProduct.id);
    const editInput = document.createElement("input");
    actionsContainer.appendChild(editInput);
    edit();
  });
  actionsContainer.appendChild(deleteButton);
  actionsContainer.appendChild(editButton);
  newElement.appendChild(actionsContainer);
  list.appendChild(newElement);
  itemName.value = "";
  costProduct.value = "";
  update();
}
checkamountbutton.addEventListener("click", addItem);

function clearall() {
  products = [];
  list.innerHTML = "";
  update();
}
clearallbutton.addEventListener("click", clearall);
