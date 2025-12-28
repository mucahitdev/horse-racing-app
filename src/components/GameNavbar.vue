<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const store = useStore()
const hasSchedule = computed(() => store.getters.hasRaceSchedule)
const isRacing = computed(() => store.state.isRacing)
const isPaused = computed(() => store.state.isPaused)

function handleGenerateProgram() {
  store.dispatch('generateProgram')
}

async function handleStart() {
  await store.dispatch('runRace')
}

function handlePause() {
  if (isPaused.value) {
    store.dispatch('resumeRace')
  } else {
    store.dispatch('pauseRace')
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
    <div class="w-full flex h-16 items-center justify-between px-4">
      <!-- Left side - Game Name -->
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold tracking-tight">
          🐎 Horse Racing Game
        </h1>
      </div>

      <!-- Right side - Buttons -->
      <div class="flex items-center gap-3">
        <Button
          variant="outline"
          @click="handleGenerateProgram"
        >
          Generate Program
        </Button>
        
        <Separator orientation="vertical" class="h-6" />
        
        <Button
          v-if="!isRacing"
          :disabled="!hasSchedule"
          @click="handleStart"
        >
          Start
        </Button>
        
        <Button
          v-else
          variant="secondary"
          @click="handlePause"
        >
          {{ isPaused ? 'Resume' : 'Pause' }}
        </Button>
      </div>
    </div>
  </header>
</template>

