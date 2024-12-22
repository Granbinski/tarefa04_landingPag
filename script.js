document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        },
    });

    // Initialize AOS
    AOS.init();

    // Load banner slides
    const bannerSlides = [
        { image: 'banner1.jpg', title: 'Soluções Inovadoras' },
        { image: 'banner2.jpg', title: 'Qualidade Garantida' },
        { image: 'banner3.jpg', title: 'Atendimento Personalizado' },
    ];

    const swiperWrapper = document.querySelector('.swiper-wrapper');
    bannerSlides.forEach(slide => {
        const slideElement = document.createElement('div');
        slideElement.className = 'swiper-slide';
        slideElement.style.backgroundImage = `url(${slide.image})`;
        slideElement.innerHTML = `<h2>${slide.title}</h2>`;
        swiperWrapper.appendChild(slideElement);
    });

    // Load services from API
    fetch('https://api.example.com/services')
        .then(response => response.json())
        .then(data => {
            const servicosContainer = document.getElementById('servicos-container');
            data.forEach(service => {
                const serviceElement = document.createElement('div');
                serviceElement.className = 'service-card bg-white p-6 rounded-lg shadow-md';
                serviceElement.setAttribute('data-aos', 'fade-up');
                serviceElement.innerHTML = `
                    <h3 class="text-xl font-bold mb-2">${service.title}</h3>
                    <p class="text-gray-700">${service.description}</p>
                `;
                servicosContainer.appendChild(serviceElement);
            });
        })
        .catch(error => {
            console.error('Error loading services:', error);
            document.getElementById('servicos-container').innerHTML = '<p class="text-red-500">Erro ao carregar os serviços. Por favor, tente novamente mais tarde.</p>';
        });

    // Load testimonials from API
    fetch('https://api.example.com/testimonials')
        .then(response => response.json())
        .then(data => {
            const testemunhosContainer = document.getElementById('testemunhos-container');
            data.forEach(testimonial => {
                const testimonialElement = document.createElement('div');
                testimonialElement.className = 'testimonial-card bg-white p-6 rounded-lg shadow-md';
                testimonialElement.setAttribute('data-aos', 'fade-up');
                testimonialElement.innerHTML = `
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mx-auto mb-4">
                    <h3 class="text-lg font-bold mb-2">${testimonial.name}</h3>
                    <p class="text-gray-700">${testimonial.text}</p>
                `;
                testemunhosContainer.appendChild(testimonialElement);
            });
        })
        .catch(error => {
            console.error('Error loading testimonials:', error);
            document.getElementById('testemunhos-container').innerHTML = '<p class="text-red-500">Erro ao carregar os testemunhos. Por favor, tente novamente mais tarde.</p>';
        });

    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !telefone || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        if (!isValidPhone(telefone)) {
            alert('Por favor, insira um número de telefone válido.');
            return;
        }

        // Send email using EmailJS
        emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: nome,
            from_email: email,
            phone: telefone,
            message: mensagem
        }).then(
            function(response) {
                console.log("SUCCESS", response);
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
            },
            function(error) {
                console.log("FAILED", error);
                alert('Erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
            }
        );
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
});