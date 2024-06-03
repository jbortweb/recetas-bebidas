import { computed, onMounted, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useModalStore } from '@/stores/modal';
import APIService from "@/services/APIService";

export const useBebidasStore = defineStore('bebidas', ()=> {

  const modal = useModalStore()

  const categorias =ref([])
  const busqueda = reactive({
    nombre:"",
    categoria:""
  })

  const recetas = ref([])

  const ingredientes = ref({})

  onMounted(async()=>{
    const {data:{drinks}} = await APIService.obtenerCategorias()

    categorias.value = drinks
  })

  const obtenerRecetas = async () => {
     const {data:{drinks}} = await APIService.obtenerReceta(busqueda)
     recetas.value = drinks
  };
  
  const mostrarRecetas = async (id) => {
    const {data:{drinks}} = await APIService.mostrarReceta(id)

    ingredientes.value = drinks[0];
    modal.handleClickModal()
  }

  const noRecetas = computed(() => {     
    return recetas.value.length === 0
  })
  

  return {
    categorias,
    busqueda,
    obtenerRecetas,
    recetas,
    mostrarRecetas,
    ingredientes,
    noRecetas
  }
})