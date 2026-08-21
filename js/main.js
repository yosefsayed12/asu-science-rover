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
                "كتابة وتجهيز المحتوى الاعلامي ادارة المحتوى الخاص بوسائل التواصل",
                "ابراز انشطة وانجازات العشيرة"],

        skills: "التصوير * التصميم * كتابة المحتوى * العمل الجماعي * الابداع"
    },

    hr: {
        title: "",

        description: "",

        tasks: [],

        skills: ""
    },

    pr: {
        title: "",

        description: "",

        tasks: [],

        skills: ""
    },

    finan: {
        title: "",

        description: "",

        tasks: [],

        skills: ""
    }
};

moreButtons.forEach(button => {
    button.addEventListener("click", () => {

        const committeeName = button.dataset.committee;
        const committee = committees[committeeName];

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
})
facebook.addEventListener("click", () => {
    console.log("Clicked!");
    window.open("https://web.facebook.com/scienceseascouts", "_blank");
});

btn.addEventListener("click", () => {
    window.location.href = "joinus.html";
});