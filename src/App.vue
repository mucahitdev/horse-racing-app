<script setup lang="ts">
import GameNavbar from './components/GameNavbar.vue'
import HorseList from './components/HorseList.vue'
import RaceSchedule from './components/RaceSchedule.vue'
import RaceResults from './components/RaceResults.vue'
import RaceTrack from './components/RaceTrack.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <GameNavbar />
    
    <main class="w-full px-4 py-8">
      <div class="grid grid-cols-[1fr_3fr_2fr] gap-6">
        <!-- Left column (1fr) -->
        <HorseList />
        
        <!-- Center column (3fr) -->
        <RaceTrack />
        
        <!-- Right column (2fr) -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Program -->
          <RaceSchedule />
          
          <!-- Results -->
          <RaceResults />
        </div>
      </div>
    </main>
  </div>
</template>
