const facebook = document.getElementById("facebook");
const btn = document.querySelector("#join-us");

const modal = document.getElementById("comitteeModal")
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTasks = document.getElementById("modalTasks");
const modalSkills = document.getElementById("modalSkills");
const closingModel = document.getElementById("closeModel");

const moreButtons = document.querySelectorAll(".more-btn");
const committees = {
    media: {
        title: "لجنة الميديا",

        description: "تتولى لجنة الميديا توثيق الانشطة وفعاليات العشيرة واظهارها بصورة مميزة من خلال التصوير والتصميم وتصوير المحتوى",

        tasks: ["تصوير ونوثيق انشطة وفعاليات العشيرة.",
                "تصميم المنشورات والمحتوى البصري",
                " تجهيز المحتوى الاعلامي وادارة المحتوى الخاص بوسائل التواصل",
                " ابراز انشطة وانجازات العشيرة على وسائل التواصل"],

        skills: "التصوير - التصميم - كتابة المحتوى - العمل الجماعي - الابداع"
    },

    hr: {
        title: "لجنة السكرتارية",

        description: "مسؤولة عن ",

        tasks: ["متابعة وتقييم اعضاء العشيرة",
                "تسجيل احتايجات الرهط",
                "متابعة وتقييم اعضاء العشيرة",
                "متابعة وتقييم اعضاء العشيرة",],

        skills: "التواصل - حل المشكلات"
    },

    pr: {
        title: "لجنة الخدمة العامة",

        description: "",

        tasks: [],

        skills: ""
    },

    finan: {
        title: "لجنة الصندوق والعهدة",

        description: "مسؤولة عن ادارة الموارد المالية والعهدة الخاصة بالعشيرة، وتنظيم المصروفات والحفاظ على الممتلكات",

        tasks: ["تسجيل ومتابعة المصروفات",
                "تنظيم ميزانية الانشطة والفعاليات",
                "الحفاظ على العهدة وممتلكات العشيرة",
                "اعداد ومراجعة السجلات المالية"],

        skills: "ادارة المال - ادارة المال"
    }
};

moreButtons.forEach(button => {
    button.addEventListener("click", () => {

        const committeeName = button.dataset.committee;
        const committee = committees[committeeName];

        document.body.classList.add("modal-open");

        modalTitle.textContent = committee.title;
        modalDescription.textContent = committee.description;
        modalTasks.innerHTML = "";

        let i = 1;
        committee.tasks.forEach(task => {
            const span = document.createElement("span");
            span.classList.add("modalSpan");
            span.textContent = task;
            modalTasks.appendChild(span);
            // if(i===2){
            //     modalTasks.appendChild(document.createElement("br"));
            // }
            i++;
        });

        modalSkills.textContent = committee.skills;
        modal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
})
facebook.addEventListener("click", () => {
    console.log("Clicked!");
    window.open("https://web.facebook.com/scienceseascouts", "_blank");
});

btn.addEventListener("click", () => {
    window.location.href = "joinus.html";
});

//====================================================================

const successPop = document.getElementById("successPopup");
const closePop = document.getElementById("closePopup");

if(localStorage.getItem("joinSuccess") === "true"){
    successPop.style.display = "block";
    localStorage.removeItem("joinSuccess");
}

closePop.addEventListener('click', () => {
    successPop.style.display = "none";
})

//========================================================================

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

console.log(menuBtn);
console.log(navLinks.children);

menuBtn.addEventListener("click", () => {
    console.log("clicked");
    navLinks.classList.toggle("active");
});