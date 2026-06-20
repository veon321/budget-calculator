const totalAmountInput = document.getElementById("total-amount");
const setBudgetButton = document.getElementById("set-budget");
const budgetDisplay = document.getElementById("budget");
const itemNameInput = document.getElementById("title");
const costProductInput = document.getElementById("cost");
const checkAmountButton = document.getElementById("check-amount");
const expenseList = document.getElementById("list");
const errorMessage = document.getElementById("error-message");
const errorMessageBudget = document.getElementById("error-message-budget");
const clearAllButton = document.getElementById("clearall");
const priceAllDisplay = document.getElementById("priceall");
const budgetPercentDisplay = document.getElementById("budget-percent");

let products = JSON.parse(localStorage.getItem("products")) || [];
let currentBudget =
  localStorage.getItem("currentBudget") !== null
    ? Number(localStorage.getItem("currentBudget"))
    : 0;

function clearError() {
  errorMessage.textContent = "";
  errorMessage.className = "";
}

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("currentBudget", currentBudget.toString());
}

function setBudget() {
  const budgetValue = Number(totalAmountInput.value);

  if (
    budgetValue < 0 ||
    isNaN(budgetValue) ||
    totalAmountInput.value.trim() === ""
  ) {
    errorMessageBudget.textContent = "Please enter a valid budget!";
    errorMessageBudget.className = "error-text";
    return;
  }

  clearError();
  currentBudget = budgetValue;
  budgetDisplay.textContent = "Budget: " + currentBudget + "$";
  totalAmountInput.value = "";
  saveToLocalStorage();
  updateSummary();
}
setBudgetButton.addEventListener("click", setBudget);

function validateProductInputs(nameItem, cost) {
  if (nameItem.trim() === "" || cost === "") {
    errorMessage.textContent =
      "Please complete both fields before adding a product!";
    errorMessage.className = "error-text";
    return false;
  }
  if (Number(cost) <= 0 || isNaN(Number(cost))) {
    errorMessage.textContent = "The price must be greater than 0!";
    errorMessage.className = "error-text";
    return false;
  }
  return true;
}

function updateSummary() {
  let totalSum = 0;
  products.forEach((product) => {
    totalSum += product.price;
  });

  priceAllDisplay.textContent = "Price of all products: " + totalSum + "$";

  const percentage = currentBudget > 0 ? (totalSum / currentBudget) * 100 : 0;
  budgetPercentDisplay.textContent =
    "Budget used: " + percentage.toFixed(1) + "%";

  if (percentage > 100) {
    budgetPercentDisplay.style.color = "red";
    budgetPercentDisplay.style.fontWeight = "bold";
  } else {
    budgetPercentDisplay.style.color = "";
    budgetPercentDisplay.style.fontWeight = "";
  }
}

function createDOMElement(product) {
  const newElement = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = product.name + " - " + product.price + "$";
  newElement.appendChild(textSpan);

  const actionsContainer = document.createElement("div");
  actionsContainer.className = "expense-actions";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", function () {
    products = products.filter((p) => p.id !== product.id);
    newElement.remove();
    saveToLocalStorage();
    updateSummary();
  });

  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.className = "edit-button";
  editButton.addEventListener("click", function () {
    if (newElement.querySelector(".edit-form")) return;

    textSpan.style.display = "none";
    actionsContainer.style.display = "none";

    const editForm = document.createElement("div");
    editForm.className = "edit-form";

    const editNameInput = document.createElement("input");
    editNameInput.type = "text";
    editNameInput.value = product.name;

    const editCostInput = document.createElement("input");
    editCostInput.type = "number";
    editCostInput.value = product.price;

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "confirm";
    confirmButton.className = "confirm-button";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "cancel";
    cancelButton.className = "cancel-button";

    editForm.appendChild(editNameInput);
    editForm.appendChild(editCostInput);
    editForm.appendChild(confirmButton);
    editForm.appendChild(cancelButton);
    newElement.appendChild(editForm);

    confirmButton.addEventListener("click", function () {
      const newName = editNameInput.value;
      const newCost = Number(editCostInput.value);

      if (newName.trim() === "" || isNaN(newCost) || newCost <= 0) {
        alert("Please enter valid product details!");
        return;
      }

      product.name = newName;
      product.price = newCost;
      textSpan.textContent = newName + " - " + newCost + "$";

      closeEditMode();
      saveToLocalStorage();
      updateSummary();
    });

    cancelButton.addEventListener("click", closeEditMode);

    function closeEditMode() {
      editForm.remove();
      textSpan.style.display = "";
      actionsContainer.style.display = "";
    }
  });

  actionsContainer.appendChild(editButton);
  actionsContainer.appendChild(deleteButton);
  newElement.appendChild(actionsContainer);
  expenseList.appendChild(newElement);
}

function addItem() {
  const nameItem = itemNameInput.value;
  const cost = costProductInput.value;

  if (!validateProductInputs(nameItem, cost)) return;
  clearError();

  const newProduct = {
    id: Date.now(),
    name: nameItem,
    price: Number(cost),
  };
  products.push(newProduct);

  createDOMElement(newProduct);

  itemNameInput.value = "";
  costProductInput.value = "";
  itemNameInput.focus();

  saveToLocalStorage();
  updateSummary();
}
checkAmountButton.addEventListener("click", addItem);

function clearAll() {
  if (products.length === 0 && currentBudget === 0) return;

  if (!confirm("Are you sure you want to clear all data?")) return;

  products = [];
  currentBudget = 0;
  expenseList.innerHTML = "";
  budgetDisplay.textContent = "Budget: 0$";
  clearError();
  saveToLocalStorage();
  updateSummary();
}
clearAllButton.addEventListener("click", clearAll);

function init() {
  budgetDisplay.textContent = "Budget: " + currentBudget + "$";

  products.forEach((product) => {
    createDOMElement(product);
  });
  updateSummary();
}
init();
