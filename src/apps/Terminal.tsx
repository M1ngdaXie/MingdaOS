import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

interface Line { type: 'input' | 'output'; text: string; key: number }

const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  help       — show this list',
    '  about      — who is mingda',
    '  whoami     — current identity',
    '  projects   — list projects',
    '  skills     — tech stack',
    '  contact    — contact info',
    '  pgp        — public key fingerprint',
    '  motd       — message of the day',
    '  neofetch   — system info',
    '  clear      — clear terminal',
  ],
  whoami: [
    'mingda',
    'uid=1000  groups=(wheel,crypto,sudoers)',
    'shell=/bin/zsh  tty=/dev/pts/0',
  ],
  pgp: [
    'PGP fingerprint:',
    '  8C50 AD5D CE0E 949E 39FA  F19D 609C 704E 544A 0BFD',
    '',
    'Public key: /pgp.asc',
    'Verify before you trust.',
  ],
  motd: [
    'cypherpunks write code.',
    'privacy is necessary for an open society in the electronic age.',
    'we cannot expect governments, corporations, or other large,',
    'faceless organizations to grant us privacy out of their beneficence.',
    '                                            — eric hughes, 1993',
  ],
  about: [
    'Mingda Xie (解明达)',
    'Backend Developer · CS Master\'s @ Northeastern University',
    'Shenzhen-bound · Class of 2026',
    '',
    'Runs a personal k3s cluster. Writes Go and Java at 2am.',
    'LeetCode 400+. Pixel art. Stardew Valley. 土屋アンナ.',
    '',
    '"I am the dragon scroll, bitch."',
  ],
  projects: [
    'Projects:',
    '  CampusNest     — Spring Cloud housing platform',
    '  Alfred Bot     — Self-hosted AI agent',
    '  rag-email      — Local-first Gmail RAG assistant (Go + Qdrant)',
    '  Collab Platform— Real-time collaborative workspace',
    '  成语填空         — Daily Chinese idiom game',
  ],
  skills: [
    'Tech Stack:',
    '  Languages  : Java, Go, TypeScript, Python',
    '  Frameworks : Spring Cloud, Bun, React',
    '  Infra      : k3s, Nginx, Redis, Docker',
    '  Cloud      : Vultr, Let\'s Encrypt',
    '  Other      : Microservices, WebSocket, LLM APIs',
  ],
  contact: [
    'Contact:',
    '  GitHub : github.com/m1ngdaxie',
    '  Web    : m1ngdaxie.com',
    '  Game   : chengyu.m1ngdaxie.com',
    '  Email  : mingda@m1ngdaxie.com',
  ],
  neofetch: [
    '        .          mingda@doitou-sv',
    '       .:.         ----------------',
    '      .:!:.        OS: MingdaOS 1.0',
    '     .:!!!:.       Host: Vultr VPS',
    '    .::!!!::.      Kernel: Ubuntu 24.04',
    '   .:::!!!:::.     RAM: 4GB',
    '  .::::!!!::::.    Shell: zsh',
    ' .:::::!!!:::::.   Services: Alfred, Chengyu, k3s',
    '',
    '  nginx + k3s + let\'s encrypt',
  ],
};

const PROMPT = 'mingda@doitou-sv ~ % ';

let lineCounter = 0; // module-level counter for stable unique keys
function nextKey() { return ++lineCounter; }

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: 'MingdaOS Terminal v1.0  [secure tty]', key: nextKey() },
    { type: 'output', text: 'kernel: linux 6.x | tls: 1.3 | pgp: 8C50AD5D...0BFD', key: nextKey() },
    { type: 'output', text: 'cypherpunks write code. type "help" for commands.', key: nextKey() },
    { type: 'output', text: '', key: nextKey() },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit() {
    const cmd = input.trim().toLowerCase();
    const inputLine: Line = { type: 'input', text: PROMPT + input, key: nextKey() };

    if (cmd === 'clear') {
      setLines([]);
    } else if (cmd === '') {
      setLines(prev => [...prev, inputLine, { type: 'output', text: '', key: nextKey() }]);
    } else if (COMMANDS[cmd]) {
      const outputLines: Line[] = COMMANDS[cmd].map(l => ({ type: 'output' as const, text: l, key: nextKey() }));
      outputLines.push({ type: 'output', text: '', key: nextKey() });
      setLines(prev => [...prev, inputLine, ...outputLines]);
    } else {
      setLines(prev => [...prev, inputLine,
        { type: 'output', text: `zsh: command not found: ${cmd}`, key: nextKey() },
        { type: 'output', text: '', key: nextKey() }
      ]);
    }

    if (cmd) setHistory(h => [cmd, ...h].slice(0, 50));
    setHistIdx(-1);
    setInput('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      if (history[next] !== undefined) setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  }

  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: '#e2e8f0',
        background: 'transparent',
        padding: '12px 16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'text',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {lines.map((line) => (
          <div key={line.key} style={{
            color: line.type === 'input' ? '#00ffff' : '#e2e8f0',
            whiteSpace: 'pre',
            lineHeight: 1.6,
          }}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
        <span style={{ color: '#00ffff', whiteSpace: 'nowrap' }}>{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e2e8f0',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            caretColor: '#00ffff',
          }}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
