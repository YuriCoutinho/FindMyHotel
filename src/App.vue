<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-md z-10">
    <div class="w-full px-5 h-16 flex items-center justify-between max-w-screen-xl mx-auto">
      <div class="flex items-center">
        <RouterLink to="/">
          <img src="@/assets/logo.svg" alt="Logo" class="h-10 cursor-pointer" />
        </RouterLink>
        <h1 class="text-2xl text-gray-800 ml-4">FindMyHotel</h1>
      </div>
      <RouterLink to="/compare" class="text-gray-800 hover:text-emerald-500">
        Comparar Hotéis
      </RouterLink>
    </div>
  </header>

  <main class="flex flex-col w-full bg-gray-100 pt-16 flex-grow">
    <RouterView />
  </main>

  <footer class="w-full bg-white p-4 text-center border-t border-gray-300">
    <p class="text-gray-800">&copy; 2024 FindMyHotel. All rights reserved.</p>
  </footer>
</template>
