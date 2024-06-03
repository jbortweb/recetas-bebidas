<script setup>
import { useBebidasStore } from '@/stores/bebidas';

const store = useBebidasStore()

defineProps({
  receta: {
    type: Object
  }
})

</script>

<template>
  <div class=" border shadow w-5/6">
    <div class="overflow-hidden">
      <img 
        :src="receta.strDrinkThumb" :alt="'Imagen de '+ receta.strDrink"
        class="hover:scale-125 transition-transform hover:rotate-2"
      >
    </div>
    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ receta.strDrink }}</h2>
      <button 
        type="button"
        class="bg-orange-400 hover:bg-orange-500 mt-5 p-3 w-full font-bold text-white text-lg"
        @click="store.mostrarRecetas(receta.idDrink)"
      >
        Ver Receta
      </button>
    </div>
  </div>
</template>