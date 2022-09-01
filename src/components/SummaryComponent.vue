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
                <tr v-for="item in budgetStore.budgetList">
                    <td>{{ item.name }}</td>
                    <td>{{ item.type }}</td>
                    <td style="color: orange">{{ formatter.format(item.budgetAmountInt) }}</td>
                    <td :style="[item.exceeded ? { color: 'red' } : { color: 'green' }]">{{
                            formatter.format(item.amount)
                    }}</td>
                    <td
                        :style="[item.budgetAmountInt < item.amount ? { color: 'red', textDecoration: 'line-through' } : item.budgetAmountInt == item.amount ? { color: 'darkblue', textDecoration: 'line-through' } : { color: 'orange' }]">
                        {{ formatter.format(item.budgetAmountInt - item.amount) }}</td>
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
import { useBudgetStore, useEntryStore, useExpenseStore, useOperationStore, useUserStore } from "../store/store";
var formatter = Formater()
const operationStore = useOperationStore()
const userStore = useUserStore()
const entryStore = useEntryStore()
const expenseStore = useExpenseStore()
const budgetStore = useBudgetStore()
let totalEntry = 0;
let totalBudget = 0;
let totalExpense = 0;
let rest = 0
watch(() => [operationStore.componentKey], async (first, second) => {
    operationStore.operationList = await Get("/api/operationByUser/" + userStore.userId)
})

watchEffect(async () => {
    entryStore.entryList.map(x => {
        totalEntry += x.amountInt
    })
    expenseStore.expenseList.map(x => {
        totalExpense += x.amountInt
    })
    budgetStore.budgetList.map(x => {
        totalBudget += x.budgetAmountInt
    })
    rest = totalEntry - totalExpense
})
</script>

<style>
</style>