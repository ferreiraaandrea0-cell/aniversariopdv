document.addEventListener('DOMContentLoaded', () => {
    const seal = document.getElementById('wax-seal');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const cardPage = document.getElementById('card-page');
    const bgMusic = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause-btn');

    // === ANIMACIÓN DEL SOBRE ===
    seal.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');

        setTimeout(() => {
            envelopeWrapper.classList.add('extract');
        }, 600);

        setTimeout(() => {
            envelopeWrapper.classList.add('fade-out');
            cardPage.classList.remove('hidden');
            
            setTimeout(() => {
                cardPage.classList.add('show');
                document.body.style.overflow = 'auto'; // Permitir scroll
                
                // Reproducir música automáticamente al romper el sello (interacción del usuario)
                bgMusic.play().then(() => {
                    playPauseBtn.innerHTML = '⏸';
                }).catch(error => {
                    console.log("El navegador bloqueó el autoplay. Se requiere tap manual.");
                    playPauseBtn.innerHTML = '▶';
                });
            }, 50);
        }, 1800);
    });

    // === REPRODUCTOR DE AUDIO CUSTOM ===
    playPauseBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            playPauseBtn.innerHTML = '⏸';
        } else {
            bgMusic.pause();
            playPauseBtn.innerHTML = '▶';
        }
    });

    // === CUENTA REGRESIVA ===
    // Configura aquí la fecha de tu evento (Año, Mes (0-11), Día, Hora, Minuto)
    // Ejemplo: 27 de Septiembre de 2026 a las 19:00 -> (2026, 8, 27, 19, 0, 0)
    const countdownDate = new Date(2026, 6, 1, 13, 0, 0).getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            document.getElementById('cd-days').innerText = "00";
            document.getElementById('cd-hours').innerText = "00";
            document.getElementById('cd-minutes').innerText = "00";
            document.getElementById('cd-seconds').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('cd-days').innerText = days < 10 ? "0" + days : days;
        document.getElementById('cd-hours').innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById('cd-minutes').innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById('cd-seconds').innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);

    // === RSVP FORMULARIO ===
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias! Tus datos han sido enviados correctamente.');
        rsvpForm.reset();
    });

    // === OBSERVER PARA ANIMACIONES AL HACER SCROLL ===
    // Configuramos el observador para que se active cuando el elemento se vea en un 15%
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase 'visible' para disparar la transición en CSS
                entry.target.classList.add('visible');
                // Dejamos de observar el elemento una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todas las imágenes e íconos que deben animarse y los observamos
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => scrollObserver.observe(el));
});