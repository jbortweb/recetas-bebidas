import { defineStore } from "pinia";
import { useNotificacionStore } from "./notificaciones";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { computed, onMounted, ref, watch } from "vue";

export const useFavoritosStore = defineStore("favoritos", () => {
  const bebidas = useBebidasStore();
  const modal = useModalStore();
  const notificaciones = useNotificacionStore();
  const favoritos = ref([]);

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
  });

  watch(
    favoritos,
    () => {
      sincronizarLocalStorage();
    },
    { deep: true }
  );

  const sincronizarLocalStorage = () => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };

  const existeFavorito = (id) => {
    const favoritosLocalStorage =
      JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritosLocalStorage.some((favorito) => favorito.idDrink === id);
  };

  const eliminarFavoritos = () => {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink != bebidas.ingredientes.idDrink
    );

    notificaciones.mostrar = true;
    notificaciones.texto = "Se eliminó de favoritos";
    notificaciones.error = true;
  };

  const agregarFavoritos = () => {
    favoritos.value.push(bebidas.ingredientes);
    notificaciones.mostrar = true;
    notificaciones.texto = "Se agregó a favoritos";
    notificaciones.error = false;

  };

  const handleClickFavorito = () => {
    if (existeFavorito(bebidas.ingredientes.idDrink)) {
      eliminarFavoritos();
    } else {
      agregarFavoritos();
    }
    modal.handleClickModal();
  };

  const noFavoritos = computed(() => {
    return favoritos.value.length === 0;
  });

  return {
    handleClickFavorito,
    favoritos,
    existeFavorito,
    noFavoritos,
  };
});
