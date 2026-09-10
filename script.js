/* ===========================================================
   Thiago Martiro — Portfólio · script
   =========================================================== */

/* -----------------------------------------------------------
   DADOS DO PORTFÓLIO
   Para adicionar/editar um vídeo, é só mexer aqui:
   - id    : ID do arquivo no Google Drive (o que vem em /file/d/AQUI/view)
   - title : título que aparece no card
   - cat   : "vsl" | "criativos" | "reels" | "ttk"
   O arquivo precisa estar compartilhado como
   "Qualquer pessoa com o link" para tocar no site.
   ----------------------------------------------------------- */
const VIDEOS = [
  // ---- DR - VSL ----
  { id: "1xU6VFIcq7VG0mVGTBjvezqFAmAX11nzM", title: "App Loteria", cat: "vsl" },
  { id: "1ffT5aarA9Wl6o3AU58wPtesz8tWPqXsw", title: "Diabetic", cat: "vsl" },
  { id: "1pGKmjEpL9XvZ57TYwMoNmMhecShsYX27", title: "Memória", cat: "vsl" },
  { id: "1Ksa3OYUYc7dBvyR8PHE4FqTd4khIaUeC", title: "Memória (PT)", cat: "vsl" },

  // ---- DR - CRIATIVOS ----
  { id: "1rWEiA6UhSUOpwp_SkTbqr6hjHM9BxBNP", title: "Criativo 01", cat: "criativos" },
  { id: "186Bg0_MLT_lZ1cLBw69da00t95fWN0K9", title: "Criativo 02", cat: "criativos" },
  { id: "1qnczMJHlY8vfF9qmbZqtO-fUedG337UR", title: "Criativo 03", cat: "criativos" },
  { id: "1n2XhLYTJ5O_ygBgmXfZwpa1ixE9f7snN", title: "Criativo 04", cat: "criativos" },
  { id: "1b_1iRNoH_twBos_gFzxOGCFkhzswujZ3", title: "Criativo 05", cat: "criativos" },
  { id: "1_-kDDxWa8d05CNz6fSP4YM6Il1jvs_Tw", title: "Criativo 06", cat: "criativos" },

  // ---- INSTAGRAM / REELS ----
  { id: "1S3KoD1kRXCcFVGdnSQOUQZfr3gvVuKr7", title: "Reel 01", cat: "reels" },
  { id: "1iwsgmopLrXC2YIYXd7wucRCCQB_7LNng", title: "Reel 02", cat: "reels" },

  // ---- TIKTOK SHOP ----
  { id: "1dSYa7LOSmUt-F17rysznzl6HI2oMRIAI", title: "TikTok Shop 01", cat: "ttk" },
  { id: "1ap-dKGuK05yyR5lQb-2d8Hm7tvFuft_1", title: "TikTok Shop 02", cat: "ttk" },
  { id: "1Qeqy7hWglMrOVPnTXVdAblFsGqqkWBWV", title: "TikTok Shop 03", cat: "ttk" },
];

const CAT_LABEL = { vsl: "VSL", criativos: "Criativo", reels: "Reel", ttk: "TikTok Shop" };

const thumbUrl = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1280`;
const previewUrl = (id) => `https://drive.google.com/file/d/${id}/preview`;

/* -----------------------------------------------------------
   GALERIA
   ----------------------------------------------------------- */
const gallery = document.getElementById("gallery");

function buildGallery() {
  const frag = document.createDocumentFragment();
  VIDEOS.forEach((v, i) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.dataset.cat = v.cat;
    card.dataset.id = v.id;
    card.dataset.title = v.title;
    card.style.animationDelay = (i % 6) * 0.06 + "s";
    card.setAttribute("aria-label", `Assistir: ${v.title}`);

    card.innerHTML = `
      <div class="card__fallback">${CAT_LABEL[v.cat] || "Vídeo"}</div>
      <img class="card__thumb" src="${thumbUrl(v.id)}" alt="${v.title}" loading="lazy"
           referrerpolicy="no-referrer" />
      <div class="card__overlay">
        <span class="card__cat">${CAT_LABEL[v.cat] || ""}</span>
        <span class="card__title">${v.title}</span>
      </div>
      <span class="card__play" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </span>`;

    const img = card.querySelector(".card__thumb");

    // Cada card assume a proporção real do vídeo
    const applyRatio = () => {
      if (img.naturalWidth && img.naturalHeight) {
        card.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
      }
    };
    if (img.complete && img.naturalWidth) applyRatio();
    img.addEventListener("load", applyRatio);

    // Fallback quando a thumb não carrega (arquivo ainda privado, etc.)
    img.addEventListener("error", () => {
      img.style.display = "none";
      card.querySelector(".card__fallback").style.display = "flex";
    });

    card.addEventListener("click", () => openModal(v));
    frag.appendChild(card);
  });
  gallery.appendChild(frag);
}
buildGallery();

/* -----------------------------------------------------------
   FILTROS
   ----------------------------------------------------------- */
const filters = document.getElementById("filters");
filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  filters.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
  btn.classList.add("is-active");
  const f = btn.dataset.filter;
  gallery.querySelectorAll(".card").forEach((card, i) => {
    const show = f === "all" || card.dataset.cat === f;
    card.classList.toggle("is-hidden", !show);
    if (show) {
      card.style.animation = "none";
      // reflow para reiniciar a animação
      void card.offsetWidth;
      card.style.animation = "";
      card.style.animationDelay = (i % 6) * 0.05 + "s";
    }
  });
});

/* -----------------------------------------------------------
   MODAL / PLAYER
   ----------------------------------------------------------- */
const modal = document.getElementById("modal");
const modalBox = document.getElementById("modalBox");
const modalFrame = document.getElementById("modalFrame");
const modalTitle = document.getElementById("modalTitle");

function openModal(v) {
  modalTitle.textContent = v.title;

  // Detecta a proporção real pela miniatura para dimensionar o player
  modalBox.classList.remove("is-vertical");
  modalFrame.style.aspectRatio = "16 / 9";
  const probe = new Image();
  probe.referrerPolicy = "no-referrer";
  probe.onload = () => {
    const w = probe.naturalWidth, h = probe.naturalHeight;
    if (w && h) {
      modalFrame.style.aspectRatio = `${w} / ${h}`;
      if (h > w) modalBox.classList.add("is-vertical");
    }
  };
  probe.src = thumbUrl(v.id);

  modalFrame.innerHTML = `<iframe src="${previewUrl(v.id)}"
      allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>`;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalFrame.innerHTML = ""; // para o vídeo
  document.body.style.overflow = "";
}

modal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

/* -----------------------------------------------------------
   NAV: scroll + menu mobile
   ----------------------------------------------------------- */
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.querySelector(".nav__links");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  })
);

/* -----------------------------------------------------------
   REVEAL ao rolar
   ----------------------------------------------------------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* -----------------------------------------------------------
   CONTADORES das estatísticas
   ----------------------------------------------------------- */
const counters = document.querySelectorAll(".stats__num[data-count]");
const cio = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.round(target / 28));
      const tick = () => {
        cur = Math.min(target, cur + step);
        el.textContent = cur;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      cio.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => cio.observe(c));

/* -----------------------------------------------------------
   Ano no rodapé
   ----------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
