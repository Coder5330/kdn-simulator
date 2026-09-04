const chatToggle = document.getElementById('chat-toggle');
const codeToggle = document.getElementById('code-toggle');
const mainContent = document.querySelector('.main-content');
const claudeTxt = document.querySelector('#claude-txt');
const newChatBtn = document.querySelector('#new-chat-btn');
const projectsBtn = document.querySelector('#projects-btn');
const artifactsBtn = document.querySelector('#artifacts-btn');
const scheduledBtn = document.querySelector('#scheduled-btn');
const customizeBtn = document.querySelector('#customize-btn');
const moreBtn = document.querySelector('#more-btn');

const chatHTML = `
    <div class="wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                fill="none" stroke="currentColor" stroke-width="1"
                stroke-linecap="round" stroke-linejoin="round">
            <path d="M0.5 12a11.5 11.5 0 0 1 23 0v11.5q-4-8-8 0q-3.5-8-7 0q-4-8-8 0z"/>
            <circle cx="7.5" cy="11.5" r="1.1" fill="currentColor" stroke="none"/>
            <circle cx="16.5" cy="11.5" r="1.1" fill="currentColor" stroke="none"/>
        </svg>
    </div>

    <div class="container">
        <div class="welcome-container">
            <img src="assets/claude.png" alt="Claude" width="40" height="40">
            <p class="welcome-msg">Good afternoon, Kdn</p>
        </div>

        <div class="input-card">
            <div class="input-placeholder">Type / for skills</div>

            <div class="input-controls">
                <div class="left-controls">
                    <span class="add-icon">+</span>
                    <div class="mode-toggle">
                        <button class="toggle-btn active">Chat</button>
                        <button class="toggle-btn">Cowork</button>
                    </div>
                </div>

                <div class="right-controls">
                    <span>Opus 5 High</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="8.78" y="2.42" width="6.44" height="11.43" rx="3.22"/>
                        <path d="M19.06 9.51V10.79a7.06 7.06 0 0 1-14.12 0V9.51"/>
                        <path d="M12 17.85V22.32"/>
                    </svg>
                    <span>∨</span>
                </div>
            </div>
        </div>
    </div>
`;

const codeHTML = `
    <div class="code-container">
        <div class="greeting-header">
            <div class="greeting">
                <img src="assets/claude.png" alt="Claude" width="30" height="30">
                <span class="greeting-text">What's up next, Kdn?</span>
            </div>
        </div>
        <div class="code-content">
            <div class="select-panel">
                <div class="menu-wrapper">
                    <button class="open-menu-button" id="open-location-menu-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                                    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Default
                    </button>

                    <ul class="main-menu" id="locationMenu">
                        <li>
                            <div class="left align-center">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2.25" y="2.5" width="10.5" height="7.75" rx="1"
                                            stroke="currentColor" stroke-width="0.75"/>
                                    <rect x="0.75" y="10.25" width="13.5" height="2.25" rx="1.125"
                                            stroke="currentColor" stroke-width="0.75"/>
                                </svg>
                                Local
                            </div>
                            <div class="right align-center">
                                <div class="badge">Download</div>
                                <span class="badge badge-no-bg">Desktop only</span>
                            </div>
                        </li>

                        <li class="has-submenu">
                            <div class="left">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                                            stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Cloud</span>
                            </div>

                            <div class="right">
                                <span class="arrow">›</span>
                            </div>

                            <ul class="submenu">
                                <li class="selected">
                                    Default
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 12.5 L10 17 L18.5 7.5" stroke="#0080ff" stroke-width="1.8"
                                            stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </li>
                                <li class="divider"></li>
                                <li class="action">+ Add cloud environment...</li>
                            </ul>
                        </li>

                        <li class="has-submenu">
                            <div class="left">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 2.5 L5 17.5 L8.7 14 L11 19.5 L13.5 18.5 L11.2 13.2 L16 13.2 Z"
                                            stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                                </svg>
                                <span>Remote Control</span>
                            </div>

                            <div class="right">
                                <span class="arrow">›</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="menu-wrapper">
                    <button class="open-menu-button" id="open-github-repos-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="8 7 3 12 8 17"/>
                            <line x1="15" y1="3.5" x2="9" y2="20.5"/>
                            <polyline points="16 7 21 12 16 17"/>
                        </svg>
                        bounce-dodge
                    </button>

                    <ul class="main-menu" id="github-repos">
                        <li class="selected">261494l-alt/bounce-dodge</li>
                        <li>261494l-alt/nullfield</li>
                        <li>261494l-alt/chicken-clicker</li>
                        <li>261494l-alt/wro-codes</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;

chatToggle.classList.add('active');
moreBtn.style.display = "none";
newChatBtn.classList.add('active');

chatToggle.addEventListener('click', () => {
    chatToggle.classList.add('active'); 
    codeToggle.classList.remove('active');
    mainContent.innerHTML = chatHTML;
    claudeTxt.textContent = "Claude";
    projectsBtn.style.display = "flex";
    artifactsBtn.style.display = "flex";
    scheduledBtn.style.display = "flex";
    customizeBtn.style.display = "flex";
    moreBtn.style.display = "none";
});

codeToggle.addEventListener('click', () => {
    codeToggle.classList.add('active'); 
    chatToggle.classList.remove('active');
    mainContent.innerHTML = codeHTML;
    claudeTxt.textContent = "Claude Code";
    projectsBtn.style.display = "none";
    artifactsBtn.style.display = "flex";
    scheduledBtn.style.display = "none";
    customizeBtn.style.display = "flex";
    moreBtn.style.display = "flex";
});

const navButtons = [newChatBtn, projectsBtn, artifactsBtn, scheduledBtn, customizeBtn, moreBtn];

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('active');
        navButtons.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('active');
            }
        });
    });
});

const toggleBtns = document.querySelectorAll('.mode-toggle .toggle-btn');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

document.addEventListener('click', (event) => {
    if (event.target.closest('#open-location-menu-button')) {
        document.getElementById("locationMenu").style.display = "block";
    }
});

document.addEventListener('click', (event) => {
    const menuButton = event.target.closest('#open-location-menu-button');
    const locationMenu = document.getElementById('locationMenu');
    const githubReposButton = event.target.closest('#open-github-repos-button');
    const gitHubReposMenu = document.getElementById('github-repos');

    if (menuButton) {
        if (locationMenu) {
            const isCurrentlyVisible = locationMenu.style.display === "flex";
            locationMenu.style.display = isCurrentlyVisible ? "none" : "flex";
        }
    } 
    else if (locationMenu && locationMenu.style.display === "flex") {
        const clickedInsideMenu = event.target.closest('#locationMenu');
        
        if (!clickedInsideMenu) {
            locationMenu.style.display = "none";
        }
    }

    if (githubReposButton) {
        if (gitHubReposMenu) {
            const isCurrentlyVisible = gitHubReposMenu.style.display === "flex";
            gitHubReposMenu.style.display = isCurrentlyVisible ? "none" : "flex";
        }
    } 
    else if (gitHubReposMenu && gitHubReposMenu.style.display === "flex") {
        const clickedInsideMenu = event.target.closest('#github-repos');
        
        if (!clickedInsideMenu) {
            gitHubReposMenu.style.display = "none";
        }
    }

});
