 const urlParams = new URLSearchParams(window.location.search);
    const fileId = urlParams.get('id');
   const cardContainer = document.getElementById('card-container');

      const card = document.createElement('div');
        card.innerHTML = `
          <div>
            <iframe src="https://d0000d.com/e/${fileId}" 
            allowfullscreen="true"
            allowscrolling="no"
            frameborder="0" style="width:100%;height: 400px;"></iframe>
            <div class="container">
              <a class="btn btn-danger mt-3" 
              target="blank"
              style="width:100%"
              href="https://cuty.io/quick?token=f4447c43a00a22712337b5dff&url=https://d0000d.com/d/${fileId}" target="_blank">Download Bokep Disini</a>
              <p style="color:red;font-weight=bold">
                Lewatin Iklan nya kalo mau download bokep bro
              </p>
            </div>
          </div>
        `;
        cardContainer.appendChild(card);

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



    // RELATED
  function fetchRelated() {
  fetch(`https://detadood-1-a9220092.deta.app/dood_random?key=341300fa7wlho1oybi4s3m&page=1&per_page=100`)
    .then(response => response.json())
    .then(data => {
      const totalPages = data.result.total_pages;
      const randomPage = Math.floor(Math.random() * totalPages) + 1; // Generate random page number
      return fetch(`https://detadood-1-a9220092.deta.app/dood_random?key=341300fa7wlho1oybi4s3m&page=${randomPage}&per_page=100`);
    })
    .then(response => response.json())
    .then(data => {
      const cardContainer = document.getElementById('related');
      cardContainer.innerHTML = ''; // Clear existing cards
      data.result.files.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card col-lg-4 col-md-3 col-sm-12 ';
        card.innerHTML = `
          <div class="shadow-lg">
           <a href="/player.html?id=${item.file_code}"
           style="text-decoration:none;color:black"
           >
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
          <button class="btn btn-primary" style="width:100%"
            onclick="handleTontonNantiClick('${item.file_code}', '${item.single_img}','${item.title}')">
            Tonton Bokep ini Nanti
          </button>
          </div>
        `;
        cardContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('loading').innerHTML = 'Error loading data.';
      document.getElementById('loading').innerHTML = 'Error loading data.';
    });
}

fetchRelated()
