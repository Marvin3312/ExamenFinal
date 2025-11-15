<template>
  <div class="message-form-container">
    <form @submit.prevent="sendMessage">
      <textarea id="messageContent" v-model="messageContent" rows="1" placeholder="Escribe un mensaje..." required></textarea>
      <button type="submit">Enviar</button>
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'MessageForm',
  data() {
    return {
      messageContent: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async sendMessage() {
      this.successMessage = '';
      this.errorMessage = '';

      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        this.errorMessage = 'No hay token de autenticación. Por favor, inicie sesión primero.';
        return;
      }

      // For Login_Emisor, we need the username from the login.
      // For simplicity, let's assume the username is also stored in localStorage
      // or passed as a prop. For now, I'll use a placeholder.
      // In a real app, you might decode the token or store the username explicitly.
      const loginEmisor = localStorage.getItem('username'); // Assuming username is stored

      if (!loginEmisor) {
        this.errorMessage = 'No se encontró el nombre de usuario. Por favor, inicie sesión de nuevo.';
        return;
      }

      try {
        const response = await fetch('https://backcvbgtmdesa.azurewebsites.net/api/Mensajes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            Cod_Sala: 0, // As per instructions
            Login_Emisor: loginEmisor,
            Contenido: this.messageContent,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al enviar el mensaje.');
        }

        this.successMessage = 'Mensaje enviado con éxito!';
        this.messageContent = ''; // Clear the message input
      } catch (err) {
        this.errorMessage = err.message;
        console.error('Error al enviar mensaje:', err);
      }
    },
  },
};
</script>

<style scoped>
.message-form-container {
  padding: 20px;
  background-color: #f7f7f7;
  border-top: 1px solid #eee;
}

form {
  display: flex;
  align-items: center;
}

textarea {
  flex-grow: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;
  resize: none;
  margin-right: 10px;
  transition: border-color 0.3s;
}

textarea:focus {
  outline: none;
  border-color: #007bff;
}

button {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.success-message, .error-message {
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
}

.success-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}
</style>
