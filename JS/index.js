// --------------------------------------------- Switch burger ---------------------------------------------

const refs = {
  burgerBtn: document.querySelector(".header__btn"),
  closeBtn: document.querySelector(".nav-mob__btn-close"),
  links: document.querySelectorAll(".nav-mob__link"),
  container: document.querySelector(".header__nav-mob"),
};

refs.burgerBtn.addEventListener("click", () =>
  refs.container.classList.remove("visually-hidden")
);

refs.closeBtn.addEventListener("click", () =>
  refs.container.classList.add("visually-hidden")
);

refs.links.forEach((link) =>
  link.addEventListener("click", () =>
    refs.container.classList.add("visually-hidden")
  )
);

// ------------------------------------------- Change background -------------------------------------------

const bodyRef = document.querySelector("body");
const DURATION = 400;

function changeBackground(body) {
  let idx = 1;
  setInterval(() => {
    if (idx > 3) idx = 1;
    body.style.backgroundImage = `url(../../assets/images/background/background-${idx}.png)`;
    idx++;
  }, DURATION);
}
changeBackground(bodyRef);

// ------------------------------------------------ Slider ------------------------------------------------

class MySlider {
  constructor() {
    this.slider = document.querySelector(".slider__list");
    this.sliderItems = [...document.querySelectorAll(".slider__item")];

    this.activeIdx = this.sliderItems.findIndex((item) =>
      item.classList.contains("slider__item--active")
    );

    this.total = this.sliderItems.length - 1;
    this.btnLeft = document.querySelector(".slider__btn--left");
    this.btnRight = document.querySelector(".slider__btn--right");

    this.checkBtns();
    this.checkSlides();
  }

  increment() {
    if (this.checkPrev())
      this.sliderItems[this.activeIdx - 1].classList.remove(
        "slider__item--prev"
      );
    this.sliderItems[this.activeIdx].classList.remove("slider__item--active");
    if (this.checkNext())
      this.sliderItems[this.activeIdx + 1].classList.remove(
        "slider__item--next"
      );

    this.activeIdx++;

    if (this.checkPrev()) {
      this.sliderItems[this.activeIdx - 1].classList.add("slider__item--prev");
    }
    this.sliderItems[this.activeIdx].classList.add("slider__item--active");
    if (this.checkNext())
      this.sliderItems[this.activeIdx + 1].classList.add("slider__item--next");

    this.checkBtns();
    this.checkSlides();
  }

  decrement() {
    if (this.checkPrev())
      this.sliderItems[this.activeIdx - 1].classList.remove(
        "slider__item--prev"
      );
    this.sliderItems[this.activeIdx].classList.remove("slider__item--active");
    if (this.checkNext())
      this.sliderItems[this.activeIdx + 1].classList.remove(
        "slider__item--next"
      );

    this.activeIdx--;

    if (this.checkPrev())
      this.sliderItems[this.activeIdx - 1].classList.add("slider__item--prev");
    this.sliderItems[this.activeIdx].classList.add("slider__item--active");
    if (this.checkNext())
      this.sliderItems[this.activeIdx + 1].classList.add("slider__item--next");

    this.checkBtns();
    this.checkSlides();
  }

  checkBtns() {
    if (this.activeIdx == 0) {
      this.btnLeft.style.display = "none";
      this.btnRight.style.display = "block";
    } else if (this.activeIdx == this.total) {
      this.btnLeft.style.display = "block";
      this.btnRight.style.display = "none";
    } else {
      this.btnLeft.style.display = "block";
      this.btnRight.style.display = "block";
    }
  }

  checkPrev() {
    if (this.activeIdx - 1 < 0) return false;
    return true;
  }

  checkNext() {
    if (this.activeIdx + 1 > this.total) return false;
    return true;
  }

  checkSlides() {
    const title = document.querySelector(".slider__title");

    if (this.activeIdx == 0) title.classList.add("slider__title--active");
    else title.classList.remove("slider__title--active");

    this.sliderItems.forEach((item) => (item.style.display = "none"));

    const prev = document.querySelector(".slider__item--prev");
    const active = document.querySelector(".slider__item--active");
    const next = document.querySelector(".slider__item--next");

    if (prev) {
      prev.style.display = screen.width > 1300 ? "block" : "none";
    }
    if (active) active.style.display = "block";
    if (next) {
      next.style.display = screen.width > 1300 ? "block" : "none";
    }
  }
}

const slider = new MySlider();
const leftBtnRef = document.querySelector(".slider__btn--left");
const rightBtnRef = document.querySelector(".slider__btn--right");

leftBtnRef.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  slider.decrement();
});

rightBtnRef.addEventListener("click", (e) => {
  e.preventDefault();
  slider.increment();
});

// ------------------------------------------ Slow lift to section ------------------------------------------

const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    const section = document.querySelector(id);
    section.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ---------------------------------------- Observer on link section ----------------------------------------

const idArr = ["about", "proj", "calendar"];
const idSecRefs = idArr.map((id) => document.querySelector(`#${id}`));
const idContRefs = idSecRefs.map((ref) => ref.querySelector(".container"));

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
};

function onLoad(entries) {
  entries.forEach((entry) => {
    const id = entry.target.parentNode.getAttribute("id");
    const anchor = document.querySelector(`a[href="#${id}"]`);
    if (entry.isIntersecting) anchor.classList.add("header__link--active");
    else anchor.classList.remove("header__link--active");
  });
}

const observer = new IntersectionObserver(onLoad, observerOptions);

idContRefs.forEach((ref) => observer.observe(ref));

// ------------------------------------------------ Other ... -----------------------------------------------
