function Patient(fullName, email, password, dob, gender, phone, diseases, imageUrl) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.gender = gender;
    this.phone = phone;
    this.diseases = diseases;
    this.imageUrl = imageUrl;
}

function validateFullName(fullName) {
    return !/\s/.test(fullName);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
}

function validateDOB(dob) {
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    return dobPattern.test(dob);
}

function validatePhone(phone) {
    return /^07\d{8}$/.test(phone);
}

function render() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const diseases = Array.from(document.getElementById('diseases').selectedOptions).map(option => option.value);
    const imageUrl = document.getElementById('imageUrl').value;

    if (!validateFullName(fullName)) {
        document.getElementById('fullNameError').textContent = "Full Name must not contain spaces.";
        return;
    } else {
        document.getElementById('fullNameError').textContent = "";
    }

    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = "Invalid email format.";
        return;
    } else {
        document.getElementById('emailError').textContent = "";
    }

    if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = "Password must be at least 8 characters long, include 1 number, 1 uppercase, and 1 special character.";
        return;
    } else {
        document.getElementById('passwordError').textContent = "";
    }

    if (!validateDOB(dob)) {
        document.getElementById('dobError').textContent = "Date of Birth format should be YYYY-MM-DD.";
        return;
    } else {
        document.getElementById('dobError').textContent = "";
    }

    if (!validatePhone(phone)) {
        document.getElementById('phoneError').textContent = "Phone number must be 10 digits and start with 07.";
        return;
    } else {
        document.getElementById('phoneError').textContent = "";
    }

    const patients = JSON.parse(localStorage.getItem('patients')) || [];

    if (patients.some(patient => patient.email === email)) {
        alert('User with this email already exists.');
        return;
    }

    const patient = new Patient(fullName, email, password, dob, gender, phone, diseases, imageUrl);

    patients.push(patient);

    localStorage.setItem('patients', JSON.stringify(patients));

    displayPatients();
    document.getElementById('patientForm').reset();
    alert('Patient data saved!');
}

function displayPatients() {
    const patientsContainer = document.getElementById('patientsContainer');
    patientsContainer.innerHTML = '';

    const patients = JSON.parse(localStorage.getItem('patients')) || [];

    patients.forEach(patient => {
        const patientCard = document.createElement('div');
        patientCard.className = 'patientCard';

        const patientImg = document.createElement('img');
        patientImg.src = patient.imageUrl;
        patientCard.appendChild(patientImg);

        const patientName = document.createElement('h3');
        patientName.textContent = patient.fullName;
        patientCard.appendChild(patientName);

        const patientDob = document.createElement('p');
        patientDob.textContent = `DOB: ${patient.dob}`;
        patientCard.appendChild(patientDob);

        const patientGender = document.createElement('p');
        patientGender.textContent = `Gender: ${patient.gender}`;
        patientCard.appendChild(patientGender);

        const patientPhone = document.createElement('p');
        patientPhone.textContent = `Phone: ${patient.phone}`;
        patientCard.appendChild(patientPhone);

        const patientDiseases = document.createElement('p');
        patientDiseases.textContent = `Chronic Diseases: ${patient.diseases.join(', ')}`;
        patientCard.appendChild(patientDiseases);

        patientsContainer.appendChild(patientCard);
    });
}

document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    render();
});

document.addEventListener('DOMContentLoaded', displayPatients);
