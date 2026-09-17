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

        </div>
        <div class="select-panel">
            <div class="menu-wrapper">
                <button class="open-menu-button" id="open-location-menu-button">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.915 11.625
                                A2.525 2.525 0 0 1 2.901 6.981
                                A3.7 3.7 0 0 1 9.663 4.824
                                A2.4 2.4 0 0 1 12.400 7.193
                                A2.425 2.425 0 0 1 11.889 11.625
                                Z"
                                stroke="currentColor" stroke-width="0.75"
                                stroke-linecap="round" stroke-linejoin="round"/>
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
                        <div class="left align-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.915 11.625
                                        A2.525 2.525 0 0 1 2.901 6.981
                                        A3.7 3.7 0 0 1 9.663 4.824
                                        A2.4 2.4 0 0 1 12.400 7.193
                                        A2.425 2.425 0 0 1 11.889 11.625
                                        Z"
                                        stroke="currentColor" stroke-width="0.75"
                                        stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Cloud</span>
                        </div>

                        <div class="right align-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.75 3.75 L9.5 7.5 L5.75 11.25" stroke="currentColor" stroke-width="0.75"
                                        stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
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
                        <div class="left align-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 2.5 L5 17.5 L8.7 14 L11 19.5 L13.5 18.5 L11.2 13.2 L16 13.2 Z"
                                        stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                            </svg>
                            <span>Remote Control</span>
                        </div>

                        <div class="right align-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.75 3.75 L9.5 7.5 L5.75 11.25" stroke="currentColor" stroke-width="0.75"
                                        stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </li>
                </ul>

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

/* ===================== scripted conversation playback ===================== */

const chatItems = document.querySelectorAll('.chat');

const ABORT = Symbol('aborted');
let playToken = 0;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function escapeHTML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function renderInline(text) {
    return escapeHTML(text)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function renderMarkdown(md) {
    const lines = md.split('\n');
    const blocks = [];
    let i = 0;

    const isBreak = line =>
        line.trim() === '' || line.startsWith('```') || line.startsWith('### ') || /^[-*] /.test(line);

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith('```')) {
            const buffer = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                buffer.push(lines[i]);
                i++;
            }
            i++;
            blocks.push(`<pre><code>${escapeHTML(buffer.join('\n'))}</code></pre>`);
        }
        else if (line.trim() === '') {
            i++;
        }
        else if (line.startsWith('### ')) {
            blocks.push(`<h3>${renderInline(line.slice(4))}</h3>`);
            i++;
        }
        else if (/^[-*] /.test(line)) {
            const items = [];
            while (i < lines.length && /^[-*] /.test(lines[i])) {
                items.push(`<li>${renderInline(lines[i].slice(2))}</li>`);
                i++;
            }
            blocks.push(`<ul>${items.join('')}</ul>`);
        }
        else {
            const buffer = [];
            while (i < lines.length && !isBreak(lines[i])) {
                buffer.push(lines[i]);
                i++;
            }
            blocks.push(`<p>${renderInline(buffer.join(' '))}</p>`);
        }
    }

    return blocks.join('');
}

function guard(state) {
    if (state.token !== playToken) throw ABORT;
}

async function wait(ms, state) {
    let waited = 0;
    while (waited < ms) {
        if (state.skip) return;
        await sleep(Math.min(40, ms - waited));
        guard(state);
        waited += 40;
    }
}

function place(parent, node, state) {
    parent.appendChild(node);
    parent.appendChild(state.caret);
}

async function streamNode(dest, src, state) {
    if (src.nodeType === Node.TEXT_NODE) {
        const full = src.nodeValue;
        const node = document.createTextNode('');
        place(dest, node, state);

        let shown = 0;
        while (shown < full.length && !state.skip) {
            shown = Math.min(full.length, shown + state.chars);
            node.nodeValue = full.slice(0, shown);
            state.scroll();
            await sleep(18);
            guard(state);
        }

        node.nodeValue = full;
        state.scroll();
        return;
    }

    if (src.nodeType !== Node.ELEMENT_NODE) return;

    const el = src.cloneNode(false);
    place(dest, el, state);

    const previousChars = state.chars;
    if (el.tagName === 'PRE') state.chars = 7;

    for (const child of Array.from(src.childNodes)) {
        await streamNode(el, child, state);
    }

    state.chars = previousChars;
}

async function typeIntoComposer(text, state) {
    state.composer.classList.remove('empty');
    state.composer.textContent = '';
    state.composer.appendChild(state.caret);

    for (let i = 0; i < text.length; i++) {
        if (state.skip) break;
        state.composer.textContent = text.slice(0, i + 1);
        state.composer.appendChild(state.caret);
        await sleep(26 + Math.random() * 34);
        guard(state);
    }

    state.composer.textContent = text;
    state.composer.appendChild(state.caret);
}

function resetComposer(state) {
    state.caret.remove();
    state.composer.classList.add('empty');
    state.composer.textContent = 'Reply to Claude...';
}

async function playMessage(message, state) {
    await wait(message.pause || 400, state);

    if (message.role === 'user') {
        await typeIntoComposer(message.text, state);
        await wait(320, state);
        resetComposer(state);

        const bubble = document.createElement('div');
        bubble.className = 'msg user';
        bubble.innerHTML = `<div class="msg-body"></div>`;
        bubble.querySelector('.msg-body').textContent = message.text;
        state.list.appendChild(bubble);
        state.scroll();
        await wait(420, state);
        return;
    }

    const wrap = document.createElement('div');
    wrap.className = 'msg assistant';
    wrap.innerHTML = `
        <div class="msg-head">
            <img src="assets/claude.png" alt="Claude" width="18" height="18">
            Claude
        </div>
        <div class="msg-body"><div class="thinking"><span></span><span></span><span></span></div></div>
    `;
    state.list.appendChild(wrap);
    state.scroll();

    await wait(900, state);

    const body = wrap.querySelector('.msg-body');
    body.innerHTML = '';

    const source = document.createElement('div');
    source.innerHTML = renderMarkdown(message.text);

    state.chars = message.speed || 2;
    for (const child of Array.from(source.childNodes)) {
        await streamNode(body, child, state);
    }

    state.caret.remove();
    state.scroll();
}

async function playConversation(conversation, state) {
    try {
        for (const message of conversation.messages) {
            await playMessage(message, state);
        }
        resetComposer(state);
        state.scroll();
        state.hint.textContent = 'End of conversation — hit Replay to watch it again.';
    }
    catch (error) {
        if (error !== ABORT) throw error;
    }
}

function openConversation(key) {
    const conversation = CONVERSATIONS[key];
    if (!conversation) return;

    playToken++;

    claudeTxt.textContent = "Claude";
    chatToggle.classList.add('active');
    codeToggle.classList.remove('active');
    mainContent.classList.add('chat-mode');
    mainContent.innerHTML = `
        <div class="chat-view">
            <div class="chat-topbar">
                <span>${conversation.title}</span>
                <button class="replay-btn" id="replay-btn">↻ Replay</button>
            </div>

            <div class="transcript" id="transcript">
                <div class="transcript-inner" id="transcript-inner"></div>
            </div>

            <div class="composer-area">
                <div class="input-card">
                    <div class="composer-text empty" id="composer-text">Reply to Claude...</div>

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
                            <span>∨</span>
                        </div>
                    </div>
                </div>
                <div class="skip-hint" id="skip-hint">Click anywhere to skip ahead</div>
            </div>
        </div>
    `;

    const transcript = document.getElementById('transcript');
    const caret = document.createElement('span');
    caret.className = 'caret';

    const state = {
        token: playToken,
        skip: false,
        chars: 2,
        caret: caret,
        list: document.getElementById('transcript-inner'),
        composer: document.getElementById('composer-text'),
        hint: document.getElementById('skip-hint'),
        scroll: () => { transcript.scrollTop = transcript.scrollHeight; }
    };

    mainContent.querySelector('.chat-view').addEventListener('click', event => {
        if (event.target.closest('#replay-btn')) return;
        state.skip = true;
        state.hint.textContent = '';
    });

    document.getElementById('replay-btn').addEventListener('click', () => openConversation(key));

    playConversation(conversation, state);
}

function leaveConversation() {
    playToken++;
    mainContent.classList.remove('chat-mode');
    chatItems.forEach(item => item.classList.remove('active'));
}

chatItems.forEach(item => {
    item.addEventListener('click', () => {
        chatItems.forEach(other => other.classList.remove('active'));
        item.classList.add('active');
        navButtons.forEach(btn => btn.classList.remove('active'));
        openConversation(item.dataset.chat);
    });
});

chatToggle.addEventListener('click', leaveConversation);
codeToggle.addEventListener('click', leaveConversation);

newChatBtn.addEventListener('click', () => {
    leaveConversation();
    mainContent.innerHTML = chatHTML;
});
