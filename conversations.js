/*
    Scripted (pre-made) conversations.

    Each message:
        role   - "user" or "assistant"
        text   - markdown-ish: **bold**, `code`, ``` fences, "- " bullets, "### " headings
        pause  - ms to wait before this message starts (thinking / reading time)
        speed  - chars revealed per tick (default 2 for prose, 7 inside code blocks)
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
                text: `Then the click shouldn't be the whole game — it should feed a loop. Here's the one I'd build around:

- you cluck at the **mother hen**, and what a cluck is worth scales with how many hens are in the yard
- clucking also fills her **nest**; when it's full she lays, and those eggs become chicks
- chicks grow into hens, which makes the next cluck worth more

\`\`\`js
function eggsPerClick() {
    return (1 + state.hens * henValue()) * mods.clickMult * frenzyClickMult();
}

function click(auto) {
    const gain = eggsPerClick();
    state.eggs += gain;
    state.totalEggs += gain;
    state.clicks++;

    state.nest++;
    if (state.nest >= nestNeed()) {
        const laid = addChicks(clutchSize(), 'lay');
        state.nest = laid > 0 ? 0 : nestNeed();
    }
}
\`\`\`

That last line matters: if the coop is full there's nowhere to put a chick, so the nest **holds** at full instead of resetting. She visibly gets ready to lay and can't — which tells you to go buy a coop without a popup explaining it.`
            },
            {
                role: "user",
                pause: 1500,
                text: "ok but the visual part, i dont want just a picture of a chicken"
            },
            {
                role: "assistant",
                pause: 800,
                text: `Pixel canvas, drawn from sprite grids rather than image files — every sprite is characters plus a palette, baked once into an offscreen canvas:

\`\`\`js
var CHICK = [
    '...oooo...',
    '..obbbbo..',
    '.obbebbo..',
    '.obbbbbokk',
    'obbbbbbbo.',
    'obbbbbbbo.',
    '.obbbbbo..',
    '..oooooo..',
    '...l..l...'
];
\`\`\`

The important bit is that **everything you buy takes a plot**. Each coop type owns a band of the field, and the Nth coop you buy always lands on the Nth plot — so the town grows the same way every time instead of reshuffling:

\`\`\`js
D.TOWN.forEach(function (row) {
    var have = Math.min(G.owned(row.id), row.max);
    var slots = PLOTS[row.id];
    for (var i = 0; i < have; i++) {
        decor.push({
            sprite: row.sprite,
            x: 6 + slots[i].fx * (LW - 12),
            y: bandY(slots[i].fy)
        });
    }
});
\`\`\`

Upgrades claim street furniture — a lamp, a well, a windmill. So a bare field turns into an actual town, and every building on screen is something you paid for.`
            },
            {
                role: "user",
                pause: 1600,
                text: "can the hens wander around and have names"
            },
            {
                role: "assistant",
                pause: 700,
                text: `Done. Each hen picks an unused name from the pool, wanders between idle / walk / peck, and occasionally says something:

\`\`\`js
var CHICKEN_CHATTER = [
    'Call me {name}', 'bok?', 'bok bok', 'I found a worm!',
    'this is my patch', 'do you have snacks',
    'that cloud looks like corn', 'lovely weather'
];
\`\`\`

Two guards so it stays cosy rather than noisy: **at most 2 speech bubbles at once**, and the sprite count is capped by how much yard is actually visible — so 4,000 hens doesn't mean 4,000 chickens on screen.

I'd call it **Cluckton**. Population: one, at the start.`
            }
        ]
    },

    "nullfield": {
        title: "Push NullField to GitHub",
        messages: [
            {
                role: "user",
                text: "push nullfield to github, its not a repo yet. its just the one index.html"
            },
            {
                role: "assistant",
                pause: 900,
                text: `Before I push — that file has your Supabase URL and key in it. Checked them: it's the **publishable anon key**, which is designed to ship in the browser, so it's safe to commit. Your RLS policies and the \`SECURITY DEFINER\` RPCs (\`submit_score\`, \`buy_upgrade\`, \`claim_username\`) are what actually protect the data, not the key.

Set up and pushed:

\`\`\`bash
git init
git add index.html
git commit -m "Initial commit: NULLFIELD"
gh repo create 261494l-alt/nullfield --public --source=. --push
\`\`\`

Added a \`.gitignore\` first so \`.DS_Store\` stays out. Repo is live — 1 file, 1 commit on \`main\`.`
            },
            {
                role: "user",
                pause: 1500,
                text: "wait is the anon key actually fine? feels wrong to commit a key"
            },
            {
                role: "assistant",
                pause: 750,
                text: `It's fine, and the instinct is right for the other kind of key. Two different things:

- **anon / publishable key** — ships to every browser that loads your page anyway. Anyone can read it out of devtools. It identifies the project, it doesn't authorise anything.
- **service_role key** — bypasses RLS entirely. That one must never touch the client or the repo.

Yours is the first. The thing actually stopping a cheater isn't secrecy, it's that scores go through \`submit_score\` server-side, where the run gets validated:

\`\`\`js
const { error } = await sb.rpc('submit_score', {
    p_difficulty: lastRun.difficulty,
    p_rig: lastRun.rig,
    p_wave: lastRun.wave,
    p_kills: lastRun.kills,
    p_hid_events: lastRun.hid,
    p_input_jitter: lastRun.jitter,
    p_client_flags: lastRun.flags
});
\`\`\`

Coins are derived from validated runs on the server, so the browser can't mint them.

One thing I'd change: **grep your history before pushing anything else**. If a service key ever lands in a commit, deleting it later doesn't remove it — you'd have to rotate it in the Supabase dashboard.`
            },
            {
                role: "user",
                pause: 1400,
                text: "add a readme"
            },
            {
                role: "assistant",
                pause: 600,
                text: `Committed and pushed. It covers:

- what NULLFIELD is — twin-stick survivor, 12 rigs, 20 waves, a boss every 5th
- controls: drag left to move, hold the right pad and drag to fire, Space or the round button for your ability
- the four bosses in order — **WARDEN**, **HOLLOW**, **CHORUS**, **LEVIATHAN** — and that clearing the Leviathan on wave 20 is a win, not just a death screen
- how to run it (open the file, no build step) and what the Supabase bits are optional for

\`\`\`bash
git add README.md
git commit -m "Add README"
git push
\`\`\`

Want a screenshot in it? A gif of a Volt chain going through 20 hunters would sell it better than any paragraph.`
            }
        ]
    },

    "bounce-dodge": {
        title: "Create a Bouncing Ball Game",
        messages: [
            {
                role: "user",
                text: "impossible mode is too much, people die in like 5 seconds and quit. but i dont want to make it easy, its called impossible"
            },
            {
                role: "assistant",
                pause: 950,
                text: `Then don't lower the ceiling — change the **shape** of the first minute. Right now \`currentSpawnInterval\` gives Impossible a flat base from the first frame, so the arena is full before anyone has found their hands.

Staged instead:

\`\`\`js
} else if (difficulty === DIFFICULTY_IMPOSSIBLE) {
    const base = (1.2 + 1) * 0.83;
    if (elapsedSec < 6) {
        interval = base * 1.5;
    } else if (elapsedSec < 20) {
        interval = base;
    } else if (elapsedSec <= 36) {
        interval = base * 0.55;
    } else if (elapsedSec < 120) {
        interval = base;
    } else {
        interval = base * 0.5;
    }
}
\`\`\`

Six seconds of breathing room, then normal, then a **spike at 20–36s** so it still hits you early, then it relaxes before the real grind at two minutes. Same brutality, but you die to the spike having seen it coming instead of dying to the loading screen.

Spiny also starts at 30s on Impossible instead of 60s, so the spike has teeth.`
            },
            {
                role: "user",
                pause: 1600,
                text: "the white drift balls still feel unfair, they just teleport into you"
            },
            {
                role: "assistant",
                pause: 800,
                text: `They're not teleporting — they dash at \`RED_SPEED * 4\`. The problem is the telegraph reads as decoration instead of a warning.

Three things fix it without slowing the dash:

**It locks its target early.** At \`DRIFT_CYCLE_MS - DRIFT_TELEGRAPH_MS\` it snapshots where you are and commits to that heading — it does *not* keep tracking you:

\`\`\`js
p.driftTargetX = player.x;
p.driftTargetY = player.y;
p.driftTelegraphStartX = p.x;
p.driftTelegraphStartY = p.y;
const ddx = p.driftTargetX - p.x, ddy = p.driftTargetY - p.y;
const ddist = Math.hypot(ddx, ddy) || 1;
p.driftDirX = ddx / ddist;
p.driftDirY = ddy / ddist;
\`\`\`

So stepping sideways after the line appears always works. That's the contract.

**It winds up visibly.** The 1.3s telegraph is three beats — brake, pull *backwards* along the dash line, then creep forward accelerating into it. You can read the launch without reading the line.

**The line is drawn from the anchor, not the ball.** Pulling back would otherwise drag the warning line with it and make the aim look like it's changing:

\`\`\`js
const startX = anchorX - ux * 60, startY = anchorY - uy * 60;
const endX = anchorX + ux * reach, endY = anchorY + uy * reach;
\`\`\`

Fat translucent line under a thin bright one, both pulsing. Same dash speed, but now dying to it is your fault.`
            },
            {
                role: "user",
                pause: 1500,
                text: "ok also phone players keep complaining its way harder on mobile"
            },
            {
                role: "assistant",
                pause: 700,
                text: `It genuinely is — a thumb on a 100px joystick is not a keyboard. Rather than rebalancing the whole game, touch gets its own multipliers applied at the two points that matter:

\`\`\`js
const TOUCH_SPEED_MULT = 0.72;
const TOUCH_SPAWN_MULT = 1.35;

function _speedMult() {
    return controlMode === 'touch' ? TOUCH_SPEED_MULT : 1;
}
\`\`\`

Applied where balls get their velocity and where spawn timers get scheduled, so **keyboard play is completely untouched**. Also on touch: the difficulty ramp skips the first 3 seconds, spiny spawn chance drops to 0.8x, and the arena is capped at 700×700 with room reserved below it for the joystick and the 🔮 button — no controls on top of the play area.

Worth saying out loud: this means phone and keyboard bests aren't strictly comparable. If that bothers you, the honest fix is a separate leaderboard column rather than pretending the inputs are equivalent.`
            }
        ]
    },

    "wro-robot": {
        title: "Make WRO robot turn right",
        messages: [
            {
                role: "user",
                text: "my wro robot wont turn right properly, it overshoots every time"
            },
            {
                role: "assistant",
                pause: 850,
                text: `Overshoot on a timed turn is almost always momentum — the motors stop but the chassis keeps rotating.

Switch from a timed turn to a gyro turn with a proportional slowdown:

\`\`\`python
def turn_right(target_deg, kp=1.2, min_speed=12, max_speed=45):
    gyro.reset_angle(0)

    while gyro.angle() < target_deg:
        error = target_deg - gyro.angle()
        speed = max(min_speed, min(max_speed, error * kp))

        left.run(speed)
        right.run(-speed)

    left.brake()
    right.brake()
    wait(120)
\`\`\`

The \`error * kp\` term means it's already crawling by the time it reaches the target, so \`brake()\` actually stops it. The \`wait(120)\` lets the gyro settle before the next move reads it.`
            },
            {
                role: "user",
                pause: 1400,
                text: "it still drifts like 2 degrees off"
            },
            {
                role: "assistant",
                pause: 650,
                text: `2° of residual drift is fine to correct with a cleanup pass rather than tighter gains:

\`\`\`python
    # after the main loop
    residual = target_deg - gyro.angle()

    if abs(residual) > 1:
        nudge = 10 if residual > 0 else -10
        left.run(nudge)
        right.run(-nudge)
        while abs(target_deg - gyro.angle()) > 1:
            pass
        left.brake()
        right.brake()
\`\`\`

Also worth checking: **let the gyro settle before the run starts**. If you calibrate while the robot is still being placed on the mat you bake the drift in from move one — put a \`wait(2000)\` after \`reset_angle(0)\` in your init.`
            }
        ]
    }
};
