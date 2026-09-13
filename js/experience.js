const experienceContainer = document.querySelector(
    ".experience__content"
);

const EXPERIENCE_PATH = "assets/data/experience/experience.json";

let experiences = [];

async function loadExperience() {

    try {

        const response = await fetch(EXPERIENCE_PATH);

        experiences = await response.json();

        renderExperience();

    } catch (error) {

        console.error(
            "Erro ao carregar dados da experiência:",
            error
        );

    }
}

function renderExperience() {

    experienceContainer.innerHTML = "";

    experiences.forEach(experience => {

        const item = createExperienceItem(experience);

        experienceContainer.appendChild(item);

    });
}

function createExperienceItem(experience) {

    const item = document.createElement("article");

    item.classList.add(
        "experience__item"
    );

    const timeline = document.createElement("div");

    timeline.classList.add(
        "experience__timeline"
    );

    const date = document.createElement("span");

    date.classList.add(
        "experience__date"
    );

    date.textContent =
        `${experience.startDate} — ${experience.endDate}`;

    timeline.appendChild(date);

    const content = document.createElement("div");

    content.classList.add(
        "experience__item-content"
    );

    const role = document.createElement("h3");

    role.classList.add(
        "experience__role"
    );

    role.textContent = experience.role;

    const company = document.createElement("p");

    company.classList.add(
        "experience__company"
    );

    company.textContent = experience.company;

    const description = document.createElement("p");

    description.classList.add(
        "experience__item-description"
    );

    description.textContent =
        experience.description;

    content.appendChild(role);
    content.appendChild(company);
    content.appendChild(description);

    if (
        experience.activities &&
        experience.activities.length > 0
    ) {

        const activities = document.createElement("ul");

        activities.classList.add(
            "experience__activities"
        );

        experience.activities.forEach(activity => {

            const item = document.createElement("li");

            item.textContent = activity;

            activities.appendChild(item);

        });

        content.appendChild(activities);
    }

    if (
        experience.technologies &&
        experience.technologies.length > 0
    ) {

        const technologies = document.createElement("div");

        technologies.classList.add(
            "experience__technologies"
        );

        experience.technologies.forEach(technology => {

            const technologyItem =
                document.createElement("span");

            technologyItem.textContent =
                technology;

            technologies.appendChild(
                technologyItem
            );

        });

        content.appendChild(technologies);
    }

    item.appendChild(timeline);
    item.appendChild(content);

    return item;
}

loadExperience();