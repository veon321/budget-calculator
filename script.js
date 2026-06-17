const totalamount = document.getElementById("total-amount");
const setBudgetButton = document.getElementById("set-budget");
const budgetp = document.getElementById("budget");
const itemName = document.getElementById("title");
const costProduct = document.getElementById("cost");
const checkamountbutton = document.getElementById("check-amount");
const list = document.getElementById("list");
const errorMessage = document.getElementById("error-message");
const clearallbutton = document.getElementById("clearall");

let produkty = [];

function setBudget() {
  console.log("test");
  const budgetValue = Number(totalamount.value);
  budgetp.innerHTML = "budget: " + budgetValue + "$";
  totalamount.value = "";
}
setBudgetButton.addEventListener("click", setBudget);

function addItem() {
  const nameItem = itemName.value;
  const cost = costProduct.value;
  if (nameItem === "" || cost === "") {
    errorMessage.textContent =
      "Please complete both fields before adding a product!";
    errorMessage.className = "error-text";
    return;
  }
  errorMessage.textContent = "";
  produkty.push({ nazwa: nameItem, cena: cost });
  const newElement = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.textContent = nameItem + " - " + cost + "$";
  newElement.appendChild(textSpan);
  const deleteButton = document.createElement("button");
  deleteButton.id = "detelebutton";
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", function () {
    newElement.remove();
  });
  newElement.appendChild(deleteButton);
  list.appendChild(newElement);
  itemName.value = "";
  costProduct.value = "";
}

checkamountbutton.addEventListener("click", addItem);

function clearall() {
  produkty = [];
  list.innerHTML = "";
}
clearallbutton.addEventListener("click", clearall);
