import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { useScheduleStore } from '@/store/schedule-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatePresence, motion } from 'framer-motion';
export function PlayerManager() {
  const players = useScheduleStore((s) => s.players);
  const addPlayer = useScheduleStore((s) => s.addPlayer);
  const removePlayer = useScheduleStore((s) => s.removePlayer);
  const [newPlayerName, setNewPlayerName] = useState('');
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };
  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <UserPlus className="w-6 h-6 text-rally-blue" />
          Manage Players
        </CardTitle>
        <CardDescription>Add or remove players for the game.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddPlayer} className="flex gap-2 mb-4">
          <Input
            placeholder="Enter player name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            aria-label="New player name"
          />
          <Button type="submit" className="bg-rally-blue hover:bg-rally-blue/90 text-white">
            Add
          </Button>
        </form>
        <div className="space-y-2 min-h-[60px]">
          <AnimatePresence>
            {players.map((player) => (
              <motion.div
                key={player}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="text-md font-medium py-1 px-3 flex justify-between items-center w-full bg-secondary hover:bg-muted"
                >
                  <span>{player}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-destructive/20"
                    onClick={() => removePlayer(player)}
                    aria-label={`Remove ${player}`}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}