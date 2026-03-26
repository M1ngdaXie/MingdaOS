import type { AppConfig } from '../types';
import AboutMe from '../apps/AboutMe';
import Projects from '../apps/Projects';
import Terminal from '../apps/Terminal';
import Links from '../apps/Links';
import Alfred from '../apps/Alfred';
import Chengyu from '../apps/Chengyu';
import Poker from '../apps/Poker';
import Trash from '../apps/Trash';

export const APPS: AppConfig[] = [
  {
    id: 'about',
    title: 'About Me',
    emoji: '👤',
    iconGradient: 'linear-gradient(135deg, #0a84ff, #bf5af2)',
    defaultSize: { width: 560, height: 420 },
    defaultPosition: { x: 120, y: 80 },
    component: AboutMe,
    desktopPosition: { col: 0, row: 0 },
  },
  {
    id: 'projects',
    title: 'Projects',
    emoji: '💻',
    iconGradient: 'linear-gradient(135deg, #30d158, #0a84ff)',
    defaultSize: { width: 660, height: 500 },
    defaultPosition: { x: 160, y: 100 },
    component: Projects,
    desktopPosition: { col: 1, row: 0 },
  },
  {
    id: 'terminal',
    title: 'Terminal',
    emoji: '⌨️',
    iconGradient: 'linear-gradient(135deg, #1e1e28, #3a3a4a)',
    defaultSize: { width: 640, height: 420 },
    defaultPosition: { x: 200, y: 120 },
    component: Terminal,
    desktopPosition: { col: 0, row: 1 },
  },
  {
    id: 'links',
    title: 'Links',
    emoji: '🔗',
    iconGradient: 'linear-gradient(135deg, #64d2ff, #0a84ff)',
    defaultSize: { width: 400, height: 360 },
    defaultPosition: { x: 240, y: 140 },
    component: Links,
    desktopPosition: { col: 1, row: 1 },
  },
  {
    id: 'alfred',
    title: 'Alfred',
    emoji: '☠️',
    iconGradient: 'linear-gradient(135deg, #ff453a, #bf5af2)',
    defaultSize: { width: 520, height: 380 },
    defaultPosition: { x: 280, y: 160 },
    component: Alfred,
    desktopPosition: { col: 0, row: 2 },
  },
  {
    id: 'chengyu',
    title: '成语填空',
    emoji: '🀄',
    iconGradient: 'linear-gradient(135deg, #ffd60a, #ff453a)',
    defaultSize: { width: 460, height: 360 },
    defaultPosition: { x: 320, y: 180 },
    component: Chengyu,
    desktopPosition: { col: 1, row: 2 },
  },
  {
    id: 'poker',
    title: 'Poker',
    emoji: '🎲',
    iconGradient: 'linear-gradient(135deg, #30d158, #ffd60a)',
    defaultSize: { width: 500, height: 400 },
    defaultPosition: { x: 360, y: 200 },
    component: Poker,
    desktopPosition: { col: 0, row: 3 },
  },
  {
    id: 'trash',
    title: 'Trash',
    emoji: '🗑️',
    iconGradient: 'linear-gradient(135deg, #636366, #48484a)',
    defaultSize: { width: 380, height: 300 },
    defaultPosition: { x: 400, y: 220 },
    component: Trash,
    desktopPosition: { col: 1, row: 3 },
  },
];

export const WALLPAPERS = [
  'radial-gradient(ellipse at 20% 50%, #1a0533 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #0d1f3c 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, #0a1a0a 0%, transparent 50%), radial-gradient(ellipse at 40% 40%, #2d0a3e 0%, transparent 45%), linear-gradient(135deg, #0a0a12 0%, #12061e 50%, #060d1a 100%)',
  'radial-gradient(ellipse at 30% 60%, #1a0a00 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, #001a2e 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, #0d0020 0%, transparent 50%), linear-gradient(135deg, #080808 0%, #1a0d00 50%, #000d1a 100%)',
  'radial-gradient(ellipse at 50% 50%, #001a1a 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, #1a001a 0%, transparent 55%), linear-gradient(135deg, #060a0a 0%, #0a0620 100%)',
];
