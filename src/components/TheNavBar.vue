<template>
  <div v-if="userStore.tokenAuth!==''">
    <el-menu 
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1"  @click="Route('/summary')">Inicio</el-menu-item>
    <el-menu-item index="2"  @click="Route('/expenses')">Gastos</el-menu-item>
    <el-menu-item index="3"  @click="Route('/entries')">Ingresos</el-menu-item>
    <el-menu-item index="4"  @click="Route('/categories')">Categorias</el-menu-item>
    <el-menu-item index="5"  @click="Route('/budgets')">Presupuesto</el-menu-item>
    <el-menu-item index="6"  @click="Route('/operations')">Operaciones</el-menu-item>
  </el-menu>  
  </div>
    

  <router-view></router-view>
</template>

<script lang="ts" setup>
import {  ref  } from 'vue'
import router from '../routes';
import {  useUserStore } from '../store/store';
const userStore = useUserStore();
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

  
function Route(route: string) {
    router.push(route)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100px;
}
</style>