import { v4 as uuid4 } from "https://jspm.dev/uuid";

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

const addDeleteBtn = (li, id) => {
  const deleteBtn = createElement("button");
  deleteBtn.classList.add("delete");
  const addIconX = createElement("i");
  addIconX.classList.add("fas fa-times");
  deleteBtn.appendChild(addIconX);
  li.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    transactionIncome = transactionIncome.filter(({ id: incomeId }) => {
      return incomeId !== id;
    });

    transactionExpenses = transactionExpenses.filter(({ id: expensesId }) => {
      return expensesId !== id;
    });
    renderApp();
  });
};

const addEditBtn = (li) => {
  const editBtn = createElement("button");
  editBtn.classList.add("edit");
  const addIconPen = createElement("i");
  addIconPen.classList.add("fas fa-pen");
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

    addDeleteBtn();
    addEditBtn();
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

  const id = uuid4();

  // dopisać warunek, jeśli zostanie wybrana kategoria income to uruchom transactionIncome i na dodwrót
  transactionIncome = [...transactionIncome, { name, value, id }];

  transactionExpenses = [...transactionExpenses, { name, value, id }];
  console.log({ name, value, id });

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
