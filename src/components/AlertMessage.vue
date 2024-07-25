<template>
  <div :class="alertClasses" role="alert">
    <strong class="font-bold">{{ title }}</strong>
    <span class="block sm:inline">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'success' | 'error' | 'info'

const props = defineProps<{ type: AlertType }>()

const typeClasses: Record<AlertType, string> = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700'
}

const alertClasses = computed(() => {
  return `${typeClasses[props.type]} border px-4 py-3 rounded relative`
})

const title = computed(() => {
  if (props.type === 'success') return 'Sucesso!'
  if (props.type === 'error') return 'Erro!'
  return ''
})
</script>
