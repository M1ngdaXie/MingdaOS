export default function AboutMe() {
  return (
    <div style={{ padding: '24px', color: '#fff', fontFamily: 'var(--font-ui)' }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0a84ff, #bf5af2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, flexShrink: 0
        }}>👤</div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Mingda Xie <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400, fontSize: 14 }}>解明达</span></h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>Backend Developer · CS Master's @ Northeastern University</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Shenzhen-bound · Class of 2026</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {['Java/Spring Cloud', 'Go', 'TypeScript/Bun', 'Redis', 'k3s', 'Microservices'].map(tag => (
          <span key={tag} style={{
            padding: '3px 10px', borderRadius: 20,
            background: 'rgba(10, 132, 255, 0.15)',
            border: '1px solid rgba(10,132,255,0.3)',
            fontSize: 12, color: '#64d2ff'
          }}>{tag}</span>
        ))}
      </div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>
        Backend engineer who runs a personal k3s cluster on Vultr, ships microservices, and builds things that occasionally work in production.
        LeetCode 400+. Pixel art enjoyer. Stardew Valley veteran. Huge fan of 土屋アンナ.
      </p>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
        "I am the dragon scroll, bitch." — Genuine mastery over shortcuts.
      </p>
    </div>
  );
}
