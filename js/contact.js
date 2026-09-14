const copyEmailButton = document.querySelector(
    "#contact-copy-email"
);

const emailElement = document.querySelector(
    "#contact-email"
);


copyEmailButton.addEventListener(
    "click",
    async () => {

        const email =
            emailElement.textContent.trim();

        try {

            await navigator.clipboard.writeText(
                email
            );

            copyEmailButton.innerHTML =
                '<i class="bx bx-check"></i>';

            copyEmailButton.setAttribute(
                "aria-label",
                "E-mail copiado"
            );

            setTimeout(() => {

                copyEmailButton.innerHTML =
                    '<i class="bx bx-copy"></i>';

                copyEmailButton.setAttribute(
                    "aria-label",
                    "Copiar e-mail"
                );

            }, 2000);

        } catch (error) {

            console.error(
                "Erro ao copiar e-mail:",
                error
            );

        }

    }
);