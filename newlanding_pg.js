console.log("THREE:", THREE);
console.log("GLTFLoader:", THREE.GLTFLoader);

/* ===============================
   NEWLANDING PAGE JS (UPDATED)
   =============================== */

/* -------------------------------
   HERO LOAD ANIMATION
-------------------------------- */
window.addEventListener("load", () => {
  const heroText = document.querySelector(".hero-text");
  const heroImg = document.querySelector(".hero-img");
  const heroBtns = document.querySelector(".hero-btns");

  if (heroText) heroText.classList.add("animate-text");
  if (heroImg) heroImg.classList.add("animate-img");
  if (heroBtns) heroBtns.classList.add("animate-btns");
});


/* -------------------------------
   NAVBAR SCROLL EFFECT
-------------------------------- */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});



/* -------------------------------
   SMOOTH SCROLL
-------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


/* -------------------------------
   ADVANCED CARD HOVER
-------------------------------- */
document.querySelectorAll(".adv-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.border = "1px solid #ff6a3d";
  });
  card.addEventListener("mouseleave", () => {
    card.style.border = "none";
  });
});


/* -------------------------------
   VR SECTION FADE-IN
-------------------------------- */
const vrSection = document.querySelector(".vr-section");

if (vrSection) {
  window.addEventListener("scroll", () => {
    const triggerPoint = window.innerHeight * 0.8;
    const vrTop = vrSection.getBoundingClientRect().top;

    if (vrTop < triggerPoint) {
      vrSection.classList.add("show");
    }
  });
}



/* ===============================
   THREE.JS VR MODEL (FINAL)
================================ */

const container = document.getElementById("vrModel");

if (!container) {
  console.error("❌ vrModel container not found");
}

/* SCENE */
const scene = new THREE.Scene();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(45, 300 / 450, 0.1, 1000);
camera.position.set(0.3, 0.6, 3.0);
camera.lookAt(0, 0, 0);;

/* RENDERER */
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(300, 450);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

/* LIGHTS */
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 4, 5);
scene.add(light);

/* LOAD MODEL */
let model;
const loader = new THREE.GLTFLoader();

loader.load(
  "assets/models/human.glb",   // ✅ correct path
  function (gltf) {
    model = gltf.scene;

/* AUTO CENTER MODEL */
const box = new THREE.Box3().setFromObject(model);
const center = box.getCenter(new THREE.Vector3());
const size = box.getSize(new THREE.Vector3());

model.position.x -= center.x;
model.position.y -= center.y;
model.position.z -= center.z;

/* SCALE TO FIT BOX */
const maxSize = Math.max(size.x, size.y, size.z);
const scale = 2 / maxSize;

model.scale.set(scale, scale, scale);

/* Slight lift */
model.position.y -= 0.1;

scene.add(model);

animate();

  },
  undefined,
  function (error) {
    console.error("❌ GLB Load Error:", error);
  }
);

/* ANIMATION LOOP */
function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
}
