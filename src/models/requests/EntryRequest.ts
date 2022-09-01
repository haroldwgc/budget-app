export default class EntryRequest {
    public idOperation: string = '';
    public name: string = '';
    public origin: number = 0;
    public amount: number = 0;
    public created: string = '';
}

export default interface EntryRequest {
     idOperation: string;
     name: string;
     origin: number;
     amount: number;
     created: string;
}