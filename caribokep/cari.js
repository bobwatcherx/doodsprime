document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.querySelector('.btn-danger');
  searchButton.addEventListener('click', handleSearch);
});

function handleSearch() {
  const inputElement = document.querySelector('input');
  const keyword = inputElement.value;

  // Perform search API request
  fetch(`https://oakdoodserver.deno.dev/search/videos?key=219725bbkborbourrp2cd4&search_term=${keyword}`)
    .then(response => response.json())
    .then(data => {
      // Handle the search results
      displaySearchResults(data.result);
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error if necessary
    });
}

function displaySearchResults(results) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ''; // Clear existing cards

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'card col-lg-4 col-md-3 col-sm-12';
    card.innerHTML = `
     <a href="../player.html?id=${result.file_code}">
      <img src="${result.single_img}" class="card-img-top" alt="${result.title}">
      <div class="card-body">
        <h5 class="card-title">${result.title}</h5>
        <p class="card-text">Views: ${result.views}</p>
        <p class="card-text">Uploaded: ${result.uploaded}</p>
        <div style="display:flex;justify-content:end">
              <a 
              class="btn btn-danger m-3"
              href="../player.html?id=${result.file_code}">
              Nonton bokep
              </a>
            </div>
      </div>
      </a>
    `;
    cardContainer.appendChild(card);
  });
}
