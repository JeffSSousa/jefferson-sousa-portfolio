const tabs = document.querySelectorAll(".about__tab");
const panels = document.querySelectorAll(".about__panel");


/* ========================================
   TAB SWITCHING
======================================== */

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const selectedTab = tab.dataset.tab;

        /* Update tabs */

        tabs.forEach(item => {

            const isActive = item.dataset.tab === selectedTab;

            item.classList.toggle("active", isActive);

            item.setAttribute(
                "aria-selected",
                isActive
            );

        });


        /* Update panels */

        panels.forEach(panel => {

            const isActive =
                panel.dataset.panel === selectedTab;

            panel.classList.toggle(
                "active",
                isActive
            );

            panel.hidden = !isActive;

        });

    });

});