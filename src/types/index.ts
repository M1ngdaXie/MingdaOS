import type { ComponentType } from 'react';

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevPosition: { x: number; y: number };
  prevSize: { width: number; height: number };
}

export interface AppConfig {
  id: string;
  title: string;
  emoji: string;
  iconGradient: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  component: ComponentType;
  desktopPosition: { col: number; row: number };
}

export interface OSState {
  windows: Record<string, WindowState>;
  topZ: number;
  wallpaper: number;
}

export type OSAction =
  | { type: 'OPEN'; id: string }
  | { type: 'CLOSE'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'MAXIMIZE'; id: string; viewportWidth: number; viewportHeight: number }
  | { type: 'FOCUS'; id: string }
  | { type: 'MOVE'; id: string; x: number; y: number }
  | { type: 'RESIZE'; id: string; width: number; height: number }
  | { type: 'SET_WALLPAPER'; index: number };
