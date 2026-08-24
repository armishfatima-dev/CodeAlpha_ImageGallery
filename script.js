const images = [
    // --- CITIES ---
    { title: "New York City Skyline", category: "cities", src: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=800" },
    { title: "Burj Khalifa Dubai", category: "cities", src: "https://plus.unsplash.com/premium_photo-1694475634077-e6e4b623b574?w=800" },
    { title: "Melbourne Cityscape", category: "cities", src: "https://images.unsplash.com/photo-1766766784935-a89ae5eadf4f?w=500" },

    // --- BEACHES ---
    { title: "Maldives Overwater Bungalows", category: "beaches", src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800" },
    { title: "Turquoise Water Beach - Maldives", category: "beaches", src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800" },
    { title: "Baa Atoll Crystal Shore", category: "beaches", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
    { title: "Grace Bay Beach", category: "beaches", src: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800" },

    // --- CARS ---
    { title: "Sleek BMW M Series", category: "cars", src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800" },
    { title: "Mercedes-Benz AMG", category: "cars", src: "https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?w=800" },
    { title: "Luxury Range Rover Velar", category: "cars", src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800" },
    { title: "Red Ferrari Supercar", category: "cars", src: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800" },
    { title: "Lamborghini Huracán", category: "cars", src: "https://images.unsplash.com/photo-1612148493229-86d3671eb44d?w=800" },

    // --- NATURE ---
    { title: "Majestic Alpine Mountains", category: "nature", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800" },
    { title: "Misty Pine Forest Path", category: "nature", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800" },
    { title: "Scenic Desert Highway", category: "nature", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800" },

    // --- ANIMALS ---
    { title: "African Male Lion", category: "animals", src: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800" },
    { title: "Galloping White Horse", category: "animals", src: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800" },
    { title: "Bengal Tiger Close-up", category: "animals", src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800" },

    // --- ARCHITECTURE ---
    { title: "Eiffel Tower, Paris", category: "architecture", src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800" },
    { title: "Colosseum, Rome", category: "architecture", src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800" },
    { title: "Milan Cathedral Duomo", category: "architecture", src: "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?w=800" }
];

const galleryGrid = document.getElementById("galleryGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let filteredImages = [...images];

function renderGallery(items) {
    galleryGrid.innerHTML = items.map((item, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
                <span>${item.category}</span>
            </div>
        </div>
    `).join("");
}

function filterGallery(category) {
    if (category === "all") {
        filteredImages = [...images];
    } else {
        filteredImages = images.filter(img => img.category === category);
    }
    renderGallery(filteredImages);
}

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        filterGallery(btn.dataset.filter);
    });
});

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
}

function updateLightbox() {
    const item = filteredImages[currentIndex];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.title;
}

closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightbox();
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") lightbox.classList.remove("active");
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
});

renderGallery(images);

