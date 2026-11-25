/* APP: the code that makes the page work (search, filters, slides, language, WhatsApp links). Rarely needs editing. */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const rs = n => "Rs " + Number(n).toLocaleString("en-IN");
const waLink = x => "https://wa.me/" + SHOP.whatsapp + "?text=" + encodeURIComponent(x);
const CATS = ["all","new","refurb","acc"], SLIDES = [{b:"refurb"},{b:"#repair"},{b:"acc"}];
let lang = "en", cat = "all", slide = 0;
const t = k => T[lang][k];

$("shopName").textContent = SHOP.name;
$("phoneText").textContent = SHOP.phone;
$("callTop").textContent = SHOP.phone;
$("mapFrame").src = SHOP.mapEmbed; $("fb").href = SHOP.facebook; $("ig").href = SHOP.instagram;
$("viber").href = "viber://chat?number=%2B" + SHOP.whatsapp;
["callTop","callBar"].forEach(id => $(id).href = "tel:+977" + SHOP.phone);
$("waBar").href = waLink("Hello " + SHOP.name + ", I would like to ask about your phones.");

function setCat(c){ cat = c; $("cs").value = c; render(); }
$("sf").addEventListener("submit", e => { e.preventDefault(); render(); $("products").scrollIntoView(); });
$("q").addEventListener("input", render);
$("cs").addEventListener("change", e => setCat(e.target.value));
$("menu").addEventListener("click", e => { const a = e.target.closest("a[data-c]"); if (a) setCat(a.dataset.c); });
$("lang").addEventListener("click", () => { lang = lang === "en" ? "ne" : "en"; applyLang(); });
$("dots").addEventListener("click", e => { const b = e.target.closest("button"); if (b){ slide = +b.dataset.i; showSlide(); } });
$("hb").addEventListener("click", () => { const b = SLIDES[slide].b; if (b[0] !== "#") setCat(b); });

function showSlide(){
  const n = slide + 1, b = SLIDES[slide].b;
  $("hh").textContent = t("s" + n + "h"); $("hp").textContent = t("s" + n + "p"); $("hb").textContent = t("s" + n + "b");
  $("hb").href = b[0] === "#" ? b : "#products";
  $("dots").innerHTML = SLIDES.map((s, i) => `<button type="button" data-i="${i}" aria-label="Slide ${i + 1}" ${i === slide ? 'aria-current="true"' : ""}></button>`).join("");
}
function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  $("welcome").textContent = lang === "en" ? t("welcome") + SHOP.name + "." : SHOP.name + " मा " + t("welcome").replace(", ","") + ".";
  $("q").placeholder = t("search");
  $("lang").textContent = lang === "en" ? "नेपाली" : "English";
  $("place").textContent = SHOP.place[lang]; $("addr").textContent = SHOP.address[lang]; $("hours").textContent = SHOP.hours[lang];
  $("cs").innerHTML = CATS.map(c => `<option value="${c}">${esc(t("c_" + c))}</option>`).join(""); $("cs").value = cat;
  $("svc").innerHTML = SERVICES.map(k => `<div><span>${esc(t("s_" + k))}</span><a class="btn" target="_blank" rel="noopener" href="${waLink("Hello " + SHOP.name + ", my phone has this problem: " + T.en["s_" + k] + ". Please tell me the repair price.")}">${esc(t("askPrice"))}</a></div>`).join("");
  showSlide(); render(); renderPay();
}
function render(){
  const q = $("q").value.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (cat === "all" || p.cat === cat) && (p.name + " " + p.brand).toLowerCase().includes(q));
  $("count").textContent = list.length + (list.length === 1 ? t("one") : t("many"));
  if (!list.length){ $("grid").innerHTML = `<div class="empty">${esc(t("empty"))}</div>`; return; }
  $("grid").innerHTML = list.map(p => {
    const msg = `Hello ${SHOP.name}, I am interested in the ${p.name} (${rs(p.price)}). Is it available?`;
    const imgs = imgsOf(p), pi = PRODUCTS.indexOf(p);
    const nav = imgs.length > 1 ? `<button type="button" class="nv prev" data-i="${pi}" data-d="-1" aria-label="Previous photo">&#8249;</button><button type="button" class="nv next" data-i="${pi}" data-d="1" aria-label="Next photo">&#8250;</button><span class="cnt">1 / ${imgs.length}</span>` : "";
    const pic = imgs.length ? `<img class="main" src="${esc(imgs[0])}" alt="${esc(p.name)}" loading="lazy" onload="imgOk(this)" onerror="imgMissing(this)">${nav}` : `<div class="mini" aria-hidden="true">${esc(p.brand[0])}</div>`;
    const btn = p.stock
      ? `<a class="btn" target="_blank" rel="noopener" href="${waLink(msg)}">${esc(t("order"))}</a>`
      : `<a class="btn line" target="_blank" rel="noopener" href="${waLink("Hello, please tell me when the " + p.name + " is back in stock.")}">${esc(t("back"))}</a>`;
    return `<article class="card ${p.stock ? "" : "out"}"><div class="pic">${pic}</div><div class="body"><span class="kind">${esc(p.brand)} · ${esc(t("c_" + p.cat))}</span><h3>${esc(p.name)}</h3><p class="specs">${esc(p.specs)}</p><span class="price">${rs(p.price)}</span>${btn}</div></article>`;
  }).join("");
}
function imgsOf(p){ return p.images || (p.image ? [p.image] : []); }
function imgOk(el){ el.style.display = ""; const m = el.parentNode.querySelector(".miss"); if (m) m.remove(); }
function imgMissing(el){
  el.style.display = "none";
  let m = el.parentNode.querySelector(".miss");
  if (!m){ m = document.createElement("small"); m.className = "miss"; el.parentNode.appendChild(m); }
  m.textContent = "Image not found: " + el.getAttribute("src");
}
$("grid").addEventListener("click", e => {
  const b = e.target.closest(".nv"); if (!b) return;
  const imgs = imgsOf(PRODUCTS[+b.dataset.i]), pic = b.closest(".pic"), img = pic.querySelector(".main");
  const n = imgs.length, next = ((+pic.dataset.pos || 0) + (+b.dataset.d) + n) % n;
  pic.dataset.pos = next; img.src = imgs[next];
  pic.querySelector(".cnt").textContent = (next + 1) + " / " + n;
});
function renderPay(){
  $("qrs").innerHTML = Object.values(PAYMENT).filter(m => m.qr || m.number).map(m =>
    `<figure class="qr">${m.qr ? `<img src="${esc(m.qr)}" alt="${esc(m.label)}" onload="imgOk(this)" onerror="imgMissing(this)">` : ""}<figcaption><strong>${esc(m.label)}</strong>${m.number ? `<br>${esc(m.number)}` : ""}${m.name ? `<br>${esc(m.name)}` : ""}</figcaption></figure>`).join("");
  $("payWa").href = waLink("Hello " + SHOP.name + ", " + t("payMsg"));
}
applyLang();