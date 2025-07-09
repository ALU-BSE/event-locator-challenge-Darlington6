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

    // Render
    if (filteredEvents.length === 0) {
      eventList.innerHTML = "<p class='text-center'>No events found.</p>";
    } else {
      filteredEvents.forEach(event => {
        const article = document.createElement("article");
        article.className = "col-md-4";
        article.innerHTML = `
          <div class="card h-100 shadow">
            <div class="card-body">
              <h3 class="card-title">${event.name}</h3>
              <p><strong>Date:</strong> ${event.date}</p>
              <p><strong>Location:</strong> ${event.location}</p>
              <p>${event.description}</p>
              <a href="event-details.html?id=${event.id}" class="btn btn-outline-primary mt-2" aria-label="View details for ${event.name}">View Details</a>
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