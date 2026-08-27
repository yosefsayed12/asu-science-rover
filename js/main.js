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

        console.log("scroll: ", window.scrollY);
        console.log("modal: ", modal);
        console.log("modal react: ", modal.getBoundingClientRect());
        const committeeName = button.dataset.committee;
        const committee = committees[committeeName];

        document.body.classList.add("modal-open");

        modalTitle.textContent = committee.title;
        modalDescription.textContent = committee.description;
        modalTasks.innerHTML = "";

        committee.tasks.forEach(task => {
            const span = document.createElement("span");
            span.classList.add("modalSpan");
            span.textContent = task;
            modalTasks.appendChild(span);
        });

        modalSkills.textContent = committee.skills;
        modal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
});

//========================================================
const youtube = document.querySelector("#youtube");
const facebook = document.getElementById("facebook");
const btn = document.querySelector("#join-us");

youtube.addEventListener('click', () => {
    window.open("https://www.youtube.com/@scienceseascout6698", "_blank");
})
facebook.addEventListener("click", () => {
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
});

//========================================================================

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

console.log(menuBtn);
console.log(navLinks.children);

menuBtn.addEventListener("click", () => {
    console.log("clicked");
    navLinks.classList.toggle("active");
});

//==================================================================================

const galleryData = [
    {
        title: "اليوم البحري",
        description: "يوم مليء بالأنشطة والمغامرات على شاطئ البحر",
        image: "assets/images/sea-day.jpg",
        link: "gallery-details.html?event=sea"
    },
    {
        title: "حفل بداية النشاط",
        description: "بداية عام جديد مليء بالأنشطة والتحديات",
        image: "assets/images/open-day.jpg",
        link: "gallery-details.html?event=start"
    },
    {
        title: "حفل التسليم",
        description: "نحتفل معًا بإنجازات وأنشطة العام",
        image: "assets/images/tasleem-day.jpg",
        link: "gallery-details.html?event=closing"
    },
    {
        title: "تلوين جدار العشيرة",
        description: "يوم من الإبداع والفن والعمل الجماعي",
        image: "assets/images/wall-day.jpg",
        link: "gallery-details.html?event=painting"
    },
    {
        title: "يوم الخير",
        description: "يوم لخدمة المجتمع ونشر الخير",
        image: "assets/images/5aar-day.jpg",
        link: "gallery-details.html?event=charity"
    },
    {
        title: "افطار العشيرة",
        description: "افطار العشيرة الرمضاني السنوي",
        image: "assets/images/iftar-day.jpg",
        link: "gallery-details.html?event=iftar"
    },
    {
        title: "معسكر العشيرة",
        description: "التخييم وتطوير المهارات",
        image: "assets/images/camp-day.jpg",
        link: "gallery-details.html?event=camp"
    },
    {
        // title: "الوفدية الـ55 لعشائر الجامعة",
        title: "الدورة الكشفية الـ 55 والارشادية الـ 43 لعشائر الجامعة",
        description: "التنافس بين عشاير الجامعة",
        image: "assets/images/wafdya-day.jpg",
        link: "gallery-details.html?event=wafdya"
    }
];

const galleryImage = document.querySelector(".gallery-card img");
const galleryTitle = document.querySelector(".gallery-overlay h3");
const galleryDescription = document.querySelector(".gallery-overlay p");
const galleryDetails = document.querySelector(".gallery-details");

const dots = document.querySelectorAll(".gallery-dots span");
const events = document.querySelectorAll(".gallery-events .event");

const nextButton = document.querySelector(".left-btn");
const previousButton = document.querySelector(".right-btn");

let currentIndex = 0;

function showEvent(index) {

    currentIndex = index;
    const event = galleryData[currentIndex];

    galleryImage.src = event.image;
    galleryImage.alt = event.title;

    galleryTitle.textContent = event.title;

    galleryDescription.textContent = event.description;

    galleryDetails.href = event.link;

    
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
    
    events.forEach((eventElement, i) => {
        eventElement.classList.toggle(
            "active",
            i === currentIndex
        );
    });
}

function animateGallery(direction) {

    galleryDetails.classList.remove(
        "slide-right",
        "slide-left"
    );

    void galleryDetails.offsetWidth;

    if (direction === "next") {
        galleryDetails.classList.add("slide-right");
    } else {
        galleryDetails.classList.add("slide-left");
    }
}

nextButton.addEventListener("click", () => {

    let nextIndex = currentIndex + 1;

    if (nextIndex >= galleryData.length) {
        nextIndex = 0;
    }

    showEvent(nextIndex);

    animateGallery("next");
});

previousButton.addEventListener("click", () => {

    let previousIndex = currentIndex - 1;

    if (previousIndex < 0) {
        previousIndex = galleryData.length - 1;
    }

    showEvent(previousIndex);
    animateGallery("next");
});

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
        showEvent(index);
    });

});

events.forEach((event, index) => {

    event.addEventListener("click", () => {
        showEvent(index);
    });

});