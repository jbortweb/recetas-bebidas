<script setup>
import { useModalStore } from "@/stores/modal";
import { useBebidasStore } from "@/stores/bebidas";
import { useFavoritosStore } from "@/stores/favoritos";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const modal = useModalStore();
const bebida = useBebidasStore();
const favoritos = useFavoritosStore();

const formatearIngredientes = () => {
  const ingredientesDiv = document.createElement("DIV");

  for (let i = 1; i <= 15; i++) {
    if (bebida.ingredientes[`strIngredient${i}`]) {
      const producto = bebida.ingredientes[`strIngredient${i}`];
      const cantidad = bebida.ingredientes[`strMeasure${i}`];

      const ingredienteCantidad = document.createElement("p");
      ingredienteCantidad.classList.add("text-lg",'text-gray-500');
      ingredienteCantidad.textContent = `${producto} - ${cantidad}`;

      ingredientesDiv.appendChild(ingredienteCantidad);
    }
  }

  return ingredientesDiv;
};
</script>

<template>
  <TransitionRoot as="template" :show="modal.modal">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl my-5 font-extrabold"
                  >
                    {{ bebida.ingredientes.strDrink }}
                  </DialogTitle>

                  <img
                    :src="bebida.ingredientes.strDrinkThumb"
                    :alt="'Imagen de ' + bebida.ingredientes.strDrink"
                    class="mx-auto w-96 cover"
                  />
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl my-5 font-extrabold"
                  >
                    Ingredientes y Cantidades
                  </DialogTitle>
                  <div
                    v-html="formatearIngredientes().outerHTML"
                  >
                  </div>
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl my-5 font-extrabold"
                  >
                    Instrucciones
                  </DialogTitle>
                  <p
                    v-if="bebida.ingredientes.strInstructionsES" 
                    class="text-lg text-gray-500"
                  >
                  {{ bebida.ingredientes.strInstructionsES }}
                  </p>
                  <p v-else>{{ bebida.ingredientes.strInstructions }}</p>

                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="w-full rounded bg-gray-600 hover:bg-gray-500 p-3 font-bold text-white uppercase shadow"
                  @click="modal.handleClickModal()"
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  class="w-full rounded bg-orange-600 hover:bg-orange-500 p-3 font-bold text-white uppercase shadow"
                  @click="favoritos.handleClickFavorito"
                >
                  {{modal.textoBoton}}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  