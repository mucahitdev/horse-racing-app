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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_3fr_2fr] gap-6">
        <!-- Horses - Mobile: full, Tablet: left top, Desktop: left -->
        <div class="order-1 md:order-1 lg:order-1">
          <HorseList />
        </div>
        
        <!-- Race Track - Mobile: full, Tablet: right top, Desktop: center -->
        <div class="order-2 md:order-2 lg:order-2">
          <RaceTrack />
        </div>
        
        <!-- Program and Results - Mobile: full, Tablet: bottom row, Desktop: right -->
        <div class="order-3 md:col-span-2 md:order-3 lg:col-span-1 lg:order-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Program -->
          <RaceSchedule />
          
          <!-- Results -->
          <RaceResults />
        </div>
      </div>
    </main>
  </div>
</template>
