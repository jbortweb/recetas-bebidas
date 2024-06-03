import api from "@/helpers/axios";

export default {

  obtenerCategorias() {
    return api('/list.php?c=list')
  },

  obtenerReceta({categoria, nombre}) {
    return api(`/filter.php?c=${categoria}&i=${nombre}`)
  },
  mostrarReceta(id) {
    return api(`/lookup.php?i=${id}`)
  }
}