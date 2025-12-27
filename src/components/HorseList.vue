<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { dummyHorses } from '@/data/horses'

const horses = dummyHorses
</script>

<template>
  <Card class="h-[calc(100vh-8rem)] flex flex-col">
    <CardHeader>
      <CardTitle class="text-center">Horses (20)</CardTitle>
    </CardHeader>
    <CardContent class="flex-1 overflow-hidden">
      <div class="h-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead class="text-center">Condition</TableHead>
              <TableHead class="w-12">Color</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="horse in horses"
              :key="horse.id"
            >
              <TableCell class="font-semibold">{{ horse.name }}</TableCell>
              <TableCell class="text-center">{{ horse.condition }}</TableCell>
              <TableCell>
                <div
                  class="w-8 h-8 rounded-full border-2 border-border"
                  :style="{ backgroundColor: horse.color }"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</template>

