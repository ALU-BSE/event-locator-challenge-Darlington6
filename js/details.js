// Single Event Rendering

const detailParams = new URLSearchParams(window.location.search);
const eventId = parseInt(detailParams.get("id"));

const event = events.find(e => e.id === eventId);
const detailContainer = document.getElementById("eventDetail");

if (!event) {
  detailContainer.innerHTML = "<p class='text-center'>Event not found.</p>";
} else {
  detailContainer.innerHTML = `
    <article class="card shadow">
      <div class="card-body">
        <h2 class="card-title">${event.name}</h2>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p class="mt-3">${event.details}</p>
        <a href="events.html" class="btn btn-secondary mt-3">Back to Events</a>
      </div>
    </article>
  `;
}