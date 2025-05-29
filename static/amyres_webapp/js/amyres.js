let currentIndex = 0;
        const carouselIndices = new Map();

        function moveCarousel(direction, carouselIndex) {
            const carousels = document.querySelectorAll('.carousel');
            const carousel = carousels[carouselIndex];
            if (!carousel) return;

            if (!carouselIndices.has(carouselIndex)) {
                carouselIndices.set(carouselIndex, 0);
            }

            let currentIndex = carouselIndices.get(carouselIndex);
            const items = carousel.children;

            currentIndex = (currentIndex + direction + items.length) % items.length;

            carouselIndices.set(carouselIndex, currentIndex);

            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Function to trigger download
        function downloadFile(file) {
            const link = document.createElement('a');
            link.href = file;
            link.download = file.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        // getintouch trigger
        function submitContactForm() {
            // Trigger the form submission when the button is clicked
            document.getElementById('contactForm').submit();
        }

       // Function to trigger the login form
        function triggerLogin() {
         document.getElementById('loginForm').submit();
        }

        // Function to trigger the download form
        function triggerDownload() {
        document.getElementById('downloadForm').submit();
        } 
        document.addEventListener("DOMContentLoaded", function () {
           
    
           
            // Carousel for testimonials
            let carouselIndex = 0;
            const testimonials = document.querySelectorAll(".testimonial");
            const totalTestimonials = testimonials.length;

            function showTestimonial(index) {
                testimonials.forEach((testimonial, i) => {
                    testimonial.style.display = i === index ? "block" : "none";
                });
            }

            function nextTestimonial() {
                carouselIndex = (carouselIndex + 1) % totalTestimonials;
                showTestimonial(carouselIndex);
            }

            function prevTestimonial() {
                carouselIndex = (carouselIndex - 1 + totalTestimonials) % totalTestimonials;
                showTestimonial(carouselIndex);
            }

            showTestimonial(carouselIndex); // Show the first testimonial

            // Automatically cycle testimonials
            setInterval(nextTestimonial, 5000); // Change every 5 seconds

            // FAQ Accordion
            const faqItems = document.querySelectorAll(".faq-item");

            faqItems.forEach(item => {
                item.addEventListener("click", () => {
                    const answer = item.querySelector("p");
                    const isOpen = answer.style.display === "block";
                    answer.style.display = isOpen ? "none" : "block";
                });
            });
        });

        // Function to show or hide the details of a news item
        function readMore(id) {
            const element = document.getElementById(id);
            if (element.style.display === "none") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }

        // Auto-slide function for carousel
        setInterval(() => {
            moveCarousel(1, 0);
        }, 5000); // Change every 5 seconds


// service request and handling
function submitservicerequest() {
    // Trigger the form submission when the button is clicked
    document.getElementById('servicerequest').submit();
}

