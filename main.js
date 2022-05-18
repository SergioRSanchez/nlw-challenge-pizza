window.addEventListener('scroll', onScroll);

onScroll();
function onScroll() {
  showNavOnScroll();

  showBackToTopButtonOnScroll();

  activeMenuAtCurrentSection(home);
  activeMenuAtCurrentSection(services);
  activeMenuAtCurrentSection(about);
  activeMenuAtCurrentSection(contact);
}

function activeMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;

  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries = sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute('id');
  const menuElement = document.querySelector(`.menu a[href="#${sectionId}"]`);

  console.log(sectionBoundaries);

  menuElement.classList.remove('active');
  if (sectionBoundaries) {
    menuElement.classList.add('active');
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add('scroll');
  } else {
    navigation.classList.remove('scroll');
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded');
}

function closeMenu() {
  document.body.classList.remove('menu-expanded');
}

ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 800,
}).reveal(`
#home,
#home image,
#home .stats,
#services,
#services header,
#services .cel,
#about,
#about header,
#about .content,
#contact,
footer`);

feather.replace();

let arrowLeft = document.getElementById("arrow-left");
let arrowRight = document.getElementById("arrow-right");
let pizzaFlavours = document.getElementById("pizza-flavours");
let minus = document.getElementById("minus");
let plus = document.getElementById("plus");
let rotated = false;
let scale = 1;
let translate = 0;
let price = 30;
let addition = 5;
let counter = 1;

updatePrice();

arrowLeft.addEventListener(
  "click",
  function () {
    handleArrowClick("left");
  },
  false
);
arrowRight.addEventListener(
  "click",
  function () {
    handleArrowClick("right");
  },
  false
);

let arrayOfFlavours = [
  {
    label: "Pepperoni",
    name: "flavours",
    value: "pepperoni",
    price: 30,
    imgUrl:
      "./assets/pepperoni.png",
  },
  {
    label: "Pork n Pickle",
    name: "flavours",
    value: "pork-n-pickle",
    price: 40,
    imgUrl: "./assets/pork-n-pickle.png",
  },
  {
    label: "Sicilian",
    name: "flavours",
    value: "sicilian",
    price: 35,
    imgUrl: "./assets/siciliana.png"
  }
];

arrayOfFlavours.forEach((flavour) => {
  var radio = document.createElement("input");
  radio.type = "radio";
  radio.name = flavour.name;
  radio.value = flavour.value;
  radio.id = flavour.value;

  var label = document.createElement("label");
  label.htmlFor = flavour.value;
  label.appendChild(document.createTextNode(flavour.label));

  pizzaFlavours.appendChild(radio);
  pizzaFlavours.appendChild(label);
});

function handleArrowClick(side) {
  console.log('arrow click', side);
  const maxTranslate = (arrayOfFlavours.length - 1) * 320;
  if (side === "left" && translate === 0) return;
  if (side === "right" && translate === maxTranslate) return;

  translate = side === "left" ? translate - 320 : translate + 320;
  pizzaFlavours.style.webkitTransform = "translateX(-" + translate + "px)";

  const index = translate === 0 ? 0 : translate / 320;
  document.getElementById(arrayOfFlavours[index].value).checked = true;

  const pizzaImg = document.getElementById("pizza-img");
  pizzaImg.src = arrayOfFlavours[index].imgUrl;

  price = arrayOfFlavours[index].price;
  rotated = !rotated;
  transformPizza();
  updatePrice();
}

document
  .getElementById("pizza-size")
  .addEventListener("click", function (event) {

    if (event.target && event.target.matches("input[type='radio']")) {
      const value = event.target.value;

      if (value === "p") {
        scale = 0.9;
        addition = 0;
      }

      if (value === "m") {
        scale = 1;
        addition = 5;
      }

      if (value === "g") {
        scale = 1.1;
        addition = 10;
      }

      transformPizza();
      updatePrice();
    }
  });

function transformPizza() {
  let deg = rotated ? 180 : 0;
  const pizzaImg = document.getElementById("pizza-img");
  pizzaImg.style.webkitTransform = `rotate(${deg}deg) scale(${scale})`;
}

function updatePrice() {
  const pizzaPrice = document.getElementById("price").innerHTML = (price + addition) * counter;
}

minus.addEventListener(
  "click",
  function () {
    counter = (counter == 1) ? 1 : --counter;
    updateCounter();
  },
  false
);

plus.addEventListener(
  "click",
  function () {
    counter += 1;
    updateCounter();
  },
  false
);

function updateCounter() {
  document.getElementById('pizza-counter').value = counter;
  updatePrice();
}