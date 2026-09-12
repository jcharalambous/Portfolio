/** Vertical centre of each child of a list, relative to the list. */
export function itemCentres(list: HTMLElement): number[] {
  return Array.from(list.children, (child) => {
    const el = child as HTMLElement;
    return el.offsetTop + el.offsetHeight / 2;
  });
}
