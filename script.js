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
                <ul class="main-menu">
                    <li>Local</li>
                    
                    <li class="has-submenu">
                        Cloud <span class="arrow">›</span>
                        
                        <ul class="submenu">
                            <li class="selected">
                                Default
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 12.5 L10 17 L18.5 7.5" stroke="#0080ff" stroke-width="1.8"
                                        stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </li>
                            <hr color="#DDD" size="1">
                            <li class="action">+ Add cloud environment...</li>
                        </ul>
                    </li>
                    
                    <li class="has-submenu">Remote Control <span class="arrow">›</span></li>
                    <li class="has-submenu">SSH <span class="arrow">›</span></li>
                </ul>
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
