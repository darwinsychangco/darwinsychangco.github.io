const channelRSSURL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCdXorgCT87YlFRN9n8oJ7_A";
const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(channelRSSURL)}`;

async function loadYouTubeFeed() {
  const targetElement = document.getElementById("snow-dev-yt-feed");

  if (!targetElement) {
    return;
  }

  try {
    const response = await fetch(reqURL, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Feed request failed with status ${response.status}`);
    }

    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];

    if (!items.length) {
      targetElement.innerHTML = "<p>No videos are available right now.</p>";
      return;
    }

    let html = `
      <h3>ServiceNow Dev Program Youtube Videos</h3>
      <ul class="list-unstyled snow-dev-list">
    `;

    items.forEach((video) => {
      html += `
        <li class="snow-dev-list-item my-3">
          <a class="snow-dev-list-link" href="${video.link}" target="_blank" rel="noopener noreferrer">
            <b>${video.title}</b>
          </a>
        </li>
      `;
    });

    html += "</ul>";
    targetElement.innerHTML = html;
  } catch (error) {
    console.error("Unable to load YouTube feed.", error);
    targetElement.innerHTML = `
      <h3>ServiceNow Dev Program Youtube Videos</h3>
      <p>The video feed could not be loaded right now.</p>
    `;
  }
}

loadYouTubeFeed();
