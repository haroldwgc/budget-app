<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span v-if="operationStore.operationName !== ''" class="text-large font-600 mr-3">Operación:
                    {{  operationStore.operationName  }} </span>
            </div>
        </template>
        <BudgetComponentList :key="budgetStore.componentKey" />
    </el-card>
</template>

<script lang="ts" setup>
import { watch, watchEffect } from "vue";
import { Get } from "../helpers/AxiosHelpers";
import { useBudgetStore, useOperationStore } from "../store/store";
import BudgetComponentList from "./BudgetComponentList.vue"
const budgetStore = useBudgetStore()
const operationStore = useOperationStore()

watch(() => [budgetStore.componentKey], async (first, second) => {
    budgetStore.budgetList = await Get("/api/budgetByOperation/" + operationStore.operationId)
})

</script>