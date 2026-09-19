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

// ==========================================
// LOGIN ADMIN SUPABASE
// ==========================================

const adminLogin = document.getElementById("adminLogin");
const adminEmail = document.getElementById("adminEmail");
const adminPassword = document.getElementById("adminPassword");
const adminLoginButton = document.getElementById("adminLoginButton");
const adminLoginError = document.getElementById("adminLoginError");
const adminPanelContent = document.getElementById("adminPanelContent");
const adminPreview = document.getElementById("adminPreview");

function showAdminLogin() {
    if (adminLogin) adminLogin.style.display = "block";
    if (adminPanelContent) adminPanelContent.style.display = "none";
    if (adminPreview) adminPreview.style.display = "none";
}

function showAdminPanel() {
    if (adminLogin) adminLogin.style.display = "none";
    if (adminPanelContent) adminPanelContent.style.display = "grid";
    if (adminPreview) adminPreview.style.display = "block";
}

async function checkAdminSession() {
    const { data } = await supabaseClient.auth.getSession();

    if (data.session) {
        showAdminPanel();
    } else {
        showAdminLogin();
    }
}

if (adminLoginButton) {
    adminLoginButton.addEventListener("click", async function () {

        const email = adminEmail.value.trim();
        const password = adminPassword.value;

        if (!email || !password) {
            adminLoginError.textContent =
                "Email dan password wajib diisi.";
            return;
        }

        adminLoginButton.disabled = true;
        adminLoginButton.textContent = "Memproses...";

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        adminLoginButton.disabled = false;
        adminLoginButton.textContent = "Masuk ke Admin";

        if (error) {
            console.error("Login admin gagal:", error);

            adminLoginError.textContent =
                "Email atau password salah.";

            return;
        }

        adminLoginError.textContent = "";

        showAdminPanel();

        alert("Login admin berhasil.");
    });
}


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

async function openAdminPanel() {
    if (!adminModal) return;

    adminModal.classList.add("show");
    document.body.style.overflow = "hidden";

    await checkAdminSession();
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

// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = "https://pwoopuxfonwhqdtomujr.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_fd5CuJrWpzw41FlZJjz72Q_p2iO_0mn";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


// ==========================================
// DATA INFORMASI DARI SUPABASE
// ==========================================

let informationData = [];


// ==========================================
// ELEMENT INFORMASI PUBLIK
// ==========================================

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


// ==========================================
// LOAD INFORMATION
// ==========================================

async function loadInformation() {

    const { data, error } =
        await supabaseClient
            .from("informasi")
            .select("*")
            .order("date", {
                ascending: false
            });

    if (error) {

        console.error(
            "Gagal mengambil informasi:",
            error
        );

        return;
    }

    informationData = data || [];

    renderInformation();
    renderAdminInformation();
}


// ==========================================
// RENDER ADMIN INFORMATION
// ==========================================

function renderAdminInformation() {

    const adminInformationList =
        document.getElementById(
            "adminInformationList"
        );

    if (!adminInformationList) return;

    adminInformationList.innerHTML = "";


    if (informationData.length === 0) {

        adminInformationList.innerHTML = `
            <div style="
                padding: 20px;
                text-align: center;
                color: #71837b;
                background: #f7faf8;
                border-radius: 12px;
            ">
                Belum ada informasi tersimpan.
            </div>
        `;

        return;
    }


    informationData.forEach(function (item) {

        const informationItem =
            document.createElement("div");

        informationItem.className =
            "admin-information-item";


        informationItem.innerHTML = `
            <div class="admin-information-item-main">

                <h4>
                    ${item.icon || "📢"} ${item.title}
                </h4>

                <p>
                    ${item.category.toUpperCase()}
                    • ${item.date}
                </p>

            </div>

            <div class="admin-information-actions">

                <button
    type="button"
    class="admin-edit-info"
    data-id="${item.id}"
>
    ✏️ Edit
</button>

<button
    type="button"
    class="admin-delete-info"
    data-id="${item.id}"
>
    🗑️ Hapus
</button> 
            </div>
        `;


        adminInformationList.appendChild(
            informationItem
        );

    });

}


// ==========================================
// RENDER INFORMATION PUBLIC
// ==========================================

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
                item.category ===
                currentInformationFilter;


            const matchesSearch =
                (item.title || "")
                    .toLowerCase()
                    .includes(keyword) ||

                (item.description || "")
                    .toLowerCase()
                    .includes(keyword) ||

                (item.content || "")
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
                ${item.icon || "📢"}
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


// ==========================================
// SEARCH
// ==========================================

if (informationSearch) {

    informationSearch.addEventListener(
        "input",
        renderInformation
    );

}


// ==========================================
// FILTER
// ==========================================

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


                this.classList.add(
                    "active"
                );


                currentInformationFilter =
                    this.dataset.infoFilter;


                renderInformation();

            }
        );

    }
);


// ==========================================
// INFORMATION MODAL
// ==========================================

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


    if (detailCategory) {

        detailCategory.textContent =
            item.category.toUpperCase();

    }


    if (detailTitle) {

        detailTitle.textContent =
            item.title;

    }


    if (detailDate) {

        detailDate.textContent =
            item.date;

    }


    if (detailContent) {

        detailContent.textContent =
            item.content;

    }


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


// ==========================================
// DETAIL BUTTON
// ==========================================

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


// ==========================================
// CLOSE MODAL
// ==========================================

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

        if (event.key === "Escape") {

            closeInformationDetail();

        }

    }
);


// ==========================================
// INITIAL LOAD
// ==========================================

loadInformation();

/* =========================
   INITIAL RENDER
========================= */

renderInformation();

const adminLogout = document.getElementById("adminLogout");

if (adminLogout) {
    adminLogout.addEventListener("click", async function () {

        await supabaseClient.auth.signOut();

        showAdminLogin();

        alert("Berhasil keluar dari Aconst informationData const informationData const informationData dmin.");
    });
}

// ==========================================
// TAMBAH INFORMASI KE SUPABASE
// ==========================================

const infoCategory = document.getElementById("infoCategory");
const infoTitle = document.getElementById("infoTitle");
const infoDescription = document.getElementById("infoDescription");
const infoContent = document.getElementById("infoContent");
const infoDate = document.getElementById("infoDate");
const infoIcon = document.getElementById("infoIcon");
const addInformationButton =
    document.getElementById("addInformationButton");
const informationAdminMessage =
    document.getElementById("informationAdminMessage");

if (addInformationButton) {

    addInformationButton.addEventListener("click", async function () {

        const category = infoCategory.value;
        const title = infoTitle.value.trim();
        const description = infoDescription.value.trim();
        const content = infoContent.value.trim();
        const date = infoDate.value;
        const icon = infoIcon.value.trim() || "📢";

        if (!title || !description || !content || !date) {
            informationAdminMessage.textContent =
                "⚠️ Lengkapi semua data terlebih dahulu.";
            informationAdminMessage.style.color = "#c0392b";
            return;
        }

        addInformationButton.disabled = true;
        addInformationButton.textContent = "Menyimpan...";

        const { data, error } = await supabaseClient
            .from("informasi")
            .insert([
                {
                    category: category,
                    title: title,
                    description: description,
                    content: content,
                    date: date,
                    icon: icon
                }
            ])
            .select();

        if (error) {

            console.error("Gagal menambahkan informasi:", error);

            informationAdminMessage.textContent =
                "❌ Gagal menyimpan informasi.";

            informationAdminMessage.style.color = "#c0392b";

            addInformationButton.disabled = false;
            addInformationButton.textContent =
                "+ Tambah Informasi";

            return;
        }

        console.log("Informasi berhasil ditambahkan:", data);

        informationAdminMessage.textContent =
            "✅ Informasi berhasil ditambahkan!";

        informationAdminMessage.style.color = "#087443";

        infoTitle.value = "";
        infoDescription.value = "";
        infoContent.value = "";
        infoDate.value = "";
        infoIcon.value = "";

        addInformationButton.disabled = false;
        addInformationButton.textContent =
            "+ Tambah Informasi";

        // Ambil ulang informasi dari Supabase
        await loadInformation();

    });
}

// ==========================================
// EDIT & DELETE INFORMATION
// ==========================================

const editInformationModal = document.getElementById("editInformationModal");
const editInformationOverlay = document.getElementById("editInformationOverlay");
const editInformationClose = document.getElementById("editInformationClose");

const editInfoId = document.getElementById("editInfoId");
const editInfoCategory = document.getElementById("editInfoCategory");
const editInfoTitle = document.getElementById("editInfoTitle");
const editInfoDescription = document.getElementById("editInfoDescription");
const editInfoContent = document.getElementById("editInfoContent");
const editInfoDate = document.getElementById("editInfoDate");
const editInfoIcon = document.getElementById("editInfoIcon");

const saveEditInformation = document.getElementById("saveEditInformation");
const editInformationMessage = document.getElementById("editInformationMessage");


// ==========================================
// OPEN EDIT
// ==========================================

function openEditInformation(id) {

    const item = informationData.find(function (information) {
        return String(information.id) === String(id);
    });

    if (!item) {
        console.error("Data tidak ditemukan:", id);
        return;
    }

    if (!editInformationModal) {
        console.error("Modal Edit tidak ditemukan di HTML.");
        return;
    }

    editInfoId.value = item.id;
    editInfoCategory.value = item.category || "";
    editInfoTitle.value = item.title || "";
    editInfoDescription.value = item.description || "";
    editInfoContent.value = item.content || "";
    editInfoDate.value = item.date || "";
    editInfoIcon.value = item.icon || "📢";

    if (editInformationMessage) {
        editInformationMessage.textContent = "";
    }

    editInformationModal.classList.add("show");
    document.body.style.overflow = "hidden";
}


// ==========================================
// CLOSE EDIT
// ==========================================

function closeEditInformation() {

    if (!editInformationModal) return;

    editInformationModal.classList.remove("show");
    document.body.style.overflow = "";
}


if (editInformationClose) {
    editInformationClose.addEventListener(
        "click",
        closeEditInformation
    );
}


if (editInformationOverlay) {
    editInformationOverlay.addEventListener(
        "click",
        closeEditInformation
    );
}


// ==========================================
// SAVE EDIT
// ==========================================

if (saveEditInformation) {

    saveEditInformation.addEventListener(
        "click",
        async function () {

            const id = editInfoId.value;
            const category = editInfoCategory.value;
            const title = editInfoTitle.value.trim();
            const description = editInfoDescription.value.trim();
            const content = editInfoContent.value.trim();
            const date = editInfoDate.value;
            const icon = editInfoIcon.value.trim() || "📢";

            if (!title || !description || !content || !date) {

                editInformationMessage.textContent =
                    "⚠️ Lengkapi semua data terlebih dahulu.";

                editInformationMessage.style.color = "#c0392b";

                return;
            }

            saveEditInformation.disabled = true;
            saveEditInformation.textContent = "Menyimpan...";

            const { error } = await supabaseClient
                .from("informasi")
                .update({
                    category: category,
                    title: title,
                    description: description,
                    content: content,
                    date: date,
                    icon: icon
                })
                .eq("id", id);

            if (error) {

                console.error(
                    "Gagal mengubah informasi:",
                    error
                );

                editInformationMessage.textContent =
                    "❌ Gagal mengubah informasi.";

                editInformationMessage.style.color =
                    "#c0392b";

                saveEditInformation.disabled = false;
                saveEditInformation.textContent =
                    "Simpan Perubahan";

                return;
            }

            editInformationMessage.textContent =
                "✅ Informasi berhasil diperbarui!";

            editInformationMessage.style.color =
                "#087443";

            await loadInformation();

            saveEditInformation.disabled = false;
            saveEditInformation.textContent =
                "Simpan Perubahan";

            setTimeout(function () {
                closeEditInformation();
            }, 500);
        }
    );
}


// ==========================================
// DELETE
// ==========================================

async function deleteInformation(id) {

    const item = informationData.find(function (information) {
        return String(information.id) === String(id);
    });

    if (!item) {
        console.error("Data tidak ditemukan:", id);
        return;
    }

    const confirmed = confirm(
        `Hapus informasi "${item.title}"?`
    );

    if (!confirmed) return;

    const { error } = await supabaseClient
        .from("informasi")
        .delete()
        .eq("id", id);

    if (error) {

        console.error(
            "Gagal menghapus informasi:",
            error
        );

        alert("❌ Gagal menghapus informasi.");
        return;
    }

    alert("✅ Informasi berhasil dihapus.");

    await loadInformation();
}


// ==========================================
// BUTTON EDIT & DELETE
// ==========================================

document.addEventListener("click", function (event) {

    const editButton =
        event.target.closest(".admin-edit-info");

    if (editButton) {

        const id =
            editButton.getAttribute("data-id");

        openEditInformation(id);

        return;
    }


    const deleteButton =
        event.target.closest(".admin-delete-info");

    if (deleteButton) {

        const id =
            deleteButton.getAttribute("data-id");

        deleteInformation(id);

        return;
    }

});

// ==========================================
// SAVE EDIT
// ==========================================

if (saveEditInformation) {

    saveEditInformation.addEventListener(
        "click",
        async function () {

            const id =
                editInfoId.value;

            const category =
                editInfoCategory.value;

            const title =
                editInfoTitle.value.trim();

            const description =
                editInfoDescription.value.trim();

            const content =
                editInfoContent.value.trim();

            const date =
                editInfoDate.value;

            const icon =
                editInfoIcon.value.trim() ||
                "📢";


            if (
                !id ||
                !title ||
                !description ||
                !content ||
                !date
            ) {

                editInformationMessage.textContent =
                    "⚠️ Lengkapi semua data terlebih dahulu.";

                editInformationMessage.style.color =
                    "#c0392b";

                return;
            }


            saveEditInformation.disabled = true;

            saveEditInformation.textContent =
                "Menyimpan...";


            const { error } =
                await supabaseClient
                    .from("informasi")
                    .update({
                        category: category,
                        title: title,
                        description: description,
                        content: content,
                        date: date,
                        icon: icon
                    })
                    .eq("id", id);


            if (error) {

                console.error(
                    "ERROR UPDATE:",
                    error
                );


                editInformationMessage.textContent =
                    "❌ Gagal menyimpan perubahan.";

                editInformationMessage.style.color =
                    "#c0392b";


                saveEditInformation.disabled =
                    false;

                saveEditInformation.textContent =
                    "💾 Simpan Perubahan";

                return;
            }


            editInformationMessage.textContent =
                "✅ Berhasil diperbarui.";

            editInformationMessage.style.color =
                "#087443";


            setTimeout(function () {

                closeEditInformation();

                loadInformation();

            }, 500);

        }
    );

}


// ==========================================
// DELETE
// ==========================================

async function deleteInformation(id) {

    console.log("DELETE ID:", id);


    const item =
        informationData.find(
            function (information) {

                return String(information.id) ===
                    String(id);

            }
        );


    if (!item) {

        console.error(
            "Data tidak ditemukan:",
            id
        );

        return;
    }


    const confirmed =
        confirm(
            `Yakin ingin menghapus "${item.title}"?`
        );


    if (!confirmed) {
        return;
    }


    const { error } =
        await supabaseClient
            .from("informasi")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(
            "ERROR DELETE:",
            error
        );

        alert(
            "❌ Gagal menghapus informasi."
        );

        return;
    }


    alert(
        "✅ Informasi berhasil dihapus."
    );


    await loadInformation();

}
    
