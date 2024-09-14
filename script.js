// script.js

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const burgerMenuX = document.getElementById("burger-menu-x");
  const navLinks = document.getElementById("nav-links");
  const navItems = navLinks.querySelectorAll("a");

  function toggleMenu() {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      setTimeout(() => {
        navLinks.style.display = "none";
      }, 700); // Match this duration with the CSS transition time
    } else {
      navLinks.style.display = "block";
      setTimeout(() => {
        navLinks.classList.add("active");
      }, 10); // Delay adding the class to allow the display change to take effect
    }
    burgerMenu.classList.toggle("active");
    burgerMenuX.classList.toggle("active");
  }

  burgerMenu.addEventListener("click", toggleMenu);
  burgerMenuX.addEventListener("click", toggleMenu);

  navItems.forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });
});

document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(
    "div.menu-bar nav.menu-bar-nav > ul > li"
  );

  let currentSectionId = null;

  // Determine the currently active section
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight - 50
    ) {
      currentSectionId = section.getAttribute("id");
    }
  });

  // Remove 'active' class from all parent <li> elements
  navItems.forEach((item) => {
    item.classList.remove("active");
    const links = item.querySelectorAll("ul li a");
    let isActive = false;

    // Check if any of the child links or parent link matches the current section
    links.forEach((link) => {
      if (link.getAttribute("href").substring(1) === currentSectionId) {
        isActive = true;
      }
    });

    const parentLink = item.querySelector("a");
    if (
      parentLink &&
      parentLink.getAttribute("href").substring(1) === currentSectionId
    ) {
      isActive = true;
    }

    // Add 'active' class only if this item should be highlighted
    if (isActive) {
      item.classList.add("active");
    }
  });
});

// script.js  image popup
function zoomImage(imageId) {
  // Define descriptions for each image
  var descriptions = {
    theoryNica: "Impact | The Theory of Change | Nicaragua",
    theoryMex: "Impact | The Theory of Change | Mexico",
  };

  // Create the popup div
  var popup = document.createElement("div");
  popup.id = "imagePopup";
  document.body.appendChild(popup);

  // Create the description bar
  var descriptionBar = document.createElement("div");
  descriptionBar.className = "description-bar";
  descriptionBar.innerHTML = descriptions[imageId]; // Set the description based on the clicked image

  // Create the close button inside the description bar
  var closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = function () {
    closePopup(popup);
  };
  descriptionBar.appendChild(closeBtn);

  // Add the description bar to the popup
  popup.appendChild(descriptionBar);

  // Add the image to the popup
  var img = document.createElement("img");
  img.src = document.getElementById(imageId).src;
  popup.appendChild(img);

  // Show the popup
  popup.style.display = "block";
}

function closePopup(popup) {
  document.body.removeChild(popup);
}

// script.js ASIDE BOX
document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".section-id");
  const asideBox = document.getElementById("current-section-box");
  let currentSectionNames = [];
  let isInSection = false;
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const sectionClasses = Array.from(section.classList).filter(
        (className) => className !== "section"
      );
      if (sectionClasses.length > 1) {
        currentSectionNames = sectionClasses.slice(-2);
      } else {
        currentSectionNames = sectionClasses;
      }
      isInSection = true;
    }
  });

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (isInSection && currentSectionNames.length > 0) {
    asideBox.style.display = "block";
    asideBox.innerHTML = "";
    currentSectionNames.forEach((name) => {
      const capitalizedName = capitalizeFirstLetter(name);
      const classItem = document.createElement("div");
      classItem.textContent = capitalizedName;
      asideBox.appendChild(classItem);
    });
  } else {
    asideBox.style.display = "none";
  }
});
