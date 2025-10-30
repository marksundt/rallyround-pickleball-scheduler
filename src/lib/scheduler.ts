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
  // Add a dummy player if the count is odd to make pairings easier.
  const dummyPlayer = 'dummy-bye-player-internal';
  if (playerQueue.length % 2 !== 0) {
    playerQueue.push(dummyPlayer);
  }
  const numPlayers = playerQueue.length;
  const numRounds = numPlayers - 1;
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
    // Any remaining players (including the dummy) are on bye for this round.
    byes.push(...roundPlayers.filter(p => p !== dummyPlayer));
    schedule.push({
      round: i + 1,
      matches,
      byes,
    });
    // Rotate players for the next round, keeping the first player fixed.
    const firstPlayer = playerQueue.shift()!;
    const lastPlayer = playerQueue.pop()!;
    playerQueue.unshift(lastPlayer);
    playerQueue.unshift(firstPlayer);
  }
  return schedule;
}