(function() {
    // 1. Инжектиране на необходимите CSS стилове за бутона, за да изглежда еднакво на всички страници
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        .wishlist-nav-btn {
            background: none;
            border: 1px solid rgba(112, 91, 66, 0.3);
            padding: 6px 12px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 6px;
            color: inherit;
            transition: all 0.2s;
            font-family: inherit;
        }
        .wishlist-nav-btn:hover {
            border-color: #111;
            background: rgba(0,0,0,0.03);
        }
        body.dark-mode .wishlist-nav-btn {
            border-color: rgba(255, 255, 255, 0.2);
            color: #fff;
        }
        body.dark-mode .wishlist-nav-btn:hover {
            border-color: #fff;
            background: rgba(255,255,255,0.05);
        }
    `;
    document.head.appendChild(styleEl);

    document.addEventListener("DOMContentLoaded", function() {
        // 2. Автоматично добавяне на бутона за любими в навигацията, ако липсва
        const headerActions = document.querySelector('.header-actions');
        if (headerActions && !document.querySelector('.wishlist-nav-btn')) {
            const darkModeBtn = document.getElementById('darkModeBtn');
            const wishlistBtn = document.createElement('button');
            wishlistBtn.className = 'wishlist-nav-btn';
            
            const currentLang = localStorage.getItem('siteLang') || 'bg';
            const btnText = currentLang === 'en' ? 'Favorites' : 'Любими';
            
            wishlistBtn.innerHTML = `❤️ <span>${btnText}</span> (<span id="wishlistCount">0</span>)`;
            
            // При клик, ако сме на друга страница, препращаме към catalog.html, 
            // а ако сме на каталога – отваряме модалния прозорец за сравнение
            wishlistBtn.onclick = function() {
                if (window.location.pathname.includes('catalog.html')) {
                    if (typeof window.openComparisonModal === 'function') {
                        window.openComparisonModal();
                    }
                } else {
                    window.location.href = 'catalog.html';
                }
            };
            
            if (darkModeBtn) {
                headerActions.insertBefore(wishlistBtn, darkModeBtn);
            } else {
                headerActions.prepend(wishlistBtn);
            }
        }

        // 3. Функция за извличане на точните любими (спрямо това дали потребителят е влязъл или е анонимен)
        function getGlobalFavorites() {
            try {
                const userEmail = localStorage.getItem('loggedInUserEmail');
                if (localStorage.getItem('isLoggedIn') === 'true' && userEmail) {
                    return JSON.parse(localStorage.getItem(`favorites_${userEmail.trim().toLowerCase()}`) || '[]');
                } else {
                    return JSON.parse(localStorage.getItem('favoriteProjects') || '[]');
                }
            } catch(e) {
                return [];
            }
        }

        // 4. Актуализиране на брояча на любимите проекти във всички страници
        function updateGlobalWishlistCount() {
            const favs = getGlobalFavorites();
            const counterEl = document.getElementById('wishlistCount');
            if (counterEl) {
                counterEl.textContent = favs.length;
            }
        }

        updateGlobalWishlistCount();

        // Синхронизация при промяна в друго теле/таб на браузъра
        window.addEventListener('storage', updateGlobalWishlistCount);
    });
})();