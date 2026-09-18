/* =========================
   SERVICE SEARCH & FILTER
========================= */

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


/* SEARCH */

if (searchInput) {

    searchInput.addEventListener("input", function () {
        filterServices();
    });

}


/* FILTER */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        filterServices();

    });

});


/* =========================
   NAVBAR
========================= */

/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("main section[id]");

function updateNavbar() {

    // Efek navbar saat scroll
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    }

    // Menentukan section yang sedang terlihat
    let currentSection = "beranda";
    const scrollPosition = window.scrollY + 140;

    sections.forEach(function (section) {

        const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition >= sectionTop) {
            currentSection = section.id;
        }
    });

    // Mengubah menu aktif
    navLinks.forEach(function (link) {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );

    });
}

// Jalankan saat scroll
window.addEventListener("scroll", updateNavbar);

// Jalankan saat halaman pertama dibuka
window.addEventListener("load", updateNavbar);


// Hamburger mobile
if (navToggle && navMenu) {

    navToggle.addEventListener("click", function () {

        navToggle.classList.toggle("active");
        navMenu.classList.toggle("open");

    });

}


// Tutup menu setelah memilih navigasi
navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navToggle) {
            navToggle.classList.remove("active");
        }

        if (navMenu) {
            navMenu.classList.remove("open");
        }

    });

});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

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

} else {

    revealElements.forEach(function (element) {

        element.classList.add("show");

    });

}


/* =========================
   PAGE LOADER
========================= */

window.addEventListener("load", function () {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) return;

    setTimeout(function () {

        loader.classList.add("hide");

    }, 500);

});

/* =========================
   SERVICE MODAL
========================= */

const serviceModal = document.getElementById("serviceModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalIcon = document.getElementById("modalIcon");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLink = document.getElementById("modalLink");

const serviceLinks = document.querySelectorAll(".service-card .service-link");

serviceLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const card = link.closest(".service-card");

        if (!card) return;

        const title = card.querySelector("h3");
        const description = card.querySelector("p");
        const icon = card.querySelector(".service-icon");
        const category = card.dataset.category;

        modalTitle.textContent = title
            ? title.textContent
            : "Layanan Kepegawaian";

        modalDescription.textContent = description
            ? description.textContent
            : "Akses layanan kepegawaian.";

        modalIcon.textContent = icon
            ? icon.textContent
            : "💼";

        modalCategory.textContent =
            category
                ? category.replace("-", " ").toUpperCase()
                : "LAYANAN";

        modalLink.href = link.href;

        serviceModal.classList.add("show");

        document.body.style.overflow = "hidden";
    });
});


function closeServiceModal() {

    serviceModal.classList.remove("show");

    document.body.style.overflow = "";
}


if (modalClose) {
    modalClose.addEventListener("click", closeServiceModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", closeServiceModal);
}


// Tutup dengan tombol ESC
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeServiceModal();
    }

});

/* =========================
   LIVE CLOCK
========================= */

const liveClock = document.getElementById("liveClock");
const liveDate = document.getElementById("liveDate");

function updateLiveClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const date = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    if (liveClock) {
        liveClock.textContent = time;
    }

    if (liveDate) {
        liveDate.textContent = date;
    }
}

updateLiveClock();

setInterval(updateLiveClock, 1000);

/* =========================
   ADMIN PANEL
========================= */

const adminButton =
    document.getElementById("adminButton");

const adminModal =
    document.getElementById("adminModal");

const adminOverlay =
    document.getElementById("adminOverlay");

const adminClose =
    document.getElementById("adminClose");

const adminAnnouncement =
    document.getElementById("adminAnnouncement");

const adminStatus =
    document.getElementById("adminStatus");

const adminServices =
    document.getElementById("adminServices");

const adminSave =
    document.getElementById("adminSave");

const previewAnnouncement =
    document.getElementById("previewAnnouncement");

const previewStatus =
    document.getElementById("previewStatus");

const previewDot =
    document.getElementById("previewDot");


// PUBLIC ELEMENT
const publicAnnouncement =
    document.getElementById("publicAnnouncement");

const announcementStatus =
    document.getElementById("announcementStatus");

const publicStatus =
    document.getElementById("publicStatus");

const publicStatusDot =
    document.getElementById("publicStatusDot");


// =========================
// OPEN ADMIN
// =========================

function openAdminPanel() {

    if (!adminModal) return;

    adminModal.classList.add("show");

    document.body.style.overflow = "hidden";
}


// =========================
// CLOSE ADMIN
// =========================

function closeAdminPanel() {

    if (!adminModal) return;

    adminModal.classList.remove("show");

    document.body.style.overflow = "";
}


if (adminButton) {

    adminButton.addEventListener(
        "click",
        openAdminPanel
    );

}


if (adminClose) {

    adminClose.addEventListener(
        "click",
        closeAdminPanel
    );

}


if (adminOverlay) {

    adminOverlay.addEventListener(
        "click",
        closeAdminPanel
    );

}


// =========================
// PREVIEW
// =========================

if (adminAnnouncement) {

    adminAnnouncement.addEventListener(
        "input",
        function () {

            previewAnnouncement.textContent =
                this.value ||
                "Belum ada pengumuman.";

        }
    );

}


if (adminStatus) {

    adminStatus.addEventListener(
        "change",
        function () {

            updateStatusPreview(
                this.value
            );

        }
    );

}


function updateStatusPreview(status) {

    if (status === "online") {

        previewStatus.textContent =
            "PORTAL ONLINE";

        previewDot.style.background =
            "#16a765";

    } else {

        previewStatus.textContent =
            "MAINTENANCE";

        previewDot.style.background =
            "#e09a28";

    }

}


// =========================
// SAVE DATA
// =========================

if (adminSave) {

    adminSave.addEventListener(
        "click",
        function () {

            const announcement =
                adminAnnouncement.value.trim();

            const status =
                adminStatus.value;

            const services =
                adminServices.value;


            localStorage.setItem(
                "portalAnnouncement",
                announcement
            );

            localStorage.setItem(
                "portalStatus",
                status
            );

            localStorage.setItem(
                "portalServices",
                services
            );


            applyPortalSettings();

            alert(
                "Pengaturan berhasil disimpan."
            );

            closeAdminPanel();

        }
    );

}


// =========================
// APPLY SETTINGS
// =========================

function applyPortalSettings() {

    const savedAnnouncement =
        localStorage.getItem(
            "portalAnnouncement"
        );

    const savedStatus =
        localStorage.getItem(
            "portalStatus"
        );

    const savedServices =
        localStorage.getItem(
            "portalServices"
        );

    const dashboardServices =
        document.getElementById("dashboardServices");

    const dashboardStatus =
        document.getElementById("dashboardStatus");

    const systemStatusText =
        document.getElementById("systemStatusText");

    const systemStatusBadge =
        document.getElementById("systemStatusBadge");


    // Pengumuman
    if (
        savedAnnouncement &&
        publicAnnouncement
    ) {

        publicAnnouncement.textContent =
            savedAnnouncement;

    }


    // Status
    if (savedStatus === "maintenance") {

        if (publicStatus) {
            publicStatus.textContent =
                "MAINTENANCE";
        }

        if (announcementStatus) {
            announcementStatus.textContent =
                "Portal sedang dalam pemeliharaan.";
        }

        if (publicStatusDot) {
            publicStatusDot.style.background =
                "#e09a28";
        }

    } else {

        if (publicStatus) {
            publicStatus.textContent =
                "ONLINE";
        }

        if (announcementStatus) {
            announcementStatus.textContent =
                "Portal dapat diakses secara online.";
        }

        if (publicStatusDot) {
            publicStatusDot.style.background =
                "#16a765";
        }
        // =========================
        // UPDATE PUBLIC DASHBOARD
        // =========================

        if (savedServices && dashboardServices) {

            dashboardServices.textContent =
                savedServices + "+";

        }


        if (savedStatus === "maintenance") {

            if (dashboardStatus) {
                dashboardStatus.textContent =
                    "MAINTENANCE";
            }

            if (systemStatusText) {
                systemStatusText.textContent =
                    "Portal sedang dalam pemeliharaan.";
            }

            if (systemStatusBadge) {

                systemStatusBadge.innerHTML =
                    '<span></span> MAINTENANCE';

                systemStatusBadge.style.background =
                    "#fff6e8";

                systemStatusBadge.style.color =
                    "#9a6515";

            }

        } else {

            if (dashboardStatus) {
                dashboardStatus.textContent =
                    "ONLINE";
            }

            if (systemStatusText) {
                systemStatusText.textContent =
                    "Layanan publik digital dapat diakses secara online.";
            }

            if (systemStatusBadge) {

                systemStatusBadge.innerHTML =
                    '<span></span> ONLINE';

                systemStatusBadge.style.background =
                    "#eaf8f0";

                systemStatusBadge.style.color =
                    "#087443";

            }

        }
    }


    // Jumlah layanan
    if (savedServices) {

        document
            .querySelectorAll(".counter")
            .forEach(function (counter) {

                if (
                    counter.dataset.target !== "24"
                ) {

                    counter.dataset.target =
                        savedServices;

                    counter.textContent =
                        savedServices + "+";

                }

            });

    }

}


// =========================
// LOAD SAVED SETTINGS
// =========================

window.addEventListener(
    "load",
    function () {

        applyPortalSettings();

    }
);


// =========================
// ESC
// =========================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAdminPanel();

        }

    }
);

/* =========================
   DASHBOARD UPDATE TIME
========================= */

const lastUpdate =
    document.getElementById("lastUpdate");

function updateDashboardTime() {

    if (!lastUpdate) return;

    const now = new Date();

    lastUpdate.textContent =
        now.toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

}

updateDashboardTime();

/* =========================
   DYNAMIC INFORMATION
========================= */

const informationData = [

    {
        id: 1,
        category: "pengumuman",
        title: "Selamat Datang di Portal Kepegawaian",
        description:
            "Portal digital untuk memudahkan akses berbagai layanan kepegawaian Kementerian Agama Kabupaten Kepahiang.",
        content:
            "Selamat datang di Portal Layanan Kepegawaian Kementerian Agama Kabupaten Kepahiang.\n\nPortal ini menyediakan akses terpusat menuju berbagai sistem dan layanan digital yang berkaitan dengan kebutuhan kepegawaian.",
        date: "18 September 2026",
        icon: "📢"
    },

    {
        id: 2,
        category: "panduan",
        title: "Panduan Mengakses Layanan Digital",
        description:
            "Pelajari langkah sederhana untuk menemukan dan membuka layanan yang tersedia pada portal.",
        content:
            "1. Buka halaman Layanan.\n\n2. Gunakan pencarian atau filter kategori.\n\n3. Pilih layanan yang dibutuhkan.\n\n4. Baca informasi layanan.\n\n5. Klik tombol Buka Layanan untuk menuju sistem terkait.",
        date: "18 September 2026",
        icon: "📖"
    },

    {
        id: 3,
        category: "jadwal",
        title: "Jadwal Pemeliharaan Sistem",
        description:
            "Informasi mengenai jadwal pemeliharaan sistem dapat diperbarui melalui pusat informasi portal.",
        content:
            "Informasi jadwal pemeliharaan sistem akan ditampilkan pada halaman ini apabila terdapat pemeliharaan yang telah dijadwalkan.",
        date: "18 September 2026",
        icon: "🕘"
    },

    {
        id: 4,
        category: "pengumuman",
        title: "Pembaruan Layanan Kepegawaian",
        description:
            "Informasi mengenai pembaruan atau perubahan akses layanan digital akan disampaikan melalui portal.",
        content:
            "Setiap perubahan penting pada layanan digital dapat diinformasikan melalui halaman Informasi.\n\nSilakan periksa halaman ini secara berkala untuk memperoleh informasi terbaru.",
        date: "17 September 2026",
        icon: "🔔"
    },

    {
        id: 5,
        category: "panduan",
        title: "Tips Menggunakan Portal",
        description:
            "Gunakan fitur pencarian untuk menemukan layanan dengan lebih cepat.",
        content:
            "Gunakan kata kunci yang sesuai dengan nama layanan.\n\nAnda juga dapat menggunakan filter kategori untuk mempersempit hasil pencarian.",
        date: "16 September 2026",
        icon: "💡"
    },

    {
        id: 6,
        category: "jadwal",
        title: "Informasi Jam Akses Layanan",
        description:
            "Setiap sistem layanan dapat memiliki jadwal operasional yang berbeda.",
        content:
            "Portal menyediakan akses menuju berbagai sistem eksternal.\n\nJam operasional masing-masing sistem dapat berbeda sehingga pengguna disarankan memperhatikan informasi pada layanan yang dipilih.",
        date: "15 September 2026",
        icon: "📅"
    }

];


const informationList =
    document.getElementById("informationList");

const informationEmpty =
    document.getElementById("informationEmpty");

const informationCount =
    document.getElementById("informationCount");

const informationSearch =
    document.getElementById("informationSearch");

const informationFilters =
    document.querySelectorAll(
        ".information-filter"
    );


let currentInformationFilter = "all";


/* =========================
   RENDER INFORMATION
========================= */

function renderInformation() {

    if (!informationList) return;

    const keyword =
        informationSearch
            ? informationSearch.value
                .toLowerCase()
                .trim()
            : "";


    const filteredData =
        informationData.filter(function (item) {

            const matchesCategory =
                currentInformationFilter === "all" ||
                item.category === currentInformationFilter;


            const matchesSearch =
                item.title
                    .toLowerCase()
                    .includes(keyword) ||

                item.description
                    .toLowerCase()
                    .includes(keyword) ||

                item.content
                    .toLowerCase()
                    .includes(keyword);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    informationList.innerHTML = "";


    filteredData.forEach(function (item) {

        const card =
            document.createElement("article");

        card.className =
            "dynamic-info-card";


        card.innerHTML = `

            <div class="dynamic-info-icon">
                ${item.icon}
            </div>

            <div class="dynamic-info-body">

                <div class="dynamic-info-meta">

                    <span class="dynamic-info-category">
                        ${item.category.toUpperCase()}
                    </span>

                    <span>•</span>

                    <span class="dynamic-info-date">
                        ${item.date}
                    </span>

                </div>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.description}
                </p>

                <button
                    class="info-detail-button"
                    data-info-id="${item.id}"
                >
                    Lihat Detail →
                </button>

            </div>
        `;


        informationList.appendChild(card);

    });


    if (informationCount) {

        informationCount.textContent =
            filteredData.length;

    }


    if (informationEmpty) {

        informationEmpty.style.display =
            filteredData.length === 0
                ? "block"
                : "none";

    }

}


/* =========================
   SEARCH
========================= */

if (informationSearch) {

    informationSearch.addEventListener(
        "input",
        renderInformation
    );

}


/* =========================
   FILTER
========================= */

informationFilters.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                informationFilters.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add("active");


                currentInformationFilter =
                    this.dataset.infoFilter;


                renderInformation();

            }
        );

    }
);


/* =========================
   INFORMATION MODAL
========================= */

const informationModal =
    document.getElementById(
        "informationModal"
    );

const informationModalOverlay =
    document.getElementById(
        "informationModalOverlay"
    );

const informationModalClose =
    document.getElementById(
        "informationModalClose"
    );

const detailCategory =
    document.getElementById(
        "detailCategory"
    );

const detailTitle =
    document.getElementById(
        "detailTitle"
    );

const detailDate =
    document.getElementById(
        "detailDate"
    );

const detailContent =
    document.getElementById(
        "detailContent"
    );


function openInformationDetail(id) {

    const item =
        informationData.find(
            function (information) {

                return information.id === id;

            }
        );


    if (!item || !informationModal) {
        return;
    }


    detailCategory.textContent =
        item.category.toUpperCase();

    detailTitle.textContent =
        item.title;

    detailDate.textContent =
        item.date;

    detailContent.textContent =
        item.content;


    informationModal.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";

}


function closeInformationDetail() {

    if (!informationModal) return;

    informationModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


if (informationList) {

    informationList.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".info-detail-button"
                );


            if (!button) return;


            const id =
                Number(
                    button.dataset.infoId
                );


            openInformationDetail(id);

        }
    );

}


if (informationModalClose) {

    informationModalClose.addEventListener(
        "click",
        closeInformationDetail
    );

}


if (informationModalOverlay) {

    informationModalOverlay.addEventListener(
        "click",
        closeInformationDetail
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeInformationDetail();

        }

    }
);


/* =========================
   INITIAL RENDER
========================= */

renderInformation();
