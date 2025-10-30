import { create } from 'zustand';
import { generateSchedule, Schedule, ScheduleError } from '@/lib/scheduler';
interface ScheduleState {
  players: string[];
  courtCount: number;
  schedule: Schedule | null;
  error: string | null;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  setCourtCount: (count: number) => void;
  generate: () => void;
  clearSchedule: () => void;
}
export const useScheduleStore = create<ScheduleState>((set, get) => ({
  players: [],
  courtCount: 2,
  schedule: null,
  error: null,
  addPlayer: (name) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      set((state) => {
        if (state.players.find(p => p.toLowerCase() === trimmedName.toLowerCase())) {
          return { error: `Player "${trimmedName}" already exists.` };
        }
        return { players: [...state.players, trimmedName], error: null };
      });
    }
  },
  removePlayer: (name) => {
    set((state) => ({
      players: state.players.filter((p) => p !== name),
      error: null,
    }));
  },
  setCourtCount: (count) => {
    if (isNaN(count) || count < 1) {
      set({ courtCount: 1, error: null });
    } else {
      set({ courtCount: Math.floor(count), error: null });
    }
  },
  generate: () => {
    const { players, courtCount } = get();
    try {
      const newSchedule = generateSchedule(players, courtCount);
      set({ schedule: newSchedule, error: null });
    } catch (e) {
      if (e instanceof ScheduleError) {
        set({ error: e.message, schedule: null });
      } else {
        set({ error: 'An unexpected error occurred.', schedule: null });
      }
    }
  },
  clearSchedule: () => {
    set({ schedule: null, error: null });
  }
}));