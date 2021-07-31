// variable
let totalBill = 0,
  customTip = 0,
  selectTip = 0,
  noOfPeople = 1;
let totalPerPerson = 0.0,
  tipPerPerson = 0.0;

// get the input fields
let billInput = document.querySelector('#input__bill');
let customInput = document.querySelector('#input__custom');
let peopleInput = document.querySelector('#input__people');

let resetButton = document.querySelector('.btn--reset');

let totalOutput = document.querySelector('.price__total');
totalOutput.innerHTML = '$' + totalPerPerson;
let tipOutput = document.querySelector('.price__tip');
tipOutput.innerHTML = '$' + tipPerPerson;

function getTotalBill(e) {
  billInput.innerHTML = e.target.value;
  totalBill = billInput.value;
  getCalculation(e, true);
}

function getTotalCustomTip(e) {
  resetSelect();
  customInput.innerHTML = e.target.value;
  customTip = customInput.value;
  getCalculation(e, true);
}

function clearTotalCustomTip(e) {
  customInput.value = '';
  customTip = '';
}

function getTotalPeopleNumber(e) {
  peopleInput.innerHTML = e.target.value;
  noOfPeople = peopleInput.value;
  getCalculation(e, true);
}

function CalculateTotalPerPerson(total_bill, no_of_people = 1, tip = 0) {
  totalPerPerson = (parseInt(total_bill) / parseInt(no_of_people)).toFixed(2);
}

function CalculateTipPerPerson(total_bill, no_of_people = 1, tip = 0) {
  tipPerPerson = (
    (parseInt(total_bill) * parseInt(tip)) /
    100 /
    parseInt(no_of_people)
  ).toFixed(2);
}

function resetSelect() {
  document.querySelectorAll('.btn--tip').forEach((btn) => {
    btn.classList.remove('active');
  });
}

function getCalculation(e, value = false) {
  if (value) {
    let tip = customTip ? customTip : selectTip;
    CalculateTotalPerPerson(totalBill, noOfPeople, tip);
    CalculateTipPerPerson(totalBill, noOfPeople, tip);
    totalOutput.innerHTML = '$' + totalPerPerson;
    tipOutput.innerHTML = '$' + tipPerPerson;
  }
}

function handleSelect() {
  const btnClick = function (e) {
    clearTotalCustomTip();
    selectTip = parseInt(this.innerHTML.replace('%', ''));
    if (this.parentNode.getElementsByClassName('active')[0]) {
      this.parentNode
        .getElementsByClassName('active')[0]
        .classList.remove('active');
      this.classList.add('active');
    } else {
      this.classList.add('active');
    }
    getCalculation(e, true);
  };
  document
    .querySelectorAll('.btn--tip')
    .forEach((btn) => btn.addEventListener('click', btnClick));
}

window.onload = handleSelect;

billInput.addEventListener('input', getTotalBill);
customInput.addEventListener('input', getTotalCustomTip);
peopleInput.addEventListener('input', getTotalPeopleNumber);

resetButton.addEventListener('click', () => {
  totalPerPerson = 0.0;
  tipPerPerson = 0.0;
  totalOutput.innerHTML = '$' + totalPerPerson;
  tipOutput.innerHTML = '$' + tipPerPerson;
  billInput.value = '';
  customInput.value = '';
  peopleInput.value = '';

  totalBill = 0;
  customTip = 0;
  selectTip = 0;
  noOfPeople = 1;
  totalPerPerson = 0.0;
  tipPerPerson = 0.0;
  resetSelect();
});
