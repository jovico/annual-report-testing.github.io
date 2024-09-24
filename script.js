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
const capitalizeFirstWord = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const replaceHyphens = (text) => {
  return text.replace(/-/g, '<span class="hide-hyphen">-</span>');
};

const formatName = (name) => {
  if (name === "24-outlook") {
    return "24 Outlook"; // Special case for '24-outlook'
  } else {
    return capitalizeFirstWord(name.replace(/-/g, " "));
  }
};

const updateAsideBox = () => {
  const sections = document.querySelectorAll(".section-id");
  const asideBox = document.getElementById("current-section-box");
  asideBox.innerHTML = ""; // Clear the box before adding new content
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
      currentSectionNames = sectionClasses.slice(-2); // Get last two classes
      isInSection = true;
    }
  });

  if (isInSection && currentSectionNames.length > 0) {
    currentSectionNames.forEach((name, index) => {
      const classItem = document.createElement("div");

      // Special treatment for the '24-outlook' section
      if (name === "24-outlook") {
        classItem.classList.add("mobile-only-aside");
        classItem.innerHTML = formatName(name);
      } else {
        const formattedName = formatName(name);
        classItem.innerHTML = replaceHyphens(formattedName);

        // Apply highlight to the second name or the last name
        if (index === currentSectionNames.length - 1) {
          classItem.classList.add("highlight");
        }
      }

      asideBox.appendChild(classItem);
    });
  }
};

document.addEventListener("scroll", updateAsideBox);
window.addEventListener("resize", updateAsideBox); // Optional: update on resize

// Initial call to set aside box content if already in a section
updateAsideBox();

// click outside closes dropdown box

// Toggle the dropdown menu when clicked
document
  .querySelector(".dropdown-toggle")
  .addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent this click from being caught by document listener
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.classList.toggle("show");
  });

// Close the dropdown if clicking outside of it
document.addEventListener("click", function (e) {
  const dropdownMenu = document.querySelector(".dropdown-menu");

  // If the click is not inside the dropdown, close it
  if (
    !e.target.closest(".dropdown") &&
    dropdownMenu.classList.contains("show")
  ) {
    dropdownMenu.classList.remove("show");
  }
});
