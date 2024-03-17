const form = document.querySelector('form');
const name = document.getElementById('name');
const address = document.getElementById('address');
const city = document.getElementById('city');
const cardNumber = document.getElementById('cardNumber');

// Retrieve email and name values from localStorage
const email = localStorage.getItem('email');


// Print email and username to text boxes
document.getElementById('email').value = email;
document.getElementById('total-amount').innerHTML = localStorage.getItem('total-price');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting and reloading the page
  checkInputs();
});


function checkInputs() {
	
	const nameValue = name.value.trim();
	const emailInput = document.getElementById('email');
	const emailValue = emailInput.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const cardNumberValue = cardNumber.value.trim();


	// Check if the name input is empty
	if(nameValue === '') {
		setErrorFor(name, 'name cannot be blank');
	} else {
		setSuccessFor(name);
	}


    // Check if the email input is empty or invalid
	if(emailValue === '') {
		setErrorFor(emailInput, 'Email cannot be blank');
	} else if (!isValidateEmail(emailValue)) {
		setErrorFor(emailInput, 'Not a valid email');
	} else {
		setSuccessFor(emailInput);
    }


	// Check if the address input is empty
	if(addressValue === '') {
		setErrorFor(address, 'address cannot be blank');
	} else {
		setSuccessFor(address);
	}
	
	// Check if the city input is empty
	if(cityValue === '') {
		setErrorFor(city, 'city cannot be blank');
	} else {
		setSuccessFor(city);
	}

	 // Check if the card number input is empty or invalid
	if(cardNumberValue === '') {
		setErrorFor(cardNumber, 'card number cannot be blank');
	} else if (!isValidCardNumber(cardNumberValue)) {
	 	setErrorFor(cardNumber, 'Not a valid card number');
	} else {
		setSuccessFor(cardNumber);
	}

}


function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
//validate email
function isValidateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
	
  }

//validate card number
function isValidCardNumber(cardNumber) {
	const cardRegex = /^\d{4}[ ]?\d{4}[ ]?\d{4}[ ]?\d{4}$/;
	return cardRegex.test(cardNumber);
  }
  



