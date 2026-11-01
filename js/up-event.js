const eventInfo = window.eventsData || [];


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

    return event.link ||
        `event.html?id=${encodeURIComponent(event.id)}`;

}


// Get event start time

function getEventStart(event) {

    return new Date(event.date).getTime();

}


// Get event end time

function getEventEnd(event) {

    return new Date(event.endDate).getTime();

}


/* =================================
   EVENT STATUS
================================= */

// Upcoming Event

function isUpcoming(event) {

    return getEventStart(event) > Date.now();

}


// Ongoing Event

function isOngoing(event) {

    const now = Date.now();

    return (
        getEventStart(event) <= now &&
        getEventEnd(event) > now
    );

}


// Previous Event

function isPrevious(event) {

    return getEventEnd(event) <= Date.now();

}


/* =================================
   SORT EVENTS
================================= */

// Get Upcoming Events

function getUpcomingEvents() {

    return eventInfo

        .filter(isUpcoming)

        .sort((a, b) =>
            getEventStart(a) - getEventStart(b)
        );

}


// Get Ongoing Events

function getOngoingEvents() {

    return eventInfo

        .filter(isOngoing)

        .sort((a, b) =>
            getEventStart(a) - getEventStart(b)
        );

}


// Get Previous Events

function getPreviousEvents() {

    return eventInfo

        .filter(isPrevious)

        .sort((a, b) =>
            getEventEnd(b) - getEventEnd(a)
        );

}


/* =================================
   UPCOMING EVENT
================================= */

let countdownInterval;


function renderUpcomingEvent() {

    const ongoingEvents = getOngoingEvents();

    const upcomingEvents = getUpcomingEvents();


    // Give Priority To Ongoing Event

    const isEventOngoing = ongoingEvents.length > 0;

    const event = isEventOngoing
        ? ongoingEvents[0]
        : upcomingEvents[0];


    // No Upcoming Or Ongoing Events

    if (!event) {

        upcomingCard.hidden = true;

        noUpcomingEvents.hidden = false;

        clearInterval(countdownInterval);

        return;

    }


    upcomingCard.hidden = false;

    noUpcomingEvents.hidden = true;


    // Event Information

    eventName.textContent = event.name;

    eventDate.textContent =
        event.dateText || formatEventDate(event.date);

    eventLocation.textContent = event.location || "";

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

    startEventCountdown(event, isEventOngoing);

}


/* =================================
   COUNTDOWN
================================= */

function startEventCountdown(event, isEventOngoing = false) {

    clearInterval(countdownInterval);


    // Target Time

    const targetTime = isEventOngoing
        ? getEventEnd(event)
        : getEventStart(event);


    function updateEventCountdown() {

        const difference = targetTime - Date.now();


        // Event Status Changed

        if (difference <= 0) {

            clearInterval(countdownInterval);

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


        // Countdown Title

        countdownTitle.textContent = isEventOngoing
            ? "ينتهي الحدث خلال"
            : "متبقي على الحدث";

    }


    updateEventCountdown();

    countdownInterval = setInterval(updateEventCountdown, 1000);

}


/* =================================
   PREVIOUS EVENTS
================================= */

function renderPreviousEvents() {

    const previousEvents = getPreviousEvents();


    // No Previous Events

    if (!previousEvents.length) {

        previousEventsList.innerHTML = `

            <div class="events-empty">

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

        // Remove Active Class

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
        const targetContent =
            document.getElementById(selectedTab);

        if (targetContent) {

            targetContent.classList.add("active");

        }

    });

});


/* =================================
   INITIALIZE EVENTS
================================= */

// Render Upcoming / Ongoing Event

renderUpcomingEvent();


// Render Previous Events

renderPreviousEvents();


// Debugging

console.log("All Events:", eventInfo);

console.log("Upcoming Events:", getUpcomingEvents());

console.log("Ongoing Events:", getOngoingEvents());

console.log("Previous Events:", getPreviousEvents());