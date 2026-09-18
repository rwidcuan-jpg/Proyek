const searchInput = document.getElementById("searchService");
const serviceCards = document.querySelectorAll(".service-card");
const noResult = document.getElementById("noResult");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function filterServices() {

    const keyword = searchInput.value.toLowerCase().trim();

    let found = 0;

    serviceCards.forEach(function (card) {

        const serviceName =
            card.querySelector("h3").textContent.toLowerCase();

        const serviceDescription =
            card.querySelector("p").textContent.toLowerCase();

        const category =
            card.dataset.category;

        const matchesSearch =
            serviceName.includes(keyword) ||
            serviceDescription.includes(keyword);

        const matchesCategory =
            currentFilter === "all" ||
            category === currentFilter;

        if (matchesSearch && matchesCategory) {

            card.style.display = "flex";
            found++;

        } else {

            card.style.display = "none";

        }

    });

    if (found === 0) {
        noResult.style.display = "block";
    } else {
        noResult.style.display = "none";
    }
}


// SEARCH
searchInput.addEventListener("input", function () {
    filterServices();
});


// FILTER
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterServices();

    });

});

/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");


// NAVBAR SAAT SCROLL

window.addEventListener("scroll", function () {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// BUKA / TUTUP MENU HP

navToggle.addEventListener("click", function () {

    navToggle.classList.toggle("active");

    navMenu.classList.toggle("open");

});


// KLIK MENU → TUTUP MENU HP

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navToggle.classList.remove("active");

        navMenu.classList.remove("open");

    });

});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});

/* =========================
   PAGE LOADER
========================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("pageLoader");

    setTimeout(function () {

        loader.classList.add("hide");

    }, 500);

});

document.querySelectorAll(".filter-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const kategori = this.getAttribute("data-filter");

        document.querySelectorAll(".filter-btn").forEach(function(btn) {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        document.querySelectorAll(".service-card").forEach(function(card) {

            const kategoriCard = card.getAttribute("data-category");

            if (kategori === "all" || kategoriCard === kategori) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }

        });

    });

});

document.querySelectorAll(".filter-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const kategori = this.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(function(btn) {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        document.querySelectorAll(".service-card").forEach(function(card) {

            if (
                kategori === "all" ||
                card.dataset.category === kategori
            ) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }

        });

    });

});
