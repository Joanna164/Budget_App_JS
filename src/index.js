const querySelector = (selector) => document.querySelector(selector);
const createElement = (element) => document.createElement(element);

let transactionIncome = [];
let transactionExpenses = [];

const incomeId = querySelector("#incomeId");
const expensesId = querySelector("#expensesId");
const categoryIncome = querySelector(".incomeValue");
const categoryExpenses = querySelector(".expensesValue");

const incomeSection = querySelector(".income-area");
const expensesSection = querySelector(".expenses-area");
const availableMoney = querySelector(".available-money");
const title = document.getElementById("title");
const addTransactionPanel = querySelector(".add-transaction-panel");

const nameInput = querySelector("#name");
const amountInput = querySelector("#amount");
const categorySelect = querySelector("#category");

const addTransactionBtn = querySelector(".add-transaction");
const saveBtn = querySelector(".save");
const cancelBtn = querySelector(".cancel");
const deleteAllBtn = querySelector(".delete-all");
const editTransactionPanel = querySelector(".edit-transaction-panel");
const editName = querySelector("#edit-name");
const editAmount = querySelector("#edit-amount");
const saveEditBtn = querySelector("#save-edit");

let id = 0;

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

const addEditBtn = (li, id) => {
  const editBtn = createElement("button");
  editBtn.className = "edit";
  const addIconPen = createElement("i");
  addIconPen.className = "fas fa-pen";
  editBtn.appendChild(addIconPen);
  li.appendChild(editBtn);

  editBtn.addEventListener("click", (event) => showEditPanel(li, id, event));
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
    addEditBtn(li, id);
  });
  transactionExpenses.map(({ name, value, id }) => {
    const li = createElement("li");
    li.className = "expenseLi";
    const newExpenses = createElement("div");
    newExpenses.innerHTML = `${name} - ${value} zł`;
    li.appendChild(newExpenses);
    expensesId.appendChild(li);

    addDeleteBtn(li, id);
    addEditBtn(li, id);
    editPanel();
  });
};

const editPanel = () => {
  showEditPanel();
  cancelBtn.addEventListener("click", () => {
    editTransactionPanel.style.display = "none";
    closePanel();
  });
};

const showEditPanel = (li, id, event) => {
  event.preventDefault();
  editTransactionPanel.style.display = "flex";

  const typeEdit = transactionIncome.find(({ id: incomeId }) => incomeId === id)
    ? "income"
    : "expenses";

  if (typeEdit === "income") {
    const { name, value } = transactionIncome.find(
      ({ id: incomeId }) => incomeId === id
    );
    editName.value = name;
    editAmount.value = value;
    const setUpdateIncome = (newName, newValue) => {
      const editIncome = transactionIncome.map((transaction) =>
        transaction.id === incomeId
          ? { ...transactionIncome, name: newName, value: newValue }
          : transactionIncome
      );
      transactionIncome = editIncome;
    };
    saveEditBtn.addEventListener(
      "click",
      setUpdateIncome(editName.value, editAmount.value)
    );
  } else {
    const { name, value } = transactionExpenses.find(
      ({ id: expensesId }) => expensesId === id
    );
    editName.value = name;
    editAmount.value = value;

    const setUpdateExpenses = (expensesId, newName, newValue) => {
      const editExpenses = transactionExpenses.map((transaction) =>
        transaction.id === expensesId
          ? { ...transactionExpenses, name: newName, value: newValue }
          : transactionExpenses
      );
      transactionExpenses = editExpenses;
    };
    saveEditBtn.addEventListener("click", setUpdateExpenses());
  }

  // const setStudentName = (studentId, newName) => {
  //   const newStudents = students.map((student) => student.id === studentId ? {...student, name: newName} : student);
  //   students = newStudents;
};

const renderApp = () => {
  renderList();
};

const addTransaction = (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const value = amountInput.value;

  if (value == "") {
    alert("Wpisz poprawną kwotę!");
  } else if (name == "") {
    alert("Wpisz poprawną nazwę transakcji!");
  } else if (value < 0) {
    alert("Wpisz poprawną kwotę!");
  } else {
    categorySelect.value === "income"
      ? (transactionIncome = [...transactionIncome, { name, value, id }])
      : (transactionExpenses = [...transactionExpenses, { name, value, id }]);
  }

  sumFunction(categorySelect.value);

  showBudget(transactionIncome, transactionExpenses);

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
      ? (sum.innerHTML = `Suma: ${sumValueIncome.toFixed(2)}`)
      : incomeSection.insertAdjacentHTML("beforeend", divWithSumIncome);
  } else {
    const sum = expensesSection.querySelector("#sum");

    sum
      ? (sum.innerHTML = `Suma: ${sumValueExpense.toFixed(2)}`)
      : expensesSection.insertAdjacentHTML("beforeend", divWithSumExpense);
  }

  showBudget(transactionIncome, transactionExpenses);
};

const showBudget = (transactionIncome, transactionExpenses) => {
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
    title.textContent = "Możesz jeszcze wydać:";
    availableMoney.textContent = `${sumPanel.toFixed(2)} zł`;
  } else if (sumPanel < 0) {
    title.textContent = "Bilans jest ujemny. Jesteś na minusie:";
    availableMoney.textContent = `${sumPanel.toFixed(2)} zł`;
  } else {
    title.textContent = "Bilans wynosi:";
    availableMoney.textContent = `${sumPanel.toFixed(2)} zł`;
  }
};

const showPanel = () => {
  addTransactionPanel.style.display = "flex";
};

const closePanel = () => {
  addTransactionPanel.style.display = "none";
  clearInputs();
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
// saveEditBtn.addEventListener("click", () => {});
