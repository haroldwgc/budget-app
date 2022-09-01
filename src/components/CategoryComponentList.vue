<template>
    <h3 style="font-weight: bold;font-size: 23px;">Categoria</h3>
    <el-form-item label="Activar edición" align="right">
        <el-switch v-model="form.edit" />
    </el-form-item>
    <p></p>
    <el-input v-model="search" size="small" placeholder="Buscar categoria" />
    <div v-if="form.edit">
        <el-scrollbar height="500px">
            <el-table :data="filterTableData" style="width: 90%">
                <el-table-column label="Name" prop="name" />
                <el-table-column label="Icono" prop="icon">
                    <template #default="scope">
                        <img v-bind:src="scope.row.icon" class="img-fluid mx-auto" alt="..."
                            style=" width:30px ; height: 30px;">
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
        <el-button class="mt-4" style="width: 100%" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Crear
            Categoria
        </el-button>

    </div>

    <div v-if="!form.edit">
        <el-scrollbar height="500px">
            <el-table :data="filterTableData" style="width: 90%">
                <el-table-column label="Name" prop="name" />
                <el-table-column label="Icono" prop="icon">
                    <template #default="scope">
                        <img v-bind:src="scope.row.icon" class="img-fluid mx-auto" alt="..."
                            style=" width:30px ; height: 30px;">
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
                    <div>
                        <el-input v-model="icon" placeholder="Icono" />
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
  import { computed, reactive, ref,  watchEffect } from 'vue'
  import { Alert, Deleted, Get, host } from '../helpers/AxiosHelpers';
  import CategoryRequest from '../models/requests/CategoryRequest';
  import CategoryEntity from '../models/entities/CategoryEntity';
  import { useCategoryStore, useUserStore } from '../store/store';
  let req = new CategoryRequest();
  const categoryStore = useCategoryStore()
  const name = ref('')
  const icon = ref('')
  const search = ref('')
  const form = reactive({
      edit: false,
  })
  const filterTableData = computed(() =>
  
      categoryStore.categoryList.filter(
          (data) =>
              !search.value ||
              data.name.toLowerCase().includes(search.value.toLowerCase())
      )
  
  )
  const handleEdit = (index: number, row: CategoryEntity) => {
      console.log(index, row)
  }
  const handleDelete = async (index: number, row: CategoryEntity) => {
      console.log(index, row)
      await Deleted(row._id, "/api/category/")
      categoryStore.componentKey + 1;
      categoryStore.categoryList = await Get("/api/category")
      Alert("success", "eliminada la categoria " + row.name + " satisfactoriamente")
  }
  const userStore = useUserStore();
  
  watchEffect(async () => {
  
      categoryStore.categoryList = await Get("/api/category")
  
  });
  
  const createCategory = async () => {
      req.description = ""
      req.icon=icon.value
      req.name=name.value
      console.log(req)
      const headers = {
          Authorization: userStore.tokenAuth,
      }
      await axios.post(host + "/api/category", req, {
          headers
      }).then((response) => {
          if (response.data.code == 400) {
  
          }
      }).catch((error) => {
          if (error.response) {
              console.error(error.response.data); // => the response payload 
          }
      });
      categoryStore.componentKey + 1;
      categoryStore.categoryList = await Get("/api/category")
      Alert("success", "creada la nueva categoria satisfactoriamente")
  }
  </script>