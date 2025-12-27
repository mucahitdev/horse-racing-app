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
import { dummyRaceResults } from '@/data/races'
</script>

<template>
  <Card class="h-[calc(100vh-8rem)] flex flex-col">
    <CardHeader>
      <CardTitle class="text-center">Results</CardTitle>
    </CardHeader>
    <CardContent class="flex-1 overflow-hidden">
      <div class="h-full overflow-y-auto space-y-4">
        <div
          v-for="round in dummyRaceResults"
          :key="round.roundNumber"
          class="space-y-2"
        >
          <div class="font-semibold text-center">
            Round {{ round.roundNumber }} - {{ round.distance }}m
          </div>
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
    </CardContent>
  </Card>
</template>

