/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
// The main sections
const landingContainers = document.getElementsByClassName('landing__container');
const sections = document.getElementsByTagName('section');
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Carousel JS - from W3schools
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    // This iterates through each 'slide' element and hides all except one
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // We increment the slide index value when we want to move onto the next slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image after 5 seconds
}

// Helper function which creates a plain text element of our choice
function createTextNode(text) {
    return document.createTextNode(text);
}

// Helper function to check if a certain section of the page i.e. (elem) is currently visible to the user
function isInViewport(el) {
    // This variable contains the coordinates of the passed-in element
    var rect = el.getBoundingClientRect();
    // The root node of the document - i.e the whole page
    var html = document.documentElement;
    // If the coordinates of our document are within 100 pixels of the section's top and the window's height/width, it must be visible
    return (
        rect.left >= 0 &&
        (rect.bottom + 100 <= (window.innerHeight || html.clientHeight) && rect.top >= 100) || (rect.top <= 100 && (rect.bottom + 100 >= (window.innerHeight || html.clientHeight))) &&
        rect.right <= (window.innerWidth || html.clientWidth)
    );
};

// Function to check whether the inner text on a nav bar <li> tag matches a given string
function activeNavElement(targetText) {
    const navLi = document.getElementsByTagName('LI');
    for (element of [...navLi]) {
        if (element.innerHTML.includes(targetText)) {
            return element;
        }
    }
}

/**
 * End Helper Functions
 * Build the nav
 *
 */

const dynamicNav = () => {
    const navBar = document.getElementById('navbar__list');

    for (section of sections) {
        // Each section's H2 title corresponds with the label we want to give each <li> tag
        var navText = section.getElementsByTagName('H2');

        var navLabel = createTextNode(navText[0].innerText);
        var listItemTag = document.createElement("LI"); // Create a <li> node

        listItemTag.appendChild(navLabel);
        listItemTag.setAttribute("class", "menu__link");

        // mini function which finds the section matching navigation bar menu
        var navLink = (selectId) => document.querySelector(`[data-nav="${selectId}"]`);

        // onClick listener which executes when user clicks nav bar and scrolls the correct section into view
        listItemTag.addEventListener("click", function (selectId) {
            navLink(selectId.target.innerText).scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }, false);

        // dynamically adds this new nav element for each section parsed inside for-loop
        navBar.appendChild(listItemTag);
    }
}

dynamicNav();


/**
 * End nav bar build
 * Add dynamic nav bar and section highlighting on scroll
 *
 */

function changeLinkState() {
    var index = landingContainers.length;
    while (--index && window.scrollY + 50 < landingContainers[index].offsetTop) {
    }

    // Iterate over each section and check if they are fully in the viewport
    [...landingContainers].forEach(
        async (section) => {
            var navElem = await activeNavElement(section.children[0].innerHTML);
            if (isInViewport(section)) {
                // If so, set the active class which corresponds to our CSS selector
                section.classList.add('your-active-class');
                navElem.classList.add('selected');
            } else {
                // If not in the viewport, remove these classes
                section.classList.remove('your-active-class');
                navElem.classList.remove('selected');
            }
        }
    );
}

changeLinkState();
window.addEventListener('scroll', changeLinkState,
);


