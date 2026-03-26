import { useState, useCallback } from 'react';
import MenuBar from '../MenuBar/MenuBar';
import Dock from '../Dock/Dock';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import Window from '../Window/Window';
import ContextMenu from '../ContextMenu/ContextMenu';
import { useOS } from '../../context/WindowContext';
import { APPS, WALLPAPERS } from '../../config/apps';
import './Desktop.css';

interface CtxMenu { x: number; y: number }

export default function Desktop() {
  const { state, openWindow, setWallpaper } = useOS();
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

  return (
    <div
      className="desktop"
      style={{ background: WALLPAPERS[state.wallpaper] }}
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
            <DesktopIcon app={app} onOpen={() => openWindow(app.id)} />
          </div>
        ))}
      </div>

      {APPS.map(app => (
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
