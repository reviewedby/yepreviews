const AVATAR_COLORS = [
  "#e85a5a",
  "#e88a3a",
  "#d4a82a",
  "#3aa657",
  "#2ca39a",
  "#3a79e8",
  "#7a52d4",
  "#c44fa8",
];

function hashString(str: string): number {
  return Array.from(str).reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
}

interface AvatarProps {
  seed: string;
  size?: number;
  color?: string;
  ring?: boolean;
}

export function Avatar({ seed, size = 48, color, ring = false }: AvatarProps) {
  const bg = color || AVATAR_COLORS[hashString(seed) % AVATAR_COLORS.length];
  const initials = seed
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${bg}, ${bg}dd)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        color: "#fff",
        fontSize: size * 0.38,
        flexShrink: 0,
        boxShadow: ring ? `0 0 0 3px #fff, 0 0 0 5px ${bg}` : "none",
        letterSpacing: -0.5,
      }}
    >
      {initials}
    </div>
  );
}
