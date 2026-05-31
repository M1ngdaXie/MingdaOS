import { useEffect, useState } from 'react';
import './MobileStatusBar.css';

export default function MobileStatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mobile-statusbar">
      <span className="mobile-statusbar-logo">[ MingdaOS ]</span>
      <span className="mobile-statusbar-clock">{time}</span>
    </div>
  );
}

function formatTime(d: Date) {
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}
