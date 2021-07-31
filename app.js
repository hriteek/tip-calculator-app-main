// variable 
let totalBill, customTip, selectTip, noOfPeople;
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
}

function getTotalCustomTip(e) {
  resetSelect();
  customInput.innerHTML = e.target.value;
  customTip = customInput.value;
}

function clearTotalCustomTip(e) {
  customInput.value = '';
  customTip = '';
}

function getTotalPeopleNumber(e) {
  peopleInput.innerHTML = e.target.value;
  noOfPeople = peopleInput.value;
}

function CalculateTotalPerPerson(total_bill, no_of_people = 1, tip = 0) {
  totalPerPerson = parseInt(total_bill) / parseInt(no_of_people);
}

function CalculateTipPerPerson(total_bill, no_of_people = 1, tip = 0) {
  tipPerPerson =
    (parseInt(total_bill) * parseInt(tip)) / 100 / parseInt(no_of_people);
}

function resetSelect() {
  document.querySelectorAll('.btn--tip').forEach((btn) => {
    btn.classList.remove('active');
  });
}

function getCalculation(e, value = false) {
  console.log('getCalculation', value);
  if (value) {
    console.log('getCalculation', value);
    let tip = customTip !== undefined ? customTip : selectTip;
    console.log(totalBill, noOfPeople, tip);
    CalculateTotalPerPerson(totalBill, noOfPeople, tip);
    CalculateTipPerPerson(totalBill, noOfPeople, tip);
    console.log('totalPerPerson', totalPerPerson);
    console.log('tipPerPerson', tipPerPerson);
    totalOutput.innerHTML = '$' + totalPerPerson;
    tipOutput.innerHTML = '$' + tipPerPerson;
  }
}

function handleSelect() {
  const btnClick = function () {
    clearTotalCustomTip();
    selectTip = parseInt(this.innerHTML.replace('%', ''));
    console.log(selectTip);
    if (this.parentNode.getElementsByClassName('active')[0]) {
      this.parentNode
        .getElementsByClassName('active')[0]
        .classList.remove('active');
      this.classList.add('active');
    } else {
      this.classList.add('active');
    }
  };
  document
    .querySelectorAll('.btn--tip')
    .forEach((btn) => btn.addEventListener('click', btnClick));
}

window.onload = handleSelect;

billInput.addEventListener('input', getTotalBill);
customInput.addEventListener('input', getTotalCustomTip);
peopleInput.addEventListener('input', getTotalPeopleNumber);
peopleInput.addEventListener('input', getTotalPeopleNumber);
peopleInput.addEventListener('click', getCalculation);
peopleInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && totalBill && (customTip || selectTip) && noOfPeople) {
    console.log('I am enter');
    e.preventDefault();
    getCalculation(e, true);
  }
});

billInput.addEventListener('onchange', (data) => {
  console.log('data', data);
});

resetButton.addEventListener('click', () => {
  console.log('reset button clicked');
  totalPerPerson = 0.0;
  tipPerPerson = 0.0;
  totalOutput.innerHTML = '$' + totalPerPerson;
  tipOutput.innerHTML = '$' + tipPerPerson;
  billInput.value = '';
  customInput.value = '';
  peopleInput.value = '';
  resetSelect();
});
