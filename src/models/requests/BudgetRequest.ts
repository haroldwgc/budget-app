export default class BudgetRequest {

    public static idOperation: string = '';
    public static idCategory: string = '';
    public type: string = '';
    public static amount: number = 0;
    public name: string = '';
    public static exceeded: boolean = false;
}
export default interface BudgetRequest {
    idOperation: string;
    idCategory: string;
    type: string;
    amount: number;
    name: string;
    exceeded: boolean;
}
