interface YepMarkProps {
  size?: number;
  color?: string;
  dotColor?: string;
  className?: string;
}

export function YepMark({
  size = 22,
  color = "#0e1220",
  dotColor = "#5a5af0",
  className,
}: YepMarkProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontFamily: "Inter, sans-serif",
        fontSize: size,
        fontWeight: 700,
        color,
        letterSpacing: -0.8,
        lineHeight: 1,
      }}
    >
      <span>yep</span>
      <span
        style={{
          width: size * 0.3,
          height: size * 0.3,
          borderRadius: "50%",
          background: dotColor,
          display: "inline-block",
          marginBottom: size * 0.05,
        }}
      />
    </span>
  );
}
