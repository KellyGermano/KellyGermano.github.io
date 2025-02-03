document.addEventListener("DOMContentLoaded", async function () {
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('section', { delay: 200, origin: 'bottom', distance: '50px' });
    }

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show-menu");
    });

    try {
        const response = await fetch('proyectos.json');
        const data = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        data.forEach(proyecto => {
            projectsContainer.innerHTML += `
                <div class="project-card">
                    <img src="${proyecto.imagen}" alt="${proyecto.nombre}" loading="lazy">
                    <h3>${proyecto.nombre}</h3>
                    <p>${proyecto.descripcion}</p>
                    <a href="${proyecto.github}" target="_blank">Ver en GitHub</a>
                </div>`;
        });
    } catch (error) {
        console.error('Error cargando proyectos:', error);
    }
});