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
const budgetPercentp = document.getElementById("budget-percent");

let products = [];
let currentBudget = 0;

function setBudget() {
  currentBudget = Number(totalamount.value);
  budgetp.innerHTML = "budget: " + currentBudget + "$";
  totalamount.value = "";
  update();
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
    suma += product.cena;
  });

  priceallp.innerHTML = "price of all products: " + suma + "$";

  const procent = currentBudget > 0 ? (suma / currentBudget) * 100 : 0;
  budgetPercentp.innerHTML = "Budget used: " + procent.toFixed(1) + "%";
}

function addItem() {
  const nameItem = itemName.value;
  const cost = costProduct.value;
  if (!validateEmpty(nameItem, cost)) return;
  errorMessage.textContent = "";

  const newProduct = { id: Date.now(), nazwa: nameItem, cena: Number(cost) };
  products.push(newProduct);

  const newElement = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.textContent = newProduct.nazwa + " - " + newProduct.cena + "$";
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
    if (actionsContainer.querySelector("input")) return;

    const editNameInput = document.createElement("input");
    editNameInput.type = "text";
    editNameInput.value = newProduct.nazwa;

    const editCostInput = document.createElement("input");
    editCostInput.type = "number";
    editCostInput.value = newProduct.cena;

    const confirm = document.createElement("button");
    confirm.textContent = "confirm";

    actionsContainer.appendChild(editNameInput);
    actionsContainer.appendChild(editCostInput);
    actionsContainer.appendChild(confirm);

    confirm.addEventListener("click", function () {
      const newName = editNameInput.value;
      const newCost = Number(editCostInput.value);

      if (newName === "" || editCostInput.value === "") return;

      newProduct.nazwa = newName;
      newProduct.cena = newCost;
      textSpan.textContent = newName + " - " + newCost + "$";

      editNameInput.remove();
      editCostInput.remove();
      confirm.remove();
      update();
    });
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
