// Slide primitives: Frame, Title, Eyebrow, Footer, Equation, Figure placeholder, etc.

const Frame = ({ palette, children, padX, padTop, padBottom, bg, label }) => {
  return (
    <div
      data-screen-label={label}
      style={{
        position: "absolute",
        inset: 0,
        background: bg || palette.bg,
        color: palette.ink,
        fontFamily: FONT_SERIF,
        paddingTop: padTop ?? SPACING.paddingTop,
        paddingBottom: padBottom ?? SPACING.paddingBottom,
        paddingLeft: padX ?? SPACING.paddingX,
        paddingRight: padX ?? SPACING.paddingX,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

const Eyebrow = ({ palette, children, accent }) => (
  <div
    style={{
      fontFamily: FONT_MONO,
      fontSize: TYPE_SCALE.micro,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: accent ? palette.accent : palette.inkFaint,
      marginBottom: 18,
    }}
  >
    {children}
  </div>
);

const Title = ({ palette, children, style }) => (
  <h1
    style={{
      fontFamily: FONT_SERIF,
      fontWeight: 500,
      fontSize: TYPE_SCALE.title,
      lineHeight: 1.05,
      letterSpacing: "-0.01em",
      color: palette.ink,
      margin: 0,
      textWrap: "balance",
      ...style,
    }}
  >
    {children}
  </h1>
);

const Subtitle = ({ palette, children, style }) => (
  <h2
    style={{
      fontFamily: FONT_SERIF,
      fontStyle: "italic",
      fontWeight: 400,
      fontSize: TYPE_SCALE.subtitle,
      lineHeight: 1.15,
      color: palette.inkDim,
      margin: 0,
      textWrap: "balance",
      ...style,
    }}
  >
    {children}
  </h2>
);

const Body = ({ palette, children, style }) => (
  <p
    style={{
      fontFamily: FONT_SERIF,
      fontSize: TYPE_SCALE.body,
      lineHeight: 1.4,
      color: palette.ink,
      margin: 0,
      textWrap: "pretty",
      ...style,
    }}
  >
    {children}
  </p>
);

const Small = ({ palette, children, style }) => (
  <p
    style={{
      fontFamily: FONT_SERIF,
      fontSize: TYPE_SCALE.small,
      lineHeight: 1.45,
      color: palette.inkDim,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </p>
);

const Mono = ({ palette, children, style }) => (
  <span
    style={{
      fontFamily: FONT_MONO,
      fontSize: TYPE_SCALE.micro,
      letterSpacing: "0.04em",
      color: palette.inkDim,
      ...style,
    }}
  >
    {children}
  </span>
);

const Rule = ({ palette, vertical, style }) => (
  <div
    style={{
      background: palette.rule,
      ...(vertical
        ? { width: 1, alignSelf: "stretch" }
        : { height: 1, width: "100%" }),
      ...style,
    }}
  />
);

const Footer = ({ palette, num, total, label }) => (
  <div
    style={{
      position: "absolute",
      left: SPACING.paddingX,
      right: SPACING.paddingX,
      bottom: 36,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: FONT_MONO,
      fontSize: 18,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: palette.inkFaint,
    }}
  >
    <span>Quantum geometry of magnon bands &nbsp;·&nbsp; Y. S. Liu &nbsp;·&nbsp; 20 May 2026</span>
    <span>{label}</span>
    <span>
      {String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
  </div>
);

// KaTeX equation renderer. Renders inline using window.katex.renderToString.
const Eq = ({ tex, display, style, palette }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.katex) {
      try {
        ref.current.innerHTML = window.katex.renderToString(tex, {
          displayMode: !!display,
          throwOnError: false,
          output: "html",
        });
      } catch (e) {
        ref.current.textContent = tex;
      }
    }
  }, [tex, display]);
  return (
    <span
      ref={ref}
      style={{
        color: palette ? palette.ink : "inherit",
        fontSize: display ? TYPE_SCALE.eqn : "inherit",
        ...style,
      }}
    />
  );
};

// Striped image placeholder.
const Placeholder = ({ palette, label, w, h, style, children }) => (
  <div
    style={{
      width: w,
      height: h,
      background: `repeating-linear-gradient(135deg, ${palette.panel} 0 14px, ${palette.bgAlt} 14px 28px)`,
      border: `1px solid ${palette.rule}`,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 12,
      color: palette.inkFaint,
      fontFamily: FONT_MONO,
      fontSize: TYPE_SCALE.micro,
      letterSpacing: "0.08em",
      ...style,
    }}
  >
    {children || <span>{label}</span>}
  </div>
);

// Figure caption row.
const Caption = ({ palette, num, children }) => (
  <div
    style={{
      fontFamily: FONT_SERIF,
      fontSize: TYPE_SCALE.small,
      fontStyle: "italic",
      color: palette.inkDim,
      lineHeight: 1.4,
      textWrap: "pretty",
    }}
  >
    {num != null && (
      <span
        style={{
          fontFamily: FONT_MONO,
          fontStyle: "normal",
          color: palette.accent,
          marginRight: 14,
          letterSpacing: "0.08em",
          fontSize: TYPE_SCALE.micro,
        }}
      >
        FIG. {String(num).padStart(2, "0")}
      </span>
    )}
    {children}
  </div>
);

// Numbered list item with monospace index.
const NumItem = ({ palette, n, children, style }) => (
  <div style={{ display: "flex", gap: 28, alignItems: "baseline", ...style }}>
    <span
      style={{
        fontFamily: FONT_MONO,
        fontSize: TYPE_SCALE.small,
        color: palette.accent,
        letterSpacing: "0.08em",
        flexShrink: 0,
        minWidth: 60,
      }}
    >
      {String(n).padStart(2, "0")}
    </span>
    <div style={{ fontFamily: FONT_SERIF, fontSize: TYPE_SCALE.body, lineHeight: 1.4, color: palette.ink, textWrap: "pretty" }}>
      {children}
    </div>
  </div>
);

Object.assign(window, {
  Frame, Eyebrow, Title, Subtitle, Body, Small, Mono, Rule, Footer, Eq, Placeholder, Caption, NumItem,
});
