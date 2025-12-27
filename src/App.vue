<script setup lang="ts">
import GameNavbar from './components/GameNavbar.vue'
import HorseList from './components/HorseList.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <GameNavbar />
    
    <main class="w-full px-4 py-8">
      <div class="grid grid-cols-[1fr_3fr_2fr] gap-6">
        <!-- Left column (1fr) -->
        <HorseList />
        
        <!-- Center column (3fr) -->
        <div class="bg-card border rounded-lg p-4">
          <p class="text-muted-foreground">Center column</p>
        </div>
        
        <!-- Right column (2fr) -->
        <div class="bg-card border rounded-lg p-4">
          <p class="text-muted-foreground">Right column</p>
        </div>
      </div>
    </main>
  </div>
</template>
