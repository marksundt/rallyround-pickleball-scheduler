import { useEffect } from 'react';
import { useScheduleStore } from '@/store/schedule-store';
import { PlayerManager } from '@/components/PlayerManager';
import { ScheduleView } from '@/components/ScheduleView';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster, toast } from '@/components/ui/sonner';
import { AlertCircle, Pickleball, GanttChartSquare, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
export function HomePage() {
  const players = useScheduleStore((s) => s.players);
  const courtCount = useScheduleStore((s) => s.courtCount);
  const setCourtCount = useScheduleStore((s) => s.setCourtCount);
  const generate = useScheduleStore((s) => s.generate);
  const error = useScheduleStore((s) => s.error);
  const schedule = useScheduleStore((s) => s.schedule);
  const clearSchedule = useScheduleStore((s) => s.clearSchedule);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleGenerate = () => {
    if (schedule) {
      clearSchedule();
    }
    generate();
  };
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 text-foreground">
        <ThemeToggle className="fixed top-4 right-4" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16">
            <header className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="inline-block"
              >
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50 flex items-center gap-4 justify-center">
                  <Pickleball className="w-12 h-12 text-rally-green" />
                  RallyRound
                </h1>
              </motion.div>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                A visually stunning round-robin scheduler for doubles pickleball, designed to create balanced and varied matchups.
              </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <aside className="md:col-span-1 space-y-8">
                <PlayerManager />
                <Card className="shadow-lg border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <GanttChartSquare className="w-6 h-6 text-rally-blue" />
                      Game Setup
                    </CardTitle>
                    <CardDescription>Configure the number of courts available.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="courts" className="font-semibold">Number of Courts</Label>
                      <Input
                        id="courts"
                        type="number"
                        min="1"
                        value={courtCount}
                        onChange={(e) => setCourtCount(parseInt(e.target.value, 10))}
                        className="text-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="w-full text-lg font-bold py-6 bg-rally-green hover:bg-rally-green/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleGenerate}
                    disabled={players.length < 4}
                  >
                    {schedule ? <Trash2 className="mr-2 h-5 w-5" /> : <GanttChartSquare className="mr-2 h-5 w-5" />}
                    {schedule ? 'Clear & Regenerate' : 'Generate Schedule'}
                  </Button>
                </motion.div>
                <AnimatePresence>
                  {players.length < 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-center gap-2 text-sm text-destructive p-3 bg-destructive/10 rounded-md">
                        <AlertCircle className="h-5 w-5" />
                        <span>A minimum of 4 players is required.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </aside>
              <section className="md:col-span-2">
                <ScheduleView />
              </section>
            </div>
          </div>
        </main>
        <footer className="text-center py-6 text-muted-foreground text-sm">
          Built with ❤️ at Cloudflare
        </footer>
      </div>
      <Toaster richColors closeButton />
    </>
  );
}