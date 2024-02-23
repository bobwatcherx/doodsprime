document.getElementById('loading').style.display = 'block';

// Function to generate pagination links
function generatePagination(totalPages, currentPage) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  // Previous page
  const prevLi = document.createElement('li');
  prevLi.className = 'page-item';
  const prevLink = document.createElement('a');
  prevLink.className = 'page-link';
  prevLink.href = '#';
  prevLink.textContent = 'Previous';
  prevLink.addEventListener('click', () => fetchData(currentPage - 1));
  prevLi.appendChild(prevLink);
  paginationContainer.appendChild(prevLi);

  // Current page
  const currentLi = document.createElement('li');
  currentLi.className = 'page-item active';
  const currentLink = document.createElement('span');
  currentLink.className = 'page-link';
  currentLink.textContent = currentPage;
  currentLi.appendChild(currentLink);
  paginationContainer.appendChild(currentLi);

  // Next page
  const nextLi = document.createElement('li');
  nextLi.className = 'page-item';
  const nextLink = document.createElement('a');
  nextLink.className = 'page-link';
  nextLink.href = '#';
  nextLink.textContent = 'Next';
  nextLink.addEventListener('click', () => fetchData(currentPage + 1));
  nextLi.appendChild(nextLink);
  paginationContainer.appendChild(nextLi);
}

// Function to fetch data based on page
function fetchData(page) {
  document.getElementById('loading').style.display = 'block';

  fetch(`https://oakdoodserver.deno.dev/getbyid?fld_id=797235&page=${page}&per_page=40`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading').style.display = 'none';
      const cardContainer = document.getElementById('card-container');
      cardContainer.innerHTML = ''; // Clear existing cards

      data.data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card col-lg-4 col-md-3 col-sm-12';
        card.innerHTML = `
           <a href="/player.html?id=${item.file_code}">
            <img src="${item.single_img}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">Views: ${item.views}</p>
              <p class="card-text">Uploaded: ${item.uploaded}</p>
            </div>
            <div style="display:flex;justify-content:end">
              <a 
              class="btn btn-danger m-3"
              href="/player.html?id=${item.file_code}">
              Nonton bokep
              </a>
            </div>
          </a>
        `;
        cardContainer.appendChild(card);
      });

      generatePagination(data.total_pages, page);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('loading').innerHTML = 'Error loading data.';
   
      document.getElementById('loading').innerHTML = 'Error loading data.';
      generatePagination(0, 0); // Display empty pagination on error
    });
}

// Initial data fetch for page 1
fetchData(1);
