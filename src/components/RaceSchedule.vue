<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { dummyRaceSchedule } from '@/data/races'
</script>

<template>
  <Card class="h-[calc(100vh-8rem)] flex flex-col">
    <CardHeader>
      <CardTitle class="text-center">Program</CardTitle>
    </CardHeader>
    <CardContent class="flex-1 overflow-hidden">
      <div class="h-full overflow-y-auto space-y-4">
        <div
          v-for="round in dummyRaceSchedule"
          :key="round.roundNumber"
          class="space-y-2"
          :class="{
            'opacity-60': round.status === 'completed',
            'opacity-40': round.status === 'pending'
          }"
        >
          <div
            class="font-semibold text-center"
            :class="{
              'text-muted-foreground': round.status === 'pending',
              'text-green-600 font-bold': round.status === 'current',
              'text-muted-foreground line-through': round.status === 'completed'
            }"
          >
            Round {{ round.roundNumber }} - {{ round.distance }}m
            <span
              v-if="round.status === 'current'"
              class="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"
            >
              Current
            </span>
            <span
              v-if="round.status === 'completed'"
              class="ml-2 text-xs text-green-600"
            >
              ✓
            </span>
          </div>
          <div
            :class="{
              'border-2 border-green-400 rounded-lg p-1 bg-green-50/50': round.status === 'current',
              'bg-muted/30 rounded-lg p-1': round.status === 'completed'
            }"
          >
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-20">Position</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="horse in round.horses"
                :key="`${round.roundNumber}-${horse.position}`"
              >
                <TableCell class="w-20">{{ horse.position }}</TableCell>
                <TableCell>{{ horse.name }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

