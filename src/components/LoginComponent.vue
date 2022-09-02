<template>

    <el-card class="box-card">
        <div>
            <p></p>
            <el-input v-model="user" placeholder="Please input" clearable />
            <p></p>
            <el-input v-model="password" type="password" placeholder="Please input" clearable />
            <p></p>
            <el-button type="primary" @click="login">Login</el-button>
        </div>
    </el-card>
</template>
  
  <script lang="ts" setup>
import { ref } from 'vue'
import { Login } from '../helpers/AxiosHelpers';
import UserRequest from '../models/requests/UserRequest';
let userRequest = new UserRequest()
const user = ref('')
const password = ref('')


async function login() {
    userRequest.password = password.value;
    userRequest.user = user.value;
    await Login(userRequest)
}

</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
 
    height: 180px;
    /* centrar vertical y horizontalmente */
    position: absolute;
    top: 30%;
    left: 38%;
    margin: -25px 0 0 -25px;
    width: 400px;
}
</style>