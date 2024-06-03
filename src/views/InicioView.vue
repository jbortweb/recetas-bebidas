<script setup>
import { useBebidasStore } from '@/stores/bebidas';
import Receta from '../components/Receta.vue'

  const store = useBebidasStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">
    Recetas
  </h1>
  <p 
      v-if="store.noRecetas"
      class="my-10 text-center text-2xl"
    >
    No hay recetas que mostrar, utiliza el buscador
    </p>
  <div v-else class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 my-10 gap-10">
    <Receta
      v-for="receta in store.recetas"
      :key="receta.idDrink"
      :receta="receta"
    />
  </div>
</template>