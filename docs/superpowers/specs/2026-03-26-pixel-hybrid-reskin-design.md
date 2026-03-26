# MingdaOS Pixel Hybrid Reskin — Design Spec

## Goal

Restyle MingdaOS from a smooth glassmorphism macOS aesthetic to a pixel hybrid aesthetic: retro game OS vibes (Celeste/Shovel Knight), sharp edges, flat opaque surfaces, hard pixel shadows, Press Start 2P font, cyan accent color. No new functionality — visual layer changes only.

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Font | Press Start 2P | Bold, chunky, unmistakably pixel |
| Accent color | `#00ffff` (cyan) | Cyberpunk/sci-fi energy, high contrast on dark |
| Style level | Pixel Hybrid (B) | Keep glassmorphism window system, replace chrome styling |
| Border radius | 0 everywhere | Sharp corners = pixel aesthetic |
| Backdrop filter | Removed | Glassmorphism blur is anti-pixel |
| Shadows | Hard offset `4px 4px 0 #000` | Pixel-style depth instead of soft glow |

## Typography

- **Replace** `Outfit` with `Press Start 2P` for all UI chrome
- **Keep** `Fira Code` for Terminal app only
- **Remove** `-webkit-font-smoothing: antialiased` — pixel fonts render crisp, not smoothed
- Font sizes: 8px labels, 10px titles (Press Start 2P reads large)
- Update Google Fonts link in `index.html`

## Color System

| Variable | Old | New |
|---|---|---|
| `--accent-teal` / primary accent | `#64d2ff` | `#00ffff` |
| `--glass-bg` | `rgba(30,30,40,0.55)` | `#0d0d1a` (opaque) |
| `--glass-border` | `rgba(255,255,255,0.08)` | `#333333` |
| `--glass-blur` | `blur(24px) saturate(1.4)` | `none` |
| `--glass-shadow` | `0 8px 40px rgba(0,0,0,0.35)` | `4px 4px 0 #000000` |
| Window bg | `rgba(30,30,40,0.55)` | `#0d0d1a` |
| Titlebar bg | (same as window) | `#111122` |
| Menubar bg | `rgba(20,20,28,0.72)` | `#080816` |
| Dock bg | `rgba(30,30,40,0.52)` | `#0d0d1a` |

## Components

### MenuBar
- Background: `#080816` opaque, no backdrop-filter
- Border-bottom: `2px solid rgba(0,255,255,0.2)`
- Text (logo + items + clock): `#00ffff`
- Font: Press Start 2P, 8px

### Window
- Background: `#0d0d1a`, no backdrop-filter
- Titlebar: `#111122` background
- Border: `2px solid #333`
- Focused border: `2px solid rgba(0,255,255,0.4)`
- Shadow: `4px 4px 0 #000`
- Border-radius: `0`
- Title text: `#00ffff`, Press Start 2P 9px
- Traffic lights: keep as colored squares (not circles — `border-radius: 0`)

### Dock
- Background: `#0d0d1a`, no backdrop-filter
- Border: `2px solid #333`, `box-shadow: 3px 3px 0 #000`
- Border-radius: `0`
- Icon containers: `border-radius: 0`, `border: 2px solid #000`
- Open indicator dot: `#00ffff`
- Hover: `transition: transform 0.1s steps(2)`

### DesktopIcon
- Icon container: `border-radius: 0`
- Label color: `#00ffff` (was white)
- Hover background: `rgba(0,255,255,0.08)`

### ContextMenu
- Background: `#0d0d1a`, no backdrop-filter
- Border: `2px solid #333`, `box-shadow: 3px 3px 0 #000`
- Border-radius: `0`
- Hover: `#00ffff` background, `#000` text
- Font: Press Start 2P 9px

### BootScreen
- Keep existing structure (black bg, Apple logo, progress bar)
- Progress bar: `#00ffff` fill (was white)
- Font (if any text added): Press Start 2P

### Terminal
- Prompt color: `#00ffff` (already `#64d2ff`, update to `#00ffff`)
- Keep Fira Code font

## Wallpaper

Replace smooth radial gradient wallpapers with 3 CSS pixel-style variants:
1. **Dot grid** — dark base `#050510` with a subtle repeating dot pattern
2. **Scanlines** — dark base with horizontal line texture
3. **Solid dark** — flat `#050510` (clean, minimal)

## Animations

- Window open/close: change framer-motion `ease: 'easeOut'` → `ease: [1,0,1,0]` (step-like) or keep easeOut (subtle)
- Dock hover: `transition: transform 0.1s steps(2)`
- Boot progress: keep existing linear fill

## Files Changed

| File | Change |
|---|---|
| `index.html` | Swap Google Fonts: remove Outfit, add Press Start 2P |
| `src/App.css` | Update all CSS variables, remove font-smoothing, add pixel rendering |
| `src/components/MenuBar/MenuBar.css` | Opaque bg, cyan text, no backdrop-filter |
| `src/components/Window/Window.css` | Sharp corners, opaque bg, hard shadow, pixel titlebar |
| `src/components/Dock/Dock.css` | Sharp corners, opaque bg, hard shadow, steps() hover |
| `src/components/DesktopIcon/DesktopIcon.css` | Sharp corners, cyan label |
| `src/components/ContextMenu/ContextMenu.css` | Sharp corners, opaque bg, cyan hover |
| `src/components/BootScreen/BootScreen.css` | Cyan progress bar |
| `src/apps/Terminal.tsx` | Update prompt color to `#00ffff` |
| `src/config/apps.ts` | Update WALLPAPERS to pixel-style CSS patterns |

## Out of Scope

- No sprite/image assets (emoji icons stay as-is for now)
- No new functionality
- No changes to WindowContext, types, or component logic
