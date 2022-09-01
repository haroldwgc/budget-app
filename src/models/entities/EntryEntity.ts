export default class EntryRequest {
    public _id: string = '';
    public idOperation: string = '';
    public name: string = '';
    public origin: number = 0;
    public amountInt: number = 0;
    public amount: string = '';
    public created: Date = new Date();
}

export default interface EntryRequest {
     _id: string;
     idOperation: string;
     name: string;
     origin: number;
     amountInt: number;
     amount: string;
     created: Date;
}