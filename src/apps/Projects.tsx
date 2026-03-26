const PROJECTS = [
  { name: 'CampusNest', desc: 'Campus housing platform with Spring Cloud microservices, Redis caching, and k3s deployment.', tags: ['Java', 'Spring Cloud', 'Redis', 'k3s'], color: '#0a84ff' },
  { name: 'Alfred Bot', desc: 'Personal AI agent — task management, reminders, home automation bridge.', tags: ['Go', 'TypeScript', 'Bun'], color: '#bf5af2' },
  { name: 'Warden / Bastion', desc: 'Self-hosted auth and proxy layer running on k3s with Let\'s Encrypt.', tags: ['Nginx', 'k3s', 'VLESS'], color: '#30d158' },
  { name: 'Collab Platform', desc: 'Real-time collaborative workspace with WebSocket rooms and conflict resolution.', tags: ['TypeScript', 'Bun', 'WebSocket'], color: '#ffd60a' },
  { name: '成语填空', desc: 'Daily Chinese idiom guessing game — Wordle-style, runs at chengyu.m1ngdaxie.com.', tags: ['React', 'TypeScript'], color: '#ff453a' },
];

export default function Projects() {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {PROJECTS.map(p => (
        <div key={p.name} style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10,
          padding: '14px 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
            <span style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{p.name}</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 8 }}>{p.desc}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontSize: 11, padding: '2px 8px', borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
