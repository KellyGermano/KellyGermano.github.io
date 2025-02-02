document.addEventListener("DOMContentLoaded", function() {
    // Animación de scroll con ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('section', { delay: 200, origin: 'bottom', distance: '50px' });
    } else {
        console.warn('ScrollReveal no está cargado.');
    }

    // Menú hamburguesa
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    
    menuToggle.addEventListener("click", function() {
        menu.classList.toggle("show-menu");
    });

    // Cargar proyectos dinámicamente desde un JSON
    fetch('proyectos.json')
        .then(response => response.json())
        .then(data => {
            let projectsContainer = document.getElementById('projects-container');
            data.forEach(proyecto => {
                let projectCard = `
                    <div class="project-card">
                        <img src="${proyecto.imagen}" alt="${proyecto.nombre}" loading="lazy">
                        <h3>${proyecto.nombre}</h3>
                        <p>${proyecto.descripcion}</p>
                        <a href="${proyecto.github}" target="_blank">Ver en GitHub</a>
                    </div>`;
                projectsContainer.innerHTML += projectCard;
            });
        })
        .catch(error => console.error('Error cargando proyectos:', error));
});