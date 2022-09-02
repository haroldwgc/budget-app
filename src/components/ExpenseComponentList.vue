<template>
    <h3 style="font-weight: bold;font-size: 23px;">Gastos</h3>
    <p></p>
    <div class="row">
        <div class="col-sm-6">
            <el-form-item label="Activar edición" align="right">
                <el-switch v-model="form.edit" />
            </el-form-item>
        </div>
        <div class="col-sm-6">
            <div style="float:right">
                <span style="font-weight: bold;font-size: 23px;">Total Gastos: </span><span
                    style="font-weight: bold;font-size: 23px; color: orange;"> {{ formatter.format(form.totalAmount)
                    }}</span>
            </div>
        </div>
    </div>
    <div>
        <p></p>
        <el-input v-model="search" size="small" placeholder="Buscar gasto" />
        <p></p>
        <div v-if="form.edit">
            <el-scrollbar height="500px">
                <el-table :data="filterTableData" style="width: 90%">

                    <el-table-column label="" prop="iconCategory">
                        <template #default="scope">
                            <img v-bind:src="scope.row.iconCategory" class="img-fluid mx-auto" alt="..."
                                style=" width:30px ; height: 30px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="Tipo" prop="type" />
                    <el-table-column label="Categoria" prop="name" />
                    <el-table-column label="Monto" prop="amount" />
                    <el-table-column label="fecha" prop="dateAmount" />
                    <el-table-column align="right">
                        <template #default="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
            <el-button class="mt-4" style="width: 100%" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Crear
                Gasto
            </el-button>
        </div>

        <div v-if="!form.edit">

            <el-scrollbar height="500px">
                <el-table :data="filterTableData" style="width: 90%">

                    <el-table-column label="" prop="iconCategory">
                        <template #default="scope">
                            <img v-bind:src="scope.row.iconCategory" class="img-fluid mx-auto" alt="..."
                                style=" width:30px ; height: 30px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="Tipo" prop="type" />
                    <el-table-column label="Categoria" prop="name" />
                    <el-table-column label="Monto" prop="amount" />
                    <el-table-column label="fecha" prop="dateAmount" />
                </el-table>
            </el-scrollbar>
        </div>

    </div>




    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Crear Gasto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p></p>
                    <div>
                        <el-input v-model="name" placeholder="Nombre" />
                    </div>
                    <p></p>
                    <div>
                        <el-select v-model="wayPay" style="width: 465px;" filterable placeholder="Medio de pago">
                            <el-option v-for="item in waypays" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <p></p>
                    <div>
                        <el-select v-model="category" style="width: 465px;" filterable placeholder="Presupuesto">
                            <el-option v-for="item in options" :key="item._id" :label="item.name"
                                :value="item.name + '|' + item.icon" />
                        </el-select>
                    </div>
                    <p></p>
                    <div>
                        <el-input v-model="budgetAmount" placeholder="Monto Gasto" />
                    </div>
                    <p></p>
                    <div class="form-group">
                        <input style="width: 465px;color:'gray'" placeholder="Fecha gasto" v-model="amountdate"
                            class="textbox-n" type="text" onfocus="(this.type='date')" onblur="(this.type='text')"
                            id="date" />
                    </div>

                    <p></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="createExpense">Crear</button>
                </div>
            </div>
        </div>

    </div>
</template>
  
  <script lang="ts" setup>
import axios from 'axios';
import { computed, reactive, ref, watchEffect } from 'vue'
import { Alert, Deleted, Formater, Get, host } from '../helpers/AxiosHelpers';
import { useBudgetStore, useExpenseStore, useOperationStore, useSummaryStore, useUserStore } from '../store/store';
import ExpenseRequest from '../models/requests/ExpenseRequest';
import ExpenseEntity from '../models/entities/ExpenseEntity';
let req = new ExpenseRequest();
var formatter = Formater()
const expenseStore = useExpenseStore()
const operationStore = useOperationStore()
const budgetStore = useBudgetStore()
const summaryStore = useSummaryStore()
const amountdate = ref('')
const name = ref('')
const category = ref('')
const wayPay = ref('')
const budgetAmount = ref('')
const size = ref('large')
const form = reactive({
    edit: false,
    totalAmount: 0
})
const waypays = [
    {
        value: 'Fijo No Variable',
        label: 'Fijo No Variable',
    },
    {
        value: 'Fijo Variable',
        label: 'Fijo Variable',
    },
    {
        value: 'Ahorro',
        label: 'Ahorro',
    },
    {
        value: 'No Escenciales',
        label: 'No Escenciales',
    }
]



const options = budgetStore.budgetList

const search = ref('')


const filterTableData = computed(() =>

    expenseStore.expenseList.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )

)
const handleEdit = (index: number, row: ExpenseEntity) => {
    console.log(index, row)
}
const handleDelete = async (index: number, row: ExpenseEntity) => {
    console.log(index, row)
    await Deleted(row._id, "/api/expense/")
    console.log("el id es: " + row._id)
    expenseStore.componentKey + 1;
    expenseStore.expenseList = await Get("/api/expense/byIdOperation/" + operationStore.operationId)
    summaryStore.summaryList = await Get("/api/summary/" + operationStore.operationId)
    Alert("success", "eliminado el gasto satisfactoriamente")
}
const userStore = useUserStore();

watchEffect(async () => {
    expenseStore.expenseList.map(x => {
        form.totalAmount += x.amountInt;

    })
});

const createExpense = async () => {
    req.idOperation = operationStore.operationId;
    req.iconCategory = category.value.split('|')[1];
    req.amount = Number(budgetAmount.value);
    req.nameCategory = category.value.split('|')[0];
    req.type = wayPay.value;
    req.name = name.value
    req.dateAmount = amountdate.value
    console.log(req)
    const headers = {
        Authorization: userStore.tokenAuth,
    }
    await axios.post(host + "/api/expense", req, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {

        }
    }).catch((error) => {
        if (error.response) {
            console.error(error.response.data); // => the response payload 
        }
    });
    expenseStore.componentKey + 1;
    expenseStore.expenseList = await Get("/api/expense/byIdOperation/" + operationStore.operationId)
    summaryStore.summaryList = await Get("/api/summary/" + operationStore.operationId)
    Alert("success", "creado el nuevo gasto satisfactoriamente")
}
</script>

<style scoped>
#date::placeholder {
    opacity: .2;
    margin-right: 50px;
    border: 0;
    border-color: lightgray
}

input {
    border: 1px solid lightgray;
    padding: 5px;
    padding-right: 10px !important;
}

input[type="date"]:before {
    color: lightgrey !important;
    content: attr(placeholder) !important;
    padding-left: 10px;
    border-color: lightgray
}

input[type="date"]:focus:before {
    content: '' !important;
    border-color: lightgray
}

.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>