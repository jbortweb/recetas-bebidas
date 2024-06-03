import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useFavoritosStore } from "./favoritos";
import { useBebidasStore } from "./bebidas";


export const useModalStore = defineStore('modal', ()=> {

  const favoritos = useFavoritosStore()
  const ingredientes = useBebidasStore()
  const modal = ref(false)

  const textoBoton = computed(()=>{
    return favoritos.existeFavorito(ingredientes.ingredientes.idDrink) ? 'Eliminar Favorito' : 'Agregar a Favoritos'
  })

  const handleClickModal = () => {
   return modal.value = !modal.value
  }

  return {
    handleClickModal,
    modal,
    textoBoton
  }
})