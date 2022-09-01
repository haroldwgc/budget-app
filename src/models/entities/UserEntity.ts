export default abstract class UserEntity {
    public static _id: string = '';
    public static user: string = '';
    public name: string = '';
    public static mail: string = '';
    public static password: string = '';

}
export interface IUserEntity {
    _id: string;
    user: string;
    name: string;
    mail: string;
    password: string;
}

