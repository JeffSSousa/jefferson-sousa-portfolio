const categoriesContainer = document.querySelector(
    ".skills__categories"
);

const skillsContainer = document.querySelector(
    ".skills__content"
);


const SKILLS_PATH = "assets/data/skills/skills.json";
const CATEGORIES_PATH = "assets/data/skills/categories.json";

let categories = [];
let skills = [];


/* ========================================
   LOAD DATA
======================================== */

async function loadSkills() {

    try {

        const [categoriesResponse, skillsResponse] = await Promise.all([
            fetch(CATEGORIES_PATH),
            fetch(SKILLS_PATH)
        ]);

        categories = await categoriesResponse.json();
        skills = await skillsResponse.json();

        renderCategories();

        if (categories.length > 0) {
            renderSkills(categories[0].id);
        }

    } catch (error) {

        console.error(
            "Erro ao carregar dados das skills:",
            error
        );

    }

}


/* ========================================
   RENDER CATEGORIES
======================================== */

function renderCategories() {

    categoriesContainer.innerHTML = "";

    categories.forEach((category, index) => {

        const button = document.createElement("button");

        button.type = "button";

        button.classList.add("skills__category");

        if (index === 0) {
            button.classList.add("active");
        }

        button.textContent = category.name;

        button.dataset.categoryId = category.id;

        button.addEventListener("click", () => {

            setActiveCategory(button);

            renderSkills(category.id);

        });

        categoriesContainer.appendChild(button);

    });

}


/* ========================================
   ACTIVE CATEGORY
======================================== */

function setActiveCategory(selectedButton) {

    const buttons = document.querySelectorAll(
        ".skills__category"
    );

    buttons.forEach(button => {

        button.classList.remove("active");

    });

    selectedButton.classList.add("active");

}


/* ========================================
   RENDER SKILLS
======================================== */

function renderSkills(categoryId) {

    skillsContainer.innerHTML = "";

    const filteredSkills = skills.filter(
        skill => skill.categoryId === categoryId
    );


    filteredSkills.forEach(skill => {

        const card = document.createElement("div");

        card.classList.add("skills__card");


        const icon = document.createElement("img");

        icon.src = `assets/icons/skills/${skill.icon}.svg`;

        icon.alt = `${skill.name} logo`;


        const name = document.createElement("span");

        name.textContent = skill.name;


        card.appendChild(icon);

        card.appendChild(name);


        skillsContainer.appendChild(card);

    });

}


/* ========================================
   INITIALIZE
======================================== */

loadSkills();