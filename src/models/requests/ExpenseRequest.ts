export default  class ExpenseRequest {
    public static idOperation: string = '';
    public static nameCategory: string = '';
    public static type: string = '';
    public name: string = '';
    public static amount: number = 0;
    public static dateAmount: string = '';
    public static iconCategory: string = '';
}

export default interface  ExpenseRequest {
    idOperation: string ;
    nameCategory: string ;
    type: string;
    name: string ;
    amount: number;
    dateAmount: string;
    iconCategory: string;
}