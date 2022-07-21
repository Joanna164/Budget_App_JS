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
// const deleteBtn = querySelector(".delete");
const deleteAllBtn = querySelector(".delete-all");

// let root = document.documentElement;
// let ID = 0;
// let categoryIcon;
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

saveBtn.addEventListener("click", (event) => {
  addTransaction(event);
});

const addTransaction = (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const value = amountInput.value;

  // const id = uuidv4();
  const id = Math.floor(Math.random() * 1000);

  // dopisać warunek, jeśli zostanie wybrana kategoria income to uruchom transactionIncome i na dodwrót

  categorySelect.value === "income"
    ? (transactionIncome = [...transactionIncome, { name, value, id }])
    : (transactionExpenses = [...transactionExpenses, { name, value, id }]);
  console.log(transactionIncome.forEach((item) => console.log(item.value)));

  nameInput.value = "";
  amountInput.value = "";
  renderApp();
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
    createNewTransaction();
  } else {
  }
  alert("Wypełnij wszystkie pola!");
};

const clearInputs = () => {
  nameInput.value !== "";
  amountInput.value !== "";
  categorySelect.selectedIndex = 0;
};

const checkCategory = (transaction) => {
  switch (transaction) {
    case "[ + ] Przychód":
      categoryIcon = '<i class = "fas fa-money-bill-wave"></i>';
      break;
    case "[ - ] Wydatki":
      categoryIcon = '<i class = "fas fa-cart-arrow-down"></i>';
      break;
  }
};

addTransactionBtn.addEventListener("click", showPanel);
// cancelBtn.addEventListener("click", closePanel);
// saveBtn.addEventListener("click", checkForm);
