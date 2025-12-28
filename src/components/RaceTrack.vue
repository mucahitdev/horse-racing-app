<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Horse from './Horse.vue'

const store = useStore()
const currentRoundData = computed(() => store.getters.currentRoundData)
const raceProgress = computed(() => store.state.raceProgress || {})
</script>

<template>
  <Card class="h-[calc(100vh-8rem)] flex flex-col">
    <CardHeader>
      <CardTitle class="text-center">
        <span v-if="currentRoundData">
          Round {{ currentRoundData.round }} - {{ currentRoundData.distance }}m
        </span>
        <span v-else>Race Track</span>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex-1 overflow-hidden">
      <div class="h-full flex flex-col">
        <!-- Race Track -->
        <div class="flex-1 relative bg-white border-2 border-gray-300 rounded-lg overflow-hidden flex flex-col">
          <!-- Start Line -->
          <div class="absolute left-0 top-0 bottom-0 w-16 bg-green-500 border-r-4 border-dashed border-green-700 flex flex-col z-10">
            <div
              v-for="index in 10"
              :key="`start-${index}`"
              class="flex-1 flex items-center justify-center border-t border-green-600/50 first:border-t-0"
            >
              <span class="text-white font-bold text-sm">{{ index }}</span>
            </div>
          </div>
          
          <!-- Finish Line -->
          <div class="absolute right-0 top-0 bottom-0 w-16 bg-red-500/80 border-l-4 border-dashed border-red-700 flex items-center justify-center z-10">
            <div class="transform -rotate-90 text-white font-bold text-sm whitespace-nowrap">
              FINISH
            </div>
          </div>
          
          <!-- Horse Lanes -->
          <div class="flex-1 flex flex-col ml-16 mr-16 relative">
            <div
              v-for="index in 10"
              :key="`lane-${index}`"
              class="flex-1 border-b border-gray-200 last:border-b-0 relative bg-white"
            >
              <!-- Horse Component (only if horse exists for this lane) -->
              <Horse
                v-if="currentRoundData?.horses && currentRoundData.horses[index - 1]"
                :horse="currentRoundData.horses[index - 1]"
                :progress="raceProgress[currentRoundData.horses[index - 1].id] || 0"
              />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

