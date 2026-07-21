document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName') || 'Профил';
    
    // Търсим линка за вход/профил по текство съдържание или атрибути
    const navLinks = document.querySelectorAll('.header-actions a, #nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'login.html') {
            if (isLoggedIn === 'true') {
                link.textContent = `👤 ${userName}`;
                link.href = '#';
                link.style.fontWeight = 'bold';
                link.removeAttribute('data-key'); // <--- ДОБАВЕТЕ ТОВА: спира translations.js да го презаписва
                
                link.onclick = function(e) {
                    e.preventDefault();
                    if (confirm("Желаете ли да излезете от профила си?")) {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userEmail');
                        localStorage.removeItem('userName');
                        localStorage.removeItem('isAdmin');
                        localStorage.removeItem('admin');
                        window.location.reload();
                    }
                };
            }
        }
    });
});