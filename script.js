const TOTAL_PHOTOS = 85;
const photoFiles = Array.from({ length: TOTAL_PHOTOS }, (_, index) => `1 (${index + 1}).jpg`);
const featuredLabels = ["opening shot", "golden hour", "little trip", "soft smile", "final frame"];
const state = {
    photos: [...photoFiles],
    currentSection: "intro",
    lightboxIndex: 0,
    galleryReady: false
};

class AmbientParticleSystem {
    constructor() {
        this.canvas = document.getElementById("particles");
        this.ctx = this.canvas.getContext("2d");
        this.items = [];
        this.handleResize = this.resize.bind(this);
        window.addEventListener("resize", this.handleResize);
        this.resize();
        this.seed();
        this.frame();
    }

    resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    seed() {
        this.items = Array.from({ length: 22 }, () => this.createItem(true));
    }

    createItem(initial = false) {
        const types = ["petal", "spark"];
        const type = types[Math.floor(Math.random() * types.length)];
        return {
            type,
            x: Math.random() * this.width,
            y: initial ? Math.random() * this.height : -20,
            size: type === "petal" ? 6 + Math.random() * 10 : 1.5 + Math.random() * 2.5,
            speedX: (Math.random() - 0.5) * 0.45,
            speedY: 0.2 + Math.random() * 0.55,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.015,
            opacity: type === "petal" ? 0.18 + Math.random() * 0.2 : 0.25 + Math.random() * 0.35,
            drift: Math.random() * Math.PI * 2
        };
    }

    drawPetal(item) {
        this.ctx.save();
        this.ctx.translate(item.x, item.y);
        this.ctx.rotate(item.rotation);
        this.ctx.globalAlpha = item.opacity;
        this.ctx.fillStyle = "#f0c4d0";
        this.ctx.beginPath();
        this.ctx.moveTo(0, -item.size * 0.2);
        this.ctx.bezierCurveTo(item.size * 0.9, -item.size, item.size * 0.95, item.size * 0.8, 0, item.size);
        this.ctx.bezierCurveTo(-item.size * 0.95, item.size * 0.8, -item.size * 0.9, -item.size, 0, -item.size * 0.2);
        this.ctx.fill();
        this.ctx.restore();
    }

    drawSpark(item) {
        this.ctx.save();
        this.ctx.translate(item.x, item.y);
        this.ctx.rotate(item.rotation);
        this.ctx.globalAlpha = item.opacity * (0.65 + Math.sin(item.drift) * 0.25);
        this.ctx.strokeStyle = "#f4deae";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(-item.size * 2, 0);
        this.ctx.lineTo(item.size * 2, 0);
        this.ctx.moveTo(0, -item.size * 2);
        this.ctx.lineTo(0, item.size * 2);
        this.ctx.stroke();
        this.ctx.restore();
    }

    frame() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (const item of this.items) {
            item.x += item.speedX + Math.sin(item.drift) * 0.08;
            item.y += item.speedY;
            item.rotation += item.rotationSpeed;
            item.drift += 0.02;

            if (item.type === "petal") {
                this.drawPetal(item);
            } else {
                this.drawSpark(item);
            }

            if (item.y > this.height + 30 || item.x < -40 || item.x > this.width + 40) {
                Object.assign(item, this.createItem());
            }
        }

        window.requestAnimationFrame(() => this.frame());
    }
}

function padNumber(value) {
    return String(value).padStart(2, "0");
}

function switchSection(nextId) {
    if (nextId === state.currentSection) return;

    const current = document.getElementById(state.currentSection);
    const next = document.getElementById(nextId);
    if (!current || !next) return;

    current.classList.remove("active");
    next.classList.add("active");
    state.currentSection = nextId;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function createFeaturedCard(file, photoIndex, slotIndex) {
    const card = document.createElement("button");
    card.className = "featured-card";
    card.type = "button";
    card.style.setProperty("--rotation", `${[-4, 3, -2, 2, -3][slotIndex % 5]}deg`);
    card.dataset.label = featuredLabels[slotIndex % featuredLabels.length];
    card.addEventListener("click", () => openLightbox(photoIndex));

    const image = document.createElement("img");
    image.src = `images/${file}`;
    image.alt = `Memory photo ${photoIndex + 1}`;
    image.loading = "lazy";
    image.decoding = "async";

    card.appendChild(image);
    return card;
}

function createPhotoCard(file, index) {
    const item = document.createElement("article");
    item.className = "photo-item";
    item.style.setProperty("--stagger", `${Math.min(index * 30, 480)}ms`);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "photo-button";
    button.addEventListener("click", () => openLightbox(index));

    const frame = document.createElement("div");
    frame.className = "photo-frame";

    const image = document.createElement("img");
    image.src = `images/${file}`;
    image.alt = `Memory photo ${index + 1}`;
    image.loading = "lazy";
    image.decoding = "async";

    const meta = document.createElement("div");
    meta.className = "photo-meta";

    const order = document.createElement("span");
    order.className = "photo-index";
    order.textContent = `No. ${padNumber(index + 1)}`;

    const caption = document.createElement("span");
    caption.className = "photo-caption";
    caption.textContent = "View frame";

    meta.append(order, caption);
    frame.appendChild(image);
    button.append(frame, meta);
    item.appendChild(button);
    return item;
}

function setupRevealAnimations() {
    const items = document.querySelectorAll(".photo-item");

    if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.05
    });

    items.forEach((item) => observer.observe(item));
}

function renderGallery() {
    if (state.galleryReady) return;

    const photoGrid = document.getElementById("photoGrid");
    const featuredStrip = document.getElementById("featuredStrip");
    const photos = state.photos.length ? state.photos : photoFiles;
    const featuredIndices = [0, 9, 21, 40, photos.length - 1]
        .map((index) => Math.max(0, Math.min(index, photos.length - 1)));

    const featuredFragment = document.createDocumentFragment();
    featuredIndices.forEach((photoIndex, slotIndex) => {
        const file = photos[photoIndex];
        if (file) featuredFragment.appendChild(createFeaturedCard(file, photoIndex, slotIndex));
    });

    const gridFragment = document.createDocumentFragment();
    photos.forEach((file, index) => {
        gridFragment.appendChild(createPhotoCard(file, index));
    });

    featuredStrip.appendChild(featuredFragment);
    photoGrid.appendChild(gridFragment);
    setupRevealAnimations();
    state.galleryReady = true;
}

function openLightbox(index) {
    const photos = state.photos.length ? state.photos : photoFiles;
    state.lightboxIndex = index;
    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightboxImg");
    const counter = document.getElementById("imageCounter");

    image.src = `images/${photos[state.lightboxIndex]}`;
    counter.textContent = `${padNumber(state.lightboxIndex + 1)} / ${padNumber(photos.length)}`;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function stepLightbox(direction) {
    const photos = state.photos.length ? state.photos : photoFiles;
    state.lightboxIndex = (state.lightboxIndex + direction + photos.length) % photos.length;
    openLightbox(state.lightboxIndex);
}

function downloadCard() {
    const button = document.getElementById("saveBtn");
    const originalText = button.textContent;
    button.textContent = "正在保存...";

    html2canvas(document.getElementById("letter-content"), {
        backgroundColor: "#fff9fb",
        scale: 2,
        useCORS: true
    }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "给LJZ的一封信.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        button.textContent = "保存成功";
        window.setTimeout(() => {
            button.textContent = originalText;
        }, 1600);
    }).catch(() => {
        button.textContent = "保存失败";
        window.setTimeout(() => {
            button.textContent = originalText;
        }, 1600);
    });
}

async function init() {
    new AmbientParticleSystem();
    const counter = document.getElementById("photoCount");
    if (counter) {
        counter.textContent = String(TOTAL_PHOTOS);
    }

    document.getElementById("startBtn").addEventListener("click", () => {
        renderGallery();
        switchSection("gallery");
    });

    document.getElementById("toCardBtn").addEventListener("click", () => {
        switchSection("card");
    });

    document.getElementById("backToTopBtn").addEventListener("click", () => {
        switchSection("intro");
    });

    document.getElementById("replayBtn").addEventListener("click", () => {
        switchSection("intro");
    });

    document.getElementById("saveBtn").addEventListener("click", downloadCard);
    document.getElementById("closeLightboxBtn").addEventListener("click", closeLightbox);
    document.getElementById("prevPhotoBtn").addEventListener("click", () => stepLightbox(-1));
    document.getElementById("nextPhotoBtn").addEventListener("click", () => stepLightbox(1));

    document.getElementById("lightbox").addEventListener("click", (event) => {
        if (event.target.id === "lightbox") {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        const isOpen = document.getElementById("lightbox").classList.contains("active");
        if (!isOpen) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") stepLightbox(-1);
        if (event.key === "ArrowRight") stepLightbox(1);
    });
}

document.addEventListener("DOMContentLoaded", init);

