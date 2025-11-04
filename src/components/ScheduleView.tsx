import { useScheduleStore } from '@/store/schedule-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
interface FlatMatch {
  round: number;
  court: number;
  team1: [string, string];
  team2: [string, string];
}
export function ScheduleView() {
  const schedule = useScheduleStore((s) => s.schedule);
  if (!schedule) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-border">
        <CalendarDays className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-2xl font-semibold text-foreground">Your Schedule Awaits</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Add players, set the number of courts, and click "Generate Schedule" to see the magic happen!
        </p>
      </div>
    );
  }
  const allMatches: FlatMatch[] = schedule.flatMap(round =>
    round.matches.map(match => ({
      round: round.round,
      ...match
    }))
  );
  const byesByRound = schedule.filter(round => round.byes.length > 0);
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-border/50 overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-2xl font-bold text-rally-blue">Match Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] text-center">Round</TableHead>
                    <TableHead className="w-[80px] text-center">Court</TableHead>
                    <TableHead>Team 1</TableHead>
                    <TableHead>Team 2</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allMatches.map((match, index) => (
                    <TableRow key={`${match.round}-${match.court}-${index}`}>
                      <TableCell className="font-medium text-center">{match.round}</TableCell>
                      <TableCell className="text-center">{match.court}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <Badge variant="default" className="bg-rally-blue/20 text-rally-blue border-rally-blue/30 px-3 py-1 text-sm justify-center">{match.team1[0]}</Badge>
                          <Badge variant="default" className="bg-rally-blue/20 text-rally-blue border-rally-blue/30 px-3 py-1 text-sm justify-center">{match.team1[1]}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <Badge variant="default" className="bg-rally-green/20 text-rally-green border-rally-green/30 px-3 py-1 text-sm justify-center">{match.team2[0]}</Badge>
                          <Badge variant="default" className="bg-rally-green/20 text-rally-green border-rally-green/30 px-3 py-1 text-sm justify-center">{match.team2[1]}</Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {byesByRound.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-lg border-border/50 overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-2xl font-bold text-rally-gray flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Players on Bye
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {byesByRound.map(round => (
                <div key={round.round}>
                  <h4 className="font-semibold text-md mb-2 text-muted-foreground">
                    Round {round.round}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {round.byes.map((player) => (
                      <Badge key={player} variant="outline" className="text-sm">{player}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}