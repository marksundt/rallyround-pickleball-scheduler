export interface Match {
  court: number;
  team1: [string, string];
  team2: [string, string];
}
export interface Round {
  round: number;
  matches: Match[];
  byes: string[];
}
export type Schedule = Round[];
export class ScheduleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ScheduleError';
  }
}
export function generateSchedule(players: string[], courtCount: number): Schedule {
  if (players.length < 4) {
    throw new ScheduleError('At least 4 players are required to generate a schedule.');
  }
  if (courtCount < 1) {
    throw new ScheduleError('At least 1 court is required.');
  }
  const schedule: Schedule = [];
  let playerQueue = [...players];
  // Simple rotation: move the second player to the end. This ensures new pairings over time.
  // A more complex algorithm could track all pairs, but this is a good start.
  const rotatePlayers = (arr: string[]) => {
    if (arr.length < 2) return arr;
    const newArr = [...arr];
    const first = newArr.shift()!;
    const second = newArr.shift()!;
    newArr.push(second);
    newArr.unshift(first);
    return newArr;
  };
  const numRounds = players.length > 4 ? players.length - 1 : 1;
  for (let i = 0; i < numRounds; i++) {
    const roundPlayers = [...playerQueue];
    const matches: Match[] = [];
    const byes: string[] = [];
    let courtNum = 1;
    while (roundPlayers.length >= 4 && courtNum <= courtCount) {
      const matchPlayers = roundPlayers.splice(0, 4);
      matches.push({
        court: courtNum,
        team1: [matchPlayers[0], matchPlayers[1]],
        team2: [matchPlayers[2], matchPlayers[3]],
      });
      courtNum++;
    }
    byes.push(...roundPlayers);
    schedule.push({
      round: i + 1,
      matches,
      byes,
    });
    playerQueue = rotatePlayers(playerQueue);
  }
  return schedule;
}