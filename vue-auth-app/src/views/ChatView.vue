<template>
  <div class="chat-view">
    <div class="header">
      <h2>Chat Room</h2>
      <button @click="logout" class="logout-button">Cerrar Sesión</button>
    </div>
    <MessageList />
    <MessageForm />
  </div>
</template>

<script>
import MessageForm from '../components/MessageForm.vue';
import MessageList from '../components/MessageList.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ChatView',
  components: {
    MessageForm,
    MessageList,
  },
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      router.push({ name: 'Login' });
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #eee;
}

.logout-button {
  padding: 8px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
