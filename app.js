const API = "http://YOUR_IP:8000";

let audio = new Audio();

async function search() {
  const query = document.getElementById("search").value;

  const res = await fetch(`${API}/search?query=${query}`);
  const data = await res.json();

  const container = document.getElementById("results");
  container.innerHTML = "";

  data.forEach(song => {
    const div = document.createElement("div");
    div.className = "song";

    div.innerHTML = `
      ${song.title}
      <br><br>
      <button onclick="play('${song.url}', '${song.title}')">▶</button>
      <button onclick="download('${song.url}', '${song.title}')">⬇</button>
    `;

    container.appendChild(div);
  });
}

async function play(url, title) {
  document.getElementById("songInfo").innerText = "Loading...";

  const res = await fetch(`${API}/stream?url=${url}`);
  const data = await res.json();

  audio.src = data.stream_url;
  audio.play();

  document.getElementById("songInfo").innerText = title;
}

async function download(url, title) {
  const res = await fetch(`${API}/stream?url=${url}`);
  const data = await res.json();

  const blob = await fetch(data.stream_url).then(r => r.blob());
  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);
  a.download = title + ".mp3";
  a.click();
}
