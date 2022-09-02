<template>
    <h3 style="font-weight: bold;font-size: 23px;">Presupuesto</h3>
    <div style="float:right">
        <span style="font-weight: bold;font-size: 23px;">Total Presupuestado: </span><span
            style="font-weight: bold;font-size: 23px; color: green;"> {{ formatter.format(form.totalAmount) }}</span>
    </div>
    <el-form-item label="Activar edición" align="right">
        <el-switch v-model="form.edit" />
    </el-form-item>
    <p></p>
    <el-input v-model="search" size="small" placeholder="Buscar item de presupuesto" />
    <p></p>
    <div>
        <div v-if="form.edit">
            <el-scrollbar height="500px">
                <el-table :data="filterTableData" style="width: 90%">

                    <el-table-column label="" prop="icon">
                        <template #default="scope">
                            <img v-bind:src="scope.row.icon" class="img-fluid mx-auto" alt="..."
                                style=" width:30px ; height: 30px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="Tipo" prop="type" />
                    <el-table-column label="Categoria" prop="name" />
                    <el-table-column label="Monto presupuestado" prop="budgetAmount" />
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
                Item presupuesto
            </el-button>
        </div>

        <div v-if="!form.edit">
            <el-scrollbar height="500px">
                <el-table :data="filterTableData" style="width: 90%">

                    <el-table-column label="" prop="icon">
                        <template #default="scope">
                            <img v-bind:src="scope.row.icon" class="img-fluid mx-auto" alt="..."
                                style=" width:30px ; height: 30px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="Tipo" prop="type" />
                    <el-table-column label="Categoria" prop="name" />
                    <el-table-column label="Monto presupuestado" prop="budgetAmount" />
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
                    <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <el-select v-model="wayPay" style="width: 465px;" filterable placeholder="Medio de pago">
                            <el-option v-for="item in waypays" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <p></p>
                    <div>
                        <el-select v-model="category" style="width: 465px;" filterable placeholder="Categoria">
                            <el-option v-for="item in options" :key="item._id" :label="item.name"
                                :value="item.name + '|' + item.icon" />
                        </el-select>
                    </div>
                    <p></p>
                    <div>
                        <el-input v-model="budgetAmountInt" placeholder="Monto Presupuestado" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="createCategory">Crear</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script lang="ts" setup>
  import axios from 'axios';
  import { computed, reactive, ref, watchEffect } from 'vue'
  import { Alert, Deleted, Formater, Get, host } from '../helpers/AxiosHelpers';
  import { useBudgetStore, useCategoryStore, useOperationStore, useUserStore } from '../store/store';
  import BudgetEntity from '../models/entities/BudgetEntity';
  import BudgetRequest from '../models/requests/BudgetRequest';
  let req = new BudgetRequest();
  var formatter = Formater();
  const budgetStore = useBudgetStore()
  const operationStore = useOperationStore()
  const categoryStore = useCategoryStore()
  const category = ref('')
  const wayPay = ref('')
  const budgetAmountInt = ref('')
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
  
      budgetStore.budgetList.filter(
          (data) =>
              !search.value ||
              data.name.toLowerCase().includes(search.value.toLowerCase())
      )
  
  )
  const handleEdit = (index: number, row: BudgetEntity) => {
      console.log(index, row)
  }
  const handleDelete = async (index: number, row: BudgetEntity) => {
      console.log(index, row)
      await Deleted(row._id, "/api/budget/")
      console.log("el id es: " + row.amount)
      budgetStore.componentKey + 1;
      budgetStore.budgetList = await Get("/api/budgetByOperation/" + operationStore.operationId)
      Alert("success", "eliminado el item satisfactoriamente")
  }
  const userStore = useUserStore();
  watchEffect(async () => {
      budgetStore.budgetList.map(x => {
          form.totalAmount += x.amountInt;
      })
  });
  
  const createCategory = async () => {
      req.idOperation = operationStore.operationId;
      req.amount = Number(budgetAmountInt.value);
      req.idCategory = category.value;
      req.type = wayPay.value;
      console.log(req)
      const headers = {
          Authorization: userStore.tokenAuth,
      }
      await axios.post(host + "/api/budget", req, {
          headers
      }).then((response) => {
          if (response.data.code == 400) {
  
          }
      }).catch((error) => {
          if (error.response) {
              console.error(error.response.data); // => the response payload 
          }
      });
      budgetStore.componentKey + 1;
      budgetStore.budgetList = await Get("/api/budgetByOperation/" + operationStore.operationId)
      Alert("success", "creada la nueva categoria satisfactoriamente")
  }
  </script>