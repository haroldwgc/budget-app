import {RouteRecordRaw,createRouter,createWebHistory, createWebHashHistory} from 'vue-router'
import OperationComponent from '../components/OperationComponent.vue';
import SummaryComponent from '../components/SummaryComponent.vue';
import CategoryComponent from '../components/CategoryComponent.vue';
import EntryComponent from '../components/EntryComponent.vue';
import ExpenseComponent from '../components/ExpenseComponent.vue';
import BudgetComponent from '../components/BudgetComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';

const routes:RouteRecordRaw[]=[
    {
        path:'/summary',
        name:'summary',
        component: SummaryComponent
    },
    {
        path:'/operations',
        name:'operations',
        component:OperationComponent
    }
    ,
    {
        path:'/categories',
        name:'categories',
        component:CategoryComponent
    }
    ,
    {
        path:'/expenses',
        name:'expenses',
        component:ExpenseComponent
    }
    ,
    {
        path:'/entries',
        name:'entries',
        component:EntryComponent
    }
    ,
    {
        path:'/budgets',
        name:'budgets',
        component:BudgetComponent
    }
    ,
    {
        path:'/',
        name:'login',
        component:LoginComponent
    }
    
];
const router=createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;