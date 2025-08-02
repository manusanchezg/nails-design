// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header transparente al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 2px 20px rgba(255, 182, 193, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
    }
});

// Animaciones de scroll suaves estilo Apple
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Aplicar animaciones a elementos específicos
document.addEventListener('DOMContentLoaded', () => {
    // Elementos que se animan al aparecer
    const animatedElements = document.querySelectorAll(`
        .servicio-card,
        .testimonio-card,
        .galeria-item,
        .info-item,
        .sobre-mi-text,
        .sobre-mi-image,
        .section-header
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animación escalonada para las cards de servicios
    const servicioCards = document.querySelectorAll('.servicio-card');
    servicioCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Animación escalonada para testimonios
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    testimonioCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Animación escalonada para galería
    const galeriaItems = document.querySelectorAll('.galeria-item');
    galeriaItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Efecto parallax sutil en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.floating-card');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Contador animado para estadísticas
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', '').replace('%', ''));
        const suffix = counter.textContent.includes('+') ? '+' : 
                      counter.textContent.includes('%') ? '%' : '';
        
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // Observar cuando el elemento entra en vista
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter.closest('.stat'));
    });
};

// Inicializar contadores
document.addEventListener('DOMContentLoaded', animateCounters);

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto hover mejorado para cards
document.querySelectorAll('.servicio-card, .testimonio-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efecto de typing para el título principal
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const typing = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    };
    
    typing();
};

// Aplicar efecto typing al cargar la página
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Animación de las estrellas en testimonios
document.querySelectorAll('.stars').forEach(starsContainer => {
    const stars = starsContainer.querySelectorAll('i');
    
    const animateStars = () => {
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
                star.style.color = '#FFD700';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    };
    
    const starsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStars();
                starsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    starsObserver.observe(starsContainer);
});

// Efecto de ondas en los botones CTA
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// CSS para el efecto ripple
const rippleCSS = `
.cta-button {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Agregar CSS del ripple al documento
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Lazy loading para imágenes - versión corregida
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Solo aplicar lazy loading si la imagen tiene data-src
            if (img.dataset.src) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                img.src = img.dataset.src;
            }
            
            observer.unobserve(img);
        }
    });
});

// Solo observar imágenes que tienen data-src (lazy loading)
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Efecto de partículas flotantes en el hero
const createFloatingParticles = () => {
    const hero = document.querySelector('.hero');
    const particlesCount = 20;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
            pointer-events: none;
        `;
        
        hero.appendChild(particle);
    }
};

// CSS para partículas flotantes
const particleCSS = `
@keyframes float-particle {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}
`;

const particleStyle = document.createElement('style');
particleStyle.textContent = particleCSS;
document.head.appendChild(particleStyle);

// Inicializar partículas
document.addEventListener('DOMContentLoaded', createFloatingParticles);

// Efecto de scroll suave para toda la página
document.documentElement.style.scrollBehavior = 'smooth';

// Preloader simple
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Optimización de rendimiento para animaciones
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desactivar animaciones para usuarios que prefieren movimiento reducido
    document.documentElement.style.setProperty('--animation-duration', '0s');
}
