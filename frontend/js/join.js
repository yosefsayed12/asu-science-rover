import {
    validateName,
    validateEmail,
    validatePhone,
    validateLevel
} from './validation.js';

const input = document.querySelectorAll("input");
const form = document.querySelector("#join-form")
const name = document.getElementById("name");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const level = document.querySelector("#level");

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    document.querySelectorAll('.erorr').forEach(el => el.textContent = '');
    document.querySelectorAll('input').forEach(input => input.style.borderColor = '');
    let isValid = true;

    if(name.value.trim().length == 0){
        document.querySelector("#nameErorr")
        .textContent = "لازم تكتب اسم";
        input[0].style.borderColor = 'red';
        isValid = false;
    }
    else if(!validateName(name.value)){
        document.querySelector("#nameErorr")
        .textContent = "حط اسم صح يا محترم";
        input[0].style.borderColor = 'red';
        isValid = false;
    }

    if(phone.value.trim().length === 0){
        document.querySelector("#phoneErorr")
        .textContent = "لازم تكتب رقم تليفون";
        input[1].style.borderColor = 'red';
        isValid = false;
    }
    else if(!validatePhone(phone.value)){
        document.querySelector("#phoneErorr")
        .textContent = "حط رقم صح يا محترم";
        input[1].style.borderColor = 'red';
        isValid = false;
    }

    if(email.value.trim().length === 0){
        document.querySelector("#emailErorr")
        .textContent = "لازم نكتب بريد الكتروني";
        input[3].style.borderColor = 'red';
    }
    else if(!validateEmail(email.value)){
        document.querySelector("#emailErorr")
        .textContent = "اكتب بريد الكتروني صح";
        input[3].style.borderColor = 'red';
        isValid = false;
    }

    if(!validateLevel(level.value)){
        document.querySelector("#levelErorr")
        .textContent = "لازم تكتب الفرقة";
        input[2].style.borderColor = 'red';
        isValid = false;
    }

    if (isValid) {
    const formData = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        level: level.value
    };
    console.log(formData);
    form.submit();
    localStorage.setItem("joinSuccess", "true");
    window.location.href = "index.html";
    }


});
// =========================
