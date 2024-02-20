var channelRSSURL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCdXorgCT87YlFRN9n8oJ7_A";
var reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelRSSURL}`;

fetch(reqURL)
  .then(response => response.json())
  .then(data => {
    let html = `
		<h3>ServiceNow Dev Program Youtube Videos</h3>
		<ul class="list-unstyled snow-dev-list">`;

    data.items.forEach(video => {
      html += `
		<li class="snow-dev-list-item my-3"><a class="snow-dev-list-link" href="${video.link}"><b>${video.title}</b></a></li>
      `;
    });
    html += `</ul>`;
    //console.log(html);
    var targetElement = document.getElementById("snow-dev-yt-feed");
    targetElement.insertAdjacentHTML("beforeend", html);
  })
  .catch((error) => console.log("error", error));