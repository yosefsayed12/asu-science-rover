const upcomingEvent = {
    name: "حفل تسليم قيادة العشيرة",
    date: "2026-09-10T09:00:00",
    dateText: "10 سبتمبر 2026",
    location: "كلية العلوم - جامعة عين شمس",
    link: "#"
};

const eventName =
    document.getElementById("upcoming-event-name");

const eventDate =
    document.getElementById("upcoming-event-date");

const eventLocation =
    document.getElementById("upcoming-event-location");

const eventButton =
    document.getElementById("upcoming-event-button");

const days =
    document.getElementById("event-days");

const hours =
    document.getElementById("event-hours");

const minutes =
    document.getElementById("event-minutes");

const seconds =
    document.getElementById("event-seconds");

/* ---------- Event Information ---------- */
eventName.textContent = upcomingEvent.name;

eventDate.textContent = upcomingEvent.dateText;

eventLocation.textContent = upcomingEvent.location;

eventButton.href = upcomingEvent.link;


/* ----------------- Countdown -------------------- */

const eventTime =
    new Date(upcomingEvent.date).getTime();

function updateEventCountdown() {

    const now =
        new Date().getTime();

    const difference =
        eventTime - now;


    /* Event Started */

    if (difference <= 0) {

        days.textContent = "00";

        hours.textContent = "00";

        minutes.textContent = "00";

        seconds.textContent = "00";

        document.querySelector(".countdown-title")
            .textContent = "الحدث بدأ! 🎉";

        return;

    }


    /* Calculate */

    const d =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );


    const h =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );


    const m =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );


    const s =
        Math.floor(
            (difference / 1000) % 60
        );


    /* Display */

    days.textContent =
        String(d).padStart(2, "0");

    hours.textContent =
        String(h).padStart(2, "0");

    minutes.textContent =
        String(m).padStart(2, "0");

    seconds.textContent =
        String(s).padStart(2, "0");

}


/* Run immediately */

updateEventCountdown();


/* Update every second */

setInterval(updateEventCountdown, 1000);