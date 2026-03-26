import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { OSState, OSAction, WindowState } from '../types';
import { APPS } from '../config/apps';
import { MENUBAR_HEIGHT, DOCK_HEIGHT } from '../config/layout';

function initWindows(): Record<string, WindowState> {
  const map: Record<string, WindowState> = {};
  for (const app of APPS) {
    map[app.id] = {
      id: app.id,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { ...app.defaultPosition },
      size: { ...app.defaultSize },
      prevPosition: { ...app.defaultPosition },
      prevSize: { ...app.defaultSize },
    };
  }
  return map;
}

const initialState: OSState = {
  windows: initWindows(),
  topZ: 10,
  wallpaper: 0,
};

function reducer(state: OSState, action: OSAction): OSState {
  switch (action.type) {
    case 'OPEN': {
      const base = state.topZ + 1;
      // Normalize z-indices if we're approaching Dock's z-index (500)
      if (base >= 480) {
        const openWindows = Object.values(state.windows).filter(w => w.isOpen && w.id !== action.id);
        openWindows.sort((a, b) => a.zIndex - b.zIndex);
        const normalized: Record<string, WindowState> = { ...state.windows };
        openWindows.forEach((w, i) => { normalized[w.id] = { ...w, zIndex: 10 + i }; });
        normalized[action.id] = {
          ...state.windows[action.id],
          isOpen: true,
          isMinimized: false,
          zIndex: 10 + openWindows.length,
        };
        return { ...state, topZ: 10 + openWindows.length, windows: normalized };
      }
      return {
        ...state,
        topZ: base,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            isOpen: true,
            isMinimized: false,
            zIndex: base,
          },
        },
      };
    }
    case 'CLOSE':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], isOpen: false, isMinimized: false, isMaximized: false },
        },
      };
    case 'MINIMIZE':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], isMinimized: true },
        },
      };
    case 'MAXIMIZE': {
      const win = state.windows[action.id];
      if (win.isMaximized) {
        return {
          ...state,
          windows: {
            ...state.windows,
            [action.id]: {
              ...win,
              isMaximized: false,
              position: { ...win.prevPosition },
              size: { ...win.prevSize },
            },
          },
        };
      }
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            isMaximized: true,
            prevPosition: { ...win.position },
            prevSize: { ...win.size },
            position: { x: 0, y: MENUBAR_HEIGHT },
            // viewport dims passed in from caller — keeps reducer pure
            size: { width: action.viewportWidth, height: action.viewportHeight - MENUBAR_HEIGHT - DOCK_HEIGHT },
          },
        },
      };
    }
    case 'FOCUS': {
      const base = state.topZ + 1;
      if (base >= 480) {
        const openWindows = Object.values(state.windows).filter(w => w.isOpen && w.id !== action.id);
        openWindows.sort((a, b) => a.zIndex - b.zIndex);
        const normalized: Record<string, WindowState> = { ...state.windows };
        openWindows.forEach((w, i) => { normalized[w.id] = { ...w, zIndex: 10 + i }; });
        normalized[action.id] = { ...state.windows[action.id], zIndex: 10 + openWindows.length, isMinimized: false };
        return { ...state, topZ: 10 + openWindows.length, windows: normalized };
      }
      return {
        ...state,
        topZ: base,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], zIndex: base, isMinimized: false },
        },
      };
    }
    case 'MOVE':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], position: { x: action.x, y: action.y }, isMaximized: false },
        },
      };
    case 'RESIZE':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], size: { width: action.width, height: action.height }, isMaximized: false },
        },
      };
    case 'SET_WALLPAPER':
      return { ...state, wallpaper: action.index };
    default:
      return state;
  }
}

interface WindowContextType {
  state: OSState;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string, viewportWidth: number, viewportHeight: number) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  setWallpaper: (index: number) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openWindow = useCallback((id: string) => dispatch({ type: 'OPEN', id }), []);
  const closeWindow = useCallback((id: string) => dispatch({ type: 'CLOSE', id }), []);
  const minimizeWindow = useCallback((id: string) => dispatch({ type: 'MINIMIZE', id }), []);
  const maximizeWindow = useCallback((id: string, viewportWidth: number, viewportHeight: number) => dispatch({ type: 'MAXIMIZE', id, viewportWidth, viewportHeight }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: 'FOCUS', id }), []);
  const moveWindow = useCallback((id: string, x: number, y: number) => dispatch({ type: 'MOVE', id, x, y }), []);
  const resizeWindow = useCallback((id: string, w: number, h: number) => dispatch({ type: 'RESIZE', id, width: w, height: h }), []);
  const setWallpaper = useCallback((index: number) => dispatch({ type: 'SET_WALLPAPER', index }), []);

  return (
    <WindowContext.Provider value={{ state, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, moveWindow, resizeWindow, setWallpaper }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useOS() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useOS must be used within WindowProvider');
  return ctx;
}
