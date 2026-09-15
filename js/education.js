/* ========================================
   ELEMENTS
======================================== */

const tabsContainer = document.querySelector(
    ".education__tabs"
);

const contentContainer = document.querySelector(
    ".education__content"
);


/* ========================================
   DATA
======================================== */

const EDUCATION_PATH =
    "assets/data/education/education.json";

const COURSES_PATH =
    "assets/data/education/courses.json";

const CERTIFICATIONS_PATH =
    "assets/data/education/certifications.json";


let education = [];
let courses = [];
let certifications = [];


/* ========================================
   LOAD DATA
======================================== */

async function loadEducation() {

    try {

        const [
            educationResponse,
            coursesResponse,
            certificationsResponse
        ] = await Promise.all([
            fetch(EDUCATION_PATH),
            fetch(COURSES_PATH),
            fetch(CERTIFICATIONS_PATH)
        ]);


        education =
            await educationResponse.json();

        courses =
            await coursesResponse.json();

        certifications =
            await certificationsResponse.json();


        renderTabs();

        renderContent("education");

    } catch (error) {

        console.error(
            "Erro ao carregar dados de formação:",
            error
        );

    }

}


/* ========================================
   TABS
======================================== */

function renderTabs() {

    tabsContainer.innerHTML = "";


    const tabs = [
        {
            id: "education",
            name: "Formação"
        },
        {
            id: "courses",
            name: "Cursos"
        },
        {
            id: "certifications",
            name: "Certificações"
        }
    ];


    tabs.forEach((tab, index) => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.classList.add(
            "education__tab"
        );


        if (index === 0) {

            button.classList.add(
                "active"
            );

        }


        button.textContent =
            tab.name;

        button.dataset.tab =
            tab.id;


        button.setAttribute(
            "aria-selected",
            index === 0
        );


        button.addEventListener(
            "click",
            () => {

                setActiveTab(button);

                renderContent(
                    tab.id
                );

            }
        );


        tabsContainer.appendChild(
            button
        );

    });

}


function setActiveTab(
    selectedTab
) {

    const tabs =
        document.querySelectorAll(
            ".education__tab"
        );


    tabs.forEach(tab => {

        const isActive =
            tab === selectedTab;


        tab.classList.toggle(
            "active",
            isActive
        );


        tab.setAttribute(
            "aria-selected",
            isActive
        );

    });

}


/* ========================================
   CONTENT
======================================== */

function renderContent(type) {

    contentContainer.innerHTML = "";


    if (type === "education") {

        renderEducation();

    }


    if (type === "courses") {

        renderCourses();

    }


    if (type === "certifications") {

        renderCertifications();

    }

}


/* ========================================
   CARD
======================================== */

function createCard(
    logo,
    logoAlt
) {

    const card =
        document.createElement("article");


    card.classList.add(
        "education__card"
    );


    const logoContainer =
        document.createElement("div");


    logoContainer.classList.add(
        "education__card-logo"
    );


    const image =
        document.createElement("img");


    image.src = logo;

    image.alt = logoAlt;


    logoContainer.appendChild(
        image
    );


    const content =
        document.createElement("div");


    content.classList.add(
        "education__card-content"
    );


    card.appendChild(
        logoContainer
    );

    card.appendChild(
        content
    );


    return {
        card,
        content
    };

}


/* ========================================
   FORMATION
======================================== */

function renderEducation() {

    education.forEach(item => {

        const {
            card,
            content
        } = createCard(
            item.logo,
            `Logo da ${item.institution}`
        );


        const header =
            document.createElement("div");


        header.classList.add(
            "education__card-header"
        );


        const date =
            document.createElement("span");


        date.classList.add(
            "education__card-date"
        );


        date.textContent =
            `${item.startDate} — ${item.endDate}`;


        const status =
            document.createElement("span");


        status.classList.add(
            "education__card-status"
        );


        status.textContent =
            item.status;


        header.appendChild(date);
        header.appendChild(status);


        const title =
            document.createElement("h3");


        title.classList.add(
            "education__card-title"
        );


        title.textContent =
            item.course;


        const institution =
            document.createElement("p");


        institution.classList.add(
            "education__card-institution"
        );


        institution.textContent =
            `${item.degree} · ${item.institution}`;


        const description =
            document.createElement("p");


        description.classList.add(
            "education__card-description"
        );


        description.textContent =
            item.description;


        content.appendChild(header);
        content.appendChild(title);
        content.appendChild(institution);
        content.appendChild(description);


        contentContainer.appendChild(
            card
        );

    });

}


/* ========================================
   COURSES
======================================== */

function renderCourses() {

    courses.forEach(item => {

        const {
            card,
            content
        } = createCard(
            item.logo,
            `Logo da ${item.institution}`
        );


        const date =
            document.createElement("span");


        date.classList.add(
            "education__card-date"
        );


        date.textContent =
            item.completionDate;


        const title =
            document.createElement("h3");


        title.classList.add(
            "education__card-title"
        );


        title.textContent =
            item.name;


        const institution =
            document.createElement("p");


        institution.classList.add(
            "education__card-institution"
        );


        institution.textContent =
            item.institution;


        const description =
            document.createElement("p");


        description.classList.add(
            "education__card-description"
        );


        description.textContent =
            item.description;


        content.appendChild(date);
        content.appendChild(title);
        content.appendChild(institution);
        content.appendChild(description);


        if (
            item.technologies &&
            item.technologies.length > 0
        ) {

            const technologies =
                document.createElement("div");


            technologies.classList.add(
                "education__card-technologies"
            );


            item.technologies.forEach(
                technology => {

                    const technologyItem =
                        document.createElement("span");


                    technologyItem.textContent =
                        technology;


                    technologies.appendChild(
                        technologyItem
                    );

                }
            );


            content.appendChild(
                technologies
            );

        }


        contentContainer.appendChild(
            card
        );

    });

}


/* ========================================
   CERTIFICATIONS
======================================== */

function renderCertifications() {

    certifications.forEach(item => {

        const {
            card,
            content
        } = createCard(
            item.logo,
            `Logo da ${item.institution}`
        );


        const date =
            document.createElement("span");


        date.classList.add(
            "education__card-date"
        );


        date.textContent =
            item.date;


        const title =
            document.createElement("h3");


        title.classList.add(
            "education__card-title"
        );


        title.textContent =
            item.name;


        const institution =
            document.createElement("p");


        institution.classList.add(
            "education__card-institution"
        );


        institution.textContent =
            item.institution;


        content.appendChild(date);
        content.appendChild(title);
        content.appendChild(institution);


        if (item.credential) {

            const credential =
                document.createElement("p");


            credential.classList.add(
                "education__card-credential"
            );


            credential.textContent =
                `Credencial: ${item.credential}`;


            content.appendChild(
                credential
            );

        }


        if (item.link) {

            const link =
                document.createElement("a");


            link.href =
                item.link;

            link.target =
                "_blank";

            link.rel =
                "noopener noreferrer";


            link.classList.add(
                "education__card-link"
            );


            link.textContent =
                "Exibir Credencial";


            content.appendChild(
                link
            );

        }


        contentContainer.appendChild(
            card
        );

    });

}


/* ========================================
   INIT
======================================== */

loadEducation();