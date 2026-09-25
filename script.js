const scene = document.getElementById("scene");
const hint = document.getElementById("hint");

const lamp = document.getElementById("lamp");
const art = document.getElementById("art");
const artOverlay = document.getElementById("art-overlay");
const books = document.getElementById("books");

const readingCard = document.getElementById("reading-card");
const closeBook = document.getElementById("close-book");
const nextPage = document.getElementById("next-page");
const pageText = document.getElementById("page-text");
const pageNumber = document.getElementById("page-number");

const pages = [
  "The afternoon settles softly around the window.",
  "There is room here for one more chapter.",
  "Outside, the leaves move. Inside, time slows down.",
];

let currentArt = 0;
let currentPage = Number(window.localStorage.getItem("readingPage")) || 0;

if (currentPage < 0 || currentPage >= pages.length) {
  currentPage = 0;
}

function showPage() {
  pageText.textContent = pages[currentPage];
  pageNumber.textContent = `${String(currentPage + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
}

lamp.addEventListener("click", () => {
  const isOn = scene.classList.toggle("lamp-on");

  document.body.classList.toggle("lamp-on", isOn);
  lamp.setAttribute("aria-pressed", String(isOn));
  lamp.setAttribute(
    "aria-label",
    isOn ? "Turn off the lamp" : "Turn on the lamp",
  );
  hint.textContent = isOn
    ? "A little warmth for the evening."
    : "The afternoon light returns.";
});

art.addEventListener("click", () => {
  currentArt = (currentArt + 1) % 3;
  artOverlay.dataset.art = String(currentArt);

  const messages = [
    "The familiar picture returns.",
    "A different line, a different mood.",
    "A little green on the wall.",
  ];

  hint.textContent = messages[currentArt];
});

books.addEventListener("click", () => {
  showPage();
  readingCard.hidden = false;
  books.setAttribute("aria-expanded", "true");
  hint.textContent = "Stay for a page.";
  closeBook.focus();
});

nextPage.addEventListener("click", () => {
  currentPage = (currentPage + 1) % pages.length;
  window.localStorage.setItem("readingPage", String(currentPage));
  showPage();
});

function closeReadingCard() {
  readingCard.hidden = true;
  books.setAttribute("aria-expanded", "false");
  hint.textContent = "The book can wait here.";
  books.focus();
}

closeBook.addEventListener("click", closeReadingCard);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !readingCard.hidden) {
    closeReadingCard();
  }
});
