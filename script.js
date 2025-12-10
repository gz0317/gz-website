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

// STAR BACKGROUND
const starCanvas = document.getElementById("star-canvas");
const ctx = starCanvas.getContext("2d");
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

const stars = [];
const numStars = 100;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
    });
}

function animateStars() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.fill();
        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0) star.x = starCanvas.width;
        if (star.x > starCanvas.width) star.x = 0;
        if (star.y < 0) star.y = starCanvas.height;
        if (star.y > starCanvas.height) star.y = 0;
    }
    requestAnimationFrame(animateStars);
}

animateStars();

// Handle resize
window.addEventListener("resize", () => {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
});
