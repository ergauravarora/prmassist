import { initializeApp } from "@firebase/app";
import { getDatabase, ref, child, get ,set,update } from "firebase/database";
import firebaseConfig from "../config/fireconfig.js";

const appinit = initializeApp(firebaseConfig)
const db = getDatabase();
const dbRef = ref(getDatabase());

const GetUserById =(body) =>{
    return get(ref(db, `users/${body.uid}`))
}
const GetAllUser =(body) =>{
    return get(ref(db, `users`))
}

const RegisterUser =(body) =>{
    return set(ref(db, `users/${body.uid}`), {...body,isVarified:false} )
}
const ReportBug =(body) =>{
    var path = body.uid+"/"+ new Date().getTime();
    return set(ref(db, `Bug/${path}`), body )
}


const VerifyRegisterUser=(body) =>{ 
    return update(ref(db,`users/${body.uid}`), {isVarified:true})
}
const DenyRegisterUser=(body) =>{ 
    return update(ref(db,`users/${body.uid}`), {isVarified:false})
}




export default {
    ReportBug,
    GetUserById,
    RegisterUser,
    VerifyRegisterUser,
    GetAllUser,
    DenyRegisterUser
}