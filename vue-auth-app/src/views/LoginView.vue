<template>
  <div class="login-view">
    <LoginForm @login-success="onLoginSuccess" />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
  setup() {
    const router = useRouter();

    const onLoginSuccess = () => {
      router.push({ name: 'Chat' });
    };

    return {
      onLoginSuccess,
    };
  },
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
