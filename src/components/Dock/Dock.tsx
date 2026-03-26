import './Dock.css';
import { useOS } from '../../context/WindowContext';
import { APPS } from '../../config/apps';

export default function Dock() {
  const { state, openWindow, focusWindow } = useOS();

  function handleClick(id: string) {
    const win = state.windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else {
      // focusWindow also sets isMinimized: false, so this handles both minimized and normal cases
      focusWindow(id);
    }
  }

  return (
    <div className="dock-container">
      <div className="dock">
        {APPS.map(app => {
          const win = state.windows[app.id];
          const isOpen = win.isOpen;
          return (
            <div key={app.id} className="dock-item" onClick={() => handleClick(app.id)}>
              <div className="dock-icon" style={{ background: app.iconGradient }}>
                <span>{app.emoji}</span>
              </div>
              {isOpen && <div className="dock-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
