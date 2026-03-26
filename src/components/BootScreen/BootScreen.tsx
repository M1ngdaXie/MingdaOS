import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BootScreen.css';

interface Props {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false); // guard against StrictMode double-fire

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 2;
        return next > 100 ? 100 : next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !doneRef.current) {
      doneRef.current = true;
      const t1 = setTimeout(() => setVisible(false), 400);
      const t2 = setTimeout(onComplete, 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="boot-logo">
            <svg viewBox="0 0 814 1000" className="boot-apple">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-167.5-124.3C92 432.1 44.7 259.5 44.7 217.8c0-70.5 46-107.7 89.4-107.7 48.3 0 82.5 32.4 120.9 32.4 36.3 0 74.9-33.7 121.7-33.7 46.8 0 86.6 24.7 111.1 61.6zm-170.7-93.3c21.2-25.7 36.3-61.6 36.3-97.5 0-5.1-.6-10.2-1.3-14.7-34.4 1.3-75.5 22.5-100.6 51.5-19.2 22.5-37.5 58.4-37.5 94.9 0 5.8.6 11.5 1.3 16.7 3.2.6 8.3 1.3 13.5 1.3 30.8 0 68.1-20.4 88.3-52.2z"/>
            </svg>
          </div>
          <div className="boot-progress-track">
            <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
