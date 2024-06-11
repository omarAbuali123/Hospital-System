
function Patient (fullName, password, dob, gender, phone, diseases, imageUrl){
     {
        this.fullName = fullName;
        this.password = password;
        this.dob = dob;
        this.gender = gender;
        this.phone = phone;
        this.diseases = diseases;
        this.imageUrl = imageUrl;
    }
}

function render() {
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const diseases = Array.from(document.getElementById('diseases').selectedOptions).map(option => option.value);
    const imageUrl = document.getElementById('imageUrl').value;

    
    const patient = new Patient(fullName, password, dob, gender, phone, diseases, imageUrl);

    let patients = JSON.parse(localStorage.getItem('patients')) || [];

    patients.push(patient);

    localStorage.setItem('patients', JSON.stringify(patients));

    displayPatients();
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
    alert('Patient data saved!');
});

document.addEventListener('DOMContentLoaded', displayPatients);
