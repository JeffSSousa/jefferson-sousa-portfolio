const menuButton = document.querySelector(".header__menu-button");
const mobileMenu = document.querySelector(".header__mobile-menu");
const mobileLinks = document.querySelectorAll(".header__mobile-links a");


/* ========================================
   OPEN / CLOSE MOBILE MENU
======================================== */

menuButton.addEventListener("click", () => {

    const isOpen = mobileMenu.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuButton.textContent = isOpen ? "×" : "☰";

});


/* ========================================
   CLOSE MENU AFTER CLICKING A LINK
======================================== */

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        menuButton.textContent = "☰";

    });

});