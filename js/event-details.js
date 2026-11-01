document.addEventListener("DOMContentLoaded", () => {

    // Get Event ID from URL
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("id");

    // Find Event
    const events = window.eventsData || [];
    const event = events.find(item => item.id === eventId);

    // DOM Elements
    const detailName = document.getElementById("detail-name");
    const detailDate = document.getElementById("detail-date");
    const detailLocation = document.getElementById("detail-location");
    const detailDescription = document.getElementById("detail-description");
    const detailImage = document.getElementById("detail-image");
    const detailCategory = document.getElementById("detail-category");
    const detailActivities = document.getElementById("detail-activities");
    const detailGallery = document.getElementById("detail-gallery");

    // Format Date
    function formatDate(date) {
        return new Date(date).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    // Event Not Found
    if (!event) {

        document.querySelector(".event-page-container").innerHTML = `
            <div class="event-not-found">
                <i class="fas fa-calendar-xmark"></i>

                <h2>عذرًا، الحدث غير موجود</h2>

                <p>قد يكون الرابط غير صحيح أو أن الحدث غير متاح.</p>

                <a href="events.html">
                    العودة إلى الفعاليات
                </a>
            </div>`;

        document.title = "الحدث غير موجود | ASU Science Rover";
        return;
    }

    // Page Title
    document.title = `${event.name} | ASU Science Rover`;

    // Event Information
    detailName.textContent = event.name;

    detailDate.textContent =
        event.dateText || formatDate(event.date);

    detailLocation.textContent =
        event.location || "غير محدد";

    detailDescription.textContent =
        event.details || event.description || "";

    detailCategory.textContent =
        event.category || "فعالية العشيرة";

    // Event Image
    if (event.image) {
        detailImage.src = event.image;
        detailImage.alt = event.name;
        detailImage.style.display = "block";
    } else {
        detailImage.style.display = "none";
    }

    // Event Activities
    if (event.activities?.length) {

        detailActivities.innerHTML = event.activities.map(activity => `
            <div class="activity-item">
                <i class="fas fa-check-circle"></i>
                <span>${activity}</span>
            </div>
        `).join("");

    } else {
        document.getElementById("activities-section").hidden = true;
    }

    // Event Gallery
    if (event.gallery?.length) {

        detailGallery.innerHTML = event.gallery.map(image => `
            <div class="gallery-item">
                <img
                    src="${image}"
                    alt="${event.name}"
                    loading="lazy"
                >
            </div>
        `).join("");

    } else {
        document.getElementById("gallery-section").hidden = true;
    }

});