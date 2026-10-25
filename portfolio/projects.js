/* =========================================================
   YOUR PROJECTS
   Each block between { and } is one project. To add one, copy a
   whole block, paste it, and change the text. Keep the comma
   between blocks. Projects show in the order they're listed.

   Fields:
     title       project name
     featured    true = bigger title (use for one project)
     year        when you made it
     role        what YOU did
     team        e.g. "Team of 9" (optional)
     summary     one or two sentences: what is it?
     points      short bullets: what did you build or decide?
     tags        tools and techniques
     media       { type: "image" or "video", src: "assets/...", alt: "..." }
                 For a clip, use type "video" and an .mp4 file.
     caption     text under the picture (optional)
     breakdown   optional longer write-up, shown behind "Read the breakdown":
                 a list of { heading, text } paragraphs
     shots       optional extra pictures inside the breakdown:
                 a list of { src, caption }
     links       buttons: { label, url }. Empty urls are hidden.
   ========================================================= */

const projects = [
  {
    title: "Warbound",
    featured: true,
    year: "2025–2026",
    role: "Gameplay programmer",
    team: "Team of 9",
    summary:
      "A turn-based game on a custom C++ engine our team built from scratch, shipped as playable builds across six milestones.",
    points: [
      "Procedural dungeon generator with four level algorithms, seeded so any layout can be reproduced",
      "Spawn placement with flood-fill validation, so no generated level can strand the player",
      "Event bus, tile grid, turn-phase state machine, projectiles and 2D math: ~5,700 lines across nine systems I owned",
    ],
    tags: ["C++", "OpenGL", "ECS", "Procedural generation"],
    media: { type: "image", src: "assets/warbound.jpg", alt: "Warbound mid-fight: a party of heroes against goblins on a desert map, with the turn order across the top" },
    caption: "Level 3, mid-fight. The turn order runs across the top.",
    breakdown: [
      {
        heading: "The problem",
        text:
          "Warbound's levels can be generated instead of hand-built. That makes a bad map more than a cosmetic bug: a level with the goal walled off is a level nobody can finish.",
      },
      {
        heading: "What I built",
        text:
          "The generator has four layouts: rooms joined by L-shaped corridors, cellular-automata caves, an open arena, and rooms plus a boss arena. Every layout is seeded, so a map that breaks can be regenerated exactly and debugged.",
      },
      {
        heading: "Making every map playable",
        text:
          "Laying out rooms is the easy part. Spawns are placed against rules: a minimum distance from the player to each enemy, spacing between enemies, and a safe zone around the start. Each candidate tile is checked with a flood fill so nothing lands where the player can't reach, and the goal goes on the farthest reachable tile so every map asks the player to cross it.",
      },
      {
        heading: "Handing it to designers",
        text:
          "When a seed produced a map worth keeping, it could be saved to JSON and loaded later as a fixed level, skipping the generator entirely.",
      },
    ],
    links: [
      { label: "Source (final milestone)", url: "https://github.com/ethanngyl/Gam200Test/tree/M6-Final" },
    ],
  },
  {
    title: "HTN Planning in Unreal Engine 5",
    featured: false,
    year: "2026",
    role: "AI programmer",
    team: "Team of 3",
    summary:
      "An NPC that plans its own behaviour, ported from a Godot 4 demo to Unreal Engine 5 in C++ for a research paper and presentation.",
    points: [
      "Ported the hierarchical task network planner: 27 C++ source files, 9 primitive tasks",
      "Found and fixed a plan-lifecycle bug inherited from the original project",
    ],
    tags: ["C++", "Unreal Engine 5", "HTN planning", "Game AI"],
    media: { type: "image", src: "assets/htn.jpg", alt: "Two Unreal Engine mannequins in a grey test arena with green ramps" },
    caption: "The test arena in Unreal Engine 5.",
    breakdown: [
      {
        heading: "What it is",
        text:
          "The NPC decides what to do by planning. It breaks a goal like collecting coins into a sequence of tasks, runs them, and replans when the world changes: when the player comes close, when it gets scared, when it gets tired.",
      },
      {
        heading: "The skipped step",
        text:
          "In the original project, a task that changed the world while finishing would trigger a replan in the middle of its own call. When it then reported success, the runner popped the first step off the new plan instead of the old one, so that step never ran. I gave every plan a version number. A completion that belongs to an older plan is now discarded.",
      },
      {
        heading: "The replan loop",
        text:
          "Coins floated above the navigation mesh, so pathfinding failed on the first frame and the planner replanned every frame. Projecting the target onto the navmesh fixed the cause. Falling back to direct steering, instead of failing outright, means an unreachable target can't spin the planner again.",
      },
    ],
    shots: [
      { src: "assets/htn-plan-versions.svg", caption: "Plan 8 replaces plan 7 while Relax is still finishing. Relax's late success belongs to plan 7, so it is discarded instead of skipping plan 8's first step." },
    ],
    links: [],
  },
  {
    title: "Thanos World",
    featured: false,
    year: "2025",
    role: "Gameplay programmer",
    team: "Team of 4",
    summary:
      "A side-scrolling runner where you flip gravity between floor and ceiling to dodge spikes and lasers. Built in C++ on DigiPen's Alpha Engine in my first year.",
    points: [
      "Wrote the audio system: separate music and sound-effect channels under one master volume, a mute toggle that remembers which track to bring back, and no restart when two screens share the same music",
      "Built most of the power-up system: shield and infinite-energy pickups, spawned at random and kept in a linked list, with pickup collision and memory cleanup",
      "Wrote the terrain rendering, and shared the main gameplay loop with the team",
    ],
    tags: ["C++", "Alpha Engine", "Audio", "Gameplay systems"],
    media: { type: "image", src: "assets/thanos-world.jpg", alt: "Thanos World: a small astronaut mid-air between floor and ceiling spikes, a red laser beam and a metal crate" },
    caption: "Mid-flip, with spikes above and below and the laser behind.",
    links: [],
  },
  {
    title: "Ruined City",
    featured: false,
    year: "2026",
    role: "Level designer",
    summary:
      "A walking-simulator level in Unreal Engine 5. The player crosses the ruins of a city with no combat, so the space itself has to do the guiding.",
    points: [
      "Light as wayfinding: inside buildings, one shaft of light through a broken roof marks the way on",
      "Openings frame the next landmark before the player reaches it",
      "Scoped the design to what the engine and assets could support",
    ],
    tags: ["Unreal Engine 5", "Level design", "Lighting"],
    media: { type: "image", src: "assets/level-slabs.jpg", alt: "Collapsed slabs and wrecked cars in the ruined city at sunset" },
    caption: "Collapsed slabs framing the route ahead.",
    breakdown: [
      {
        heading: "Guiding without signs",
        text:
          "With no combat and nothing to chase, the only thing pulling the player forward is what they can see. Exterior routes open onto the next landmark; interiors are dark except for a single shaft of light where the path continues.",
      },
      {
        heading: "Cutting to fit",
        text:
          "The plan had the player visibly carrying a package across the whole city. Without the animation assets to support it, the package became a pickup at the start, and the route carries the story instead.",
      },
    ],
    shots: [
      { src: "assets/level-plaza.jpg", caption: "The plaza and broken fountain, framed by the opening the player walks out of." },
      { src: "assets/level-interior.jpg", caption: "An interior lit by one shaft of light through the roof." },
    ],
    links: [],
  },
  {
    title: "A* Pathfinding",
    featured: false,
    year: "2026",
    role: "Programmer",
    team: "Solo",
    summary: "Grid pathfinding for AI agents, built in C++ for a game AI course.",
    points: [
      "Five heuristics, with rubberbanding and Catmull-Rom path smoothing",
      "Replaced the open list's linear scan with a binary heap, for O(log n) node selection",
    ],
    tags: ["C++", "A*", "Data structures"],
    media: { type: "image", src: "assets/astar.jpg", alt: "A character's smoothed A* path drawn in red across a yellow grid map with black walls" },
    caption: "The agent following a smoothed path around the walls.",
    links: [],
  },
  {
    title: "Terrain Analysis",
    featured: false,
    year: "2026",
    role: "Programmer",
    team: "Solo",
    summary: "Tactical map analysis so AI agents can read the battlefield, built in C++ for a game AI course.",
    points: [
      "Ten analysis functions, including influence maps with occupancy propagation",
      "Enemy field of view computed over the grid",
    ],
    tags: ["C++", "Influence maps", "Tactical AI"],
    media: { type: "image", src: "assets/terrain.jpg", alt: "A red influence map over a grid of walls, with sliders for decay, growth and enemy field of view" },
    caption: "Propagation on a test map. Decay, growth and enemy field of view are tunable on the left.",
    links: [],
  },
];
