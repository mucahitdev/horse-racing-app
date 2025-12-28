<template>
  <div
    class="absolute top-1/2 transition-all duration-100 ease-linear z-30 flex items-center gap-2"
    :style="{
      left: `calc(${Math.max((props.progress || 0) * 100, 0)}% - 64px)`,
      transform: 'translateY(-50%)',
    }"
  >
    <span
      class="text-xs font-semibold px-2 py-0.5 rounded shadow whitespace-nowrap"
      :style="{
        backgroundColor: props.horse.color,
        color: getTextColor(props.horse.color),
      }"
    >
      {{ props.horse.name }}
    </span>
    <div ref="lottieContainer" style="width: 64px; height: 64px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'
import horseAnimationData from '@/assets/horse.json'
import { getTextColor } from '@/utils/colorUtils'

defineOptions({
  name: 'RaceHorse',
})

const props = defineProps<{
  horse: {
    id: string
    name: string
    color: string
    conditionScore: number
  }
  progress: number
}>()

const store = useStore()
const isPaused = computed(() => store.state.isPaused)
const lottieContainer = ref<HTMLElement | null>(null)
let anim: AnimationItem | null = null

onMounted(() => {
  if (lottieContainer.value) {
    anim = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: horseAnimationData,
    })
  }
})

onBeforeUnmount(() => {
  if (anim) {
    anim.destroy()
  }
})

watch(isPaused, (paused) => {
  if (anim) {
    if (paused) {
      anim.pause()
    } else {
      anim.play()
    }
  }
})
</script>

