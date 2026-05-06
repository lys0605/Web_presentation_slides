// Inline SVG figures: Brillouin zones, magnon bands, lattices, polarization diagrams.
// All take `palette` and produce stylized but accurate sketches.
// No copyrighted imagery — these are original schematic diagrams.

const HoneycombLattice = ({ palette, size = 420, accent = true, showSpins = true }) => {
  const a = 60; // bond length in svg units
  const cx = size / 2;
  const cy = size / 2;
  // generate honeycomb vertices using axial coords
  const sites = [];
  const bonds = [];
  for (let i = -3; i <= 3; i++) {
    for (let j = -3; j <= 3; j++) {
      const x0 = cx + i * a * 1.5;
      const y0 = cy + j * a * Math.sqrt(3) + (i % 2) * (a * Math.sqrt(3) / 2);
      // sublattice A at (x0, y0), B at (x0+a, y0)
      sites.push({ x: x0, y: y0, sub: "A" });
      sites.push({ x: x0 + a, y: y0, sub: "B" });
      // bonds
      bonds.push([{ x: x0, y: y0 }, { x: x0 + a, y: y0 }]);
      bonds.push([{ x: x0 + a, y: y0 }, { x: x0 + 1.5 * a, y: y0 + a * Math.sqrt(3) / 2 }]);
      bonds.push([{ x: x0 + a, y: y0 }, { x: x0 + 1.5 * a, y: y0 - a * Math.sqrt(3) / 2 }]);
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <clipPath id="hc-clip">
          <circle cx={cx} cy={cy} r={size / 2 - 10} />
        </clipPath>
      </defs>
      <g clipPath="url(#hc-clip)">
        {bonds.map((b, i) => (
          <line
            key={i}
            x1={b[0].x} y1={b[0].y} x2={b[1].x} y2={b[1].y}
            stroke={palette.rule} strokeWidth={1.4}
          />
        ))}
        {sites.map((s, i) => (
          <circle
            key={i}
            cx={s.x} cy={s.y} r={s.sub === "A" ? 7 : 7}
            fill={s.sub === "A" ? palette.accent : palette.accent2}
            opacity={0.95}
          />
        ))}
        {showSpins && sites.filter((_, i) => i % 5 === 0).slice(0, 8).map((s, i) => (
          <line
            key={`sp-${i}`}
            x1={s.x} y1={s.y - 4} x2={s.x} y2={s.y - 22}
            stroke={palette.accent3} strokeWidth={2}
            markerEnd="url(#arr)"
          />
        ))}
      </g>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={palette.accent3} />
        </marker>
      </defs>
      <circle cx={cx} cy={cy} r={size / 2 - 10} fill="none" stroke={palette.rule} strokeWidth={1} />
    </svg>
  );
};

// Schematic 2D magnon band structure along Γ-K-M-Γ
const MagnonBands = ({ palette, w = 640, h = 360, gap = true, highlightK = true }) => {
  const pad = 56;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  // Two bands (acoustic + optical). Sample along path.
  const N = 200;
  const ptsLow = [];
  const ptsHigh = [];
  const Delta = gap ? 0.55 : 0; // gap at K
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    // Mock dispersion: low band rises, optical band ~flat with a dip near K
    // K at t=1/3, M at t=2/3
    const distK = Math.min(Math.abs(t - 1/3), Math.abs(t - 1));
    const eLow = 1.6 + 0.9 * Math.cos(Math.PI * (t - 1/3) * 1.6) - 0.4 * Math.cos(Math.PI * t * 2) - 0.2;
    const eHigh = 3.2 - 0.4 * Math.cos(Math.PI * (t - 1/3) * 2) + 0.5 * Math.exp(-distK * 12) * Delta;
    // ensure gap
    const lowAtK = (t > 1/3 - 0.04 && t < 1/3 + 0.04) ? 2.4 - Delta/2 : eLow;
    const highAtK = (t > 1/3 - 0.04 && t < 1/3 + 0.04) ? 2.4 + Delta/2 : eHigh;
    ptsLow.push([t, Math.max(0.2, lowAtK)]);
    ptsHigh.push([t, Math.max(highAtK, lowAtK + (gap ? 0.4 : 0.05))]);
  }
  const eMin = 0;
  const eMax = 4;
  const xs = (t) => pad + t * innerW;
  const ys = (e) => pad + innerH - (e - eMin) / (eMax - eMin) * innerH;
  const path = (pts) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${xs(p[0])} ${ys(p[1])}`).join(" ");

  const ticks = [
    { t: 0, label: "Γ" },
    { t: 1/3, label: "K" },
    { t: 2/3, label: "M" },
    { t: 1, label: "Γ" },
  ];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {/* axes */}
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke={palette.rule} strokeWidth={1} />
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke={palette.rule} strokeWidth={1} />
      {/* tick lines */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={xs(t.t)} y1={pad} x2={xs(t.t)} y2={h - pad}
            stroke={palette.rule} strokeWidth={0.5} strokeDasharray="3 4"
          />
          <text
            x={xs(t.t)} y={h - pad + 26}
            fontFamily={FONT_SERIF} fontSize={20} fontStyle="italic"
            fill={palette.inkDim} textAnchor="middle"
          >
            {t.label}
          </text>
        </g>
      ))}
      {/* y-axis label */}
      <text
        x={pad - 36} y={pad + 12}
        fontFamily={FONT_SERIF} fontStyle="italic" fontSize={20}
        fill={palette.inkDim}
      >
        ω
      </text>
      {/* bands */}
      <path d={path(ptsLow)} fill="none" stroke={palette.accent} strokeWidth={3} />
      <path d={path(ptsHigh)} fill="none" stroke={palette.accent2} strokeWidth={3} />
      {/* highlight gap at K */}
      {highlightK && gap && (
        <g>
          <circle cx={xs(1/3)} cy={ys(2.4)} r={26} fill="none" stroke={palette.accent3} strokeWidth={1.5} strokeDasharray="3 3" />
          <text
            x={xs(1/3) + 32} y={ys(2.4) - 12}
            fontFamily={FONT_MONO} fontSize={16}
            fill={palette.accent3}
          >
            Δ ≠ 0
          </text>
        </g>
      )}
      {/* legend */}
      <g transform={`translate(${w - pad - 160}, ${pad + 8})`}>
        <line x1={0} y1={6} x2={28} y2={6} stroke={palette.accent} strokeWidth={3} />
        <text x={36} y={11} fontFamily={FONT_MONO} fontSize={14} fill={palette.inkDim}>acoustic</text>
        <line x1={0} y1={28} x2={28} y2={28} stroke={palette.accent2} strokeWidth={3} />
        <text x={36} y={33} fontFamily={FONT_MONO} fontSize={14} fill={palette.inkDim}>optical</text>
      </g>
    </svg>
  );
};

// 2D Berry curvature heatmap over BZ, with hot spots near K and K'
const BerryHeatmap = ({ palette, w = 380, h = 360, sign = 1 }) => {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) / 2 - 30;
  // Hexagonal BZ: K points at angles 0, 60, 120...
  const Kpts = [];
  for (let k = 0; k < 6; k++) {
    const a = k * Math.PI / 3;
    Kpts.push([cx + r * Math.cos(a), cy + r * Math.sin(a), k % 2 === 0 ? "K" : "K'"]);
  }
  // grid of dots colored by mock Omega(k)
  const dots = [];
  const step = 12;
  for (let x = -r; x <= r; x += step) {
    for (let y = -r; y <= r; y += step) {
      // inside hexagon test
      const px = x;
      const py = y;
      const ax = Math.abs(px), ay = Math.abs(py);
      const inside = ax <= r * Math.sqrt(3) / 2 && ay <= r - ax / Math.sqrt(3);
      if (!inside) continue;
      // Omega: sum of gaussians at K (positive) and K' (negative)
      let omega = 0;
      for (let k = 0; k < 6; k++) {
        const a = k * Math.PI / 3;
        const kx = r * Math.cos(a);
        const ky = r * Math.sin(a);
        const d2 = (px - kx) ** 2 + (py - ky) ** 2;
        omega += (k % 2 === 0 ? 1 : -1) * Math.exp(-d2 / ((r * 0.35) ** 2));
      }
      omega *= sign;
      const mag = Math.min(1, Math.abs(omega));
      const color = omega >= 0 ? palette.pos : palette.neg;
      dots.push({ x: cx + px, y: cy + py, color, alpha: mag * 0.85 + 0.05 });
    }
  }
  // hex outline
  const hex = [];
  for (let k = 0; k < 6; k++) {
    const a = k * Math.PI / 3;
    hex.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={5} fill={d.color} opacity={d.alpha} />
      ))}
      <polygon
        points={hex.map(p => p.join(",")).join(" ")}
        fill="none" stroke={palette.rule} strokeWidth={1.4}
      />
      {Kpts.map((k, i) => (
        <g key={i}>
          <circle cx={k[0]} cy={k[1]} r={4} fill={palette.ink} />
          <text
            x={k[0] + (k[0] > cx ? 10 : -22)} y={k[1] + (k[1] > cy ? 16 : -8)}
            fontFamily={FONT_SERIF} fontStyle="italic" fontSize={16}
            fill={palette.ink}
          >
            {k[2]}
          </text>
        </g>
      ))}
      <text x={cx} y={cy - 4} fontFamily={FONT_SERIF} fontStyle="italic" fontSize={16} fill={palette.inkDim} textAnchor="middle">Γ</text>
      <circle cx={cx} cy={cy} r={3} fill={palette.ink} />
    </svg>
  );
};

// Polarization channel diagram: incoming/outgoing light
const PolDiagram = ({ palette, w = 360, h = 240, channel = "xx" }) => {
  const cx = w / 2;
  const cy = h / 2;
  const angles = {
    xx: [0, 0],
    xy: [0, 90],
    "R+L-": [45, -45],
    "R-R+": [45, 45],
  }[channel] || [0, 0];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <circle cx={cx} cy={cy} r={70} fill="none" stroke={palette.rule} strokeWidth={1} />
      {/* incoming */}
      <line x1={cx - 110} y1={cy} x2={cx - 80} y2={cy} stroke={palette.accent} strokeWidth={2} markerEnd="url(#pa1)" />
      {/* polarization vector in */}
      <line
        x1={cx - 80} y1={cy}
        x2={cx - 80 + 30 * Math.cos(angles[0] * Math.PI / 180)}
        y2={cy - 30 * Math.sin(angles[0] * Math.PI / 180)}
        stroke={palette.accent} strokeWidth={3}
      />
      <line
        x1={cx - 80} y1={cy}
        x2={cx - 80 - 30 * Math.cos(angles[0] * Math.PI / 180)}
        y2={cy + 30 * Math.sin(angles[0] * Math.PI / 180)}
        stroke={palette.accent} strokeWidth={3}
      />
      {/* outgoing */}
      <line x1={cx + 80} y1={cy} x2={cx + 110} y2={cy} stroke={palette.accent2} strokeWidth={2} markerEnd="url(#pa2)" />
      <line
        x1={cx + 80} y1={cy}
        x2={cx + 80 + 30 * Math.cos(angles[1] * Math.PI / 180)}
        y2={cy - 30 * Math.sin(angles[1] * Math.PI / 180)}
        stroke={palette.accent2} strokeWidth={3}
      />
      <line
        x1={cx + 80} y1={cy}
        x2={cx + 80 - 30 * Math.cos(angles[1] * Math.PI / 180)}
        y2={cy + 30 * Math.sin(angles[1] * Math.PI / 180)}
        stroke={palette.accent2} strokeWidth={3}
      />
      {/* sample */}
      <rect x={cx - 16} y={cy - 16} width={32} height={32} fill={palette.panel} stroke={palette.rule} />
      <defs>
        <marker id="pa1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={palette.accent} />
        </marker>
        <marker id="pa2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={palette.accent2} />
        </marker>
      </defs>
      <text x={cx} y={h - 14} textAnchor="middle" fontFamily={FONT_MONO} fontSize={16} fill={palette.inkDim} letterSpacing="0.12em">
        {channel.toUpperCase()}
      </text>
      <text x={cx - 100} y={cy - 50} fontFamily={FONT_MONO} fontSize={12} fill={palette.inkFaint}>ω_i</text>
      <text x={cx + 90} y={cy - 50} fontFamily={FONT_MONO} fontSize={12} fill={palette.inkFaint}>ω_s</text>
    </svg>
  );
};

// Two-magnon Raman lineshape (mock)
const RamanLineshape = ({ palette, w = 640, h = 320, twoBumps = false, channel = "xx" }) => {
  const pad = 50;
  const N = 240;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const pts = [];
  for (let i = 0; i < N; i++) {
    const x = i / (N - 1);
    // baseline
    let y = 0.05 + 0.04 * Math.exp(-(((x - 0.05) / 0.04) ** 2));
    // two-magnon continuum
    y += 0.55 * Math.exp(-(((x - 0.55) / 0.18) ** 2));
    if (twoBumps) {
      y += 0.35 * Math.exp(-(((x - 0.78) / 0.06) ** 2));
    }
    // small noise
    y += 0.012 * Math.sin(i * 0.7) * Math.cos(i * 0.21);
    pts.push([x, y]);
  }
  const xs = (t) => pad + t * innerW;
  const ys = (e) => pad + innerH - e / 1.05 * innerH;
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${xs(p[0]).toFixed(1)} ${ys(p[1]).toFixed(1)}`).join(" ");
  const fillD = `${d} L ${xs(1)} ${ys(0)} L ${xs(0)} ${ys(0)} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke={palette.rule} strokeWidth={1} />
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke={palette.rule} strokeWidth={1} />
      <path d={fillD} fill={channel === "xy" ? palette.accent2 : palette.accent} opacity={0.16} />
      <path d={d} fill="none" stroke={channel === "xy" ? palette.accent2 : palette.accent} strokeWidth={2.5} />
      <text x={w - pad} y={h - pad + 28} fontFamily={FONT_SERIF} fontStyle="italic" fontSize={20} fill={palette.inkDim} textAnchor="end">
        Raman shift ω
      </text>
      <text x={pad - 18} y={pad + 14} fontFamily={FONT_SERIF} fontStyle="italic" fontSize={20} fill={palette.inkDim} textAnchor="end">
        I(ω)
      </text>
      <text x={w - pad - 8} y={pad + 22} fontFamily={FONT_MONO} fontSize={16} fill={palette.inkDim} textAnchor="end" letterSpacing="0.1em">
        {channel.toUpperCase()}
      </text>
    </svg>
  );
};

// DM vector arrow on a plaquette
const DMPlaquette = ({ palette, w = 360, h = 280 }) => {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {/* hexagon plaquette */}
      <polygon
        points={Array.from({ length: 6 }).map((_, i) => {
          const a = i * Math.PI / 3 - Math.PI / 6;
          return `${w/2 + 90 * Math.cos(a)},${h/2 + 90 * Math.sin(a)}`;
        }).join(" ")}
        fill="none" stroke={palette.rule} strokeWidth={1.4}
      />
      {/* sites */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = i * Math.PI / 3 - Math.PI / 6;
        return (
          <circle key={i} cx={w/2 + 90 * Math.cos(a)} cy={h/2 + 90 * Math.sin(a)} r={8}
            fill={i % 2 === 0 ? palette.accent : palette.accent2} />
        );
      })}
      {/* DM arrows on next-nearest bonds (curved) */}
      {Array.from({ length: 3 }).map((_, i) => {
        const a1 = i * 2 * Math.PI / 3 - Math.PI / 6;
        const a2 = a1 + Math.PI / 3;
        const x1 = w/2 + 90 * Math.cos(a1);
        const y1 = h/2 + 90 * Math.sin(a1);
        const x2 = w/2 + 90 * Math.cos(a2 + Math.PI / 3);
        const y2 = h/2 + 90 * Math.sin(a2 + Math.PI / 3);
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} Q ${w/2} ${h/2} ${x2} ${y2}`}
            fill="none" stroke={palette.accent3} strokeWidth={2}
            strokeDasharray="4 4"
            markerEnd="url(#dm)"
          />
        );
      })}
      {/* center label */}
      <text x={w/2} y={h/2 + 6} textAnchor="middle" fontFamily={FONT_SERIF} fontStyle="italic" fontSize={22} fill={palette.accent3}>
        D_ij
      </text>
      <defs>
        <marker id="dm" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill={palette.accent3} />
        </marker>
      </defs>
    </svg>
  );
};

// Edge mode schematic (slab, chiral edge state)
const EdgeMode = ({ palette, w = 480, h = 320 }) => {
  const pad = 40;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x={pad} y={pad} width={w - pad * 2} height={h - pad * 2} fill={palette.panel} stroke={palette.rule} />
      {/* bulk band gap shading */}
      <rect x={pad} y={pad + 60} width={w - pad * 2} height={(h - pad * 2) - 120} fill={palette.bgAlt} />
      {/* bulk bands */}
      <text x={pad + 14} y={pad + 36} fontFamily={FONT_SERIF} fontStyle="italic" fontSize={18} fill={palette.inkDim}>upper band</text>
      <text x={pad + 14} y={h - pad - 20} fontFamily={FONT_SERIF} fontStyle="italic" fontSize={18} fill={palette.inkDim}>lower band</text>
      <text x={w/2} y={h/2 + 6} textAnchor="middle" fontFamily={FONT_SERIF} fontStyle="italic" fontSize={20} fill={palette.inkFaint}>gap</text>
      {/* chiral edge mode */}
      <path
        d={`M ${pad} ${h - pad - 60} Q ${w/2} ${pad + 80}, ${w - pad} ${pad + 60}`}
        fill="none" stroke={palette.accent} strokeWidth={3}
      />
      <text x={w - pad - 8} y={pad + 56} textAnchor="end" fontFamily={FONT_MONO} fontSize={16} fill={palette.accent}>edge mode</text>
      {/* arrows of propagation */}
      <line x1={pad + 60} y1={h - pad - 50} x2={pad + 90} y2={h - pad - 56}
        stroke={palette.accent} strokeWidth={2} markerEnd="url(#em)" />
      <defs>
        <marker id="em" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={palette.accent} />
        </marker>
      </defs>
    </svg>
  );
};

// Light-matter coupling vertex sketch (Feynman-ish)
const VertexDiagram = ({ palette, w = 520, h = 260 }) => {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {/* incoming photon (wavy) */}
      <WavyLine palette={palette} x1={40} y1={40} x2={w/2 - 40} y2={h/2} color={palette.accent} />
      {/* outgoing photon (wavy) */}
      <WavyLine palette={palette} x1={w/2 + 40} y1={h/2} x2={w - 40} y2={40} color={palette.accent2} />
      {/* magnon line out (straight with arrow) */}
      <line x1={w/2} y1={h/2} x2={w - 40} y2={h - 40} stroke={palette.ink} strokeWidth={2} markerEnd="url(#mg)" />
      <line x1={w/2} y1={h/2} x2={40} y2={h - 40} stroke={palette.ink} strokeWidth={2} markerEnd="url(#mg)" />
      {/* vertex blob */}
      <circle cx={w/2} cy={h/2} r={12} fill={palette.accent3} />
      <text x={w/2 + 18} y={h/2 + 6} fontFamily={FONT_SERIF} fontStyle="italic" fontSize={20} fill={palette.accent3}>R̂</text>
      {/* labels */}
      <text x={50} y={36} fontFamily={FONT_MONO} fontSize={14} fill={palette.accent}>ε_i, ω_i</text>
      <text x={w - 110} y={36} fontFamily={FONT_MONO} fontSize={14} fill={palette.accent2}>ε_s, ω_s</text>
      <text x={50} y={h - 24} fontFamily={FONT_MONO} fontSize={14} fill={palette.ink}>magnon q</text>
      <text x={w - 130} y={h - 24} fontFamily={FONT_MONO} fontSize={14} fill={palette.ink}>magnon −q</text>
      <defs>
        <marker id="mg" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill={palette.ink} />
        </marker>
      </defs>
    </svg>
  );
};

const WavyLine = ({ x1, y1, x2, y2, color }) => {
  const dx = x2 - x1, dy = y2 - y1;
  const L = Math.hypot(dx, dy);
  const N = Math.max(8, Math.round(L / 14));
  const nx = -dy / L, ny = dx / L;
  let d = `M ${x1} ${y1}`;
  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const cx = x1 + dx * (t - 1 / (2 * N));
    const cy = y1 + dy * (t - 1 / (2 * N));
    const sign = i % 2 === 0 ? 1 : -1;
    const px = cx + sign * nx * 6;
    const py = cy + sign * ny * 6;
    d += ` Q ${px} ${py} ${x1 + dx * t} ${y1 + dy * t}`;
  }
  return <path d={d} fill="none" stroke={color} strokeWidth={2} />;
};

Object.assign(window, {
  HoneycombLattice, MagnonBands, BerryHeatmap, PolDiagram,
  RamanLineshape, DMPlaquette, EdgeMode, VertexDiagram,
});
