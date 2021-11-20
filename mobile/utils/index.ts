export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function fadeColor(color: string, fade: number) {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return null;
  }
  const { r, g, b } = rgb;
  return `rgba(${r}, ${b}, ${b}, ${fade})`;
}
