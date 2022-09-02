export default class BudgetModel {
    public static _id: string = '';
    public static idOperation: string = '';
    public static type: string = '';
    public static icon: string = '';
    public static idCategory: string = '';
    public static amountInt: number = 0;
    public static amount: string ='';
}
export default interface BudgetModel {
    _id: string;
    idOperation: string;
    type: string;
    name: string;
    icon: string;
    amount: string;
    amountInt: number;
}
