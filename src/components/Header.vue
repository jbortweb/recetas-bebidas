<script setup>
import { useBebidasStore } from '@/stores/bebidas';
import { useNotificacionStore } from '@/stores/notificaciones';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute()
const store = useBebidasStore()
const notificaciones = useNotificacionStore()


const handleSubmit = () => {
  if(Object.values(store.busqueda).includes('')){

    notificaciones.$patch({
      texto : 'Todos los campos son obligatorios',
      mostrar : true,
      error : true
    })
    return
  }

   store.obtenerRecetas()
};


const paginaInicio = computed(() => route.name === 'inicio')

</script>

<template>
  <header 
    class="bg-slate-800"
    :class="{header:paginaInicio}">
    <div class="mx-auto container px-5 py-2">
      <div>
        <div class="flex justify-between items-center">
          <div>
            <RouterLink
              :to="{name:'inicio'}"
            >
              <img class="w-20 my-2" src="/img/logo.svg" alt="logotipo"/>
            </RouterLink>
          </div>
          <nav class="flex gap-4 text-white">
            <RouterLink
              :to="{name:'inicio'}"
              class=" uppercase font-bold"
              active-class="text-orange-500"
            >
              Inicio
            </RouterLink>
            <RouterLink
              :to="{name:'favoritos'}"
              class="uppercase font-bold"
              active-class="text-orange-500"
            >
              Favoritos
            </RouterLink>
          </nav>
        </div>
      </div>
      <form 
        class="bg-orange-400 md:w-1/2 2xl:md-1/3 my-6 p-6 rounded-lg shadow space-y-6"
        v-if="paginaInicio" 
        @submit.prevent="handleSubmit" 
      >
        <div class="space-y-2">
          <label 
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
          >
          Nombre o Ingredientes
          </label>
          <input 
            type="text" 
            id="ingrediente"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Nombre o ingrediente: ej. Vodka, Menta, etc"
            v-model="store.busqueda.nombre"
          >
        </div>
        <div class="space-y-4">
          <label 
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
          >
          Categoria
          </label>
          <select 
            id="categoria"
            class="p-3 w-full rounded-lg focus:outline-none"
            v-model="store.busqueda.categoria"
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="(categoria,i) in store.categorias"
              :key="i"
              :value="categoria.strCategory"
            >{{ categoria.strCategory }}</option>
          </select>
        </div>
        <input 
          type="submit" 
          value="Buscar recetas"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white w-full rounded-lg uppercase font-extrabold p-2"
        >
      </form>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-image: url('/img/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>