<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
        >
          Generate Program
        </Button>
        
        <Separator orientation="vertical" class="h-6" />
        
        <Button>
          Start
        </Button>
      </div>
    </div>
  </header>
</template>

