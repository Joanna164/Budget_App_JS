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

// let entryList = [];

let id = 0;
// // let selectedCategory;
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
    console.log(li);
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

  // const id = uuidv4();
  // const id = Math.floor(Math.random() * 1000);

  categorySelect.value === "income"
    ? (transactionIncome = [...transactionIncome, { name, value, id }])
    : (transactionExpenses = [...transactionExpenses, { name, value, id }]);

  sumFunction(categorySelect.value);
  // showBudget(transactionIncome, transactionExpenses);
  console.log(transactionIncome);
  console.log(transactionExpenses);
  id++;
  nameInput.value = "";
  amountInput.value = "";

  renderApp();
};

const sumFunction = (type) => {
  let sumValue;
  type === "income"
    ? ((sumValue = transactionIncome
        .map((item) => parseFloat(item.value))
        .reduce((prev, curr) => prev + curr, 0)),
      0)
    : (sumValue = transactionExpenses
        .map((item) => parseFloat(item.value))
        .reduce((prev, curr) => prev + curr, 0));

  if (sumValue > 0) {
    showSum(type, sumValue);
  }

  // sumuje wartosci z li
};

const showSum = (type, sumValue) => {
  const divWithSum = `<div class="show-sum" id="sum">
      Suma: ${sumValue}
    </div>`;

  if (type === "income") {
    const sum = incomeSection.querySelector("#sum");

    sum
      ? (sum.innerHTML = `Suma: ${sumValue}`)
      : incomeSection.insertAdjacentHTML("beforeend", divWithSum);
  } else {
    const sum = expensesSection.querySelector("#sum");

    sum
      ? (sum.innerHTML = `Suma: ${sumValue}`)
      : expensesSection.insertAdjacentHTML("beforeend", divWithSum);
  }

  // showBudget(transactionIncome, transactionExpenses);
  // removeSum(sumValue);
};

// const removeSum = (sumValue) => {
//   const clearSum = `<div class="show-sum" id="sum">
//   Suma: 0 zł
// </div>`;

//   (transactionIncome.length = 0) || (transactionExpenses.length = 0)
//     ? removeSumDiv
//     : clearSum;
//   // }
//   // if ((transactionExpenses.length = 0)) {
//   //   divWithSum = clearSum;
//   // }

//   const removeSumDiv = document.getElementById("sum");
//   if (removeSumDiv) {
//     removeSumDiv.innerHTML = `Suma: ${sumValue}`;
//     incomeSection.removeChild(removeSumDiv);
//     expensesSection.removeChild(removeSumDiv);
//   }
// };

const showBudget = (transactionIncome, transactionExpenses) => {
  console.log(transactionIncome.value);
  const sumPanelIncme = transactionIncome.reduce((a, b) => a + b);
  const sumPanelExp = transactionExpenses.reduce((a, b) => a + b);
  // transactionIncome.value + transactionExpenses.value;
  const sumPanel = sumPanelIncme - sumPanelExp;
  console.log(transactionIncome.value);
  availableMoney.textContent = `${sumPanel} zł`;

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

// const addIncome = () => {
//   if (!nameInput.value || !amountInput.value) return;
//   let income = {
//     type: "incomeLi",
//     title: nameInput.value,
//     amount: parseFloat(amountInput.value),
//   };
//   entyList.push(income);
//   clearInput([nameInput, amountInput]);
// };

// const addExpense = () => {
//   if (!nameInput.value || !amountInput.value) return;
//   let expense = {
//     type: "expenseLi",
//     title: nameInput.value,
//     amount: parseFloat(amountInput.value),
//   };
//   entyList.push(expense);
//   clearInput([nameInput, amountInput]);
// };

// const clearInput = (inputsArray) => {
//   inputsArray.forEach((input) => {
//     input.value = "";
//   });
// };

// const calculateSum = () => {
//   let sum = 0;
//   entyList.forEach((entry) => {
//     if (entry.type == type) {
//       sum += entry.amount;
//     }
//   });
//   return sum;
// };

// income = calculateSum("income", entyList);
// outcome = calculateSum("expense", entyList);
