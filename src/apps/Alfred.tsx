export default function Alfred() {
  return (
    <div style={{ padding: '28px 24px', color: '#fff', fontFamily: 'var(--font-ui)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: 'linear-gradient(135deg, #ff453a, #bf5af2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28
        }}>☠️</div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Alfred</h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Personal AI Agent</p>
        </div>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>
        Alfred is my self-hosted AI agent running on k3s. It handles task management, reminders,
        Telegram notifications, and acts as a personal ops layer for my homelab stack.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['Task & reminder management', 'Telegram bot interface', 'Home automation bridge', 'LLM-powered command routing'].map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            <span style={{ color: '#30d158', fontSize: 10 }}>▶</span> {f}
          </div>
        ))}
      </div>
    </div>
  );
}
