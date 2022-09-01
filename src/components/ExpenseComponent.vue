<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span v-if="operationStore.operationName !== ''" class="text-large font-600 mr-3">Operación:
                    {{  operationStore.operationName  }} </span>
            </div>
        </template>
        <ExpenseComponentList :key="expenseStore.componentKey" />
    </el-card>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { Get } from "../helpers/AxiosHelpers";
import { useExpenseStore, useOperationStore } from "../store/store";
import ExpenseComponentList from "./ExpenseComponentList.vue"
const expenseStore = useExpenseStore()
const operationStore = useOperationStore()

watch(() => [expenseStore.componentKey], async (first, second) => {
    expenseStore.expenseList = await Get("/api/expense/byIdOperation/" + operationStore.operationId)
})

</script>