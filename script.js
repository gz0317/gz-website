// Add another income input
function addIncome() {
    const div = document.getElementById("income-list");
    const input = document.createElement("input");
    input.type = "number";
    input.className = "income";
    input.placeholder = "Enter income";
    div.appendChild(input);
}

// Add another expense input
function addExpense() {
    const div = document.getElementById("expense-list");
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.className = "expense-name";
    inputName.placeholder = "Expense name";

    const inputAmount = document.createElement("input");
    inputAmount.type = "number";
    inputAmount.className = "expense-amount";
    inputAmount.placeholder = "Amount";

    div.appendChild(inputName);
    div.appendChild(inputAmount);
}

// Calculate recommended car price
function calculateCarBudget() {
    // Get all incomes
    const incomeInputs = document.querySelectorAll(".income");
    let totalIncome = 0;
    incomeInputs.forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val)) totalIncome += val;
    });

    // Get all expenses
    const expenseAmounts = document.querySelectorAll(".expense-amount");
    let totalExpenses = 0;
    expenseAmounts.forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val)) totalExpenses += val;
    });

    // Available monthly budget
    const availableMonthly = totalIncome - totalExpenses;
    if (availableMonthly <= 0) {
        document.getElementById("result").innerHTML = "Your expenses exceed your income!";
        return;
    }

    // Get loan years
    const years = parseInt(document.getElementById("loan-years").value);

    // Assume interest rate 5% annual simple interest
    const interestRate = 0.05;
    const totalInterest = availableMonthly * years * 12 * interestRate;

    // Recommended car price (simple: max 50% of remaining income * years)
    const recommendedCarPrice = (availableMonthly * 12 * years * 0.5) + totalInterest;

    // Monthly installment
    const monthlyInstallment = recommendedCarPrice / (years * 12);

    // Display result
    document.getElementById("result").innerHTML = `
        <strong>Recommended Car Price:</strong> $${recommendedCarPrice.toFixed(2)}<br>
        <strong>Monthly Installment:</strong> $${monthlyInstallment.toFixed(2)} per month for ${years} years
    `;
}
