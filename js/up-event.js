const eventInfo = window.eventsData;

/* =================================
   DOM ELEMENTS
================================= */

const eventName =
    document.getElementById("upcoming-event-name");

const eventDate =
    document.getElementById("upcoming-event-date");

const eventLocation =
    document.getElementById("upcoming-event-location");

const eventDescription =
    document.getElementById("upcoming-event-description");

const eventImage =
    document.getElementById("upcoming-event-image");

const eventButton =
    document.getElementById("upcoming-event-button");

const eventDays =
    document.getElementById("event-days");

const eventHours =
    document.getElementById("event-hours");

const eventMinutes =
    document.getElementById("event-minutes");

const eventSeconds =
    document.getElementById("event-seconds");

const countdownTitle =
    document.querySelector(".countdown-title");

const upcomingCard =
    document.getElementById("upcomingEventCard");

const noUpcomingEvents =
    document.getElementById("noUpcomingEvents");

const previousEventsList =
    document.getElementById("previousEventsList");


/* =================================
   HELPER FUNCTIONS
================================= */

// Format event date

function formatEventDate(date) {

    return new Date(date).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

}


// Get event link

function getEventLink(event) {

    return event.link || `event.html?id=${encodeURIComponent(event.id)}`;

}


// Check if event is upcoming

function isUpcoming(event) {

    return new Date(event.date).getTime() > Date.now();

}


// Check if event is previous

function isPrevious(event) {

    return new Date(event.date).getTime() <= Date.now();

}


/* =================================
   SORT EVENTS
================================= */

function getUpcomingEvents() {

    return eventInfo

        .filter(isUpcoming)

        .sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );

}


function getPreviousEvents() {

    return eventInfo

        .filter(isPrevious)

        .sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

}


/* =================================
   UPCOMING EVENT
================================= */

let countdownInterval;


function renderUpcomingEvent() {

    const upcomingEvents = getUpcomingEvents();

    const event = upcomingEvents[0];


    // No upcoming events

    if (!event) {

        upcomingCard.hidden = true;

        noUpcomingEvents.hidden = false;

        clearInterval(countdownInterval);

        return;

    }

    console.log(new Date("2026-10-01T16:00:00").getTime() <= Date.now());

    upcomingCard.hidden = false;

    noUpcomingEvents.hidden = true;


    // Event Information

    eventName.textContent = event.name;

    eventDate.textContent =
        event.dateText || formatEventDate(event.date);

    eventLocation.textContent = event.location;

    eventDescription.textContent = event.description || "";


    // Event Image

    if (event.image) {

        eventImage.src = event.image;

        eventImage.style.display = "block";

    } else {

        eventImage.removeAttribute("src");
        eventImage.style.display = "none";

    }


    // Event Button

    eventButton.href = getEventLink(event);


    // Start Countdown

    startEventCountdown(event);

}


/* =================================
   COUNTDOWN
================================= */

function startEventCountdown(event) {

    clearInterval(countdownInterval);


    const eventTime = new Date(event.date).getTime();


    function updateEventCountdown() {

        const now = Date.now();

        const difference = eventTime - now;


        // Event Started

        if (difference <= 0) {

            eventDays.textContent = "00";

            eventHours.textContent = "00";

            eventMinutes.textContent = "00";

            eventSeconds.textContent = "00";

            countdownTitle.textContent = "الحدث بدأ! 🎉";

            clearInterval(countdownInterval);

            // Update event classification

            renderUpcomingEvent();

            renderPreviousEvents();

            return;

        }


        // Calculate Time

        const d = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const h = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const m = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const s = Math.floor(
            (difference / 1000) % 60
        );


        // Display Time

        eventDays.textContent =
            String(d).padStart(2, "0");

        eventHours.textContent =
            String(h).padStart(2, "0");

        eventMinutes.textContent =
            String(m).padStart(2, "0");

        eventSeconds.textContent =
            String(s).padStart(2, "0");

    }


    countdownTitle.textContent = "متبقي على الحدث";

    updateEventCountdown();

    countdownInterval = setInterval(updateEventCountdown, 1000);

}


/* =================================
   PREVIOUS EVENTS
================================= */

function renderPreviousEvents() {

    const previousEvents = getPreviousEvents();

    console.log("previous:", previousEvents.length)
    // No Previous Events

    if (!previousEvents.length) {

        previousEventsList.innerHTML = 
            `<div class="events-empty">

                <i class="fas fa-images"></i>

                <h3>لا توجد أحداث سابقة حتى الآن</h3>

                <p>في انتظار المزيد من ذكرياتنا الجميلة ❤️</p>

            </div>
        `;

        return;

    }


    // Show Latest 3 Events

    const latestEvents = previousEvents.slice(0, 3);


    previousEventsList.innerHTML = latestEvents.map(event => `

        <div class="previous-event-card">

            <div class="previous-event-image">

                ${
                    event.image
                    ? `<img src="${event.image}"
                            alt="${event.name}"
                            onerror="this.style.display='none'">`
                    : `<i class="fas fa-camera"></i>`
                }

            </div>


            <div class="previous-event-info">

                <h3>${event.name}</h3>

                <span>

                    <i class="fas fa-calendar-alt"></i>

                    ${event.dateText || formatEventDate(event.date)}

                </span>

            </div>

            <a href="${getEventLink(event)}"
                class="previous-event-link">

                عرض المزيد

                <i class="fas fa-arrow-left"></i>

            </a>

        </div>

    `).join("");

}


/* =================================
   TAB SWITCHING
================================= */

const eventTabs =
    document.querySelectorAll(".event-tab");


eventTabs.forEach(tab => {

    tab.addEventListener("click", function () {

        // Remove active class

        eventTabs.forEach(item => {

            item.classList.remove("active");

        });


        document.querySelectorAll(".events-content")
            .forEach(content => {

                content.classList.remove("active");

            });


        // Activate Selected Tab

        this.classList.add("active");
        const selectedTab = this.dataset.tab;

        document.getElementById(selectedTab)
            .classList.add("active");

    });

});


/* =================================
   INITIALIZE EVENTS
================================= */

renderUpcomingEvent();

renderPreviousEvents();