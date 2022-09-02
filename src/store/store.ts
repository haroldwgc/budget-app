import { defineStore } from "pinia";
import BudgetEntity from "../models/entities/BudgetEntity";
import CategoryEntity from "../models/entities/CategoryEntity";
import EntryEntity from "../models/entities/EntryEntity";
import ExpenseEntity from "../models/entities/ExpenseEntity";
import OperationEntity from "../models/entities/OperationEntity";
import SummaryEntity from "../models/entities/SummaryEntity";
import UserEntity from "../models/entities/UserEntity";
import CategoryRequest from "../models/requests/CategoryRequest";

export const useUserStore = defineStore('user', {
    state: () => ({
        userId: '',
        tokenAuth: '',
        userData: UserEntity
    })
});

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categoryList: [] as CategoryEntity[],
        category: CategoryEntity,
        componentKey:0
    })
})

export const useOperationStore = defineStore('operation', {
    state: () => ({
        operationList: [] as OperationEntity[],
        operation: OperationEntity,
        operationId:'',
        operationName:'',
        componentKey:0
    })
})

export const useBudgetStore = defineStore('budget', {
    state: () => ({
        budgetList: [] as BudgetEntity[],
        budget: BudgetEntity,
        componentKey:0
    })
})

export const useExpenseStore = defineStore('expense', {
    state: () => ({
        expenseList: [] as ExpenseEntity[],
        expense: ExpenseEntity,
        componentKey:0
    })
})

export const useEntryStore = defineStore('entry', {
    state: () => ({
        entryList: [] as EntryEntity[],
        entry: EntryEntity,
        componentKey:0
    })
})

export const useSummaryStore = defineStore('summary', {
    state: () => ({
        summaryList: [] as SummaryEntity[],
        summary: SummaryEntity,
        componentKey:0
    })
})