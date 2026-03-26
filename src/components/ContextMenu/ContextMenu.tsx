import { useEffect, useRef } from 'react';
import './ContextMenu.css';

interface Props {
  x: number;
  y: number;
  onClose: () => void;
  onChangeWallpaper: () => void;
  onAboutThisMac: () => void;
}

export default function ContextMenu({ x, y, onClose, onChangeWallpaper, onAboutThisMac }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="context-menu" style={{ left: x, top: y }}>
      <div className="context-menu-item" onClick={onClose}>
        <span>📁</span> New Folder
      </div>
      <div className="context-menu-separator" />
      <div className="context-menu-item" onClick={() => { onChangeWallpaper(); onClose(); }}>
        <span>🖼️</span> Change Wallpaper
      </div>
      <div className="context-menu-separator" />
      <div className="context-menu-item" onClick={() => { onAboutThisMac(); onClose(); }}>
        <span>🍎</span> About This Mac
      </div>
    </div>
  );
}
