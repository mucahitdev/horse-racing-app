<script setup lang="ts">
import GameNavbar from './components/GameNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <GameNavbar />
    
    <main class="container mx-auto px-4 py-8">
      <div class="space-y-6">
        <!-- Game content will go here -->
        <div class="text-center text-muted-foreground">
          <p>Game content will be added here...</p>
        </div>
      </div>
    </main>
  </div>
</template>
