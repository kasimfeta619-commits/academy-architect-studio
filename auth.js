function initAuthUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || localStorage.getItem('isUserLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const userName = localStorage.getItem('userName') || (isAdmin ? 'Админ' : 'Профил');

    if (!isLoggedIn) return;

    const authContainer = document.getElementById('navAuthContainer');
    
    // HTML структура за Иконата + Зелената онлайн точка + Името
    const userProfileHTML = `
        <a href="#" id="userProfileLink" title="${userName} (Онлайн)" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: inherit; cursor: pointer;">
            <span style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; background-color: #ebebeb; border-radius: 50%; flex-shrink: 0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a1a1a">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span style="position: absolute; top: 1px; right: 1px; width: 9px; height: 9px; background-color: #2ecc71; border: 2px solid #ffffff; border-radius: 50%;"></span>
            </span>
            <span style="font-weight: 600; font-size: 0.85rem;">${userName}</span>
        </a>
    `;

    if (authContainer) {
        authContainer.innerHTML = userProfileHTML;
    } else {
        // Резервен вариант за страници, които нямат контейнер, а директен линк login.html
        const loginLinks = document.querySelectorAll('a[href="login.html"], .btn-login');
        loginLinks.forEach(link => {
            link.removeAttribute('data-key');
            link.removeAttribute('data-i18n');
            link.outerHTML = userProfileHTML;
        });
    }

    // Слушател за изход при клик върху профила
    document.addEventListener('click', function(e) {
        const profileBtn = e.target.closest('#userProfileLink');
        if (profileBtn) {
            e.preventDefault();
            if (confirm("Желаете ли да излезете от профила си?")) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('isUserLoggedIn');
                localStorage.removeItem('loggedInUserEmail');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userName');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('admin');
                window.location.reload();
            }
        }
    });
}

// Задействане на логиката
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
} else {
    initAuthUI();
}