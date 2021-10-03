import { CryptrSecrate } from "./config";
import Cryptr from 'cryptr'
export const SavePassword = (data) =>{

    const cryptr = new Cryptr(CryptrSecrate);
    const encryptedString = cryptr.encrypt(data);
    localStorage.setItem("pass",JSON.stringify(encryptedString))
}
export const GetPassword = () =>{

    const cryptr = new Cryptr(CryptrSecrate);
    const encryptedString =JSON.parse(localStorage.getItem("pass"))
    const decryptedString = cryptr.decrypt(encryptedString);
    return decryptedString
}
