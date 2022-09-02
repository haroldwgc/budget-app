<template>
    <h3 style="font-weight: bold;font-size: 23px;">Operación</h3>

    <el-form-item label="Activar edición" align="right">
        <el-switch v-model="form.edit" />
    </el-form-item>
    <p></p>
    <el-input v-model="search" size="small" placeholder="Buscar operación" />
    <p></p>
    <div v-if="form.edit">
        <el-scrollbar height="200px">
            <el-table :data="filterTableData" style="width: 90%">
                <el-table-column label="Name" prop="name" />

                <el-table-column align="right">
                    <template #default="scope">
                        <el-button size="small" @click="handleSelect(scope.$index, scope.row)">Selecionar</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
        <el-button class="mt-4" style="width: 100%" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Crear
            Operación
        </el-button>

    </div>
    <div v-if="!form.edit">
        <el-scrollbar height="200px">
            <el-table :data="filterTableData" style="width: 90%">
                <el-table-column label="Name" prop="name" />
                <el-table-column align="right">
                    <template #default="scope">
                        <el-button size="small" @click="handleSelect(scope.$index, scope.row)">Selecionar</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>

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
                        <el-input v-model="name" placeholder="Nombre" />
                    </div>
                    <p></p>
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
  import { Alert, Deleted, Get, host } from '../helpers/AxiosHelpers';
  import OperationRequest from '../models/requests/OperationRequest';
  import { useBudgetStore, useCategoryStore, useEntryStore, useExpenseStore, useOperationStore, useSummaryStore, useUserStore } from '../store/store';
  import OperationEntity from '../models/entities/OperationEntity';
  import router from '../routes';
  import { ElLoading } from 'element-plus'
  let req = new OperationRequest();
  const operationStore = useOperationStore()
  const userStore = useUserStore();
  const entryStore = useEntryStore()
  const expenseStore = useExpenseStore()
  const budgetStore = useBudgetStore()
  const categoryStore = useCategoryStore()
  const summaryStore = useSummaryStore()
  const name = ref('')
  const search = ref('')
  const form = reactive({
      edit: false,
  })
  
  const openFullScreen2 = () => {
      const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
          loading.close()
      }, 1600)
  }
  
  const filterTableData = computed(() =>
  
      operationStore.operationList.filter(
          (data) =>
              !search.value ||
              data.name.toLowerCase().includes(search.value.toLowerCase())
      )
  )
  const handleSelect = async (index: number, row: OperationEntity) => {
      openFullScreen2();
      operationStore.operationId = row._id
      operationStore.operationName = row.name
      console.log(index, row)
      entryStore.entryList = await Get("/api/entry/byIdOperation/" + operationStore.operationId)
      expenseStore.expenseList = await Get("/api/expense/byIdOperation/" + operationStore.operationId)
      budgetStore.budgetList = await Get("/api/budgetByOperation/" + operationStore.operationId)
      categoryStore.categoryList = await Get("/api/category")
      summaryStore.summaryList = await Get("/api/summary/" + operationStore.operationId)
      router.push('/summary')
  }
  const handleDelete = async (index: number, row: OperationEntity) => {
      console.log(index, row)
      await Deleted(row._id, "/api/operation/")
      operationStore.componentKey + 1;
      operationStore.operationList = await Get("/api/operationByUser/" + userStore.userId)
      Alert("success", "eliminada la operación " + row.name + " satisfactoriamente")
  }
  
  watchEffect(async () => {
  
      operationStore.operationList = await Get("/api/operationByUser/" + userStore.userId)
  });
  
  const createCategory = async () => {
  
      req.name = name.value
      req.idUser = userStore.userId;
      console.log(req)
      const headers = {
          Authorization: userStore.tokenAuth,
      }
      await axios.post(host + "/api/operation", req, {
          headers
      }).then((response) => {
          if (response.data.code == 400) {
  
          }
      }).catch((error) => {
          if (error.response) {
              console.error(error.response.data); // => the response payload 
          }
      });
      operationStore.componentKey + 1;
      operationStore.operationList = await Get("/api/operationByUser/" + userStore.userId)
      Alert("success", "creada la nueva operación satisfactoriamente")
  }
  </script>