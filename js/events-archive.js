// DOM Elements

const archiveGrid =
    document.getElementById("archiveGrid");

const eventSearch =
    document.getElementById("eventSearch");

const eventsCount =
    document.getElementById("eventsCount");

const archiveEmpty =
    document.getElementById("archiveEmpty");


// Get Previous Events

function getArchiveEvents() {

    return window.eventsData

        .filter(event =>
            new Date(event.date).getTime() <= Date.now()
        )

        .sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

}


// Render Events

function renderArchive(searchValue = "") {

    const previousEvents = getArchiveEvents();

    const filteredEvents = previousEvents.filter(event => {

        const searchText = searchValue.toLowerCase();

        return (
            event.name.toLowerCase().includes(searchText) ||

            (event.category || "").toLowerCase().includes(searchText) ||

            (event.location || "").toLowerCase().includes(searchText)
        );

    });


    // Events Count

    eventsCount.textContent =
        `${filteredEvents.length} فعالية`;


    // Empty State

    if (!filteredEvents.length) {

        archiveGrid.innerHTML = "";

        archiveEmpty.hidden = false;

        return;

    }

    archiveEmpty.hidden = true;


    // Render Cards

    archiveGrid.innerHTML = filteredEvents.map(event => `

        <article class="archive-card">

            <div class="archive-card-image">

                ${
                    event.image
                    ? `<img src="${event.image}"
                            alt="${event.name}"
                            loading="lazy">`
                    : `<div class="archive-image-placeholder">
                            <i class="fas fa-camera"></i>
                       </div>`
                }

                <span class="archive-category">
                    ${event.category || "فعالية"}
                </span>

            </div>


            <div class="archive-card-content">

                <div class="archive-date">

                    <i class="fas fa-calendar-alt"></i>

                    ${event.dateText || new Date(event.date).toLocaleDateString("ar-EG")}

                </div>


                <h3>${event.name}</h3>


                <p>${event.description || ""}</p>


                <a href="${event.link || `event.html?id=${encodeURIComponent(event.id)}`}">

                    عرض التفاصيل

                    <i class="fas fa-arrow-left"></i>

                </a>

            </div>

        </article>

    `).join("");

}


// Search

eventSearch.addEventListener("input", function () {

    renderArchive(this.value.trim());

});


// Initialize

renderArchive();