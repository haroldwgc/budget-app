import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../routes";
import { useUserStore } from "../store/store";


export async function Login(user: any) {
    const userStore = useUserStore();
    console.log(user)
    await axios.post(host + "/api/auth", user, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        userStore.tokenAuth = response.data.token;
        userStore.userId = response.data.user._id;
        if (response.data.code === 400) {
            //Alerta("No existe usuario registrado, por favor registrese","danger");
            router.push("/")
        }
        router.push("/operations")
    }).catch((error) => {
        if (error.response) {

            //Alerta("No existe usuario registrado, por favor registrese","danger");
            console.error(error.response.data); // => the response payload 
            router.push("/")
        }
    });
}

export async function Get(uri: string) {
    let list: [] = []
    const userStore = useUserStore();
    const headers = {
        Authorization: userStore.tokenAuth,
    };
    await axios.get(host + uri, { headers }).then((response) => {
        if (response.data.code === 400 ||response.data==null) {
            //Alerta("No existe usuario registrado, por favor registrese","danger");
            console.log(" errores :"+response.data)
            router.push("/")
        }
        list = response.data
    });
    return list
}

export async function Deleted(valor: any, uri: string) {

    const userStore = useUserStore();
    let urlOperation = host + uri + valor;
    const headers = {
        Authorization: userStore.tokenAuth,
    };
    axios.delete(urlOperation, { headers }).then((response) => {
        if (response.data.code == 400) {

        }
    });
}

export function Alert(type:any, message:string){
    ElMessage({
        type: type,
        message: message,
      })
}

export function Formater() {

    const result = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });

    return result;
}
//export const host = "http://localhost:9000";
export const host = "https://shrouded-gorge-06880.herokuapp.com";