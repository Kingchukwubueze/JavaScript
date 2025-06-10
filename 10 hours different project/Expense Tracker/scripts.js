const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById('income-amount');
const expenseAmountEl = document.getElementById('expense-amount');
const transactionListEl = document.getElementById('transaction-list');
const transactionFormEl = document.getElementById('transaction-form');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');

let transaction = [];

try {
  const stored = JSON.parse(localStorage.getItem("transaction"));
  if (Array.isArray(stored)) {
    transaction = stored;
  }
} catch (e) {
  console.error("Error loading transactions from localStorage");
}

function addTransaction(e) {
  e.preventDefault();
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);

  if (!description || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  transaction.push({
    id: Date.now(),
    description,
    amount
  });

  localStorage.setItem("transaction", JSON.stringify(transaction));
  updateTransactionList();
  updateSummary();
  transactionFormEl.reset();
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";
  const sortedTransaction = [...transaction].reverse();

  sortedTransaction.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    transactionListEl.appendChild(transactionEl);
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");
  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>
  `;
  return li;
}

function updateSummary() {
  const balance = transaction.reduce((acc, t) => acc + t.amount, 0);
  const income = transaction.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = transaction.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expense);
}

function formatCurrency(number) {
  const sign = number < 0 ? "-" : "";
  return sign + new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(Math.abs(number));
}

function removeTransaction(id) {
  transaction = transaction.filter(t => t.id !== id);
  localStorage.setItem("transaction", JSON.stringify(transaction));
  updateTransactionList();
  updateSummary();
}

window.removeTransaction = removeTransaction;
transactionFormEl.addEventListener("submit", addTransaction);
updateTransactionList();
updateSummary();
