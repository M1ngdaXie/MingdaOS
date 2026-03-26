export default function Chengyu() {
  return (
    <div style={{ padding: '28px 24px', color: '#fff', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🀄</div>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>成语填空</h2>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Chinese Idiom Guessing Game</p>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>Wordle-style · Daily puzzle · 4-character idioms</p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 28 }}>
        Guess the 4-character Chinese idiom (成语) in 6 tries.
        Correct characters turn green, misplaced turn yellow.
        A new puzzle drops every day at midnight.
      </p>
      <a
        href="https://chengyu.m1ngdaxie.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '10px 28px',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #ffd60a, #ff453a)',
          color: '#000',
          fontWeight: 600,
          fontSize: 14,
          textDecoration: 'none',
        }}
      >
        Launch Game →
      </a>
    </div>
  );
}
