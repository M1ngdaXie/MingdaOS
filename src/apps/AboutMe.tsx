import { APP_VERSION } from '../config/version';

export default function AboutMe() {
  return (
    <div
      style={{ padding: "24px", color: "#fff", fontFamily: "var(--font-ui)" }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--pixel-cyan)",
          marginBottom: 16,
          letterSpacing: 0.5,
        }}
      >
        <span style={{ opacity: 0.5 }}>mingda@doitou-sv:~$ </span>
        whoami<span className="cypher-caret">█</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0a84ff, #bf5af2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            flexShrink: 0,
          }}
        >
          👤
        </div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
            Mingda Xie{" "}
            <span
              style={{
                color: "rgba(255,255,255,0.4)",
                fontWeight: 400,
                fontSize: 14,
              }}
            >
              解明达
            </span>
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
            }}
          >
            Backend Developer · CS Master's @ Northeastern University
          </p>
        </div>
      </div>
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}
      >
        {[
          "Java/Spring Cloud",
          "Go",
          "TypeScript/Bun",
          "Redis",
          "k3s",
          "Microservices",
        ].map((tag) => (
          <span
            key={tag}
            style={{
              padding: "2px 8px",
              borderRadius: 0,
              background: "rgba(0,255,255,0.06)",
              border: "1px solid rgba(0,255,255,0.25)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              color: "var(--pixel-cyan)",
              letterSpacing: 0.3,
            }}
          >
            [{tag}]
          </span>
        ))}
      </div>
      <p
        style={{
          fontSize: 13,
          fontFamily: "var(--font-mono)",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.7,
          marginBottom: 16,
        }}
      >
        <span style={{ color: "rgba(0,255,255,0.45)" }}>// </span>
        Backend engineer. Distributed systems, infra, and the long tail of
        things that go wrong at 3am. Trust the math, not the institution.
      </p>
      {/* <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
        "I am the dragon scroll, bitch." — Genuine mastery over shortcuts.
      </p> */}
      <div
        style={{
          marginTop: 8,
          padding: "12px 14px",
          background: "rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            Signed Identity
          </span>
          <a
            href={`/pgp.asc?v=${APP_VERSION}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              color: "#64d2ff",
              textDecoration: "none",
            }}
          >
            pgp.asc ↗
          </a>
        </div>
        <pre
          style={{
            margin: 0,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.65)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >{`-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

identity: Mingda Xie

email:    xiemingda2020@gmail.com
pgp:      8C50 AD5D CE0E 949E 39FA  F19D 609C 704E 544A 0BFD
-----BEGIN PGP SIGNATURE-----

iJEEARYKADkWIQSNntaQmSEMuam1aJhRySHSOW66vwUCafyKpRsUgAAAAAAEAA5t
YW51MiwyLjUrMS4xMiwwLDMACgkQUckh0jluur8brQD/RzlXBuVuQnGioNsibNDm
Rm85/5ed2BROS5gaH4FCBrQBALjMapIlyCYBNvIZNQX1eFCY/WNfZQXe3woeZYlP
E/IF
=k1lO
-----END PGP SIGNATURE-----`}</pre>
      </div>
    </div>
  );
}
