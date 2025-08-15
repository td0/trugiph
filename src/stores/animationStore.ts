import { atom } from 'jotai'

// Global state for animation pause/play
export const animationPausedAtom = atom(false)

// Derived atom for animation state with actions
export const animationToggleAtom = atom(
  (get) => get(animationPausedAtom),
  (get, set) => {
    const current = get(animationPausedAtom)
    set(animationPausedAtom, !current)
  }
)
