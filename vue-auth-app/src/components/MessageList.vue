<template>
  <div class="message-list-container">
    <h2>Mensajes del Chat</h2>
    <div v-if="loading" class="loading-message">Cargando mensajes...</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="messages.length === 0 && !loading && !errorMessage" class="no-messages">
      No hay mensajes para mostrar.
    </div>
    <ul class="message-list">
      <li v-for="message in sortedMessages" :key="message.Id" class="message-item">
        <div class="message-header">
          <span class="message-sender">{{ message.Login_Emisor }}</span>
          <span class="message-time">{{ formatDateTime(message.Fecha_Envio) }}</span>
        </div>
        <div class="message-content">{{ message.Contenido }}</div>
      </li>
    </ul>
    <button @click="fetchMessages" class="refresh-button">Actualizar Mensajes</button>
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  data() {
    return {
      messages: [],
      loading: false,
      errorMessage: '',
    };
  },
  computed: {
    sortedMessages() {
      // Sort messages by Fecha_Envio, newest at the bottom
      return [...this.messages].sort((a, b) => {
        return new Date(a.Fecha_Envio) - new Date(b.Fecha_Envio);
      });
    },
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      this.loading = true;
      this.errorMessage = '';
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        this.errorMessage = 'No hay token de autenticación. Por favor, inicie sesión primero.';
        this.loading = false;
        return;
      }

      try {
        const response = await fetch('https://backcvbgtmdesa.azurewebsites.net/api/Mensajes', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cargar los mensajes.');
        }

        this.messages = await response.json();
      } catch (err) {
        this.errorMessage = err.message;
        console.error('Error al cargar mensajes:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDateTime(dateTimeString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateTimeString).toLocaleDateString('es-ES', options);
    },
  },
};
</script>

<style scoped>
.message-list-container {
  max-width: 600px;
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

.loading-message, .error-message, .no-messages {
  text-align: center;
  margin-bottom: 15px;
}

.error-message {
  color: red;
}

.no-messages {
  color: #777;
}

.message-list {
  list-style: none;
  padding: 0;
  max-height: 400px; /* Limit height for scrolling */
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
}

.message-item {
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
}

.message-item:last-child {
  border-bottom: none;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9em;
  color: #555;
}

.message-sender {
  font-weight: bold;
  color: #007bff;
}

.message-time {
  color: #888;
}

.message-content {
  text-align: left;
  color: #333;
}

.refresh-button {
  width: 100%;
  padding: 10px;
  background-color: #6c757d; /* Grey for refresh */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.refresh-button:hover {
  background-color: #5a6268;
}
</style>
