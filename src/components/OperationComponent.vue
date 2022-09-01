<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span v-if="operationStore.operationName !== ''" class="text-large font-600 mr-3">Operación:
                    {{ operationStore.operationName }} </span>
            </div>
        </template>
        <OperationComponentList :key="operationStore.componentKey" />
    </el-card>

</template>
 
 <script lang="ts" setup>
 import { watch } from "vue";
 import { Get } from "../helpers/AxiosHelpers";
 import { useOperationStore, useUserStore } from "../store/store";
 import OperationComponentList from "./OperationComponentList.vue"
 const operationStore = useOperationStore()
 const userStore = useUserStore()
 
 watch(() => [operationStore.componentKey], async (first, second) => {
     operationStore.operationList = await Get("/api/operationByUser/" + userStore.userId)
 })
 </script>