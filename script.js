function checkBodySize() {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let resultBox = document.getElementById("result");

    if (!height || !weight) {
        resultBox.innerHTML = "Please enter both height and weight.";
        return;
    }

    let h = height / 100;
    let bmi = (weight / (h * h)).toFixed(1);

    let category = "";

    if (bmi < 18.5) {
        category = "Slim Body Size";
    } else if (bmi >= 18.5 && bmi < 25) {
        category = "Average / Fit Body Size";
    } else if (bmi >= 25 && bmi < 30) {
        category = "Large Body Size";
    } else {
        category = "Extra Large Body Size";
    }

    resultBox.innerHTML = `
        Your BMI: <strong>${bmi}</strong><br>
        Category: <strong>${category}</strong>
    `;
}
