const LINKS = [
  { label: 'GitHub', sub: 'github.com/m1ngdaxie', emoji: '🐙', url: 'https://github.com/m1ngdaxie', color: '#30d158' },
  { label: 'Homepage', sub: 'm1ngdaxie.com', emoji: '🌐', url: 'https://m1ngdaxie.com', color: '#0a84ff' },
  { label: '成语填空', sub: 'chengyu.m1ngdaxie.com', emoji: '🀄', url: 'https://chengyu.m1ngdaxie.com', color: '#ff453a' },
  { label: 'Email', sub: 'mingda@m1ngdaxie.com', emoji: '✉️', url: 'mailto:mingda@m1ngdaxie.com', color: '#bf5af2' },
];

export default function Links() {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {LINKS.map(l => (
        <a
          key={l.label}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 16px', borderRadius: 10, textDecoration: 'none',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(255,255,255,0.07)`,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `${l.color}22`, border: `1px solid ${l.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
          }}>{l.emoji}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{l.label}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{l.sub}</div>
          </div>
          <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>→</div>
        </a>
      ))}
    </div>
  );
}
