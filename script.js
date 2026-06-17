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

let produkty = [];

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
  produkty.forEach((produkt) => {
    suma += Number(produkt.cena);
  });
  priceallp.innerHTML = "price of all products: " + suma + "$";
}

function addItem() {
  const nameItem = itemName.value;
  const cost = costProduct.value;
  if (!validateEmpty(nameItem, cost)) return;
  errorMessage.textContent = "";
  const nowyProdukt = { id: Date.now(), nazwa: nameItem, cena: cost };
  produkty.push(nowyProdukt);
  const newElement = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.textContent = nameItem + " - " + cost + "$";
  newElement.appendChild(textSpan);
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", function () {
    produkty = produkty.filter((p) => p.id !== nowyProdukt.id);
    newElement.remove();
    update();
  });
  newElement.appendChild(deleteButton);
  list.appendChild(newElement);
  itemName.value = "";
  costProduct.value = "";
  update();
}

checkamountbutton.addEventListener("click", addItem);

function clearall() {
  produkty = [];
  list.innerHTML = "";
  update();
}
clearallbutton.addEventListener("click", clearall);
