<template>
  <div class="Top">
    <Top />
    <div class="Left">
      <Left />
      <main class="Right">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Top from '@/components/Top.vue'
import Left from '@/components/Left.vue'
</script>
