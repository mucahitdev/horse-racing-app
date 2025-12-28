<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import EmptyState from './EmptyState.vue'

const store = useStore()
const raceSchedule = computed(() => store.state.raceSchedule || [])
const hasSchedule = computed(() => raceSchedule.value.length > 0)
const currentRound = computed(() => store.state.currentRound)
const raceResults = computed(() => store.state.raceResults || [])
const scrollContainer = ref<HTMLElement | null>(null)
const roundRefs = ref<Record<number, HTMLElement | null>>({})

// Determine round status
function getRoundStatus(roundNumber: number) {
  const completedRounds = raceResults.value.map((r: { round: number }) => r.round)
  if (completedRounds.includes(roundNumber)) {
    return 'completed'
  }
  // currentRound is 0-indexed, roundNumber is 1-indexed
  if (currentRound.value !== null && currentRound.value + 1 === roundNumber) {
    return 'current'
  }
  return 'pending'
}

// Auto scroll to current round
watch(currentRound, async (newRound) => {
  if (newRound !== null && scrollContainer.value) {
    await nextTick()
    // currentRound is 0-indexed, roundNumber is 1-indexed
    const roundNumber = newRound + 1
    const roundElement = roundRefs.value[roundNumber]
    if (roundElement && scrollContainer.value) {
      roundElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
})
</script>

<template>
  <Card class="h-[calc(100vh-8rem)] flex flex-col">
    <CardHeader>
      <CardTitle class="text-center">Program</CardTitle>
    </CardHeader>
    <CardContent class="flex-1 overflow-hidden">
      <EmptyState
        v-if="!hasSchedule"
        title="Program not generated"
        description="Click the 'Generate Program' button to create a race schedule."
      />
      <div
        v-else
        ref="scrollContainer"
        class="h-full overflow-y-auto space-y-4"
      >
        <div
          v-for="round in raceSchedule"
          :key="round.round"
          :ref="(el) => { roundRefs[round.round] = el as HTMLElement }"
          class="space-y-2"
          :class="{
            'opacity-40 text-muted-foreground': getRoundStatus(round.round) === 'pending',
            'text-green-600 font-bold border-2 border-green-400 rounded-lg p-1 bg-green-50/50': getRoundStatus(round.round) === 'current',
            'text-muted-foreground line-through bg-muted/30 rounded-lg p-1': getRoundStatus(round.round) === 'completed',
          }"
        >
          <div class="font-semibold text-center flex items-center justify-center gap-2">
            <span>Round {{ round.round }} - {{ round.distance }}m</span>
            <Badge
              v-if="getRoundStatus(round.round) === 'current'"
              variant="default"
              class="bg-green-600 text-white"
            >
              Current
            </Badge>
            <Badge
              v-else-if="getRoundStatus(round.round) === 'completed'"
              variant="secondary"
              class="bg-muted text-muted-foreground"
            >
              ✓
            </Badge>
          </div>
          <div>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-20">Position</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(horse, index) in round.horses"
                :key="`${round.round}-${horse.id || index}`"
              >
                <TableCell class="w-20">{{ index + 1 }}</TableCell>
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

