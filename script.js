async function filterNews() {
  const query = document.getElementById("searchInput").value;
  const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  data.articles.forEach(article => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description || ''}</p>
            <a href="${article.url}" target="_blank" class="btn btn-primary">Baca Selengkapnya</a>
          </div>
        </div>
      </div>`;
  });
}
