// Slides for the Magnon Raman deck. Each slide is a function returning JSX.
// Slides receive { palette, num, total, eqOn, titleStyle, figVariant }.

const S = {};

// Helper: section divider slide
S.section = ({ palette, num, total, label, kicker, title, subtitle }) => (
  <Frame palette={palette} bg={palette.bgAlt} label={label}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: TYPE_SCALE.small, letterSpacing: "0.24em", textTransform: "uppercase", color: palette.accent, marginBottom: 40 }}>
        {kicker}
      </div>
      <Title palette={palette} style={{ fontSize: TYPE_SCALE.hero, fontWeight: 500, lineHeight: 1.02 }}>{title}</Title>
      {subtitle && (
        <Subtitle palette={palette} style={{ marginTop: 36, maxWidth: 1300 }}>{subtitle}</Subtitle>
      )}
    </div>
    <Footer palette={palette} num={num} total={total} label={label} />
  </Frame>
);

// 01 — Cover
S.cover = ({ palette, num, total }) => (
  <Frame palette={palette} bg={palette.bg} label="01 Cover" padTop={120} padBottom={120}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: TYPE_SCALE.micro, letterSpacing: "0.18em", textTransform: "uppercase", color: palette.inkFaint }}>
        Group seminar &nbsp;·&nbsp; 20 May 2026
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: TYPE_SCALE.micro, letterSpacing: "0.18em", textTransform: "uppercase", color: palette.inkFaint }}>
        Vol. I &nbsp;·&nbsp; No. 01
      </div>
    </div>

    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1500 }}>
      <Eyebrow palette={palette} accent>Theory talk</Eyebrow>
      <h1 style={{
        fontFamily: FONT_SERIF, fontWeight: 500, fontSize: 124, lineHeight: 0.98,
        letterSpacing: "-0.015em", color: palette.ink, margin: 0, textWrap: "balance",
      }}>
        Quantum geometry of magnon bands<br/>
        <span style={{ fontStyle: "italic", color: palette.accent }}>and Raman scattering</span>
      </h1>
      <div style={{ marginTop: 56, display: "flex", gap: 56, alignItems: "baseline" }}>
        <Body palette={palette} style={{ fontSize: TYPE_SCALE.subtitle, fontStyle: "italic", color: palette.inkDim }}>
          Probing Berry curvature with light in monolayer CrI₃
        </Body>
      </div>
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <Body palette={palette} style={{ fontSize: TYPE_SCALE.body, color: palette.ink }}>Ying Shing Liu</Body>
        <Small palette={palette} style={{ marginTop: 8 }}>Theory of magnetic excitations</Small>
      </div>
      <div style={{ textAlign: "right" }}>
        <Mono palette={palette}>I. spin-wave geometry &nbsp;→&nbsp; II. light–matter vertex &nbsp;→&nbsp; III. selection rules</Mono>
      </div>
    </div>
  </Frame>
);

// 02 — Motivation
S.motivation = ({ palette, num, total }) => (
  <Frame palette={palette} label="02 Motivation">
    <Eyebrow palette={palette}>§ 02 &nbsp;·&nbsp; Motivation</Eyebrow>
    <Title palette={palette}>Why look for quantum geometry in magnons?</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.itemGap }}>
        <NumItem palette={palette} n={1}>
          Electrons in topological bands carry <i>Berry curvature</i> and a <i>quantum metric</i>; magnons should too.
        </NumItem>
        <NumItem palette={palette} n={2}>
          Thermal Hall and INS confirm the bands — but couple weakly to band <i>geometry</i>.
        </NumItem>
        <NumItem palette={palette} n={3}>
          Photons couple directly to spin pairs through the <i>Fleury–Loudon</i> vertex.
        </NumItem>
        <NumItem palette={palette} n={4}>
          <span style={{ color: palette.accent }}>Claim:</span> polarized two-magnon Raman is a <i>local</i> probe of magnon Berry curvature and quantum metric.
        </NumItem>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
        <BerryHeatmap palette={palette} w={460} h={420} />
        <Caption palette={palette} num={1}>Sketched Berry curvature Ω(k) of the upper magnon band over the hexagonal BZ — sign-alternating between K and K′ valleys.</Caption>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Motivation" />
  </Frame>
);

// 03 — Outline
S.outline = ({ palette, num, total }) => (
  <Frame palette={palette} label="03 Outline">
    <Eyebrow palette={palette}>§ 03 &nbsp;·&nbsp; Outline</Eyebrow>
    <Title palette={palette}>Three movements</Title>
    <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 56, flex: 1 }}>
      {[
        { n: "I", t: "Quantum geometry of magnon bands", body: "Linear spin-wave theory, Bogoliubov pseudo-unitarity, Berry curvature, quantum metric, Chern numbers." },
        { n: "II", t: "Light–matter coupling for magnons", body: "Fleury–Loudon vertex, two-magnon continuum, polarization channels, geometric form of the Raman response." },
        { n: "III", t: "Probing geometry in CrI₃", body: "Predictions for monolayer CrI₃: polarization-resolved spectra, topological vs trivial diagnostics, comparison with Hall and INS." },
      ].map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 24, borderTop: `1px solid ${palette.rule}` }}>
          <div style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 96, lineHeight: 1, color: palette.accent }}>{s.n}</div>
          <Subtitle palette={palette} style={{ fontStyle: "normal", fontSize: 38, color: palette.ink }}>{s.t}</Subtitle>
          <Small palette={palette}>{s.body}</Small>
        </div>
      ))}
    </div>
    <Footer palette={palette} num={num} total={total} label="Outline" />
  </Frame>
);

// 04 — Section I divider
S.partI = ({ palette, num, total }) =>
  S.section({
    palette, num, total,
    label: "04 Part I",
    kicker: "Part I",
    title: <>Quantum geometry of <span style={{ fontStyle: "italic", color: palette.accent }}>magnon bands</span></>,
    subtitle: "From Holstein–Primakoff bosons to Berry curvature, quantum metric, and Chern numbers."
  });

// 05 — Magnons in LSWT
S.lswt = ({ palette, num, total, eqOn }) => (
  <Frame palette={palette} label="05 LSWT">
    <Eyebrow palette={palette}>§ 05 &nbsp;·&nbsp; Linear spin-wave theory</Eyebrow>
    <Title palette={palette}>Magnons in linear spin-wave theory</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Body palette={palette}>
          Holstein–Primakoff bosons expand <i>S<sup>+</sup></i>, <i>S<sup>−</sup></i>, <i>S<sup>z</sup></i> around the ordered moment. Quadratic terms give a Bogoliubov–de Gennes Hamiltonian:
        </Body>
        {eqOn && (
          <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "32px 40px" }}>
            <Eq display tex={String.raw`H_{\mathrm{LSW}} = \tfrac{1}{2}\sum_{\mathbf{k}} \Psi^\dagger_{\mathbf{k}}\, \mathcal{H}(\mathbf{k})\, \Psi_{\mathbf{k}}, \quad \Psi_{\mathbf{k}} = (a_{\mathbf{k}},\, a^\dagger_{-\mathbf{k}})^T`} palette={palette} />
          </div>
        )}
        <Body palette={palette}>
          Diagonalisation requires a <i>paraunitary</i> transformation <Eq tex="T_{\mathbf{k}}" palette={palette}/> with <Eq tex="T^\dagger \sigma_3 T = \sigma_3" palette={palette}/>; eigenmodes are the magnon Bloch states <Eq tex="|u_n(\mathbf{k})\rangle" palette={palette}/>.
        </Body>
        <Small palette={palette} style={{ color: palette.inkFaint }}>
          Throughout: <Mono palette={palette}>ℏ = 1</Mono>, summed Goldstone branches restored when relevant.
        </Small>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
        <HoneycombLattice palette={palette} size={460} />
        <Caption palette={palette} num={2}>Honeycomb ferromagnet: two sublattices A/B with aligned classical ground state; magnon excitations are bosonic deviations from this state.</Caption>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="LSWT" />
  </Frame>
);

// 06 — Berry curvature
S.berry = ({ palette, num, total, eqOn }) => (
  <Frame palette={palette} label="06 Berry curvature">
    <Eyebrow palette={palette}>§ 06 &nbsp;·&nbsp; Berry curvature</Eyebrow>
    <Title palette={palette}>Berry curvature of magnon bands</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Body palette={palette}>
          Define the Berry connection on the magnon Bloch bundle, with the paraunitary inner product <Eq tex="\langle\!\langle\,\cdot\,|\,\cdot\,\rangle\!\rangle = \langle\,\cdot\,|\sigma_3|\,\cdot\,\rangle" palette={palette}/>:
        </Body>
        {eqOn && (
          <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "28px 36px", display: "flex", flexDirection: "column", gap: 18 }}>
            <Eq display tex={String.raw`\mathcal{A}^n_\mu(\mathbf{k}) = i\,\langle\!\langle u_n(\mathbf{k})|\partial_{k_\mu}|u_n(\mathbf{k})\rangle\!\rangle`} palette={palette} />
            <Eq display tex={String.raw`\Omega^n_{\mu\nu}(\mathbf{k}) = \partial_{k_\mu}\mathcal{A}^n_\nu - \partial_{k_\nu}\mathcal{A}^n_\mu`} palette={palette} />
          </div>
        )}
        <Body palette={palette}>
          For a 2D ferromagnet, only <Eq tex="\Omega_{xy}^n" palette={palette}/> survives. Time-reversal is broken by the magnetic order; <i>any</i> mechanism opening the Dirac point at <i>K</i> generates curvature.
        </Body>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
        <BerryHeatmap palette={palette} w={500} h={460} />
        <Caption palette={palette} num={3}>Ω(k) of the upper band concentrates on K and K′; signs alternate, total flux gives the Chern number.</Caption>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Berry curvature" />
  </Frame>
);

// 07 — Quantum metric
S.metric = ({ palette, num, total, eqOn }) => (
  <Frame palette={palette} label="07 Quantum metric">
    <Eyebrow palette={palette}>§ 07 &nbsp;·&nbsp; Quantum metric</Eyebrow>
    <Title palette={palette}>Quantum metric and Fubini–Study form</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Body palette={palette}>
          The full Fubini–Study tensor on the projective Bloch bundle splits into a real (metric) and imaginary (curvature) part:
        </Body>
        {eqOn && (
          <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "28px 36px", display: "flex", flexDirection: "column", gap: 18 }}>
            <Eq display tex={String.raw`Q^n_{\mu\nu}(\mathbf{k}) = \langle\!\langle\partial_\mu u_n|(1-P_n)|\partial_\nu u_n\rangle\!\rangle`} palette={palette} />
            <Eq display tex={String.raw`Q^n_{\mu\nu} = g^n_{\mu\nu} - \tfrac{i}{2}\,\Omega^n_{\mu\nu}`} palette={palette} />
          </div>
        )}
        <Body palette={palette}>
          The metric <Eq tex="g^n_{\mu\nu}" palette={palette}/> measures the <i>distance</i> between neighbouring Bloch states; the curvature <Eq tex="\Omega^n_{\mu\nu}" palette={palette}/> their <i>twist</i>.
        </Body>
        <Small palette={palette}>
          Inequality <Eq tex="\det g \ge \tfrac{1}{4}|\Omega|^2" palette={palette}/> bounds metric by curvature — non-trivial topology forces non-zero metric.
        </Small>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FSDiagram palette={palette} />
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Quantum metric" />
  </Frame>
);

// Small inline figure for the FS form
const FSDiagram = ({ palette }) => (
  <svg width={520} height={420} viewBox="0 0 520 420">
    <defs>
      <radialGradient id="fsg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor={palette.accent} stopOpacity="0.25" />
        <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="260" cy="210" r="180" fill="url(#fsg)" stroke={palette.rule} />
    <ellipse cx="260" cy="210" rx="180" ry="58" fill="none" stroke={palette.rule} strokeDasharray="4 5" />
    <ellipse cx="260" cy="210" rx="58" ry="180" fill="none" stroke={palette.rule} strokeDasharray="4 5" />
    {/* state vectors */}
    {[0, 60, 130, 220, 310].map((a, i) => {
      const r = 180;
      const x = 260 + r * Math.cos(a * Math.PI / 180);
      const y = 210 - r * Math.sin(a * Math.PI / 180);
      return <g key={i}>
        <line x1="260" y1="210" x2={x} y2={y} stroke={palette.inkDim} strokeWidth="1.5" />
        <circle cx={x} cy={y} r="6" fill={palette.accent} />
      </g>;
    })}
    <text x="260" y="218" textAnchor="middle" fontFamily={FONT_SERIF} fontStyle="italic" fontSize="22" fill={palette.ink}>|u(k)⟩</text>
    <text x="60" y="40" fontFamily={FONT_MONO} fontSize="14" fill={palette.inkFaint}>Projective Hilbert space</text>
    <text x="320" y="120" fontFamily={FONT_SERIF} fontStyle="italic" fontSize="20" fill={palette.accent2}>g_µν</text>
    <text x="160" y="320" fontFamily={FONT_SERIF} fontStyle="italic" fontSize="20" fill={palette.accent}>Ω_µν</text>
  </svg>
);

// 08 — Topology
S.topology = ({ palette, num, total, eqOn }) => (
  <Frame palette={palette} label="08 Topology">
    <Eyebrow palette={palette}>§ 08 &nbsp;·&nbsp; Topology</Eyebrow>
    <Title palette={palette}>Magnon Chern numbers and edge modes</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Body palette={palette}>
          Integrate the Berry curvature over the BZ:
        </Body>
        {eqOn && (
          <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "28px 36px" }}>
            <Eq display tex={String.raw`C_n = \frac{1}{2\pi}\int_{\mathrm{BZ}}\! d^2k\;\Omega^n_{xy}(\mathbf{k}) \in \mathbb{Z}`} palette={palette} />
          </div>
        )}
        <Body palette={palette}>
          Non-zero <Eq tex="C_n" palette={palette}/> ⇒ chiral magnon edge modes, thermal Hall conductivity <Eq tex="\kappa_{xy}" palette={palette}/>, and a non-trivial response to <i>any</i> perturbation that resolves the band geometry.
        </Body>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 16, height: 16, background: palette.accent }}></div>
          <Mono palette={palette} style={{ fontSize: TYPE_SCALE.small }}>C₊ = +1 (upper band)</Mono>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 16, height: 16, background: palette.accent2 }}></div>
          <Mono palette={palette} style={{ fontSize: TYPE_SCALE.small }}>C₋ = −1 (lower band)</Mono>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
        <EdgeMode palette={palette} w={520} h={360} />
        <Caption palette={palette} num={4}>Slab geometry: gapped bulk bands with a chiral magnon edge mode crossing the gap.</Caption>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Topology" />
  </Frame>
);

// 09 — CrI3 platform
S.cri3 = ({ palette, num, total }) => (
  <Frame palette={palette} label="09 CrI3 platform">
    <Eyebrow palette={palette}>§ 09 &nbsp;·&nbsp; Material</Eyebrow>
    <Title palette={palette}>Monolayer CrI₃ as a model platform</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 72, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Body palette={palette}>
          2D honeycomb ferromagnet of Cr<sup>3+</sup> (S = 3/2). Easy-axis anisotropy out of plane; Curie point ≈ 45 K in monolayer.
        </Body>
        <Body palette={palette}>
          Effective spin Hamiltonian:
        </Body>
        <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "24px 32px" }}>
          <Eq display tex={String.raw`H = -J\!\sum_{\langle ij\rangle}\!\mathbf{S}_i\!\cdot\!\mathbf{S}_j \;+\; \sum_{\langle\!\langle ij\rangle\!\rangle}\!\mathbf{D}_{ij}\!\cdot\!(\mathbf{S}_i\!\times\!\mathbf{S}_j)\;-\;A\!\sum_i\!(S^z_i)^2`} palette={palette} />
        </div>
        <Small palette={palette}>
          Next-nearest-neighbour DM term <Eq tex="\mathbf{D}_{ij}" palette={palette}/> is the Haldane mass: it gaps the Dirac magnon at <i>K</i> and gives <Eq tex="C_\pm = \pm 1" palette={palette}/>.
        </Small>
        <Small palette={palette} style={{ color: palette.inkFaint }}>
          Refs.: Chen <i>et al.</i>, PRX (2018); Bonbien <i>et al.</i>, npj QM (2024).
        </Small>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center", alignItems: "center" }}>
        <DMPlaquette palette={palette} w={420} h={320} />
        <Caption palette={palette} num={5}>Next-nearest-neighbour DM vectors on the honeycomb plaquette — the magnonic analogue of Haldane's flux.</Caption>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="CrI₃" />
  </Frame>
);

// 10 — bands of CrI3
S.cri3bands = ({ palette, num, total, figVariant }) => (
  <Frame palette={palette} label="10 CrI3 bands">
    <Eyebrow palette={palette}>§ 10 &nbsp;·&nbsp; Bands</Eyebrow>
    <Title palette={palette}>Magnon bands of monolayer CrI₃</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
        <MagnonBands palette={palette} w={760} h={460} gap={figVariant !== "nogap"} />
        <Caption palette={palette} num={6}>Acoustic and optical magnon bands along Γ–K–M–Γ. DM coupling opens a gap Δ at K; without DM the bands cross at the Dirac point.</Caption>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
        <Body palette={palette}>
          Two bands from two sublattices. INS reports band maximum ≈ 19 meV; gap at K, Δ ≈ 2 meV, drives the topology.
        </Body>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "24px 28px", background: palette.panel, border: `1px solid ${palette.rule}` }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><Mono palette={palette}>J</Mono><Body palette={palette} style={{ fontSize: TYPE_SCALE.small }}>2.13 meV</Body></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><Mono palette={palette}>D</Mono><Body palette={palette} style={{ fontSize: TYPE_SCALE.small }}>0.31 meV</Body></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><Mono palette={palette}>A</Mono><Body palette={palette} style={{ fontSize: TYPE_SCALE.small }}>0.22 meV</Body></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><Mono palette={palette}>Δ_K</Mono><Body palette={palette} style={{ fontSize: TYPE_SCALE.small, color: palette.accent3 }}>≈ 2 meV</Body></div>
        </div>
        <Small palette={palette} style={{ color: palette.inkFaint }}>Tweak: cycle figure to the gapless reference.</Small>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="CrI₃ bands" />
  </Frame>
);

// 11 — Berry curvature in CrI3
S.cri3berry = ({ palette, num, total, figVariant }) => (
  <Frame palette={palette} label="11 CrI3 Berry">
    <Eyebrow palette={palette}>§ 11 &nbsp;·&nbsp; Curvature</Eyebrow>
    <Title palette={palette}>Berry curvature distribution in CrI₃</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, justifyContent: "center" }}>
        <Body palette={palette}>
          Curvature concentrates near <i>K, K′</i> with opposite signs on the two sublattice valleys. The integral over the BZ gives <Eq tex="C_+ = +1" palette={palette}/>.
        </Body>
        <Body palette={palette}>
          The quantum metric <Eq tex="g_{\mu\nu}(\mathbf{k})" palette={palette}/> peaks at the same valleys — locked together by the Fubini–Study inequality.
        </Body>
        <Small palette={palette} style={{ color: palette.inkFaint }}>
          Lower band: identical magnitude, flipped sign. Total Chern across bands sums to zero (no bulk anomaly).
        </Small>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <BerryHeatmap palette={palette} w={300} h={300} sign={1} />
          <Mono palette={palette}>Ω₊(k)</Mono>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <BerryHeatmap palette={palette} w={300} h={300} sign={-1} />
          <Mono palette={palette}>Ω₋(k)</Mono>
        </div>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="CrI₃ curvature" />
  </Frame>
);

// 12 — Part II divider
S.partII = ({ palette, num, total }) =>
  S.section({
    palette, num, total,
    label: "12 Part II",
    kicker: "Part II",
    title: <>Light–matter coupling <span style={{ fontStyle: "italic", color: palette.accent }}>for magnons</span></>,
    subtitle: "How photons couple to two-magnon excitations: the Fleury–Loudon vertex and its geometric content."
  });

// 13 — Fleury-Loudon vertex
S.fleury = ({ palette, num, total, eqOn }) => (
  <Frame palette={palette} label="13 Fleury-Loudon">
    <Eyebrow palette={palette}>§ 13 &nbsp;·&nbsp; Fleury–Loudon</Eyebrow>
    <Title palette={palette}>The Fleury–Loudon Raman vertex</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 72, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Body palette={palette}>
          Off-resonant exchange-light coupling: photons modulate <Eq tex="J_{ij}" palette={palette}/> via virtual hopping. The effective Raman operator is bilinear in spins and quadratic in polarisation:
        </Body>
        {eqOn && (
          <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "28px 36px", display: "flex", flexDirection: "column", gap: 14 }}>
            <Eq display tex={String.raw`\hat{\mathcal{R}} = \sum_{ij}(\boldsymbol{\varepsilon}_i\!\cdot\!\hat{\mathbf{d}}_{ij})(\boldsymbol{\varepsilon}_s^*\!\cdot\!\hat{\mathbf{d}}_{ij})\;\mathbf{S}_i\!\cdot\!\mathbf{S}_j`} palette={palette} />
          </div>
        )}
        <Body palette={palette}>
          Bond directors <Eq tex="\hat{\mathbf{d}}_{ij}" palette={palette}/> encode the lattice. Polarisation pre-factors split <Eq tex="\hat{\mathcal{R}}" palette={palette}/> into <Eq tex="A_{1g}, E_g, T_{2g}" palette={palette}/> components.
        </Body>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center", alignItems: "center" }}>
        <VertexDiagram palette={palette} w={580} h={300} />
        <Caption palette={palette} num={7}>Off-resonant vertex: incoming photon (ε_i, ω_i) and outgoing photon (ε_s, ω_s) couple to a magnon pair via the exchange-modulated bond.</Caption>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Fleury–Loudon" />
  </Frame>
);

// 14 — two-magnon continuum
S.twomag = ({ palette, num, total, eqOn }) => (
  <Frame palette={palette} label="14 Two-magnon">
    <Eyebrow palette={palette}>§ 14 &nbsp;·&nbsp; Two-magnon continuum</Eyebrow>
    <Title palette={palette}>Two-magnon Raman continuum</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Body palette={palette}>
          Acting on the FM ground state, <Eq tex="\hat{\mathcal{R}}" palette={palette}/> creates a magnon pair with total momentum zero:
        </Body>
        {eqOn && (
          <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "28px 36px", display: "flex", flexDirection: "column", gap: 16 }}>
            <Eq display tex={String.raw`I(\omega) \propto \sum_{nm}\!\int\!\frac{d^2k}{(2\pi)^2}\,|M_{nm}(\mathbf{k};\boldsymbol{\varepsilon}_i,\boldsymbol{\varepsilon}_s)|^2\,\delta\!\big(\omega - \omega_n(\mathbf{k}) - \omega_m(-\mathbf{k})\big)`} palette={palette} />
          </div>
        )}
        <Body palette={palette}>
          The matrix element <Eq tex="M_{nm}(\mathbf{k})" palette={palette}/> is the Raman vertex projected onto the magnon Bloch eigenvectors — it carries the band geometry.
        </Body>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
        <RamanLineshape palette={palette} w={680} h={360} />
        <Caption palette={palette} num={8}>Schematic two-magnon spectrum: broad continuum from k-summed pair density, peaked near 2 ω(K).</Caption>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Two-magnon" />
  </Frame>
);

// 15 — Polarization channels
S.polarization = ({ palette, num, total }) => (
  <Frame palette={palette} label="15 Polarization">
    <Eyebrow palette={palette}>§ 15 &nbsp;·&nbsp; Channels</Eyebrow>
    <Title palette={palette}>Polarization channels and selection rules</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
      <Body palette={palette} style={{ maxWidth: 1500 }}>
        Decompose <Eq tex="\hat{\mathcal{R}}" palette={palette}/> into irreducible representations of <i>D<sub>3d</sub></i>. Linear and circular channels project onto different combinations of <Eq tex="g_{\mu\nu}" palette={palette}/> and <Eq tex="\Omega_{\mu\nu}" palette={palette}/>.
      </Body>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 32, flex: 1 }}>
        {[
          { ch: "xx", irrep: "A_{1g} ⊕ E_g", probes: "g_{xx} + g_{yy}" },
          { ch: "xy", irrep: "E_g", probes: "g_{xy}, Ω_{xy} (inter-band)" },
          { ch: "R+L-", irrep: "E_g", probes: "Ω_{xy} (sign-resolved)" },
          { ch: "R+R+", irrep: "A_{2g}", probes: "antisymmetric: pure Ω_{xy}" },
        ].map((c, i) => (
          <div key={i} style={{ border: `1px solid ${palette.rule}`, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16, background: palette.panel }}>
            <PolDiagram palette={palette} w={300} h={180} channel={c.ch} />
            <div>
              <Mono palette={palette} style={{ fontSize: TYPE_SCALE.small, color: palette.accent }}>{c.ch}</Mono>
            </div>
            <Small palette={palette} style={{ fontSize: TYPE_SCALE.small }}>
              <i>{c.irrep}</i>
            </Small>
            <Small palette={palette} style={{ color: palette.inkFaint }}>{c.probes}</Small>
          </div>
        ))}
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Polarization" />
  </Frame>
);

// 16 — Light-matter formalism
S.formalism = ({ palette, num, total, eqOn }) => (
  <Frame palette={palette} label="16 Formalism">
    <Eyebrow palette={palette}>§ 16 &nbsp;·&nbsp; Formalism</Eyebrow>
    <Title palette={palette}>Light–matter coupling formalism for magnons</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, flex: 1, minHeight: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, minWidth: 0 }}>
        <Body palette={palette} style={{ fontSize: TYPE_SCALE.small }}>
          Combine paraunitary diagonalisation with the Fleury–Loudon vertex. Project the bond bilinear onto magnon eigenvectors:
        </Body>
        {eqOn && (
          <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "22px 28px", display: "flex", flexDirection: "column", gap: 14, minWidth: 0, overflow: "hidden" }}>
            <Eq display tex={String.raw`M_{nm}(\mathbf{k}) = \sum_{\delta}\Pi_{\boldsymbol{\varepsilon}_i\boldsymbol{\varepsilon}_s}(\boldsymbol{\delta})\,\langle u_n|\,V(\boldsymbol{\delta})\,|u_m\rangle`} palette={palette} />
            <Eq display tex={String.raw`V(\boldsymbol{\delta}) = \sigma_+\!\otimes\sigma_- + \mathrm{H.c.}`} palette={palette} />
          </div>
        )}
        <Body palette={palette} style={{ fontSize: TYPE_SCALE.small }}>
          For circular polarisation, the bond sum <Eq tex="\Pi" palette={palette}/> picks up phases that reproduce a <i>Berry-connection-like</i> object on the magnon bundle.
        </Body>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center", minWidth: 0 }}>
        <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "32px 36px", minWidth: 0, overflow: "hidden" }}>
          <Mono palette={palette} style={{ fontSize: 18, color: palette.accent3 }}>KEY IDENTITY</Mono>
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
            {eqOn ? (
              <>
                <Eq display tex={String.raw`|M_{nm}^{R\bar{R}}(\mathbf{k})|^2 \;=\; |\boldsymbol{\varepsilon}|^4\,\omega_n\omega_m\;\times`} palette={palette} />
                <Eq display tex={String.raw`\big[\,g^{nm}_{\mu\mu}(\mathbf{k}) \;+\; \tfrac{1}{2}\,\Omega^{nm}_{xy}(\mathbf{k})\,\big]`} palette={palette} />
              </>
            ) : (
              <Body palette={palette} style={{ color: palette.inkFaint, fontStyle: "italic" }}>(equations hidden — toggle in Tweaks)</Body>
            )}
          </div>
          <Small palette={palette} style={{ marginTop: 22, color: palette.inkFaint }}>
            Vertex squared in the cross-circular channel = inter-band quantum geometric tensor, weighted by frequencies.
          </Small>
        </div>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Formalism" />
  </Frame>
);

// 17 — Raman as geometric integral
S.geomintegral = ({ palette, num, total, eqOn }) => (
  <Frame palette={palette} label="17 Geometric integral">
    <Eyebrow palette={palette}>§ 17 &nbsp;·&nbsp; Geometric integral</Eyebrow>
    <Title palette={palette}>Raman response as a geometric integral</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "flex", flexDirection: "column", gap: 36, flex: 1 }}>
      <Body palette={palette} style={{ maxWidth: 1400 }}>
        Inserting the geometric form of the matrix element into <Eq tex="I(\omega)" palette={palette}/>:
      </Body>
      {eqOn && (
        <div style={{ background: palette.panel, border: `1px solid ${palette.rule}`, padding: "36px 48px", display: "flex", flexDirection: "column", gap: 18 }}>
          <Eq display tex={String.raw`\boxed{\;I_{R\bar{R}}(\omega) \propto \int\!\frac{d^2k}{(2\pi)^2}\,\big[g^{+-}_{\mu\mu}(\mathbf{k}) + \tfrac{1}{2}\Omega^{+-}_{xy}(\mathbf{k})\big]\,\delta\!\big(\omega - \omega_+(\mathbf{k}) - \omega_-(\mathbf{k})\big)\;}`} palette={palette} />
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 36 }}>
        {[
          { t: "Linear xx", body: <>Probes <Eq tex="g_{\mu\mu}" palette={palette}/> only. Symmetric, structureless continuum.</> },
          { t: "Linear xy", body: <>Probes off-diagonal metric and the antisymmetric part of the inter-band tensor.</> },
          { t: "Circular RL̄", body: <>Linear in <Eq tex="\Omega_{xy}^{+-}" palette={palette}/>. <span style={{ color: palette.accent3 }}>Sign reverses with magnetisation.</span></> },
        ].map((c, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 20, borderTop: `1px solid ${palette.rule}` }}>
            <Mono palette={palette} style={{ color: palette.accent }}>0{i + 1}</Mono>
            <Subtitle palette={palette} style={{ fontStyle: "normal", fontSize: 32, color: palette.ink }}>{c.t}</Subtitle>
            <Small palette={palette}>{c.body}</Small>
          </div>
        ))}
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Geometric integral" />
  </Frame>
);

// 18 — Part III divider
S.partIII = ({ palette, num, total }) =>
  S.section({
    palette, num, total,
    label: "18 Part III",
    kicker: "Part III",
    title: <>Probing quantum geometry <span style={{ fontStyle: "italic", color: palette.accent }}>with light</span></>,
    subtitle: "Predictions for monolayer CrI₃: lineshape, polarization signatures, and how to tell topological from trivial."
  });

// 19 — Geometric Raman in CrI3
S.cri3raman = ({ palette, num, total }) => (
  <Frame palette={palette} label="19 CrI3 Raman">
    <Eyebrow palette={palette}>§ 19 &nbsp;·&nbsp; CrI₃ prediction</Eyebrow>
    <Title palette={palette}>Geometric Raman response in CrI₃</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
        <RamanLineshape palette={palette} w={700} h={380} channel="xx" twoBumps />
        <Caption palette={palette} num={9}>xx-channel: broad two-magnon continuum with sub-features tracking the joint density of states near the K-gap.</Caption>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, justifyContent: "center" }}>
        <Body palette={palette}>
          Predicted spectrum spans <Eq tex="\omega \in [0,\,2\omega_{\max}]" palette={palette}/>; structure tracks the joint density of states. The K-gap survives as a step at <Eq tex="2\Delta_K" palette={palette}/>.
        </Body>
        <Body palette={palette}>
          Total intensity is geometric: an integral of <Eq tex="g + \Omega" palette={palette}/> against the magnon JDOS.
        </Body>
        <Small palette={palette} style={{ color: palette.inkFaint }}>
          Cf. Bonbien <i>et al.</i>, <i>Direct optical probe of magnon topology in 2D quantum magnets</i> (2024).
        </Small>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="CrI₃ Raman" />
  </Frame>
);

// 20 — Polarization signatures
S.polsig = ({ palette, num, total }) => (
  <Frame palette={palette} label="20 Polarization sig">
    <Eyebrow palette={palette}>§ 20 &nbsp;·&nbsp; Signatures</Eyebrow>
    <Title palette={palette}>Polarization-resolved signatures of Berry curvature</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
        <RamanLineshape palette={palette} w={760} h={200} channel="xx" />
        <RamanLineshape palette={palette} w={760} h={200} channel="xy" />
        <Caption palette={palette} num={10}>xx vs xy two-magnon spectra. The cross-circular asymmetry <Eq tex="I_{R\bar R} - I_{\bar R R}" palette={palette}/> isolates <Eq tex="\Omega_{xy}^{+-}" palette={palette}/>.</Caption>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
        <Body palette={palette}>
          Three distinguishing observables:
        </Body>
        <NumItem palette={palette} n={1}>Cross-circular dichroism that <i>flips with magnetisation</i>.</NumItem>
        <NumItem palette={palette} n={2}>Sub-gap step at <Eq tex="2\Delta_K" palette={palette}/> in xy but not in xx.</NumItem>
        <NumItem palette={palette} n={3}>Integrated weight in RL̄ tracks <Eq tex="C_+" palette={palette}/> through a sum rule.</NumItem>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Signatures" />
  </Frame>
);

// 21 — Topological vs trivial
S.toptrivial = ({ palette, num, total, figVariant }) => (
  <Frame palette={palette} label="21 Top vs trivial">
    <Eyebrow palette={palette}>§ 21 &nbsp;·&nbsp; Diagnostic</Eyebrow>
    <Title palette={palette}>Distinguishing topological vs trivial phases</Title>
    <div style={{ marginTop: SPACING.titleGap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <Mono palette={palette} style={{ color: palette.accent }}>D ≠ 0 (topological)</Mono>
            <RamanLineshape palette={palette} w={360} h={240} channel="xy" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <Mono palette={palette} style={{ color: palette.inkDim }}>D = 0 (trivial)</Mono>
            <RamanLineshape palette={palette} w={360} h={240} channel="xx" />
          </div>
        </div>
        <Caption palette={palette} num={11}>Cross-channel response vanishes when <Eq tex="\mathbf{D} = 0" palette={palette}/>; non-zero DM produces a finite, sign-resolved RL̄ signal.</Caption>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
        <Body palette={palette}>
          A direct experimental test: tune DM via strain or interlayer coupling. The cross-circular Raman intensity scales with <Eq tex="|\mathbf{D}|" palette={palette}/>.
        </Body>
        <Small palette={palette} style={{ color: palette.inkFaint }}>
          Caveat: phonon backgrounds in the same window need careful subtraction.
        </Small>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Diagnostic" />
  </Frame>
);

// 22 — Comparison with INS / thermal Hall
S.compare = ({ palette, num, total }) => (
  <Frame palette={palette} label="22 Comparison">
    <Eyebrow palette={palette}>§ 22 &nbsp;·&nbsp; Compared</Eyebrow>
    <Title palette={palette}>Compared with thermal-Hall and INS probes</Title>
    <div style={{ marginTop: SPACING.titleGap, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <table style={{ borderCollapse: "collapse", fontFamily: FONT_SERIF, fontSize: TYPE_SCALE.small, color: palette.ink, width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${palette.accent}` }}>
            {["Probe", "Couples to", "k-resolution", "Geometric content", "Sign-resolved"].map((h, i) => (
              <th key={i} style={{ textAlign: "left", padding: "20px 16px", fontFamily: FONT_MONO, fontSize: TYPE_SCALE.micro, letterSpacing: "0.1em", color: palette.inkDim, fontWeight: 400, textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["INS", "ω(k), spin–spin S(q,ω)", "full BZ", "indirect (bands only)", "no"],
            ["Thermal Hall κ_{xy}", "BZ-integrated Ω·n(ω)", "none (dc)", "Berry curvature, single number", "yes (sign of κ_{xy})"],
            ["Linear Raman (xx)", "two-magnon JDOS", "none", "metric weight", "no"],
            ["Circular Raman (RL̄)", "joint Ω + g", "none", "k-summed Ω, frequency-resolved", "yes"],
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${palette.rule}` }}>
              {row.map((c, j) => (
                <td key={j} style={{ padding: "20px 16px", fontStyle: j === 0 ? "italic" : "normal", color: j === 0 ? palette.accent : palette.ink }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer palette={palette} num={num} total={total} label="Compared" />
  </Frame>
);

// 23 — Summary
S.summary = ({ palette, num, total }) => (
  <Frame palette={palette} label="23 Summary">
    <Eyebrow palette={palette}>§ 23 &nbsp;·&nbsp; Summary</Eyebrow>
    <Title palette={palette}>Summary</Title>
    <div style={{ marginTop: SPACING.titleGap, flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.itemGap }}>
        <NumItem palette={palette} n={1}>Magnon bands carry a <i>quantum geometric tensor</i>: metric <Eq tex="g" palette={palette}/> + curvature <Eq tex="\Omega" palette={palette}/>.</NumItem>
        <NumItem palette={palette} n={2}>The Fleury–Loudon vertex projects this tensor onto observable Raman intensities.</NumItem>
        <NumItem palette={palette} n={3}>Cross-circular two-magnon Raman is a direct, frequency-resolved probe of <Eq tex="\Omega_{xy}^{+-}" palette={palette}/>.</NumItem>
        <NumItem palette={palette} n={4}>For monolayer CrI₃: predicted dichroism flips with magnetisation and vanishes at <Eq tex="\mathbf{D}=0" palette={palette}/>.</NumItem>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center", padding: "36px 40px", border: `1px solid ${palette.rule}`, background: palette.panel }}>
        <Mono palette={palette} style={{ color: palette.accent }}>WHAT'S NEXT</Mono>
        <Small palette={palette}>Resonant regime: include intermediate excitonic states; finite-temperature corrections via Bogoliubov self-energies.</Small>
        <Small palette={palette}>Beyond CrI₃: kagome ferromagnets, antiferromagnetic honeycombs, frustrated DM systems.</Small>
        <Small palette={palette}>Experimental collaboration: low-T polarised micro-Raman on encapsulated monolayers.</Small>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Summary" />
  </Frame>
);

// 24 — Acknowledgements
S.thanks = ({ palette, num, total }) => (
  <Frame palette={palette} bg={palette.bgAlt} label="24 Thanks">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 56 }}>
      <Eyebrow palette={palette} accent>Thank you</Eyebrow>
      <h1 style={{ fontFamily: FONT_SERIF, fontWeight: 500, fontSize: 132, lineHeight: 1, letterSpacing: "-0.015em", color: palette.ink, margin: 0, fontStyle: "italic" }}>
        Questions?
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 32, maxWidth: 1500 }}>
        <div>
          <Mono palette={palette} style={{ color: palette.accent }}>ACKNOWLEDGEMENTS</Mono>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <Small palette={palette}>Collaborators in the magnetism theory group</Small>
            <Small palette={palette}>Discussions: Raman spectroscopy collaborators</Small>
            <Small palette={palette}>Funding: institutional and project grants</Small>
          </div>
        </div>
        <div>
          <Mono palette={palette} style={{ color: palette.accent }}>KEY REFERENCES</Mono>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <Small palette={palette}>Chen <i>et al.</i>, <i>Topological spin excitations in honeycomb ferromagnet CrI₃</i>, PRX 8, 041028 (2018).</Small>
            <Small palette={palette}>Bonbien <i>et al.</i>, <i>Direct optical probe of magnon topology in 2D quantum magnets</i> (2024).</Small>
            <Small palette={palette}>Fleury & Loudon, <i>Phys. Rev.</i> 166, 514 (1968).</Small>
            <Small palette={palette}>Provost & Vallee, <i>Riemannian structure on manifolds of quantum states</i>, CMP (1980).</Small>
          </div>
        </div>
      </div>
    </div>
    <Footer palette={palette} num={num} total={total} label="Thanks" />
  </Frame>
);

window.S = S;
