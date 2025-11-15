<template>
  <div class="message-list-container">
    <div v-if="loading" class="loading-message">Cargando mensajes...</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="messages.length === 0 && !loading && !errorMessage" class="no-messages">
      No hay mensajes para mostrar.
    </div>
    <ul class="message-list">
      <li v-for="message in sortedMessages" :key="message.Id" class="message-item" :class="{ 'is-sender': message.Login_Emisor === username }">
        <div class="message-bubble">
          <div class="message-header">
            <span class="message-sender">{{ message.Login_Emisor }}</span>
            <span class="message-time">{{ formatDateTime(message.Fecha_Envio) }}</span>
          </div>
          <div class="message-content">{{ message.Contenido }}</div>
        </div>
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
      username: localStorage.getItem('username') || '',
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
        const response = await fetch(' https://backend-listm.onrender.com/api/mensajes' , {
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
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #ffffff;
}

.message-list {
  list-style: none;
  padding: 0;
}

.message-item {
  display: flex;
  margin-bottom: 15px;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  line-height: 1.5;
}

.message-header {
  font-size: 0.8em;
  color: #666;
  margin-bottom: 5px;
}

.message-sender {
  font-weight: bold;
}

.message-time {
  margin-left: 10px;
}

/* Differentiate between user's messages and others' messages */
.message-item.is-sender .message-bubble {
  background-color: #007bff;
  color: white;
  margin-left: auto;
  text-align: right;
}

.message-item:not(.is-sender) .message-bubble {
  background-color: #e9e9eb;
  color: #333;
  margin-right: auto;
  text-align: left;
}

.loading-message, .error-message, .no-messages {
  text-align: center;
  padding: 20px;
  color: #777;
}

.error-message {
  color: #dc3545;
}

.refresh-button {
  display: block;
  width: fit-content;
  margin: 10px auto;
  padding: 8px 15px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.refresh-button:hover {
  background-color: #5a6268;
}
</style>
