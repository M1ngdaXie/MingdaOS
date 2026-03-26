# MingdaOS Pixel Hybrid Reskin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle MingdaOS from glassmorphism macOS to a pixel hybrid aesthetic — Press Start 2P font, cyan `#00ffff` accent, sharp corners, hard shadows, opaque surfaces, no backdrop-filter blur.

**Architecture:** Pure CSS/style changes across 10 files. No logic, no new components, no new dependencies beyond adding Press Start 2P to Google Fonts. Each task is one file or one tightly related set of changes.

**Tech Stack:** CSS variables, Google Fonts (Press Start 2P), existing React + Vite stack

---

## File Map

```
Modified only — no new files:
├── index.html                              # Swap Google Fonts link
├── src/
│   ├── App.css                             # CSS variables overhaul
│   ├── config/apps.ts                      # WALLPAPERS → pixel CSS patterns
│   ├── components/Desktop/Desktop.css     # background-size for dot grid wallpaper
│   ├── apps/Terminal.tsx                   # Prompt color #64d2ff → #00ffff
│   └── components/
│       ├── BootScreen/BootScreen.css       # Cyan progress bar
│       ├── MenuBar/MenuBar.css             # Opaque bg, cyan text, no blur
│       ├── Window/Window.css               # Sharp corners, hard shadow, opaque
│       ├── Dock/Dock.css                   # Sharp corners, hard shadow, steps() hover
│       ├── DesktopIcon/DesktopIcon.css     # Sharp corners, cyan label
│       └── ContextMenu/ContextMenu.css     # Sharp corners, cyan hover, no blur
```

---

## Task 1: Google Fonts + CSS variables

**Files:**
- Modify: `index.html`
- Modify: `src/App.css`

- [ ] **Step 1: Update Google Fonts in `index.html`**

Find the existing fonts link (lines 8-10) and replace with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
```
(Removed Outfit, added Press Start 2P, kept Fira Code)

- [ ] **Step 2: Overhaul CSS variables in `src/App.css`**

Replace the entire file with:
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --font-ui: 'Press Start 2P', monospace;
  --font-mono: 'Fira Code', 'Courier New', monospace;

  --accent-red: #ff453a;
  --accent-yellow: #ffd60a;
  --accent-green: #30d158;
  --accent-blue: #0a84ff;
  --accent-purple: #bf5af2;
  --accent-teal: #00ffff;
  --accent-cyan: #00ffff;

  --glass-bg: #0d0d1a;
  --glass-border: #333333;
  --glass-blur: none;
  --glass-shadow: 4px 4px 0 #000000;
  --radius-window: 0px;
  --radius-icon: 0px;

  --menubar-height: 28px;
  --dock-height: 72px;
  --titlebar-height: 36px;

  --pixel-border: 2px solid #333333;
  --pixel-shadow: 4px 4px 0 #000000;
  --pixel-cyan: #00ffff;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-ui);
  -webkit-font-smoothing: none;
  font-smooth: never;
  image-rendering: pixelated;
}
```

- [ ] **Step 3: Verify build**
```bash
cd /Users/xiemingda/mingda-os && npm run build 2>&1 | tail -5
```
Expected: `✓ built` with no errors.

- [ ] **Step 4: Commit**
```bash
git add index.html src/App.css
git commit -m "feat(pixel): swap fonts to Press Start 2P and overhaul CSS variables"
```

---

## Task 2: MenuBar styles

**Files:**
- Modify: `src/components/MenuBar/MenuBar.css`

- [ ] **Step 1: Replace `MenuBar.css` entirely**

```css
.menubar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--menubar-height);
  background: #080816;
  border-bottom: 2px solid rgba(0, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  z-index: 1000;
  user-select: none;
}

.menubar-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.menubar-logo {
  font-size: 14px;
  margin-right: 8px;
  cursor: default;
  color: var(--pixel-cyan);
}

.menubar-item {
  font-size: 8px;
  font-weight: 400;
  color: var(--pixel-cyan);
  padding: 2px 8px;
  cursor: default;
  letter-spacing: 0.5px;
}

.menubar-item:hover {
  background: rgba(0, 255, 255, 0.15);
}

.menubar-right {
  display: flex;
  align-items: center;
}

.menubar-clock {
  font-size: 8px;
  color: var(--pixel-cyan);
  letter-spacing: 0.5px;
}
```

- [ ] **Step 2: Verify build**
```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**
```bash
git add src/components/MenuBar/MenuBar.css
git commit -m "feat(pixel): restyle menubar — opaque bg, cyan text, pixel border"
```

---

## Task 3: Window styles

**Files:**
- Modify: `src/components/Window/Window.css`

- [ ] **Step 1: Replace `Window.css` entirely**

```css
.window {
  background: #0d0d1a;
  border: 2px solid #333333;
  border-radius: 0;
  box-shadow: var(--pixel-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: opacity 0.15s;
}

.window--focused {
  border-color: rgba(0, 255, 255, 0.4);
}

.window--unfocused {
  opacity: 0.72;
}

.window-titlebar {
  height: var(--titlebar-height);
  background: #111122;
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: move;
  border-bottom: 2px solid #333333;
  flex-shrink: 0;
  gap: 8px;
  position: relative;
}

.traffic-lights {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.traffic-light {
  width: 12px;
  height: 12px;
  border-radius: 0;
  border: 1px solid rgba(0,0,0,0.5);
  cursor: pointer;
  position: relative;
  transition: filter 0.1s;
}

.window--unfocused .traffic-light {
  background: #444 !important;
}

.traffic-light--close { background: var(--accent-red); }
.traffic-light--minimize { background: var(--accent-yellow); }
.traffic-light--maximize { background: var(--accent-green); }

.traffic-lights:hover .traffic-light--close::after { content: '✕'; }
.traffic-lights:hover .traffic-light--minimize::after { content: '−'; }
.traffic-lights:hover .traffic-light--maximize::after { content: '+'; }

.traffic-light::after {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 700;
  color: rgba(0,0,0,0.7);
  line-height: 1;
}

.window-title {
  flex: 1;
  text-align: center;
  font-size: 9px;
  font-weight: 400;
  color: var(--pixel-cyan);
  pointer-events: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 1px;
  white-space: nowrap;
}

.window-content {
  flex: 1;
  overflow: auto;
  color: #fff;
}
```

- [ ] **Step 2: Verify build**
```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**
```bash
git add src/components/Window/Window.css
git commit -m "feat(pixel): restyle window — sharp corners, opaque bg, cyan title, hard shadow"
```

---

## Task 4: Dock styles

**Files:**
- Modify: `src/components/Dock/Dock.css`

- [ ] **Step 1: Replace `Dock.css` entirely**

```css
.dock-container {
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 500;
}

.dock {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  background: #0d0d1a;
  border: 2px solid #333333;
  border-radius: 0;
  padding: 8px 12px;
  box-shadow: 3px 3px 0 #000000;
}

.dock-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  position: relative;
}

.dock-item:hover .dock-icon {
  transform: scale(1.18) translateY(-6px);
}

.dock-icon {
  width: 48px;
  height: 48px;
  border-radius: 0;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: transform 0.1s steps(2);
  box-shadow: 2px 2px 0 #000;
}

.dock-dot {
  width: 4px;
  height: 4px;
  border-radius: 0;
  background: var(--pixel-cyan);
}
```

- [ ] **Step 2: Verify build**
```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**
```bash
git add src/components/Dock/Dock.css
git commit -m "feat(pixel): restyle dock — sharp corners, hard shadow, cyan dot, steps() hover"
```

---

## Task 5: DesktopIcon + ContextMenu styles

**Files:**
- Modify: `src/components/DesktopIcon/DesktopIcon.css`
- Modify: `src/components/ContextMenu/ContextMenu.css`

- [ ] **Step 1: Replace `DesktopIcon.css` entirely**

```css
.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: default;
  width: 72px;
  padding: 6px;
  border-radius: 0;
  transition: background 0.1s;
}

.desktop-icon:hover {
  background: rgba(0, 255, 255, 0.08);
}

.desktop-icon-img {
  width: 56px;
  height: 56px;
  border-radius: 0;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 3px 3px 0 #000;
}

.desktop-icon-label {
  font-size: 8px;
  color: var(--pixel-cyan);
  text-align: center;
  text-shadow: 1px 1px 0 #000;
  max-width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.5px;
}
```

- [ ] **Step 2: Replace `ContextMenu.css` entirely**

```css
.context-menu {
  position: fixed;
  background: #0d0d1a;
  border: 2px solid #333333;
  border-radius: 0;
  box-shadow: 3px 3px 0 #000000;
  padding: 4px;
  min-width: 200px;
  z-index: 9000;
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 0;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.9);
  cursor: default;
  letter-spacing: 0.5px;
}

.context-menu-item:hover {
  background: var(--pixel-cyan);
  color: #000;
}

.context-menu-separator {
  height: 2px;
  background: #333333;
  margin: 3px 6px;
}
```

- [ ] **Step 3: Verify build**
```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**
```bash
git add src/components/DesktopIcon/DesktopIcon.css src/components/ContextMenu/ContextMenu.css
git commit -m "feat(pixel): restyle desktop icons and context menu"
```

---

## Task 6: BootScreen styles + Terminal color

**Files:**
- Modify: `src/components/BootScreen/BootScreen.css`
- Modify: `src/apps/Terminal.tsx`

- [ ] **Step 1: Replace `BootScreen.css` entirely**

```css
.boot-screen {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  z-index: 9999;
}

.boot-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.boot-apple {
  width: 80px;
  height: 80px;
  fill: #00ffff;
  image-rendering: pixelated;
}

.boot-progress-track {
  width: 200px;
  height: 4px;
  background: rgba(0, 255, 255, 0.15);
  border: 1px solid rgba(0, 255, 255, 0.3);
  overflow: hidden;
}

.boot-progress-bar {
  height: 100%;
  background: #00ffff;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px #00ffff;
}
```

- [ ] **Step 2: Update Terminal prompt color**

In `src/apps/Terminal.tsx`, find the two places where `#64d2ff` is used for the prompt color and update them to `#00ffff`:

Find:
```tsx
<span style={{ color: '#64d2ff', whiteSpace: 'nowrap' }}>{PROMPT}</span>
```
Replace with:
```tsx
<span style={{ color: '#00ffff', whiteSpace: 'nowrap' }}>{PROMPT}</span>
```

Find:
```tsx
caretColor: '#64d2ff',
```
Replace with:
```tsx
caretColor: '#00ffff',
```

Also update the input color line styling in the `lines.map`:
Find:
```tsx
color: line.type === 'input' ? '#64d2ff' : '#e2e8f0',
```
Replace with:
```tsx
color: line.type === 'input' ? '#00ffff' : '#e2e8f0',
```

- [ ] **Step 3: Verify build**
```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**
```bash
git add src/components/BootScreen/BootScreen.css src/apps/Terminal.tsx
git commit -m "feat(pixel): cyan boot screen and terminal prompt color"
```

---

## Task 7: Pixel wallpapers

**Files:**
- Modify: `src/config/apps.ts`

- [ ] **Step 1: Replace the WALLPAPERS array in `src/config/apps.ts`**

Find the `export const WALLPAPERS` array (near the bottom of the file) and replace it entirely with:

```typescript
export const WALLPAPERS = [
  // Dot grid — dark with subtle cyan dot pattern
  `radial-gradient(circle, rgba(0,255,255,0.07) 1px, transparent 1px),
   radial-gradient(circle, rgba(0,255,255,0.04) 1px, transparent 1px),
   linear-gradient(135deg, #050510 0%, #080818 100%)`,
  // Scanlines — horizontal line texture
  `repeating-linear-gradient(
     0deg,
     transparent,
     transparent 2px,
     rgba(0,255,255,0.03) 2px,
     rgba(0,255,255,0.03) 4px
   ),
   linear-gradient(135deg, #050510 0%, #06060f 100%)`,
  // Solid dark — flat and minimal
  `linear-gradient(135deg, #050510 0%, #080818 100%)`,
];
```

Also update the Desktop.tsx background-size to make the dot grid work. Find `src/components/Desktop/Desktop.css` and update `.desktop`:
```css
.desktop {
  position: fixed;
  inset: 0;
  background-size: 24px 24px, 12px 12px, cover;
  overflow: hidden;
}
```

- [ ] **Step 2: Verify build**
```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**
```bash
git add src/config/apps.ts src/components/Desktop/Desktop.css
git commit -m "feat(pixel): replace smooth gradient wallpapers with pixel-style CSS patterns"
```

---

## Task 8: Final verification

- [ ] **Step 1: Full production build**
```bash
npm run build
```
Expected: no errors, `dist/` updated.

- [ ] **Step 2: Run dev server and manually verify**
```bash
npm run dev
```
Open http://localhost:5173 and check:
- Boot screen: cyan Apple logo + cyan progress bar fills
- Desktop: dot grid or scanline wallpaper visible
- MenuBar: cyan text, opaque dark background, no glass blur
- Desktop icons: sharp corners, cyan labels, hard shadows
- Double-click icon → window opens with sharp corners, cyan title, `#111122` titlebar
- Traffic lights: square (not round), red/yellow/green still colored
- Focused window has subtle cyan border, unfocused dims to 72%
- Right-click → context menu: sharp corners, cyan hover
- Dock: square icons, hard shadow, cyan dot under open apps, snap hover animation
- Terminal: `help`, `about`, `neofetch` — cyan prompt `mingda@doitou-sv ~ %`
- Press Start 2P font visible throughout UI

- [ ] **Step 3: Final commit**
```bash
git add -A
git commit -m "chore: pixel hybrid reskin complete"
```

---

## Verification Checklist

- [ ] Press Start 2P font loaded and rendering (check browser DevTools Network tab)
- [ ] No rounded corners anywhere on windows, dock, icons, context menu
- [ ] No backdrop-filter blur on any element
- [ ] All chrome backgrounds are opaque (no rgba semi-transparent blur)
- [ ] Hard `4px 4px 0 #000` shadows on windows and dock
- [ ] Cyan `#00ffff` on: menubar text, window titles, dock dots, desktop icon labels, terminal prompt, boot progress bar, boot Apple logo
- [ ] Wallpaper is a pixel-style CSS pattern (dot grid / scanlines / solid)
- [ ] `npm run build` clean with no errors
