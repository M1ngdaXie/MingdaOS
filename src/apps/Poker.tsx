export default function Poker() {
  return (
    <div style={{ padding: 40, color: '#fff', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎲</div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Poker</h2>
      <div style={{
        display: 'inline-block', padding: '6px 16px', borderRadius: 20,
        background: 'rgba(255,214,10,0.12)', border: '1px solid rgba(255,214,10,0.3)',
        color: '#ffd60a', fontSize: 12, marginBottom: 16
      }}>🚧 Under Construction</div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
        A Texas Hold'em practice tool is in the works.<br />Check back later.
      </p>
    </div>
  );
}
