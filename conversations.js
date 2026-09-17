/*
    Scripted (pre-made) conversations.

    User messages:      { role: "user", text: "...", pause }
    Assistant messages: { role: "assistant", pause, parts: [ ... ] }

    Assistant parts:
        { type: "text",  text }                          markdown-ish prose
        { type: "write", file, lines, code }             creating a file
        { type: "edit",  file, add, del, diff }          editing a file (diff lines
                                                         prefixed " ", "-" or "+")
        { type: "bash",  cmd, out }                      running a command

    Optional per part: think (ms spent "working" before the body fills in).
*/

const CONVERSATIONS = {
    "chicken-clicker": {
        title: "Make a Chicken Clicker Game",
        messages: [
            {
                role: "user",
                text: "i want a chicken clicker game but not a boring one, clicking should feel like its actually doing something and i want the farm to grow visually not just numbers going up"
            },
            {
                role: "assistant",
                pause: 900,
                parts: [
                    {
                        type: "text",
                        text: `Then the click shouldn't be the whole game — it should feed a loop. The one I'm building around:

- you cluck at the **mother hen**, and what a cluck is worth scales with how many hens are in the yard
- clucking also fills her **nest**; when it's full she lays, and those eggs become chicks
- chicks grow into hens, which makes the next cluck worth more

Starting with the rules, separate from anything that draws.`
                    },
                    {
                        type: "write",
                        file: "assets/js/game.js",
                        lines: 486,
                        think: 1100,
                        code: [
                            "function eggsPerClick() {",
                            "    return (1 + state.hens * henValue()) * mods.clickMult * frenzyClickMult();",
                            "}",
                            "",
                            "function click(auto) {",
                            "    const gain = eggsPerClick();",
                            "    state.eggs += gain;",
                            "    state.totalEggs += gain;",
                            "    state.clicks++;",
                            "",
                            "    state.nest++;",
                            "    let laid = 0;",
                            "    if (state.nest >= nestNeed()) {",
                            "        laid = addChicks(clutchSize(), 'lay');",
                            "        if (laid > 0) state.nest = 0;",
                            "        else state.nest = nestNeed();     // nowhere to put them — hold it full",
                            "    }",
                            "",
                            "    if (!auto) checkAchievements();",
                            "    return { gain: gain, laid: laid };",
                            "}"
                        ].join("\n")
                    },
                    {
                        type: "text",
                        text: `That \`else\` matters more than it looks: if the coop is full there's nowhere to put a chick, so the nest **holds** at full instead of resetting. She visibly gets ready to lay and can't — which tells you to go buy a coop without a popup explaining it.

Now the content — coops, upgrades, achievements, all read-only data.`
                    },
                    {
                        type: "write",
                        file: "assets/js/data.js",
                        lines: 641,
                        think: 900,
                        code: [
                            "var BUILDINGS = [",
                            "  { id:'nest',   name:'Straw Nest',    cost:15,     cap:1,",
                            "    blurb:'A warm bundle of straw. Room for one more hen.' },",
                            "  { id:'wicker', name:'Wicker Hutch',  cost:130,    cap:3,",
                            "    blurb:'Woven, weatherproof, and surprisingly roomy.' },",
                            "  { id:'coop',   name:'Red Cottage',   cost:1600,   cap:9,",
                            "    blurb:'Red paint, tin roof, a window box on every sill.' },",
                            "  { id:'barn',   name:'The Great Barn', cost:280000, cap:75,",
                            "    blurb:'The heart of town. Everyone meets here at dusk.' },",
                            "  { id:'moon',   name:'Moon Roost',    cost:6e12,   cap:40000,",
                            "    blurb:'Low gravity means very, very fluffy chickens.' }",
                            "];"
                        ].join("\n")
                    }
                ]
            },
            {
                role: "user",
                pause: 1500,
                text: "ok but the visual part, i dont want just a picture of a chicken"
            },
            {
                role: "assistant",
                pause: 800,
                parts: [
                    {
                        type: "text",
                        text: `Pixel canvas, and no image files — every sprite is a grid of characters plus a palette, baked once into an offscreen canvas and drawn nearest-neighbour.`
                    },
                    {
                        type: "write",
                        file: "assets/js/sprites.js",
                        lines: 872,
                        think: 1200,
                        code: [
                            "/*  .  transparent   o  outline   b  body   B  body shade",
                            "    h  highlight     c  comb       k  beak   e  eye   l  leg  */",
                            "",
                            "var CHICK = [",
                            "  '...oooo...',",
                            "  '..obbbbo..',",
                            "  '.obbebbo..',",
                            "  '.obbbbbokk',",
                            "  'obbbbbbbo.',",
                            "  'obbbbbbbo.',",
                            "  '.obbbbbo..',",
                            "  '..oooooo..',",
                            "  '...l..l...'",
                            "];"
                        ].join("\n")
                    },
                    {
                        type: "write",
                        file: "assets/js/pasture.js",
                        lines: 1034,
                        think: 850,
                        code: [
                            "/* Every coop type owns a street. Plots are generated once and handed",
                            "   out in order, so the Nth coop you buy always lands on the Nth plot",
                            "   and the town grows the same way every time. */",
                            "",
                            "D.TOWN.forEach(function (row) {",
                            "  var have = Math.min(G.owned(row.id), row.max);",
                            "  var slots = PLOTS[row.id];",
                            "  for (var i = 0; i < have; i++) {",
                            "    decor.push({",
                            "      sprite: row.sprite,",
                            "      x: 6 + slots[i].fx * (LW - 12),",
                            "      y: bandY(slots[i].fy)",
                            "    });",
                            "  }",
                            "});"
                        ].join("\n")
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 7,
                        del: 1,
                        think: 700,
                        diff: [
                            "   <div class=\"pasture\" id=\"pasture\">",
                            "-    <div id=\"chicken\">🐔</div>",
                            "+    <canvas id=\"yard-canvas\" width=\"480\" height=\"360\"",
                            "+            aria-label=\"Your pasture. Tap a hen to collect an egg.\"",
                            "+            role=\"img\"></canvas>",
                            "+    <div class=\"bubbles\" id=\"bubbles\" aria-hidden=\"true\"></div>",
                            "   </div>",
                            "+<script src=\"assets/js/sprites.js\"></script>",
                            "+<script src=\"assets/js/pasture.js\"></script>"
                        ]
                    },
                    {
                        type: "text",
                        text: `The important bit is that **everything you buy takes a plot**. Upgrades claim street furniture too — a lamp, a well, a windmill. So a bare field turns into an actual town, and every building on screen is something you paid for.`
                    }
                ]
            },
            {
                role: "user",
                pause: 1600,
                text: "can the hens wander around and have names"
            },
            {
                role: "assistant",
                pause: 700,
                parts: [
                    {
                        type: "edit",
                        file: "assets/js/data.js",
                        add: 9,
                        del: 0,
                        think: 800,
                        diff: [
                            " var TICKER = [ /* … */ ];",
                            "+",
                            "+var CHICKEN_NAMES = [",
                            "+  'Lavender','Biscuit','Marigold','Pip','Clementine','Nugget','Pepper',",
                            "+  'Dandelion','Winnie','Butterscotch','Olive','Poppy','Hazel','Waffles'",
                            "+];",
                            "+",
                            "+var CHICKEN_CHATTER = [",
                            "+  'Call me {name}', 'bok?', 'bok bok', 'I found a worm!',",
                            "+  'this is my patch', 'do you have snacks', 'lovely weather'",
                            "+];"
                        ]
                    },
                    {
                        type: "edit",
                        file: "assets/js/pasture.js",
                        add: 11,
                        del: 2,
                        think: 700,
                        diff: [
                            " function bubble(c, text, secs) {",
                            "-  c.bubble = { text: text, t: secs || 2.6, node: null };",
                            "+  var live = flock.filter(function (o) { return o.bubble; }).length;",
                            "+  if (live >= 2 && !secs) return;",
                            "+  c.bubble = { text: text, t: secs || 2.6, node: null };",
                            " }",
                            "+",
                            "+function pickName() {",
                            "+  var used = {};",
                            "+  flock.forEach(function (c) { used[c.name] = 1; });",
                            "+  var free = D.CHICKEN_NAMES.filter(function (n) { return !used[n]; });",
                            "+  return free.length ? pick(free) : pick(D.CHICKEN_NAMES);",
                            "+}"
                        ]
                    },
                    {
                        type: "text",
                        text: `Each hen takes an unused name, wanders between idle / walk / peck, and occasionally says something.

Two guards so it stays cosy rather than noisy: **at most 2 speech bubbles at once**, and the sprite count is capped by how much yard is actually visible — so 4,000 hens doesn't mean 4,000 chickens on screen.

I'd call it **Cluckton**. Population: one, at the start.`
                    }
                ]
            }
        ]
    },

    "nullfield": {
        title: "Make NULLFIELD",
        messages: [
            {
                role: "user",
                text: "make me a game like vampire survivors but it has to actually work on my phone, and i dont want it to auto shoot. i want to actually aim"
            },
            {
                role: "assistant",
                pause: 900,
                parts: [
                    {
                        type: "text",
                        text: `Manual fire changes the whole design, so let's be clear about what it costs: in an auto-shooter you're only solving movement. If you have to aim, you're solving movement **and** target priority at the same time, on a touchscreen. That means enemies have to be readable at a glance and the arena has to be bigger than the screen so there's somewhere to retreat to.

Two sticks, both virtual, both drag-and-hold — left side moves, the pad on the right aims *and* fires for as long as you hold it.`
                    },
                    {
                        type: "write",
                        file: "index.html",
                        lines: 1184,
                        think: 1400,
                        code: [
                            "// ============ CANVAS ============",
                            "const cv = document.getElementById('game'), cx = cv.getContext('2d');",
                            "function resize(){ cv.width=innerWidth; cv.height=innerHeight; }",
                            "resize(); addEventListener('resize',resize);",
                            "",
                            "const W = 3600, H = 3600;   // arena is far bigger than the screen",
                            "",
                            "// fire stick: hold and drag to aim, fires while held",
                            "let aimOn=false, adx=0, ady=0, ax=0, ay=0, aimTouchId=null;",
                            "const AMAX=48;",
                            "",
                            "function aMove(x,y){",
                            "  if(!aimOn) return;",
                            "  let dx=x-ax, dy=y-ay;",
                            "  const d=Math.hypot(dx,dy);",
                            "  if(d>AMAX){ dx=dx/d*AMAX; dy=dy/d*AMAX; }",
                            "  adx=dx/AMAX; ady=dy/AMAX;",
                            "}",
                            "",
                            "// ---- firing, inside updatePlayer(dt) ----",
                            "player.fireT-=dt;",
                            "const aimMag=Math.hypot(adx,ady);",
                            "player.aiming = aimOn && aimMag>0.15;",
                            "if(player.aiming) player.face=Math.atan2(ady,adx);",
                            "",
                            "if(player.fireT<=0 && player.aiming){",
                            "  player.fireT=rate;",
                            "  const base=Math.atan2(ady,adx);",
                            "",
                            "  for(let i=0;i<player.multi;i++){",
                            "    const spread=player.multi>1?0.16:0;",
                            "    const a=base-spread*(player.multi-1)/2+spread*i;",
                            "    bullets.push({ x:player.x, y:player.y,",
                            "      vx:Math.cos(a)*640, vy:Math.sin(a)*640,",
                            "      r:6.5*player.bSize, life:0.72, dmg:player.dmg,",
                            "      pierce:player.pierce, hit:[] });",
                            "  }",
                            "",
                            "  muzzle=0.07;",
                            "  cam.sx-=Math.cos(base)*1.6;   // recoil kicks the camera back",
                            "  cam.sy-=Math.sin(base)*1.6;",
                            "  SFX.shoot();",
                            "}"
                        ].join("\n")
                    },
                    {
                        type: "text",
                        text: `A few things in there that matter more than they look:

- **the camera zooms out to 0.68** and the arena is 3600×3600, so a phone screen still shows you enough to retreat into
- **recoil moves the camera, not the player** — it reads as force without costing you control
- **hit-stop**: heavy impacts freeze the whole world for 20–220ms. It's the single biggest thing separating "bullets touch enemy" from "bullets *hit* enemy"

There's a minimap top-centre, because with an arena that size you'd otherwise get ambushed by things you had no way to see.`
                    }
                ]
            },
            {
                role: "user",
                pause: 1600,
                text: "it works but every run feels exactly the same"
            },
            {
                role: "assistant",
                pause: 800,
                parts: [
                    {
                        type: "text",
                        text: `Because there's one character. The run-to-run variety has to come from something you pick *before* the run, not just the upgrades you're offered during it.

Twelve rigs. Each is a different stat line **and** a signature ability, and the ability is the real identity — the stats just support it.`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 148,
                        del: 4,
                        think: 1500,
                        diff: [
                            "-const player = { hp:100, speed:250, dmg:10, rate:0.35 };",
                            "+const CLASSES = {",
                            "+  ranger:{ name:'RANGER', role:'Balanced', color:'#5ce1ff',",
                            "+    hp:118, speed:256, dmg:6.6, rate:0.33, cd:6.7, ability:'OVERDRIVE',",
                            "+    desc:'4s of 3.6x fire rate, 1.8x range, and rounds that punch",
                            "+          straight through cover and every hunter in the line.' },",
                            "+",
                            "+  wraith:{ name:'WRAITH', role:'Stealth', color:'#c8d4ff',",
                            "+    hp:100, speed:325, dmg:7.2, rate:0.32, cd:8.6, ability:'CLOAK',",
                            "+    desc:'3.5s fully unseen — even chargers lose your trail. You keep",
                            "+          firing without breaking it, and the first shot is an execute.' },",
                            "+",
                            "+  volt:{ name:'VOLT', role:'Chain', color:'#7dd3ff',",
                            "+    hp:107, speed:262, dmg:6.1, rate:0.31, cd:5.8, ability:'ARC',",
                            "+    desc:'Lightning jumps through up to 20 hunters. The longer the",
                            "+          chain, the longer every link stays stunned.' },",
                            "+",
                            "+  reaper:{ name:'REAPER', role:'High risk', color:'#ff4d6d',",
                            "+    hp:74, speed:306, dmg:11.3, rate:0.28, cd:5.9, ability:'HARVEST',",
                            "+    desc:'Piercing boomerang scythes brand what they cut. Harvest rips",
                            "+          8 HP out of every branded hunter at once.' },",
                            "+  /* … phase, bulwark, weaver, swarm, pyre, anchor, echo, prism */",
                            "+};"
                        ]
                    },
                    {
                        type: "text",
                        text: `Volt is the one worth showing, because it's where the ability does something the stats never could — it walks the chain **first**, so every link can be stunned by the full chain length rather than by how far down the chain it happened to sit:`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 46,
                        del: 0,
                        think: 1100,
                        diff: [
                            " } else if(c==='volt'){",
                            "+  let from={x:player.x,y:player.y}; const chain=[];",
                            "+  for(let j=0;j<20;j++){",
                            "+    let best=null,bd=1e9;",
                            "+    for(const e of enemies){",
                            "+      if(chain.includes(e))continue;",
                            "+      const d=dst(from,e);",
                            "+      if(d>=420)continue;",
                            "+      const w=e.boss?d-3000:d;      // a boss always wins the next link",
                            "+      if(w<bd){bd=w;best=e;}",
                            "+    }",
                            "+    if(!best)break;",
                            "+    chain.push(best); from={x:best.x,y:best.y};",
                            "+  }",
                            "+",
                            "+  const n=chain.length;",
                            "+  if(n){",
                            "+    const stun=Math.min(4.5,0.8+0.19*(n-1));",
                            "+    // short chains concentrate the whole bolt into one target, so Arc",
                            "+    // is not dead weight in a boss fight",
                            "+    const dmgMul=3+42/n;",
                            "+    chain.forEach((e,i)=>{",
                            "+      arcs.push({x1:from.x,y1:from.y,x2:e.x,y2:e.y,life:0.3+i*0.012});",
                            "+      e.frozen=Math.max(e.frozen,stun);",
                            "+      hurtEnemy(e,player.dmg*dmgMul,true);",
                            "+    });",
                            "+    float(player.x,player.y-34,n+'× CHAIN · '+stun.toFixed(1)+'s');",
                            "+    hitStop=Math.min(0.09,0.02+n*0.004);",
                            "+  }",
                            " }"
                        ]
                    },
                    {
                        type: "text",
                        text: `\`dmgMul = 3 + 42/n\` is the balance lever: a 2-target chain hits for 24× each, a 20-target chain for 5× each. Long chains still win on total damage, but Arc never becomes a dead button in a boss room where there's nothing to jump to.`
                    }
                ]
            },
            {
                role: "user",
                pause: 1700,
                text: "theres no ending though, it just goes until you die. feels pointless"
            },
            {
                role: "assistant",
                pause: 850,
                parts: [
                    {
                        type: "text",
                        text: `Agreed, and it's worth fixing properly rather than adding a score screen. An endless run has no *victory* to aim at, so the difficulty curve has nowhere to land — that's why the late waves felt like sponge.

Wave 20 is the end. Four bosses, one every fifth wave, escalating:`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 22,
                        del: 3,
                        think: 1200,
                        diff: [
                            "+const BOSS_ORDER=['warden','hollow','chorus','leviathan'];",
                            "+const FINAL_WAVE=20;",
                            "+",
                            " function bossWave(w){",
                            "-  return w%5===0 ? pick(BOSS_ORDER) : null;",
                            "+  if(w%5!==0) return null;",
                            "+  const n=w/5;",
                            "+  if(n<=4) return [BOSS_ORDER[n-1]];",
                            "+  // past the ending, bosses arrive in packs",
                            "+  const count=Math.min(4,2+Math.floor((n-4)/2));",
                            "+  const out=[];",
                            "+  for(let i=0;i<count;i++) out.push(BOSS_ORDER[(i+n)%BOSS_ORDER.length]);",
                            "+  return out;",
                            " }"
                        ]
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 26,
                        del: 0,
                        think: 900,
                        diff: [
                            "+function winRun(){",
                            "+  running=false; inRun=false;",
                            "+  cam.shake=24; flash(0.6,'92,225,255');",
                            "+  banner('NULLFIELD CLEARED','#5ce1ff');",
                            "+",
                            "+  const title=el('deathTitle');",
                            "+  title.textContent='NULLFIELD CLEARED';",
                            "+  title.style.background='linear-gradient(100deg,var(--ice),#2effa6)';",
                            "+",
                            "+  el('dNote').textContent='The Leviathan is down and the field is clear. '+",
                            "+    D().name+' complete at level '+player.lvl+' with '+kills+' kills — '+",
                            "+    'try a harder difficulty, or run it back with a different rig.';",
                            "+  el('deathScreen').classList.add('on');",
                            "+}"
                        ]
                    },
                    {
                        type: "text",
                        text: `Killing the Leviathan on wave 20 now routes to \`winRun()\` instead of spawning wave 21. The death screen reuses the same markup but recolours to cyan/green — same bones, opposite feeling.

I also gave each cleared stage a visible payout (a scatter of shards plus a 12% heal) and a **3.5s lull** before the next one floods in, so clearing something feels like an event rather than a number ticking over.

Now that there's a defined ending, a leaderboard actually means something — "furthest wave" is a real number when 20 is the ceiling. Want it?`
                    }
                ]
            },
            {
                role: "user",
                pause: 1600,
                text: "yeah do the leaderboard, then push it to github its not a repo yet"
            },
            {
                role: "assistant",
                pause: 800,
                parts: [
                    {
                        type: "text",
                        text: `Supabase, with the run validated server-side — the browser sends what happened, the server decides whether to believe it and derives coins from that. Nothing mints currency client-side.`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 34,
                        del: 2,
                        think: 1300,
                        diff: [
                            "+async function submit(){",
                            "+  if(!ready||!lastRun||submitted) return;",
                            "+  if(!user||!profile){ openAuth(); return; }",
                            "+",
                            "+  const { error } = await sb.rpc('submit_score',{",
                            "+    p_difficulty:lastRun.difficulty, p_rig:lastRun.rig,",
                            "+    p_wave:lastRun.wave, p_kills:lastRun.kills,",
                            "+    p_elapsed_s:lastRun.elapsed, p_level:lastRun.level,",
                            "+    p_won:lastRun.won,",
                            "+    // input telemetry: a run with no human input is rejected",
                            "+    p_hid_events:lastRun.hid,",
                            "+    p_input_jitter:lastRun.jitter,",
                            "+    p_client_flags:lastRun.flags });",
                            "+",
                            "+  if(error) throw error;",
                            "+  submitted=true;",
                            "+  await loadArmoury();   // the run may have just earned coins",
                            "+}"
                        ]
                    },
                    {
                        type: "write",
                        file: ".gitignore",
                        lines: 4,
                        think: 450,
                        code: [".DS_Store", "node_modules/", "*.log", ".vscode/"].join("\n")
                    },
                    {
                        type: "write",
                        file: "README.md",
                        lines: 58,
                        think: 1000,
                        code: [
                            "# NULLFIELD",
                            "",
                            "A twin-stick survivor in one HTML file. Twelve combat rigs, twenty waves,",
                            "a boss every fifth one.",
                            "",
                            "## Controls",
                            "",
                            "- **Move** — drag anywhere on the left side and hold",
                            "- **Fire** — hold the pad at the bottom right and drag to aim",
                            "- **Ability** — the round button, or `Space`",
                            "- **Pause** — `P` or `Esc`",
                            "",
                            "Nothing fires on its own. Standing still to shoot is usually the mistake.",
                            "",
                            "## The bosses",
                            "",
                            "| Wave | Boss | What it does |",
                            "|------|------|--------------|",
                            "| 5  | WARDEN    | Bullet rings, then aimed shotguns |",
                            "| 10 | HOLLOW    | Blinks around you, homing volleys |",
                            "| 15 | CHORUS    | Fractures into three on death |",
                            "| 20 | LEVIATHAN | Sweeping beams — kill it and you've won |"
                        ].join("\n")
                    },
                    {
                        type: "bash",
                        cmd: "git init && git add . && git commit -m \"Initial commit: NULLFIELD\"",
                        think: 900,
                        out: [
                            "Initialized empty Git repository in /kdn/nullfield/.git/",
                            "[main (root-commit) 4f2a1c9] Initial commit: NULLFIELD",
                            " 3 files changed, 3899 insertions(+)",
                            " create mode 100644 .gitignore",
                            " create mode 100644 README.md",
                            " create mode 100644 index.html"
                        ].join("\n")
                    },
                    {
                        type: "bash",
                        cmd: "gh repo create 261494l-alt/nullfield --public --source=. --push",
                        think: 1200,
                        out: [
                            "✓ Created repository 261494l-alt/nullfield on GitHub",
                            "✓ Added remote https://github.com/261494l-alt/nullfield.git",
                            "✓ Pushed commits to https://github.com/261494l-alt/nullfield.git"
                        ].join("\n")
                    },
                    {
                        type: "text",
                        text: `Live at **261494l-alt/nullfield** — 3 files, 1 commit on \`main\`.`
                    }
                ]
            },
            {
                role: "user",
                pause: 1600,
                text: "wait you committed the supabase key. isnt that bad"
            },
            {
                role: "assistant",
                pause: 700,
                parts: [
                    {
                        type: "text",
                        text: `Good catch to make — it's the right instinct, just not for this key. Two different things:

- **anon / publishable key** — ships to every browser that loads the page anyway. Anyone can read it out of devtools in five seconds. It identifies the project; it doesn't authorise anything.
- **service_role key** — bypasses RLS entirely. That one must never touch the client or the repo.

Yours is the first, so committing it changes nothing about your security. What actually protects the data is that \`submit_score\` is \`SECURITY DEFINER\` and validates the run server-side — a forged POST with wave 999 gets rejected there, key or no key.

One habit worth keeping though: **grep before you push**. If a service key ever does land in a commit, deleting it in the next commit doesn't remove it — it's in the history, and you'd have to rotate it in the Supabase dashboard.`
                    }
                ]
            }
        ]
    },

    "bounce-dodge": {
        title: "Create a Bouncing Ball Game",
        messages: [
            {
                role: "user",
                text: "impossible mode is too much, people die in like 5 seconds and quit. but i dont want you to make it easy, its called impossible"
            },
            {
                role: "assistant",
                pause: 950,
                parts: [
                    {
                        type: "text",
                        text: `Then I won't lower the ceiling — I'll change the **shape** of the first minute. The curve I gave Impossible is flat from the first frame, so the arena is full before anyone has found their hands.`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 14,
                        del: 2,
                        think: 1100,
                        diff: [
                            "   } else if (difficulty === DIFFICULTY_IMPOSSIBLE) {",
                            "-    const base = (1.2 + 1) * 0.83;",
                            "-    interval = base - minutes * SPAWN_SPEEDUP_PER_MIN;",
                            "+    const base = (1.2 + 1) * 0.83;",
                            "+    if (elapsedSec < 6) {",
                            "+      interval = base * 1.5;",
                            "+    } else if (elapsedSec < 20) {",
                            "+      interval = base;",
                            "+    } else if (elapsedSec <= 36) {",
                            "+      interval = base * 0.55;",
                            "+    } else if (elapsedSec < 120) {",
                            "+      interval = base;",
                            "+    } else {",
                            "+      interval = base * 0.5;",
                            "+    }",
                            "   }"
                        ]
                    },
                    {
                        type: "text",
                        text: `Six seconds of breathing room, then normal, then a **spike at 20–36s** so it still hits you early, then it relaxes before the real grind at two minutes. Same brutality, but you die to the spike having seen it coming instead of dying to the loading screen.

Giving the spike teeth — Spiny starts at 30s on Impossible instead of 60:`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 3,
                        del: 1,
                        think: 600,
                        diff: [
                            "   nextSpinySpawnAt = (difficulty === DIFFICULTY_BABY || difficulty === DIFFICULTY_EASY)",
                            "     ? Infinity",
                            "-    : startTime + SPINY_START_TIME;",
                            "+    : startTime + (difficulty === DIFFICULTY_IMPOSSIBLE",
                            "+        ? 30000",
                            "+        : SPINY_START_TIME);"
                        ]
                    }
                ]
            },
            {
                role: "user",
                pause: 1600,
                text: "the white drift balls still feel unfair, they just teleport into you"
            },
            {
                role: "assistant",
                pause: 800,
                parts: [
                    {
                        type: "text",
                        text: `They're not teleporting — they dash at \`RED_SPEED * 4\`. The problem is that my telegraph reads as decoration instead of a warning.

First fix: it **locks its target** when the telegraph starts and commits to that heading. It does not keep tracking you.`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 10,
                        del: 3,
                        think: 1000,
                        diff: [
                            "   } else if (cycleElapsed >= DRIFT_CYCLE_MS - DRIFT_TELEGRAPH_MS) {",
                            "-    p.driftDirX = (player.x - p.x) / ddist;",
                            "-    p.driftDirY = (player.y - p.y) / ddist;",
                            "+    if (!p.driftTelegraphActive) {",
                            "+      p.driftTelegraphActive = true;",
                            "+      p.driftTargetX = player.x;",
                            "+      p.driftTargetY = player.y;",
                            "+      p.driftTelegraphStartX = p.x;",
                            "+      p.driftTelegraphStartY = p.y;",
                            "+      const ddx = p.driftTargetX - p.x, ddy = p.driftTargetY - p.y;",
                            "+      const ddist = Math.hypot(ddx, ddy) || 1;",
                            "+      p.driftDirX = ddx / ddist;",
                            "+      p.driftDirY = ddy / ddist;",
                            "+    }"
                        ]
                    },
                    {
                        type: "text",
                        text: `So stepping sideways after the line appears always works. That's the contract.

Second: draw the warning line from the **anchor**, not the ball. It pulls backwards during the wind-up, and dragging the line with it makes the aim look like it's changing.`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 6,
                        del: 2,
                        think: 700,
                        diff: [
                            "   const ux = p.driftDirX, uy = p.driftDirY;",
                            "-  const startX = p.x - ux * 60, startY = p.y - uy * 60;",
                            "-  const endX = p.x + ux * reach, endY = p.y + uy * reach;",
                            "+  const anchorX = p.driftTelegraphStartX;",
                            "+  const anchorY = p.driftTelegraphStartY;",
                            "+  const startX = anchorX - ux * 60, startY = anchorY - uy * 60;",
                            "+  const endX = anchorX + ux * reach, endY = anchorY + uy * reach;",
                            "+  const pulse = 0.65 + 0.35 * Math.sin(performance.now() / 130);"
                        ]
                    },
                    {
                        type: "text",
                        text: `Fat translucent line under a thin bright one, both pulsing. The wind-up is three beats now — brake, pull *backwards* along the dash line, then creep forward accelerating into it. Same dash speed, but dying to it is your fault.`
                    }
                ]
            },
            {
                role: "user",
                pause: 1500,
                text: "ok also phone players keep complaining its way harder on mobile"
            },
            {
                role: "assistant",
                pause: 700,
                parts: [
                    {
                        type: "text",
                        text: `It genuinely is — a thumb on a 100px joystick is not a keyboard. Rather than rebalancing the whole game, touch gets its own multipliers applied at the two places that matter:`
                    },
                    {
                        type: "edit",
                        file: "index.html",
                        add: 8,
                        del: 0,
                        think: 900,
                        diff: [
                            " const BLACK_SPEED = 2.28;",
                            "+",
                            "+// Applied where balls get their velocity and where spawn timers get",
                            "+// scheduled, rather than baked into the constants above, so keyboard",
                            "+// play is completely unaffected.",
                            "+const TOUCH_SPEED_MULT = 0.72;",
                            "+const TOUCH_SPAWN_MULT = 1.35;",
                            "+function _speedMult() {",
                            "+  return controlMode === 'touch' ? TOUCH_SPEED_MULT : 1;",
                            "+}"
                        ]
                    },
                    {
                        type: "text",
                        text: `Also on touch: the ramp skips the first 3 seconds, Spiny spawn chance drops to 0.8×, and the arena is capped at 700×700 with room reserved below it for the joystick and the 🔮 button — no controls sitting on top of the play area.

Worth saying out loud: this means phone and keyboard bests aren't strictly comparable any more. If that bothers you, the honest fix is a separate leaderboard column rather than pretending the inputs are equivalent.`
                    }
                ]
            }
        ]
    },

    "wro-robot": {
        title: "Make WRO robot turn right",
        messages: [
            {
                role: "user",
                text: "the robot wont turn right properly, it overshoots every time"
            },
            {
                role: "assistant",
                pause: 850,
                parts: [
                    {
                        type: "text",
                        text: `Overshoot on a timed turn is almost always momentum — the motors stop but the chassis keeps rotating. Replacing it with a gyro turn that slows down proportionally as it closes in:`
                    },
                    {
                        type: "edit",
                        file: "main.py",
                        add: 13,
                        del: 4,
                        think: 1000,
                        diff: [
                            " def turn_right(target_deg):",
                            "-    left.run(40)",
                            "-    right.run(-40)",
                            "-    wait(target_deg * 11)",
                            "-    left.stop()",
                            "+    gyro.reset_angle(0)",
                            "+",
                            "+    while gyro.angle() < target_deg:",
                            "+        error = target_deg - gyro.angle()",
                            "+        speed = max(12, min(45, error * 1.2))",
                            "+",
                            "+        left.run(speed)",
                            "+        right.run(-speed)",
                            "+",
                            "+    left.brake()",
                            "+    right.brake()",
                            "+    wait(120)"
                        ]
                    },
                    {
                        type: "text",
                        text: `The \`error * 1.2\` term means it's already crawling by the time it reaches the target, so \`brake()\` actually stops it. The \`wait(120)\` lets the gyro settle before the next move reads it.`
                    }
                ]
            },
            {
                role: "user",
                pause: 1400,
                text: "it still drifts like 2 degrees off"
            },
            {
                role: "assistant",
                pause: 650,
                parts: [
                    {
                        type: "text",
                        text: `2° of residual drift is worth cleaning up with a second pass rather than tighter gains — cranking \`kp\` to chase it will just bring the oscillation back.`
                    },
                    {
                        type: "edit",
                        file: "main.py",
                        add: 10,
                        del: 0,
                        think: 850,
                        diff: [
                            "     left.brake()",
                            "     right.brake()",
                            "     wait(120)",
                            "+",
                            "+    residual = target_deg - gyro.angle()",
                            "+    if abs(residual) > 1:",
                            "+        nudge = 10 if residual > 0 else -10",
                            "+        left.run(nudge)",
                            "+        right.run(-nudge)",
                            "+        while abs(target_deg - gyro.angle()) > 1:",
                            "+            pass",
                            "+        left.brake()",
                            "+        right.brake()"
                        ]
                    },
                    {
                        type: "edit",
                        file: "main.py",
                        add: 2,
                        del: 0,
                        think: 550,
                        diff: [
                            " gyro.reset_angle(0)",
                            "+# let the gyro settle before the run — calibrating while the robot is",
                            "+# still being placed on the mat bakes the drift in from move one",
                            "+wait(2000)"
                        ]
                    },
                    {
                        type: "text",
                        text: `That last one is the fix people miss. If you calibrate while the robot is still being set down, every move inherits the error — and no amount of tuning \`turn_right\` will find it.`
                    }
                ]
            }
        ]
    }
};
