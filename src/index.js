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
const title = document.getElementById("title");
const addTransactionPanel = querySelector(".add-transaction-panel");

const nameInput = querySelector("#name"); //input -> add name transaction
const amountInput = querySelector("#amount"); // input -> add value transaction
const categorySelect = querySelector("#category"); //select

const addTransactionBtn = querySelector(".add-transaction");
const saveBtn = querySelector(".save");
const cancelBtn = querySelector(".cancel");
const deleteAllBtn = querySelector(".delete-all");

// let entryList = [];

let id = 0;
// let selectedCategory;
// let moneyArr = [0];

const deleteButtonFunc = (id) => {
  const type = transactionIncome.find(({ id: incomeId }) => incomeId === id)
    ? "income"
    : "expenses";

  type === "income"
    ? (transactionIncome = transactionIncome.filter(({ id: incomeId }) => {
        return incomeId !== id;
      }))
    : (transactionExpenses = transactionExpenses.filter(
        ({ id: expensesId }) => {
          return expensesId !== id;
        }
      ));

  sumFunction(type);

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

  editBtn.addEventListener("click", showPanel);
};

const renderList = () => {
  incomeId.innerHTML = "";
  expensesId.innerHTML = "";

  transactionIncome.map(({ name, value, id }) => {
    const li = createElement("li");
    li.className = "incomeLi";
    const newIncome = createElement("div");
    newIncome.innerHTML = `${name} - ${value} zł`;
    li.appendChild(newIncome);
    incomeId.appendChild(li);
    addDeleteBtn(li, id);
    addEditBtn(li);
  });
  transactionExpenses.map(({ name, value, id }) => {
    const li = createElement("li");
    li.className = "expenseLi";
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
  cancelBtn.addEventListener("click", () => {
    addTransactionPanel.style.display = "none";
  });
};

const addTransaction = (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const value = amountInput.value;

  categorySelect.value === "income"
    ? (transactionIncome = [...transactionIncome, { name, value, id }])
    : (transactionExpenses = [...transactionExpenses, { name, value, id }]);

  sumFunction(categorySelect.value);

  showBudget(transactionIncome, transactionExpenses);

  console.log(transactionIncome, transactionExpenses);

  id++;
  nameInput.value = "";
  amountInput.value = "";

  renderApp();
};

const sumFunction = (type) => {
  let sumValueIncome;
  let sumValueExpense;

  type === "income"
    ? ((sumValueIncome = transactionIncome
        .map((item) => parseFloat(item.value))
        .reduce((prev, curr) => prev + curr, 0)),
      0)
    : (sumValueExpense = transactionExpenses
        .map((item) => parseFloat(item.value))
        .reduce((prev, curr) => prev + curr, 0));

  showSum(type, sumValueIncome, sumValueExpense);
};

const showSum = (type, sumValueIncome, sumValueExpense) => {
  const divWithSumIncome = `<div class="show-sum" id="sum">
      Suma: ${sumValueIncome}
    </div>`;
  const divWithSumExpense = `<div class="show-sum" id="sum">
    Suma: ${sumValueExpense}
  </div>`;

  if (type === "income") {
    const sum = incomeSection.querySelector("#sum");

    sum
      ? (sum.innerHTML = `Suma: ${sumValueIncome}`)
      : incomeSection.insertAdjacentHTML("beforeend", divWithSumIncome);
  } else {
    const sum = expensesSection.querySelector("#sum");

    sum
      ? (sum.innerHTML = `Suma: ${sumValueExpense}`)
      : expensesSection.insertAdjacentHTML("beforeend", divWithSumExpense);
  }

  showBudget(transactionIncome, transactionExpenses);
};

const showBudget = (transactionIncome, transactionExpenses) => {
  console.log(transactionIncome, transactionExpenses);
  const sumPanelIncme = transactionIncome
    .map((item) => parseFloat(item.value))
    .reduce((prev, curr) => prev + curr, 0);
  const sumPanelExp = transactionExpenses
    .map((item) => parseFloat(item.value))
    .reduce((prev, curr) => prev + curr, 0);

  const sumPanel = sumPanelIncme - sumPanelExp;

  showBalance(sumPanel);
};

const showBalance = (sumPanel) => {
  if (sumPanel > 0) {
    title.innerHTML = "Możesz jeszcze wydać:";
    console.log(title);
    availableMoney.textContent = `${sumPanel} zł`;
  } else if (sumPanel < 0) {
    title.innerHTML = "Bilans jest ujemny. Jesteś na minusie:";
    console.log(title);
    availableMoney.textContent = `${sumPanel} zł`;
  } else {
    title.innerHTML = "Bilans wynosi:";
    console.log(title);
    availableMoney.textContent = `${sumPanel} zł`;
  }
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
    // addTransaction();
    console.log("jest ok");
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
