<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span v-if="operationStore.operationName !== ''" class="text-large font-600 mr-3">Operación:
                    {{  operationStore.operationName  }} </span>
            </div>
        </template>
        <EntryComponentList :key="entryStore.componentKey" />
    </el-card>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { Get } from "../helpers/AxiosHelpers";
import { useEntryStore, useOperationStore } from "../store/store";
import EntryComponentList from "./EntryComponentList.vue"
const entryStore = useEntryStore()
const operationStore = useOperationStore()

watch(() => [entryStore.componentKey], async (first, second) => {
    entryStore.entryList = await Get("/api/entry/byIdOperation/" + operationStore.operationId)
})

</script>