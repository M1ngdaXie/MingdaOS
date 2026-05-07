import { useEffect, useState } from 'react';
import './MenuBar.css';
import { APP_VERSION } from '../../config/version';

const MENU_ITEMS = ['encrypt', 'sign', 'verify', 'wipe', 'about'];
const BOOT_AT = Date.now();

export default function MenuBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [uptime, setUptime] = useState(() => formatUptime(0));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
      setUptime(formatUptime(Date.now() - BOOT_AT));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="menubar">
      <div className="menubar-left">
        <span className="menubar-logo">[ MingdaOS v{APP_VERSION} ]</span>
        {MENU_ITEMS.map(item => (
          <span key={item} className="menubar-item">{item}</span>
        ))}
      </div>
      <div className="menubar-right">
        <span className="menubar-clock" style={{ opacity: 0.55, marginRight: 12 }}>
          up {uptime}
        </span>
        <span className="menubar-clock">
          {time}<span className="cypher-caret">█</span>
        </span>
      </div>
    </div>
  );
}

function formatTime(d: Date) {
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss} UTC`;
}

function formatUptime(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}h${String(m).padStart(2, '0')}m${String(sec).padStart(2, '0')}s`;
}
