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
import EmptyState from './EmptyState.vue'

const store = useStore()
const raceResults = computed(() => store.state.raceResults || [])
const hasResults = computed(() => raceResults.value.length > 0)
const hasSchedule = computed(() => store.getters.hasRaceSchedule)
const isRacing = computed(() => store.state.isRacing)
const scrollContainer = ref<HTMLElement | null>(null)

// Determine empty state message
const emptyStateMessage = computed(() => {
  if (!hasSchedule.value) {
    return {
      title: 'Program not generated',
      description: 'Click the "Generate Program" button to create a race schedule.'
    }
  }
  if (!isRacing.value) {
    return {
      title: 'Race not started',
      description: 'Click the "Start" button to begin the race.'
    }
  }
  return {
    title: 'Waiting for first round results',
    description: 'The race has started. Results will appear here as rounds complete.'
  }
})

// Auto scroll to bottom when new result is added
watch(raceResults, async () => {
  if (scrollContainer.value) {
    await nextTick()
    scrollContainer.value.scrollTo({
      top: scrollContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}, { deep: true })
</script>

<template>
  <Card class="h-[calc(100vh-8rem)] flex flex-col">
    <CardHeader>
      <CardTitle class="text-center">Results</CardTitle>
    </CardHeader>
    <CardContent class="flex-1 overflow-hidden">
      <EmptyState
        v-if="!hasResults"
        :title="emptyStateMessage.title"
        :description="emptyStateMessage.description"
      />
      <div
        v-else
        ref="scrollContainer"
        class="h-full overflow-y-auto space-y-4"
      >
        <div
          v-for="result in raceResults"
          :key="result.round"
          class="space-y-2"
        >
          <div class="font-semibold text-center">
            Round {{ result.round }} - {{ result.distance }}m
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
                v-for="(horse, index) in result.horses"
                :key="`${result.round}-${index}`"
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

