import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/WindowContext';
import type { AppConfig } from '../../types';
import './Window.css';

interface Props {
  app: AppConfig;
}

export default function Window({ app }: Props) {
  const { state, closeWindow, minimizeWindow, maximizeWindow, focusWindow, moveWindow, resizeWindow } = useOS();
  const win = state.windows[app.id];
  const isFocused = win.zIndex === state.topZ;
  const isVisible = win.isOpen && !win.isMinimized;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={app.id}
          style={{ position: 'fixed', zIndex: win.zIndex, top: 0, left: 0, width: 0, height: 0 }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <Rnd
            position={win.position}
            size={win.size}
            onDragStop={(_, d) => moveWindow(app.id, d.x, d.y)}
            onResizeStop={(_, __, ref, ___, pos) => {
              resizeWindow(app.id, ref.offsetWidth, ref.offsetHeight);
              moveWindow(app.id, pos.x, pos.y);
            }}
            dragHandleClassName="window-titlebar"
            minWidth={280}
            minHeight={200}
            bounds="window"
            onMouseDown={() => focusWindow(app.id)}
          >
            <div
              className={`window ${isFocused ? 'window--focused' : 'window--unfocused'}`}
              style={{ width: '100%', height: '100%' }}
            >
              <div className="window-titlebar">
                <div className="traffic-lights">
                  <button
                    className="traffic-light traffic-light--close"
                    onClick={() => closeWindow(app.id)}
                    title="Close"
                  />
                  <button
                    className="traffic-light traffic-light--minimize"
                    onClick={() => minimizeWindow(app.id)}
                    title="Minimize"
                  />
                  <button
                    className="traffic-light traffic-light--maximize"
                    onClick={() => maximizeWindow(app.id, window.innerWidth, window.innerHeight)}
                    title="Maximize"
                  />
                </div>
                <span className="window-title">{app.title}</span>
              </div>
              <div className="window-content">
                <app.component />
              </div>
            </div>
          </Rnd>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
