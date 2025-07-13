// search.js — fetches data, applies filters, and renders results dynamically

const params = new URLSearchParams(window.location.search);
const query = params.get("query")?.toLowerCase() || "";
const date = params.get("date") || "";
const category = params.get("category") || "";

// Fetch data from JSON file
fetch("data/events.json")
  .then(res => res.json())
  .then(events => {
    const eventList = document.getElementById("eventList");

    // Filter logic
    const filteredEvents = events.filter(event => {
      const matchesQuery = !query || event.name.toLowerCase().includes(query) || event.location.toLowerCase().includes(query);
      const matchesDate = !date || event.date === date;
      const matchesCategory = !category || event.category === category;
      return matchesQuery && matchesDate && matchesCategory;
    });

    // Display dynamic headings depending on whether the event is search of the user goes directly to the events page
    const heading = document.getElementById("eventHeading");
    const hasSearch = query || date || category;
    heading.textContent = hasSearch ? "Events Matching Your Search" : "All Available Events";

    // Render
    if (filteredEvents.length === 0) {
      eventList.innerHTML = "<p class='text-center'>No events found.</p>";
    } else {
      filteredEvents.forEach(event => {
        const article = document.createElement("article");
        article.className = "col-md-4";
        article.innerHTML = `
          <div class="card h-100 shadow d-flex flex-column justify-content-between">
            <div class="card-body d-flex flex-column">
              <h3 class="card-title">${event.name}</h3>
              <p><strong>Date:</strong> ${event.date}</p>
              <p><strong>Location:</strong> ${event.location}</p>
              <p>${event.description}</p>
              <div class="mt-auto text-center">
                <a href="event-details.html?id=${event.id}" class="btn btn-outline-primary mt-2" aria-label="View details for ${event.name}">View Details</a>
              </div>
            </div>
          </div>`;
        eventList.appendChild(article);
      });
    }
  })
  .catch(error => {
    console.error("Error loading events:", error);
    document.getElementById("eventList").innerHTML = "<p class='text-center text-danger'>Error loading events.</p>";
  });