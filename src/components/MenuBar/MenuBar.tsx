import { useEffect, useState } from 'react';
import './MenuBar.css';

const MENU_ITEMS = ['File', 'Edit', 'View', 'Go', 'Help'];

export default function MenuBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="menubar">
      <div className="menubar-left">
        <span className="menubar-logo">&#63743;</span>
        {MENU_ITEMS.map(item => (
          <span key={item} className="menubar-item">{item}</span>
        ))}
      </div>
      <div className="menubar-right">
        <span className="menubar-clock">{time}</span>
      </div>
    </div>
  );
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}
