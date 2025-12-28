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

const isFinished = computed(() => props.progress >= 1)

const store = useStore()
const isPaused = computed(() => store.state.isPaused)
const lottieContainer = ref<HTMLElement | null>(null)
let anim: AnimationItem | null = null

function initializeAnimation() {
  if (lottieContainer.value && !anim && !isFinished.value) {
    anim = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: horseAnimationData,
    })
  }
}

onMounted(() => {
  initializeAnimation()
})

onBeforeUnmount(() => {
  if (anim) {
    anim.destroy()
  }
})

// Pause/Resume control
watch(isPaused, (paused) => {
  if (anim && !isFinished.value) {
    if (paused) {
      anim.pause()
    } else {
      anim.play()
    }
  }
})

// Stop animation when horse finishes, restart when new round begins
watch(isFinished, (finished) => {
  if (finished && anim) {
    anim.pause()
    anim.destroy()
    anim = null
  } else if (!finished && !anim) {
    // Restart animation when new round starts (progress resets to 0)
    initializeAnimation()
  }
})

// Watch progress to reinitialize animation when it resets from 1 to 0
watch(() => props.progress, (newProgress, oldProgress) => {
  if (oldProgress >= 1 && newProgress < 1 && !anim) {
    // Round reset, reinitialize animation
    initializeAnimation()
  }
})
</script>

<template>
  <div
    class="absolute top-1/2 z-30 flex items-center gap-2"
    :style="{
      left: isFinished 
        ? 'calc(100% + 32px)' 
        : `calc(${Math.max((props.progress || 0) * 100, 0)}% - 64px)`,
      transform: isFinished 
        ? 'translateY(-50%) translateX(-50%)' 
        : 'translateY(-50%)',
      transition: isFinished 
        ? 'left 0.8s ease-out, transform 0.8s ease-out' 
        : 'none',
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
    <div 
      ref="lottieContainer" 
      style="width: 64px; height: 64px"
      :style="{ 
        opacity: isFinished ? 0 : 1,
        transition: 'opacity 0.5s ease-out'
      }"
    ></div>
  </div>
</template>

