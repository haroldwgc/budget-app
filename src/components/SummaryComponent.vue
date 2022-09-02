<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span v-if="operationStore.operationName !== ''" class="text-large font-600 mr-3">Operación:
                    {{ operationStore.operationName }} </span>
            </div>
        </template>
        <div>
            <div>
                <span style="font-weight: bold;font-size: 23px;">Total Ingresos: </span><span
                    style="font-weight: bold;font-size: 23px; color: green;"> {{ formatter.format(totalEntry) }}</span>
            </div>
            <div>
                <span style="font-weight: bold;font-size: 23px;">Total Gastos: </span> <span
                    style="font-weight: bold;font-size: 23px; color: orange;"> {{ formatter.format(totalExpense) }}</span>
            </div>
            <div>
                <span style="font-weight: bold;font-size: 23px;">Sobrante: </span> <span
                    :style="[totalEntry < totalExpense ? { color: 'red' } : { color: 'green' }]"
                    style="font-weight: bold;font-size: 23px;">{{ formatter.format(rest) }} </span>
            </div>
        </div>
    </el-card>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Monto Presupuestado</th>
                    <th scope="col">Monto Actual Real</th>
                    <th scope="col">Resto</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in summaryStore.summaryList">
                    <td>{{ item.name }}</td>
                    <td>{{ item.type }}</td>
                    <td style="color: orange">{{ formatter.format(item.budgetAmount) }}</td>
                    <td :style="[item.budgetAmount < item.realAmount ? { color: 'red' } : { color: 'green' }]">{{
                           formatter.format(item.realAmount)
                    }}</td>
                    <td
                        :style="[item.budgetAmount < item.realAmount ? { color: 'red', textDecoration: 'line-through' } : item.budgetAmount == item.realAmount ? { color: 'darkblue', textDecoration: 'line-through' } : { color: 'orange' }]">
                        {{ formatter.format(item.budgetAmount - item.realAmount) }}</td>
                </tr>
                <tr>
                    <th scope="row">Total</th>
                    <td colspan="1" class="table-active"></td>
                    <td colspan="1" class="table-active" style="color: orange">
                        <h5
                            :style="[totalEntry < totalBudget ? { color: 'red' } : { color: 'green' }]">
                            {{ formatter.format(totalBudget) }}</h5>
                    </td>
                    <td :style="[rest < 0 ? { color: 'red' } : { color: 'green' }]">
                        <h5>{{ formatter.format(totalExpense) }}</h5>
                    </td>
                    <td :style="[rest < 0 ? { color: 'red' } : { color: 'blue' }]">
                        <h5>{{ formatter.format(rest) }}</h5>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { watch, watchEffect } from "vue";
import { Formater, Get } from "../helpers/AxiosHelpers";
import { useBudgetStore, useEntryStore, useExpenseStore, useOperationStore, useSummaryStore, useUserStore } from "../store/store";

var formatter = Formater()
const operationStore = useOperationStore()
const userStore = useUserStore()
const entryStore = useEntryStore()
const expenseStore = useExpenseStore()
const budgetStore = useBudgetStore()
const summaryStore = useSummaryStore()

let totalEntry = 0;
let totalBudget = 0;
let totalExpense = 0;
let rest = 0
watch(() => [operationStore.componentKey], async (first, second) => {
    operationStore.operationList = await Get("/api/operationByUser/" + userStore.userId);
    summaryStore.summaryList = await Get("/api/summary/"+ operationStore.operationId);
})

watchEffect(async () => {
    entryStore.entryList.map(x => {
        totalEntry += x.amountInt
    })
    expenseStore.expenseList.map(x => {
        totalExpense += x.amountInt
    })
    budgetStore.budgetList.map(x => {
        totalBudget += x.amountInt
    })
    rest = totalEntry - totalExpense
})

</script>
<style>
</style>