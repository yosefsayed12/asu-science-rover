const events = {
    sea: {
        title: "اليوم البحري",
        description:
            "استمتعنا بيوم رائع على شاطئ البحر، شاركنا خلاله في العديد من الأنشطة والألعاب الجماعية التي ساهمت في تعزيز روح الفريق والمحبة بين أعضاء العشيرة.",
        date: "15 أغسطس 2026",
        mainImage: "assets/images/sea-day.jpg",
        activities: [
            "ألعاب مائية",
            "مسابقات جماعية",
            "جلسة سمر على الشاطئ",
            "أنشطة كشفية وتحديات"
        ],
        images: [
            "assets/images/sea1.jpg",
            "assets/images/sea2.jpg",
            "assets/images/sea3.jpg"
        ]
    },

    start: {
        title: "حفل بداية النشاط",
        description:
            "انطلاقة جديدة مليئة بالحماس والطاقة، اجتمعنا فيها لبدء موسم جديد من الأنشطة والفعاليات الكشفية.",
        date: "1 أكتوبر 2026",
        mainImage: "assets/images/open-day.jpg",
        activities: [
            "التعريف بخطة النشاط",
            "الألعاب الجماعية",
            "التعارف بين الأعضاء",
            "الأنشطة الكشفية"
        ],
        images: [
            "assets/images/open-day.jpg",
            "assets/images/open-day.jpg",
            "assets/images/open-day.jpg",
            "assets/images/open-day.jpg"
        ]
    },

    closing: {
        title: "حفل الختام",
        description:
            "احتفال مميز نحتفل خلاله بالإنجازات والأنشطة التي شاركنا فيها طوال الموسم.",
        date: "30 أغسطس 2026",
        mainImage: "assets/images/tasleem-day.jpg",
        activities: [
            "تكريم الأعضاء",
            "عرض إنجازات العشيرة",
            "فقرات ترفيهية",
            "حفل الختام"
        ],
        images: [
            "assets/images/tasleem-day.jpg",
            "assets/images/tasleem-day.jpg",
            "assets/images/tasleem-day.jpg",
            "assets/images/tasleem-day.jpg"
        ]
    },

    painting: {
        title: "الرسم على الحائط",
        description:
            "يوم مليء بالإبداع والعمل الجماعي، شارك خلاله أعضاء العشيرة في رسم وتجميل أحد جدران الكلية.",
        date: "20 أغسطس 2026",
        mainImage: "images/wall-painting.jpg",
        activities: [
            "تجهيز الحائط",
            "اختيار التصميم",
            "الرسم والتلوين",
            "العمل الجماعي"
        ],
        images: [
            "images/painting1.jpg",
            "images/painting2.jpg",
            "images/painting3.jpg"
        ]
    },

    charity: {
        title:"يوم الخير",
        description:
            "يوم خدمي هدفه نشر الخير والمساهمة في خدمة المجتمع من خلال مجموعة من الأنشطة والمبادرات.",
        date: "10 أغسطس 2026",
        mainImage: "images/good-day.jpg",
        activities: [
            "الخدمة العامة",
            "المساعدات المجتمعية",
            "الأنشطة الخيرية",
            "العمل الجماعي"
        ],
        images: [
            "images/charity1.jpg",
            "images/charity2.jpg",
            "images/charity3.jpg",
            "images/charity4.jpg"
        ]
    },

    iftar: {
        title: "افطار العشيرة",
        description:
            "يوم خدمي هدفه نشر الخير والمساهمة في خدمة المجتمع من خلال مجموعة من الأنشطة والمبادرات.",
        date: "10 أغسطس 2026",
        mainImage: "assets/images/iftar-day.jpg",
        activities: [
            "الخدمة العامة",
            "المساعدات المجتمعية",
            "الأنشطة الخيرية",
            "العمل الجماعي"
        ],
        images: [
            "assets/images/iftar1.jpg",
            "assets/images/iftar2.jpg",
            "assets/images/iftar3.jpg",
            "assets/images/iftar4.jpg",
            "assets/images/iftar5.jpg"
        ]
    },

    camp: {
        title: "معسكر العشيرة",
        description:
            "يوم خدمي هدفه نشر الخير والمساهمة في خدمة المجتمع من خلال مجموعة من الأنشطة والمبادرات.",
        date: "10 أغسطس 2026",
        mainImage: "assets/images/camp-day.jpg",
        activities: [
            "الخدمة العامة",
            "المساعدات المجتمعية",
            "الأنشطة الخيرية",
            "العمل الجماعي"
        ],
        images: [
            "assets/images/camp-day.jpg",
            "assets/images/camp-day.jpg",
            "assets/images/camp-day.jpg",
            "assets/images/camp-day.jpg"
        ]
    },

    wafdya: {
        title: "الوفدية الـ 55 لعشائر الجامعة",
        description:
            "مشاركة عشيرة جوالة كلية العلوم بالوفدية وحصولها على المستوى الاول في جميع المستويات",
        date: "10 أغسطس 2026",
        mainImage: "assets/images/wafdya-day.jpg",
        activities: [
            "الخدمة العامة",
            "المساعدات المجتمعية",
            "الأنشطة الخيرية",
            "العمل الجماعي"
        ],
        images: [
            "assets/images/wafdya.jpg",
            "assets/images/wafdya1.jpg",
            "assets/images/wafdya2.jpg",
            "assets/images/wafdya3.jpg",
            "assets/images/wafdya4.jpg"
        ]
    }
};


const params = new URLSearchParams(
    window.location.search
);

const eventId = params.get("event");
const currentEvent = events[eventId];

if (!currentEvent) {
    document.querySelector(".event-page").innerHTML =
        `<h1 style="text-align:center;"> الفعالية غير موجودة</h1>`;
} else {
    loadEvent(currentEvent);
}



function loadEvent(currentEvent) {

    // Title
    document.querySelector("#event-title")
        .textContent = currentEvent.title;


    // Description
    document.querySelector("#event-description")
        .textContent = currentEvent.description;


    // Date
    document.querySelector("#event-date")
        .textContent = currentEvent.date;


    // Main image
    const mainImage =
        document.querySelector("#main-image");

    mainImage.src = currentEvent.mainImage;
    mainImage.alt = currentEvent.title;


    // Activities
    const activitiesContainer = document.querySelector("#activities-container");

    activitiesContainer.innerHTML = "";

    currentEvent.activities.forEach(activity => {
        const div = document.createElement("div");
        div.classList.add("activity");
        div.textContent = activity;
        activitiesContainer.appendChild(div);
    });


    // Photos
    const photosContainer = document.querySelector("#photos-container");

    photosContainer.innerHTML = "";

    currentEvent.images.forEach((image, index) => {
        const div = document.createElement("div");
        div.classList.add("photo");
        div.innerHTML =  `<img src="${image}" alt="${currentEvent.title} - صورة ${index + 1}">`;
        div.addEventListener("click", () => {
            openLightbox(index);
        });

        photosContainer.appendChild(div);

    });
}


const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const closeLightbox = document.querySelector("#close-lightbox");
const nextImage = document.querySelector("#next-image");
const prevImage = document.querySelector("#prev-image");

let currentImage = 0;


function openLightbox(index) {

    currentImage = index;

    lightboxImage.src =
    currentEvent.images[currentImage];

    lightbox.classList.add("show");

}


function closeLightboxFunction() {

    lightbox.classList.remove("show");

}


function showNextImage() {

    currentImage++;

    if (currentImage >= currentEvent.images.length) {
        currentImage = 0;
    }

    lightboxImage.src =
        currentEvent.images[currentImage];

}


function showPreviousImage() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = currentEvent.images.length - 1;
    }

    lightboxImage.src =
        currentEvent.images[currentImage];

}


closeLightbox.addEventListener("click", closeLightboxFunction);


nextImage.addEventListener("click", showNextImage);


prevImage.addEventListener("click", showPreviousImage);


// Close when clicking outside image

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightboxFunction();
    }
});