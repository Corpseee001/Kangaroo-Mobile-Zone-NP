/* CONFIG: the file you edit most often. Shop details, products and repair services. */
/* ===== EDIT THIS BLOCK FOR EACH SHOP (all prices are dummy) ===== */
// PART 1: shop details. Name, phone, WhatsApp, address, hours and links.
const SHOP = {
  name: "Kangaroo Mobile Zone",
  phone: "9800000000",
  whatsapp: "9779800000000",
  facebook: "https://www.facebook.com/share/1KhMF7ZM5c/",
  instagram: "https://www.instagram.com/kangaroomobilzonebirtamode?lqvp=ZmRnam55bXQwMjl0",
  address: {en: "Birtamode, Jhapa", ne: "बिर्तामोड, झापा"},
  hours: {en: "Every day, 10:00 AM to 8:00 PM", ne: "हरेक दिन, बिहान १०:०० देखि बेलुका ८:०० सम्म"},
  place: {en: "Kangaroo Mobile Zone and Repairs", ne: "कंगारू मोबाइल जोन एण्ड रिपेयर्स"},
  mapEmbed: "https://www.google.com/maps?q=26.6429499,87.9908917&z=17&output=embed"
};
// PART 2: products. Add, remove or change items here.
/* cat: "new", "refurb" or "acc". Photos: images:["photos/a.jpg","photos/b.jpg"] (first is the main photo). */
const PRODUCTS = [
  {name:"Apple iPhone 17 Pro Max (Cosmic Orange)", brand:"Apple", cat:"new", price:249999, specs:"Cosmic Orange. Add storage and specs here.", stock:true, images:["photos/iphone1.jpg","photos/84c2d157-f3d4-4d7f-9e42-230879a308a0.jpg"]},
  {name:"Youngkit Cyberpunk 360 case", brand:"Youngkit", cat:"acc", price:3499, specs:"Orange, magnetic 360 rotating ring stand", stock:true, images:["photos/Youngkit_Cyberpunk_360.jpg","photos/16ba69b3-debf-4207-b329-bfa6ce96556d.jpg"]},
  {name:"Samsung Galaxy A15", brand:"Samsung", cat:"new", price:27999, specs:"6 GB RAM, 128 GB, 5000 mAh", stock:true},
  {name:"Xiaomi Redmi Note 13", brand:"Xiaomi", cat:"new", price:31999, specs:"8 GB RAM, 128 GB, 108 MP camera", stock:true},
  {name:"Realme C55", brand:"Realme", cat:"new", price:22499, specs:"6 GB RAM, 128 GB, 33W charging", stock:false},
  {name:"iPhone 11 (128 GB)", brand:"Apple", cat:"refurb", price:49999, specs:"Battery 86%, minor scratches, 3 months warranty", stock:true},
  {name:"Samsung Galaxy S21", brand:"Samsung", cat:"refurb", price:44999, specs:"Battery 90%, like new, 3 months warranty", stock:true},
  {name:"Redmi Note 10", brand:"Xiaomi", cat:"refurb", price:15999, specs:"Battery 82%, clean screen, 1 month warranty", stock:true},
  {name:"3 in 1 wireless charger", brand:"Accessories", cat:"acc", price:5999, specs:"Phone, watch and earbuds at once", stock:true},
  {name:"20W fast charger", brand:"Accessories", cat:"acc", price:1299, specs:"USB C, works with most phones", stock:true}
];
// PART 3: repair services. Each key needs a matching s_ line in translations.js.
const SERVICES = ["screen","battery","port","water","software","speaker"];
// PART 4: payment QR codes. Leave qr:"" and number:"" empty to hide an entry.
const PAYMENT = {
  fonepay: {label:"Fonepay QR", qr:"photos/payment/fonepay_qr.png", name:"Kangaroo Mobile Zone"},
  esewa: {label:"eSewa", qr:"", number:"", name:""}
};
/* ===== END OF EDIT BLOCK ===== */