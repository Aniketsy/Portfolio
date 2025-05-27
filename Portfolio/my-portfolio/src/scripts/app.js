const app = () => {
    const logosContainer = document.getElementById('logos-container');
    const logos = [
        'logo1.svg',
        'logo2.svg',
        'logo3.svg'
    ];

    logos.forEach(logo => {
        const img = document.createElement('img');
        img.src = `./assets/logos/${logo}`;
        img.alt = '3D Logo';
        img.classList.add('logo');
        logosContainer.appendChild(img);
    });

    const animateLogos = () => {
        const logoElements = document.querySelectorAll('.logo');
        logoElements.forEach(logo => {
            logo.style.transform = `rotateY(${Math.random() * 360}deg)`;
            logo.style.transition = 'transform 0.5s';
        });
    };

    setInterval(animateLogos, 2000);
};

document.addEventListener('DOMContentLoaded', app);