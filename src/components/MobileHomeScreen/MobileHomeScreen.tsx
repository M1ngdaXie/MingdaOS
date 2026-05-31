import { APPS } from '../../config/apps';
import './MobileHomeScreen.css';

interface Props {
  onOpenApp: (id: string) => void;
}

export default function MobileHomeScreen({ onOpenApp }: Props) {
  return (
    <div className="mobile-home">
      <div className="mobile-icon-grid">
        {APPS.map(app => (
          <button
            key={app.id}
            className="mobile-icon-cell"
            onClick={() =>
              app.externalUrl
                ? window.open(app.externalUrl, '_blank', 'noopener,noreferrer')
                : onOpenApp(app.id)
            }
          >
            <div
              className="mobile-icon-img"
              style={{ background: app.iconGradient }}
            >
              {app.iconImage
                ? <img src={app.iconImage} alt={app.title} className="mobile-icon-custom" />
                : <span className="mobile-icon-emoji">{app.emoji}</span>
              }
            </div>
            <span className="mobile-icon-label">{app.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
