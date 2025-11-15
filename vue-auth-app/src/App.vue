<script>
import LoginForm from './components/LoginForm.vue';
import MessageForm from './components/MessageForm.vue';
import MessageList from './components/MessageList.vue';

export default {
  components: {
    LoginForm,
    MessageForm,
    MessageList,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    // Check if token exists in localStorage on app load
    if (localStorage.getItem('authToken')) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
    },
  },
};
</script>

<template>
  <div id="app">
    <LoginForm v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <div v-else>
      <MessageForm />
      <MessageList />
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
