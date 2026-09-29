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
const exp = document.querySelector("#exp");
const level = document.querySelector("#year");
const scouting = document.querySelector("#scouting");
const listen = document.querySelector("#listen");
const program = document.querySelector("#program");

form.addEventListener("submit", async(e) =>{
    e.preventDefault();
    const gender = document.querySelector('input[name="gender"]:checked');
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
        .innerHTML = "<p>حط اسم صح يا محترم</p>";
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
        input[2].style.borderColor = 'red';
        isValid = false;
    }
    else if(!validateEmail(email.value)){
        document.querySelector("#emailErorr")
        .textContent = "اكتب بريد الكتروني صح";
        input[2].style.borderColor = 'red';
        isValid = false;
    }

    if(scouting.value.trim().length === 0){
        document.querySelector("#scoutingErorr")
        .textContent = "لازم نكتب البيانات ديه";
        input[3].style.borderColor = 'red';
        isValid = false;
    }

    if(exp.value.trim().length == 0){
        document.querySelector("#expErorr")
        .textContent = "لازم تكتب الخانة ديه";
        input[4].style.borderColor = 'red';
        isValid = false;
    }

    if(!gender){
        document.querySelector("#genderErorr")
        .textContent = "لازم تحدد الخانة ديه";
        document.querySelectorAll(".gender-card").forEach((e) => {
            e.style.borderColor = 'red';
        })
        isValid = false;
    }

    if(!validateLevel(level.value)){
        document.querySelector("#yearErorr")
        .textContent = "لازم تكتب الفرقة";
        document.querySelector("select").style.borderColor = 'red';
        isValid = false;
    }

    if(program.value.trim().length === 0){
        document.querySelector("#programErorr")
        .textContent = "لازم نكتب البيانات ديه";
        input[7].style.borderColor = 'red';
    }

    if(listen.value.trim().length === 0){
        document.querySelector("#listenErorr")
        .textContent = "لازم نكتب البيانات ديه";
        input[8].style.borderColor = 'red';
    }

    if (isValid) {
        const formData = {
            name: name.value.trim(),
            phone: phone.value.trim(),
            email: email.value.trim(),
            scouting: scouting.value.trim(),
            exp: exp.value.trim(),
            gender: gender,
            level: level.value.trim(),
            program: program.value.trim(),
            listen: listen.value.trim()
        };
    
        try {
            const response = await fetch(
                "https://asu-science-rover-3o4z.vercel.app/api/join",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message);
            }
    
            console.log(data);
    
            localStorage.setItem("joinSuccess", "true");
            window.location.href = "index.html";
    
        } catch (error) {
            console.error("Join Form Error:", error);
    
            alert("حصل خطأ أثناء إرسال الطلب، حاول تاني.");
        }
    }
});
// =========================
