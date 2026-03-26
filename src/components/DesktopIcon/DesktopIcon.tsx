import './DesktopIcon.css';
import type { AppConfig } from '../../types';

interface Props {
  app: AppConfig;
  onOpen: () => void;
}

export default function DesktopIcon({ app, onOpen }: Props) {
  return (
    <div className="desktop-icon" onDoubleClick={onOpen}>
      <div className="desktop-icon-img" style={{ background: app.iconGradient }}>
        <span>{app.emoji}</span>
      </div>
      <span className="desktop-icon-label">{app.title}</span>
    </div>
  );
}
