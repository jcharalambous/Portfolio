import { useEffect } from "react";

/**
 * Keeps the address bar's #fragment in step with the section the reader is on,
 * without adding history entries. `null` means the first section, so the
 * fragment is removed and a refresh from the top starts at the top.
 * `undefined` means "not measured yet": leave the address alone.
 */
export function useAddressSync(sectionId: string | null | undefined): void {
  useEffect(() => {
    if (sectionId === undefined) return;
    const wanted = sectionId ? `#${sectionId}` : "";
    if (window.location.hash === wanted) return;
    const url = window.location.pathname + window.location.search + wanted;
    window.history.replaceState(window.history.state, "", url);
  }, [sectionId]);
}
