<template>
    <h3 style="font-weight: bold;font-size: 23px;">Ingresos</h3>
    <p></p>
    <div style="float:right">
        <span  style="font-weight: bold;font-size: 23px;">Total Ingresos: </span><span
            style="font-weight: bold;font-size: 23px; color: green;"> {{formatter.format(form.totalAmount ) }}</span>
    </div>

    <el-form-item label="Activar edición" align="right">
        <el-switch v-model="form.edit" />
    </el-form-item>
    <div>
        <p></p>
        <el-input v-model="search" size="small" placeholder="Buscar ingreso" />
        <p></p>
        <div v-if="form.edit">
            <el-scrollbar height="500px">
                <el-table :data="filterTableData" style="width: 90%">
                    <el-table-column label="Categoria" prop="name" />
                    <el-table-column label="Monto" prop="amount" />
                    <el-table-column label="fecha" prop="created" />
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
                    <el-table-column label="Categoria" prop="name" />
                    <el-table-column label="Monto" prop="amount" />
                    <el-table-column label="fecha" prop="created" />
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
                        @click="createEntry">Crear</button>
                </div>
            </div>
        </div>

    </div>
</template>
  
  <script lang="ts" setup>
import axios from 'axios';
import { computed, reactive, ref, watchEffect } from 'vue'
import { Alert, Deleted, Formater, Get, host } from '../helpers/AxiosHelpers';
import { useCategoryStore, useEntryStore, useOperationStore, useUserStore } from '../store/store';
import EntryRequest from '../models/requests/EntryRequest';
import EntryEntity from '../models/entities/EntryEntity';
let req = new EntryRequest();
var formatter = Formater()
const entryStore = useEntryStore()
const operationStore = useOperationStore()
const categoryStore = useCategoryStore()
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



const options = categoryStore.categoryList

const search = ref('')


const filterTableData = computed(() =>

    entryStore.entryList.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )

)
const handleEdit = (index: number, row: EntryEntity) => {
    console.log(index, row)
}
const handleDelete = async (index: number, row: EntryEntity) => {
    console.log(index, row)
    await Deleted(row._id, "/api/entry/")
    console.log("el id es: " + row._id)
    entryStore.componentKey + 1;
    entryStore.entryList = await Get("/api/entry/byIdOperation/" + operationStore.operationId)
    Alert("success", "eliminado el gasto satisfactoriamente")
}
const userStore = useUserStore();

watchEffect(async () => {
    entryStore.entryList = await Get("/api/entry/byIdOperation/" + operationStore.operationId)
    entryStore.entryList.map(x => {
        form.totalAmount += x.amountInt;
    })

});

const createEntry = async () => {
    req.idOperation = operationStore.operationId;
    req.amount = Number(budgetAmount.value);
    req.name = name.value;
    req.created = amountdate.value;
    console.log(req)
    const headers = {
        Authorization: userStore.tokenAuth,
    }
    await axios.post(host + "/api/entry", req, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {

        }
    }).catch((error) => {
        if (error.response) {
            console.error(error.response.data); // => the response payload 
        }
    });
    entryStore.componentKey + 1;
    entryStore.entryList = await Get("/api/entry/byIdOperation/" + operationStore.operationId)
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