document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName') || 'Профил';
    
    // Търсим линка за вход/профил по атрибут или клас
    const navLinks = document.querySelectorAll('.header-actions a, #nav-links a, a[href="login.html"]');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'login.html') {
            if (isLoggedIn === 'true') {
                link.href = '#';
                link.removeAttribute('data-key'); // Спира translations.js да го презаписва

                // Подравняване на съдържанието
                link.style.display = 'inline-flex';
                link.style.alignItems = 'center';
                link.style.gap = '10px';
                link.style.textDecoration = 'none';

                // Заменяме текста с пълната визуална икона (Аватар + Зелена онлайн точка + Име)
                link.innerHTML = `
                    <div class="user-avatar-badge" title="${userName} (Онлайн)" style="
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 38px;
                        height: 38px;
                        background-color: #ebebeb;
                        border-radius: 50%;
                        flex-shrink: 0;
                    ">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a1a1a">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <span class="online-status-dot" style="
                            position: absolute;
                            top: 1px;
                            right: 1px;
                            width: 10px;
                            height: 10px;
                            background-color: #2ecc71;
                            border: 2px solid #ffffff;
                            border-radius: 50%;
                        "></span>
                    </div>
                    <span style="font-weight: 600; font-size: 0.85rem; color: inherit;">${userName}</span>
                `;
                
                // Логика за изход при клик върху иконата/името
                link.onclick = function(e) {
                    e.preventDefault();
                    if (confirm("Желаете ли да излезете от профила си?")) {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('loggedInUserEmail');
                        localStorage.removeItem('userEmail');
                        localStorage.removeItem('email');
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