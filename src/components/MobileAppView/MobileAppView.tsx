import { useRef } from 'react';
import { motion } from 'framer-motion';
import { APPS } from '../../config/apps';
import './MobileAppView.css';

interface Props {
  appId: string;
  onBack: () => void;
}

export default function MobileAppView({ appId, onBack }: Props) {
  const app = APPS.find(a => a.id === appId);
  const dragStartY = useRef<number | null>(null);

  if (!app) return null;

  const AppComponent = app.component;

  function handleDragStart(y: number) {
    dragStartY.current = y;
  }

  function handleDragEnd(y: number) {
    if (dragStartY.current === null) return;
    if (y - dragStartY.current > 60) onBack();
    dragStartY.current = null;
  }

  return (
    <motion.div
      className="mobile-app-view"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onTouchStart={e => handleDragStart(e.touches[0].clientY)}
      onTouchEnd={e => handleDragEnd(e.changedTouches[0].clientY)}
      onMouseDown={e => handleDragStart(e.clientY)}
      onMouseUp={e => handleDragEnd(e.clientY)}
    >
      <div className="mobile-app-topbar">
        <button className="mobile-back-btn" onClick={onBack}>
          ← back
        </button>
        <span className="mobile-app-title">{app.title}</span>
        <span className="mobile-app-topbar-spacer" />
      </div>
      <div className="mobile-app-content">
        <AppComponent />
      </div>
    </motion.div>
  );
}
