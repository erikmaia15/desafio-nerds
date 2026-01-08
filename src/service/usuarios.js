import api from "@/router/api";
export default {
  async cadastrarUsuario(formData) {
    try {
      const response = await api.post("/usuarios", formData);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async buscarUsuarios() {
    try {
      const response = await api.get("/usuarios");
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
