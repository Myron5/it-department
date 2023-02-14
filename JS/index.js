// ------------------------------------------- Change background -------------------------------------------

const bodyRef = document.querySelector("body");

function changeBackground(body) {
  let idx = 1;
  setInterval(() => {
    if (idx > 3) idx = 1;
    body.style.backgroundImage = `url(../../assets/images/background/background-${idx}.png)`;
    console.log(idx);
    idx++;
  }, 300);
}
changeBackground(bodyRef);

// ------------------------------------------------ Slider ------------------------------------------------
