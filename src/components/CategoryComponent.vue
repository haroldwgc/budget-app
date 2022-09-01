<template>
 
  <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span v-if="operationStore.operationName !== ''" class="text-large font-600 mr-3">Operación:
                    {{ operationStore.operationName }} </span>
            </div>
        </template>
        <CategoryComponentList :key="categoryStore.componentKey" />
    </el-card>
</template>
<script lang="ts" setup>
import { watch } from "vue";
import { Get } from "../helpers/AxiosHelpers";
import { useCategoryStore, useOperationStore } from "../store/store";
import CategoryComponentList from "./CategoryComponentList.vue"
const categoryStore = useCategoryStore()
const operationStore = useOperationStore()

watch(() => [categoryStore.componentKey], async (first, second) => {
  categoryStore.categoryList = await Get("/api/category")
})
</script>