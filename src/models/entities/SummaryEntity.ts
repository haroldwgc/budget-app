export default class SummaryEntity {
    public static _id: string = '';
    public static idOperation: string = '';
    public static type: string = '';
    public static icon: string = '';
    public static idCategory: string = '';
    public static realAmount: number = 0;
    public static budgetAmount: number = 0;
}
export default interface SummaryEntity {
    _id: string;
    idOperation: string;
    type: string;
    name: string;
    icon: string;
    realAmount: number;
    budgetAmount: number;
}
