import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useNotificacionStore = defineStore('notificacion', ()=> {
  const texto = ref('')
  const error = ref(false)
  const mostrar = ref(false)

  watchEffect(()=>{
    if(mostrar.value) {
      setTimeout(() => {
        mostrar.value = false;
        texto.value = "";
        error.value = false;
      }, 3000);
    }
  })

  return {
    texto,
    mostrar,
    error
  }

})