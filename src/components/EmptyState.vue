<script setup lang="ts">
import { Empty, EmptyDescription, EmptyTitle } from '@/components/ui/empty'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <Empty>
      <EmptyTitle>{{ title }}</EmptyTitle>
      <EmptyDescription>
        {{ description }}
      </EmptyDescription>
    </Empty>
  </div>
</template>

