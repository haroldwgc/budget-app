export default class BudgetModel {
    public static _id: string = '';
    public static idOperation: string = '';
    public static type: string = '';
    public static idCategory: string = '';
    public static amount: number = 0;
    public static budgetAmount:string='';
    public static budgetAmountInt:number=0;
    public name: string = '';
    public static exceeded: boolean = false;
}
export default interface BudgetModel {
    _id: string;
    name: string
    budgetAmountInt:number;
    idOperation: string;
    type: string;
    idCategory: string;
    amount: number;
    budgetAmount:string;
    exceeded: boolean;
}
