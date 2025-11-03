const apiKey = "b4df0274ae2d40b08b414488f8f137f4";
const newsContainer = document.getElementById("newsContainer");
let allArticles = [];

// Fetch data dari NewsAPI
async function fetchNews() {
  const url = `https://newsapi.org/v2/everything?q=indonesia&language=id&pageSize=9&sortBy=publishedAt&apiKey=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    allArticles = data.articles;
    displayNews(allArticles);
  } catch (error) {
    newsContainer.innerHTML = `<p class="text-danger">Gagal memuat berita. Coba lagi nanti.</p>`;
  }
}

// Tampilkan berita
function displayNews(articles) {
  newsContainer.innerHTML = "";
  if (articles.length === 0) {
    newsContainer.innerHTML = `<p class="text-muted">Tidak ada berita ditemukan.</p>`;
    return;
  }

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" class="card-img-top" alt="Gambar Berita">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${article.title}</h5>
          <small class="text-muted mb-2">${formatTanggal(article.publishedAt)}</small>
          <p class="card-text">${article.description || 'Tidak ada ringkasan tersedia.'}</p>
          <a href="${article.url}" class="btn btn-primary mt-auto" target="_blank">Baca Selengkapnya</a>
        </div>
        <div class="card-footer text-muted small">${article.source.name}</div>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

// Fungsi untuk memformat tanggal jadi "Jumat, 3 Oktober 2025"
function formatTanggal(dateString) {
  const tanggal = new Date(dateString);
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  return new Intl.DateTimeFormat('id-ID', options).format(tanggal);
}

// Filter berita dari input pencarian
function filterNews() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allArticles.filter(article =>
    article.title.toLowerCase().includes(keyword) ||
    (article.description && article.description.toLowerCase().includes(keyword)) ||
    (article.source.name && article.source.name.toLowerCase().includes(keyword))
  );
  displayNews(filtered);
}

fetchNews();
