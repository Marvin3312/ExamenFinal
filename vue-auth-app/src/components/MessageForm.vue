<template>
  <div class="message-form-container">
    <h2>Enviar Mensaje</h2>
    <form @submit.prevent="sendMessage">
      <div class="form-group">
        <label for="messageContent">Mensaje:</label>
        <textarea id="messageContent" v-model="messageContent" rows="5" required></textarea>
      </div>
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
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745; /* Green for send */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #218838;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 15px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
