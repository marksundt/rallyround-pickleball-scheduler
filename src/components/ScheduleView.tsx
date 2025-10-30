import { useScheduleStore } from '@/store/schedule-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Shield, Swords, CalendarDays } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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
  return (
    <div className="space-y-8">
      <AnimatePresence>
        {schedule.map((round, index) => (
          <motion.div
            key={round.round}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="shadow-lg border-border/50 overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-2xl font-bold text-rally-blue">Round {round.round}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {round.matches.length > 0 && (
                  <div className="space-y-4">
                    {round.matches.map((match) => (
                      <div key={match.court} className="p-4 border rounded-lg bg-background">
                        <h4 className="font-bold text-lg mb-3 text-foreground">Court {match.court}</h4>
                        <div className="flex items-center justify-center gap-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Badge variant="default" className="bg-rally-blue/20 text-rally-blue border-rally-blue/30 px-3 py-1 text-sm">{match.team1[0]}</Badge>
                            <Badge variant="default" className="bg-rally-blue/20 text-rally-blue border-rally-blue/30 px-3 py-1 text-sm">{match.team1[1]}</Badge>
                          </div>
                          <Swords className="w-6 h-6 text-muted-foreground" />
                          <div className="flex flex-col items-center gap-2">
                            <Badge variant="default" className="bg-rally-green/20 text-rally-green border-rally-green/30 px-3 py-1 text-sm">{match.team2[0]}</Badge>
                            <Badge variant="default" className="bg-rally-green/20 text-rally-green border-rally-green/30 px-3 py-1 text-sm">{match.team2[1]}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {round.matches.length > 0 && round.byes.length > 0 && <Separator />}
                {round.byes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-md mb-2 flex items-center gap-2 text-muted-foreground">
                      <Shield className="w-5 h-5" />
                      Players on Bye
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {round.byes.map((player) => (
                        <Badge key={player} variant="outline" className="text-sm">{player}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}