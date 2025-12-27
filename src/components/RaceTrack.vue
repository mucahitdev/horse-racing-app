<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { onMounted, ref, nextTick } from 'vue'
import lottie from 'lottie-web'
import horseAnimation from '@/assets/horse.json'
import { dummyCurrentRaceRound } from '@/data/races'

const currentRound = dummyCurrentRaceRound

const horseContainers = ref<Record<number, HTMLDivElement | null>>({})

onMounted(async () => {
  await nextTick()
  // Initialize Lottie animations for each horse
  currentRound.horses.forEach((horse: { id: number }) => {
    const container = horseContainers.value[horse.id]
    if (container) {
      lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: horseAnimation
      })
    }
  })
})
</script>

<template>
  <Card class="h-[calc(100vh-8rem)] flex flex-col">
    <CardHeader>
      <CardTitle class="text-center">
        Round {{ currentRound.roundNumber }} - {{ currentRound.distance }}m
      </CardTitle>
    </CardHeader>
    <CardContent class="flex-1 overflow-hidden">
      <div class="h-full flex flex-col">
        <!-- Race Track -->
        <div class="flex-1 relative bg-white border-2 border-gray-300 rounded-lg overflow-hidden flex flex-col">
          <!-- Start Line -->
          <div class="absolute left-0 top-0 bottom-0 w-16 bg-green-500 border-r-4 border-dashed border-green-700 flex flex-col z-10">
            <div
              v-for="(horse, index) in currentRound.horses"
              :key="`start-${horse.id}`"
              class="flex-1 flex items-center justify-center border-t border-green-600/50 first:border-t-0"
            >
              <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
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
              v-for="horse in currentRound.horses"
              :key="horse.id"
              class="flex-1 border-b border-gray-200 last:border-b-0 relative bg-white"
            >
              <!-- Horse -->
              <div
                class="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 z-30 flex items-center gap-2"
                :style="{ left: `calc(${horse.position}% * (100% - 64px) / 100)` }"
              >
                <!-- Horse Name (Left) -->
                <div class="text-xs font-semibold whitespace-nowrap bg-white/90 px-2 py-1 rounded shadow-sm">
                  {{ horse.name }}
                </div>
                
                <!-- Lottie Animation -->
                <div
                  :ref="(el) => { horseContainers[horse.id] = el as HTMLDivElement }"
                  class="w-16 h-16"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

