export default function decorate(block) {
  const rows = [...block.children];
  const slides = [];

  rows.forEach((row, r) => {
    const cols = [...row.children];

    // FIRST ROW → NEXT BUTTON
    if (r === 0) {
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn btn-next";
      nextBtn.textContent = "Next";
      block.appendChild(nextBtn);
      return;
    }

    // LAST ROW → PREV BUTTON
    if (r === rows.length - 1) {
      const prevBtn = document.createElement("button");
      prevBtn.className = "btn btn-prev";
      prevBtn.textContent = "Prev";
      block.appendChild(prevBtn);
      return;
    }

    // SLIDE ROW
    const slide = document.createElement("div");
    slide.className = "slide";

    const imgCell = cols[1];
    const titleCell = cols[2];
    const descCell = cols[3];

    if (imgCell) {
      const img = imgCell.querySelector("img");
      if (img) {
        img.classList.add("slide-image");
        slide.appendChild(img);
      }
    }

    const textWrapper = document.createElement("div");
    textWrapper.className = "slide-text";

    if (titleCell) {
      textWrapper.innerHTML += `<h3>${titleCell.textContent.trim()}</h3>`;
    }
    if (descCell) {
      textWrapper.innerHTML += `<p>${descCell.textContent.trim()}</p>`;
    }

    slide.appendChild(textWrapper);
    slides.push(slide);
  });

  // Wrap slides
  const slideWrapper = document.createElement("div");
  slideWrapper.className = "slide-wrapper";
  slides.forEach((slide) => slideWrapper.appendChild(slide));
  block.appendChild(slideWrapper);

  // Position slides
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${i * 100}%)`;
  });

  const nextBtn = block.querySelector(".btn-next");
  const prevBtn = block.querySelector(".btn-prev");

  let index = 0;
  const max = slides.length - 1;

  function update() {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  nextBtn.addEventListener("click", () => {
    index = index === max ? 0 : index + 1;
    update();
  });

  prevBtn.addEventListener("click", () => {
    index = index === 0 ? max : index - 1;
    update();
  });
}
