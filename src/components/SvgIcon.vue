<template>
  <svg aria-hidden="true">
    <use :fill="color" :xlink:href="symbolId"/>
  </svg>
</template>

<script lang="ts" setup>
interface Props {
  prefix?: string;
  name: string;
  color?: string;
}

const {prefix, color, name} = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  color: '#333',
})

const symbolId = computed(() => `#${prefix}-${name}`)
</script>

<style lang="scss" scoped></style>
