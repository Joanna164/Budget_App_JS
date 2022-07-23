// import { v4 as uuidv4 } from "uuid";

const querySelector = (selector) => document.querySelector(selector);
const createElement = (element) => document.createElement(element);

let transactionIncome = [];
let transactionExpenses = [];

const incomeId = querySelector("#incomeId"); // ul income
const expensesId = querySelector("#expensesId"); // ul expenses
const categoryIncome = querySelector(".incomeValue"); //option
const categoryExpenses = querySelector(".expensesValue"); //option

const incomeSection = querySelector(".income-area"); //div
const expensesSection = querySelector(".expenses-area"); // div
const availableMoney = querySelector(".available-money"); // p
const addTransactionPanel = querySelector(".add-transaction-panel");

const nameInput = querySelector("#name"); //input -> add name transaction
const amountInput = querySelector("#amount"); // input -> add value transaction
const categorySelect = querySelector("#category"); //select

const addTransactionBtn = querySelector(".add-transaction");
const saveBtn = querySelector(".save");
const cancelBtn = querySelector(".cancel");
const deleteAllBtn = querySelector(".delete-all");

// let ID = 0;
// let selectedCategory;
// let moneyArr = [0];

const deleteButtonFunc = (id) => {
  transactionIncome = transactionIncome.filter(({ id: incomeId }) => {
    return incomeId !== id;
  });
  transactionExpenses = transactionExpenses.filter(({ id: expensesId }) => {
    return expensesId !== id;
  });
  renderApp();
};

const addDeleteBtn = (li, id) => {
  const deleteBtn = createElement("button");
  deleteBtn.className = "delete";
  const addIconX = createElement("i");
  addIconX.className = "fas fa-times";
  deleteBtn.appendChild(addIconX);
  li.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => deleteButtonFunc(id));
};

const addEditBtn = (li) => {
  const editBtn = createElement("button");
  editBtn.className = "edit";
  const addIconPen = createElement("i");
  addIconPen.className = "fas fa-pen";
  editBtn.appendChild(addIconPen);
  li.appendChild(editBtn);
};

const renderList = () => {
  incomeId.innerHTML = "";
  expensesId.innerHTML = "";

  transactionIncome.map(({ name, value, id }) => {
    const li = createElement("li");
    const newIncome = createElement("div");
    newIncome.innerHTML = `${name} - ${value} zł`;
    li.appendChild(newIncome);
    incomeId.appendChild(li);
    addDeleteBtn(li, id);
    addEditBtn(li);
  });
  transactionExpenses.map(({ name, value, id }) => {
    const li = createElement("li");

    const newExpenses = createElement("div");
    newExpenses.innerHTML = `${name} - ${value} zł`;
    li.appendChild(newExpenses);
    expensesId.appendChild(li);

    addDeleteBtn(li, id);
    addEditBtn(li);
  });
};

const renderApp = () => {
  renderList();
};

const editPanel = () => {
  showPanel();
};

const addTransaction = (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const value = amountInput.value;

  // const id = uuidv4();
  const id = Math.floor(Math.random() * 1000);

  categorySelect.value === "income"
    ? (transactionIncome = [...transactionIncome, { name, value, id }])
    : (transactionExpenses = [...transactionExpenses, { name, value, id }]);

  sumFunction();

  nameInput.value = "";
  amountInput.value = "";

  renderApp();
};

const sumFunction = () => {
  let sumValue;
  categorySelect.value === "income"
    ? (sumValue = transactionIncome
        .map((item) => parseFloat(item.value))
        .reduce((prev, curr) => prev + curr))
    : (sumValue = transactionExpenses
        .map((item) => parseFloat(item.value))
        .reduce((prev, curr) => prev + curr));

  if (sumValue > 0) {
    showSum(sumValue);
  }

  // showBudget(sumValue);
  // sumuje wartosci z li
};

const showSum = (sumValue) => {
  removeSum();
  const divWithSum = `<div class="show-sum" id="sum">Suma: ${sumValue}</div>`;
  categorySelect.value === "income"
    ? incomeSection.insertAdjacentHTML("beforeend", divWithSum)
    : expensesSection.insertAdjacentHTML("beforeend", divWithSum);

  // nie znika po usunieciu wszytskich elementow
  // dodaje sie za kazdym razem w momencie dodania nowego elementu
};

const removeSum = () => {
  const removeSumDiv = document.getElementById("sum");
  if (removeSumDiv) {
    incomeSection.removeChild(removeSumDiv);
    expensesSection.removeChild(removeSumDiv);
  }
};

const showBudget = (sumValue) => {
  // const newArr = [sumValue];
  // const value = sumValue
  //   .map((item) => parseFloat(item.value))
  //   .reduce((a, b) => a + b);
  // const sumPanel = sumFunction(sumValue).reduce((a, b) => a + b);

  // availableMoney.textContent = `${value} zł`;

  console.log(value);
  //suma przych + syma wyd
  // if wieksze/mniejsze
  // Jeżeli suma przychodów jest większa od wydatków to aplikacja
  //   powinna pokazywać komunikat: “Możesz jeszcze wydać XXX złotych”.
  //   Jeżeli różnica wyniesie 0, komunikat powinien brzmieć: “Bilans wynosi zero”.
  //   Jeżeli wydatków jest więcej, komunikat powinien wyglądać tak: “Bilans jest
  //   ujemny. Jesteś na minusie XXX złotych”.
};

const showPanel = () => {
  addTransactionPanel.style.display = "flex";
};

const closePanel = () => {
  addTransactionPanel.style.display = "none";
  clearInputs();
};

const checkForm = () => {
  if (
    nameInput.value !== "" &&
    amountInput.value !== "" &&
    categorySelect.value !== "none"
  ) {
    // createNewTransaction();
    addTransaction();
  } else {
  }
  alert("Wypełnij wszystkie pola!");
};

const clearInputs = () => {
  nameInput.value !== "";
  amountInput.value !== "";
  categorySelect.selectedIndex = 0;
};

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", (event) => {
  addTransaction(event);
  closePanel();
});
// saveBtn.addEventListener("click", checkForm);
