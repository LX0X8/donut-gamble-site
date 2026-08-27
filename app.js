// DonutMax frontend
// This page is intentionally informational.
// No real currency or Minecraft transactions
// are handled by the website.

console.log("DonutMax loaded.");


// Smooth navigation

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });
