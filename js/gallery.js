const events = {
    sea: {
        title: "اليوم البحري",
        description:
            "يوم مليء بالمرح والأنشطة، اجتمعت فيه العشيرة لقضاء وقت ممتع في أحد الأندية المطلة على النيل، وسط أجواء من الترفيه والضحك والروح الجميلة بين أفراد العشيرة. 🌊💚",
        date: "15 يونيو 2026",
        mainImage: "assets/images/sea-day.jpg",
        activities: [
            "ألعاب مائية",
            "مسابقات جماعية",
            "التجديف",
            "الترفية والاستمتاع"
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
        title: "حفل تسليم قيادة العشيرة",
        description:
            "احتفال مميز للحظة تسليم راية القيادة وتنصيب الافراد، لتبدأ مسيرة جديدة من الانجازات",
        date: "30 اكتوبر 2025",
        mainImage: "assets/images/tasleem-day.jpg",
        activities: [
            "تنصيب الأفراد",
            "عرض إنجازات العشيرة",
            "فقرات ترفيهية",
            "حفل الختام"
        ],
        images: [
            "assets/images/tasleem1.jpg",
            "assets/images/tasleem2.jpg",
            "assets/images/tasleem3.jpg",
            "assets/images/tasleem4.jpg",
            "assets/images/tasleem5.jpg",
            "assets/images/tasleem6.jpg",
            "assets/images/tasleem7.jpg",
            "assets/images/tasleem8.jpg",
            "assets/images/tasleem9.jpg",
            "assets/images/tasleem10.jpg"
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
            "في أجواء رمضانية مليئة بالمحبة والود، اجتمعت العشيرة في إفطارها السنوي، وسط أجواء من الألفة والمرح، لتبقى لحظاتنا معًا هي أجمل ما يجمعنا. 🌙💚.",
        date: "10 أغسطس 2026",
        mainImage: "assets/images/iftar-day.jpg",
        activities: [
            "الانشطة الترفيهية",
            "الافطار الجماعي",
            "تجهيز المكان",
            "التواصل والمشاركة"
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
            "تطوير المهارات",
            "التخييم",
            "القيادة وتحمل المسئولية",
            "العمل الجماعي"
        ],
        images: [
            "assets/images/camp2.jpg",
            "assets/images/camp3.jpg",
            "assets/images/camp1.jpg",
            "assets/images/camp5.jpg",
            "assets/images/camp6.jpg",
            "assets/images/camp7.jpg",
            "assets/images/camp8.jpg",
            "assets/images/camp4.jpg"
        ]
    },

    wafdya: {
        title: "الوفدية الـ 55 لعشائر الجامعة",
        description:
            "مشاركة عشيرة جوالة كلية العلوم بالوفدية وحصولها على المستوى الاول في جميع المستويات",
        date: "10 فبراير 2026",
        mainImage: "assets/images/wafdya-day.jpg",
        activities: [
            "تنمية المهارات",
            "العمل الجماعي",
            "روح التحدي",
            "المنافسات"
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