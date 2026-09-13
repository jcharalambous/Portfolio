/** Horizontal centre of each child of a track, measured from the track's scroll origin. */
export function childCentres(track: HTMLElement): number[] {
  return Array.from(track.children, (child) => {
    const el = child as HTMLElement;
    return el.offsetLeft + el.offsetWidth / 2;
  });
}

/** Which centre is closest to a point. Ties go to the earlier one; no centres is a safe zero. */
export function nearestIndex(centres: readonly number[], point: number): number {
  let index = 0;
  let best = Infinity;
  centres.forEach((centre, i) => {
    const distance = Math.abs(centre - point);
    if (distance < best) {
      best = distance;
      index = i;
    }
  });
  return index;
}

/** The scroll position that puts a centre in the middle of a viewport of the given width. */
export function scrollLeftFor(centre: number, viewportWidth: number): number {
  return centre - viewportWidth / 2;
}
