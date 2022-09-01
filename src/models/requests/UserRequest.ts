export default class UserRequest {
    public static user: string = '';
    public name: string = '';
    public static mail: string = '';
    public static password: string = '';

}
export default interface UserRequest {
    user: string;
    name: string;
    mail: string;
    password: string;
}
