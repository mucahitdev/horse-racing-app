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
    <div class="w-full flex flex-col md:flex-row md:h-16 md:items-center md:justify-between py-3 md:py-0 px-4 gap-3 md:gap-0">
      <!-- Game Name -->
      <div class="flex items-center justify-center md:justify-start">
        <h1 class="text-lg md:text-xl font-bold tracking-tight">
          🐎 Horse Racing Game
        </h1>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-center gap-2 md:gap-3">
        <Button
          variant="outline"
          class="flex-1 md:flex-none"
          @click="handleGenerateProgram"
        >
          Generate Program
        </Button>
        
        <Separator 
          orientation="vertical" 
          class="hidden md:flex h-6" 
        />
        
        <Button
          v-if="!isRacing"
          :disabled="!hasSchedule"
          class="flex-1 md:flex-none"
          @click="handleStart"
        >
          Start
        </Button>
        
        <Button
          v-else
          variant="secondary"
          class="flex-1 md:flex-none"
          @click="handlePause"
        >
          {{ isPaused ? 'Resume' : 'Pause' }}
        </Button>
      </div>
    </div>
  </header>
</template>

