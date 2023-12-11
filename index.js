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

function handleTontonNantiClick(fileCode, singleImg,title) {
  // Get existing list from localStorage or initialize an empty array
  const listTonton = JSON.parse(localStorage.getItem('list_tonton')) || [];

  // Create a new item to append to the list
  const newItem = {
    title:title,
    filecode:fileCode,
    image: singleImg,
    created: new Date().toISOString(), // Store the current date and time
  };

  // Append the new item to the list
  listTonton.push(newItem);

  // Save the updated list to localStorage
  localStorage.setItem('list_tonton', JSON.stringify(listTonton));

  // Display a SweetAlert2 popup to inform the user
  Swal.fire({
    icon: 'success',
    title: 'Berhasil ditambahkan ke TONTON NANTI',
    showConfirmButton: true,
  });
}



// Function to fetch data based on page
function fetchData(page) {
  document.getElementById('loading').style.display = 'block';

  fetch(`https://testdood.vercel.app/posts?page=${page}&per_page=40`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading').style.display = 'none';
      const cardContainer = document.getElementById('card-container');
      cardContainer.innerHTML = ''; // Clear existing cards

      data.data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card shadow col-lg-4 col-md-3 col-sm-12';
        card.innerHTML = `
           <div>
           <a href="/player.html?id=${item.file_code}">
            <img src="${item.single_img}" 
            style="width:100%"
             alt="${item.title}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">Ditonton: ${item.views}</p>
              <p class="card-text">Di upload: ${item.uploaded}</p>
            </div>
            <div style="display:flex;justify-content:end">
            
              <a 
              class="btn btn-danger m-3"
              href="/player.html?id=${item.file_code}">
              Nonton bokep
              </a>
            </div>
          </a>
           <button class="btn btn-primary" style="width:100%"
            onclick="handleTontonNantiClick('${item.file_code}', '${item.single_img}','${item.title}')">
            Tonton Nanti
          </button>
           </div>
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
