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

//
// Aside box
const capitalizeWords = (text) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const replaceHyphens = (text) => {
  return text.replace(/-/g, '<span class="hide-hyphen">-</span>');
};

const updateAsideBox = () => {
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
        (className) => className !== "section-id"
      );
      currentSectionNames = sectionClasses.slice(-2); // Last two classes
      isInSection = true;
    }
  });

  asideBox.innerHTML = ""; // Clear previous content

  if (isInSection) {
    asideBox.style.display = "block"; // Show aside box

    currentSectionNames.forEach((name, index) => {
      let formattedName = capitalizeWords(name);
      formattedName = replaceHyphens(formattedName);

      const classItem = document.createElement("div");
      classItem.innerHTML = formattedName; // Use innerHTML to apply styles

      // Highlight the second div when there are exactly two classes
      if (currentSectionNames.length === 2 && index === 1) {
        classItem.classList.add("highlight");
      } else if (currentSectionNames.length === 1) {
        classItem.classList.add("capitalize");
      }

      asideBox.appendChild(classItem);
    });

    // Handle single div case
    if (currentSectionNames.length === 1) {
      asideBox.firstChild.classList.add("capitalize");
    }
  } else {
    asideBox.style.display = "none"; // Hide aside box if no sections
  }
};

document.addEventListener("scroll", updateAsideBox);
window.addEventListener("resize", updateAsideBox); // Optional: update on resize

// Initial call to set aside box content if already in a section
updateAsideBox();
