/** What falls: katakana, hex and a little punctuation. */
export const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789ABCDEF<>/{}=;";

/** One column per `cell` px of width. Each starts somewhere above the top, so they don't fall in step. */
export function seedColumns(
  width: number,
  cell: number,
  random: () => number = Math.random,
): number[] {
  return Array.from({ length: Math.ceil(width / cell) }, () => -random() * 20);
}

/** Every column drops a row. Past the bottom, a column restarts from the top now and then. */
export function stepColumns(
  columns: readonly number[],
  rows: number,
  random: () => number = Math.random,
): number[] {
  return columns.map((y) => (y > rows && random() > 0.96 ? 0 : y + 1));
}

export function glyph(random: () => number = Math.random): string {
  return GLYPHS[Math.floor(random() * GLYPHS.length)];
}
