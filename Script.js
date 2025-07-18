document.addEventListener('DOMContentLoaded', function() {
  // Add categories to each image
  const images = [
    { file: 'abay.jpg', category: 'nature' },
    { file: 'aksum.jpg', category: 'city' },
    { file: 'arbaminch.jpg', category: 'nature' },
    { file: 'arbaminch2.jpg', category: 'nature' },
    { file: 'arbaminch3.jpg', category: 'nature' },
    { file: 'Awassa,_2016.png', category: 'city' },
    { file: 'b47ab50bf89bb8561a6cddecb127d2f1.jpg', category: 'people' },
    { file: 'back2.jpg', category: 'city' },
    { file: 'banana.jpg', category: 'nature' },
    { file: 'carousel-1.jpg', category: 'people' },
    { file: 'carousel-2.jpg', category: 'people' },
    { file: 'dire.jpg', category: 'city' },
    { file: 'e51105c6ddc7e22a82ea89053ea4d00e.jpg', category: 'nature' },
    { file: 'Ethiopian-adventure-tours-spices.jpg', category: 'people' },
    { file: 'Ethiopian-adventure-tours-villagers.jpg', category: 'people' },
    { file: 'Ethiopian-Adventure-travel-gondor.jpg', category: 'city' },
    { file: 'ethiopianadventuretours_culture_2.jpg', category: 'people' },
    { file: 'ethiopianadventuretours_history_3.jpg', category: 'city' },
    { file: 'Fiki.jpg', category: 'people' },
    { file: 'harer2.jpg', category: 'city' }
  ];
  let filteredCategory = 'all';
  let filteredImages = images;
  let current = 0;

  const carousel = document.getElementById('galleryCarousel');
  const mainImage = document.getElementById('mainImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderThumbnails() {
    carousel.innerHTML = '';
    filteredImages.forEach((img, idx) => {
      const thumb = document.createElement('img');
      thumb.src = 'Image/' + img.file;
      thumb.alt = `Gallery image ${idx+1}`;
      thumb.className = idx === current ? 'selected' : '';
      thumb.addEventListener('click', () => {
        current = idx;
        updateMain();
      });
      thumb.addEventListener('dblclick', () => openLightbox(idx));
      carousel.appendChild(thumb);
    });
  }

  function updateMain() {
    if (!filteredImages.length) {
      mainImage.src = '';
      mainImage.alt = 'No images in this category';
      return;
    }
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = 'Image/' + filteredImages[current].file;
      mainImage.style.opacity = 1;
    }, 200);
    renderThumbnails();
  }

  prevBtn.onclick = function() {
    if (!filteredImages.length) return;
    current = (current - 1 + filteredImages.length) % filteredImages.length;
    updateMain();
  };
  nextBtn.onclick = function() {
    if (!filteredImages.length) return;
    current = (current + 1) % filteredImages.length;
    updateMain();
  };

  // Lightbox modal
  function openLightbox(idx) {
    if (!filteredImages.length) return;
    lightboxImg.src = 'Image/' + filteredImages[idx].file;
    lightboxModal.classList.add('active');
  }
  mainImage.addEventListener('click', () => openLightbox(current));
  lightboxClose.addEventListener('click', () => {
    lightboxModal.classList.remove('active');
    lightboxImg.src = '';
  });
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxImg.src = '';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (lightboxModal.classList.contains('active') && (e.key === 'Escape' || e.key === ' ')) {
      lightboxModal.classList.remove('active');
      lightboxImg.src = '';
    }
  });

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filteredCategory = btn.getAttribute('data-category');
      if (filteredCategory === 'all') {
        filteredImages = images;
      } else {
        filteredImages = images.filter(img => img.category === filteredCategory);
      }
      current = 0;
      updateMain();
    });
  });

  // Set default filter
  filterBtns[0].classList.add('active');
  filteredImages = images;
  updateMain();
});