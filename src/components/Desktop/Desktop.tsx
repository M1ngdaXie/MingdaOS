import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import MenuBar from '../MenuBar/MenuBar';
import Dock from '../Dock/Dock';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import Window from '../Window/Window';
import ContextMenu from '../ContextMenu/ContextMenu';
import MobileStatusBar from '../MobileStatusBar/MobileStatusBar';
import MobileHomeScreen from '../MobileHomeScreen/MobileHomeScreen';
import MobileAppView from '../MobileAppView/MobileAppView';
import { useOS } from '../../context/WindowContext';
import { useMobile } from '../../hooks/useMobile';
import { APPS, WALLPAPERS } from '../../config/apps';
import './Desktop.css';

interface CtxMenu { x: number; y: number }

export default function Desktop() {
  const { state, openWindow, setWallpaper, openMobileApp, closeMobileApp } = useOS();
  const isMobile = useMobile();
  const [ctxMenu, setCtxMenu] = useState<CtxMenu | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleChangeWallpaper = useCallback(() => {
    const next = (state.wallpaper + 1) % WALLPAPERS.length;
    setWallpaper(next);
  }, [state.wallpaper, setWallpaper]);

  const handleAboutThisMac = useCallback(() => {
    openWindow('about');
  }, [openWindow]);

  const wallpaperStyle = {
    background: WALLPAPERS[state.wallpaper],
    backgroundSize: WALLPAPERS[state.wallpaper].startsWith('url(') ? 'cover' : undefined,
  };

  if (isMobile) {
    return (
      <div className="desktop" style={wallpaperStyle}>
        <MobileStatusBar />
        <AnimatePresence mode="wait">
          {state.activeAppId == null
            ? <MobileHomeScreen key="home" onOpenApp={openMobileApp} />
            : <MobileAppView key={state.activeAppId} appId={state.activeAppId} onBack={closeMobileApp} />
          }
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className="desktop"
      style={wallpaperStyle}
      onContextMenu={handleContextMenu}
      onClick={() => setCtxMenu(null)}
    >
      <MenuBar />

      <div className="desktop-icons">
        {APPS.map(app => (
          <div
            key={app.id}
            className="desktop-icon-cell"
            style={{
              gridColumn: app.desktopPosition.col + 1,
              gridRow: app.desktopPosition.row + 1,
            }}
          >
            <DesktopIcon
              app={app}
              onOpen={() =>
                app.externalUrl
                  ? window.open(app.externalUrl, '_blank', 'noopener,noreferrer')
                  : openWindow(app.id)
              }
            />
          </div>
        ))}
      </div>

      {APPS.filter(app => !app.externalUrl).map(app => (
        <Window key={app.id} app={app} />
      ))}

      <Dock />

      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onClose={() => setCtxMenu(null)}
          onChangeWallpaper={handleChangeWallpaper}
          onAboutThisMac={handleAboutThisMac}
        />
      )}
    </div>
  );
}
