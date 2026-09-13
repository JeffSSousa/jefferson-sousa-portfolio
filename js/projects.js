const categoriesContainer = document.querySelector(
    ".projects__categories"
);

const projectsContainer = document.querySelector(
    ".projects__content"
);

const modal = document.querySelector(
    ".projects__modal"
);

const modalBody = document.querySelector(
    ".projects__modal-body"
);

const modalClose = document.querySelector(
    ".projects__modal-close"
);

const modalOverlay = document.querySelector(
    ".projects__modal-overlay"
);


const PROJECTS_PATH = "assets/data/projects/projects.json";
const CATEGORIES_PATH = "assets/data/projects/categories.json";

let categories = [];
let projects = [];

async function loadProjects() {
    try {
        const [categoriesResponse, projectsResponse] = await Promise.all([
            fetch(CATEGORIES_PATH),
            fetch(PROJECTS_PATH)
        ]);

        categories = await categoriesResponse.json();
        projects = await projectsResponse.json();

        renderCategories();

        renderProjects();
    } catch (error) {
        console.error(
            "Erro ao carregar dados dos projetos:",
            error
        );
    }
}

function renderCategories() {
    categoriesContainer.innerHTML = "";

    const allButton = document.createElement("button");

    allButton.type = "button";
    allButton.classList.add(
        "projects__category",
        "active"
    );

    allButton.textContent = "Todos";

    allButton.addEventListener("click", () => {
        setActiveCategory(allButton);
        renderProjects();
    });

    categoriesContainer.appendChild(allButton);

    categories.forEach(category => {
        const button = document.createElement("button");

        button.type = "button";
        button.classList.add("projects__category");

        button.textContent = category.name;
        button.dataset.categoryId = category.id;

        button.addEventListener("click", () => {
            setActiveCategory(button);
            renderProjects(category.id);
        });

        categoriesContainer.appendChild(button);
    });
}

function setActiveCategory(selectedButton) {
    const buttons = document.querySelectorAll(
        ".projects__category"
    );

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    selectedButton.classList.add("active");
}

function renderProjects(categoryId = null) {

    projectsContainer.innerHTML = "";

    const filteredProjects = categoryId === null
        ? projects
        : projects.filter(project =>
            project.categoryIds.includes(categoryId)
        );

    filteredProjects.forEach(project => {
        const card = createProjectCard(project);

        projectsContainer.appendChild(card);
    });
}

function createProjectCard(project) {

    const card = document.createElement("article");

    card.classList.add("projects__card");

    const cover = document.createElement("img");

    cover.classList.add("projects__card-cover");
    cover.src = project.cover;
    cover.alt = `Imagem do projeto ${project.name}`;

    const body = document.createElement("div");

    body.classList.add("projects__card-body");

    const title = document.createElement("h3");

    title.classList.add("projects__card-title");
    title.textContent = project.name;

    const description = document.createElement("p");

    description.classList.add("projects__card-description");
    description.textContent = project.shortDescription;

    const technologies = document.createElement("div");

    technologies.classList.add(
        "projects__card-technologies"
    );

    project.technologies.forEach(technology => {

        const technologyItem = document.createElement("span");

        technologyItem.textContent = technology;

        technologies.appendChild(technologyItem);
    });

    const footer = document.createElement("div");

    footer.classList.add("projects__card-footer");

    const detailsButton = document.createElement("button");

    detailsButton.type = "button";
    detailsButton.classList.add(
        "projects__card-details"
    );

    detailsButton.textContent = "Ver detalhes";

    detailsButton.addEventListener("click", () => {
        openProjectModal(project);
    });

    footer.appendChild(detailsButton);

    if (project.github) {

        const githubLink = document.createElement("a");

        githubLink.href = project.github;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";

        githubLink.classList.add(
            "projects__card-link"
        );

        githubLink.textContent = "GitHub";

        footer.appendChild(githubLink);
    }

    if (project.demo) {

        const demoLink = document.createElement("a");

        demoLink.href = project.demo;
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";

        demoLink.classList.add(
            "projects__card-link"
        );

        demoLink.textContent = "Ver projeto";

        footer.appendChild(demoLink);
    }

    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(technologies);
    body.appendChild(footer);

    card.appendChild(cover);
    card.appendChild(body);

    return card;
}

function openProjectModal(project) {

    modalBody.innerHTML = "";

    const title = document.createElement("h2");

    title.id = "projects-modal-title";
    title.textContent = project.name;

    const problem = createModalSection(
        "Problema",
        project.problem
    );

    const solution = createModalSection(
        "Solução",
        project.solution
    );

    const architecture = createModalSection(
        "Arquitetura",
        project.architecture
    );

    const decisions = createListSection(
        "Decisões técnicas",
        project.decisions
    );

    const challenges = createListSection(
        "Desafios",
        project.challenges
    );

    const result = createModalSection(
        "Resultado",
        project.result
    );

    modalBody.appendChild(title);
    modalBody.appendChild(problem);
    modalBody.appendChild(solution);
    modalBody.appendChild(architecture);
    modalBody.appendChild(decisions);
    modalBody.appendChild(challenges);
    modalBody.appendChild(result);

    if (project.github || project.demo) {

        const links = document.createElement("div");

        links.classList.add(
            "projects__modal-links"
        );

        if (project.github) {

            const github = document.createElement("a");

            github.href = project.github;
            github.target = "_blank";
            github.rel = "noopener noreferrer";
            github.textContent = "GitHub";

            links.appendChild(github);
        }

        if (project.demo) {

            const demo = document.createElement("a");

            demo.href = project.demo;
            demo.target = "_blank";
            demo.rel = "noopener noreferrer";
            demo.textContent = "Ver projeto";

            links.appendChild(demo);
        }

        modalBody.appendChild(links);
    }

    modal.hidden = false;

    document.body.style.overflow = "hidden";
}

function createModalSection(title, content) {

    const section = document.createElement("section");

    section.classList.add(
        "projects__modal-section"
    );

    const heading = document.createElement("h3");

    heading.textContent = title;

    const paragraph = document.createElement("p");

    paragraph.textContent = content;

    section.appendChild(heading);
    section.appendChild(paragraph);

    return section;
}

function createListSection(title, items) {

    const section = document.createElement("section");

    section.classList.add(
        "projects__modal-section"
    );

    const heading = document.createElement("h3");

    heading.textContent = title;

    const list = document.createElement("ul");

    items.forEach(item => {

        const listItem = document.createElement("li");

        listItem.textContent = item;

        list.appendChild(listItem);
    });

    section.appendChild(heading);
    section.appendChild(list);

    return section;
}

function closeProjectModal() {

    modal.hidden = true;

    document.body.style.overflow = "";
}

modalClose.addEventListener(
    "click",
    closeProjectModal
);

modalOverlay.addEventListener(
    "click",
    closeProjectModal
);

document.addEventListener("keydown", event => {

    if (event.key === "Escape" && !modal.hidden) {
        closeProjectModal();
    }

});

loadProjects();