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
const ChangePassword=(body) =>{ 
    return update(ref(db,`users/${body.uid}`), {password:body.newPassword})
}
const ChangeEmail=(body) =>{ 
    return update(ref(db,`users/${body.uid}`), {email:body.newEmail})
}

const Login = (body) =>{
    
    return  get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            var datas = Object.entries(snapshot.val()).map((e) => e[1]);
          
            if(datas.length > 0)
            {
                var findedUser=null;
                datas.forEach(user => {
                    if(user.email === body.email && user.password === body.password)
                    {
                        console.log("user matched")
                        findedUser= user;
                    }
                })
                return findedUser;
            }
            console.log(datas);
        } else {
          console.log("No data available");
        }
    })
}



export default {
    Login,
    ReportBug,
    ChangeEmail,
    GetUserById,
    RegisterUser,
    VerifyRegisterUser,
    GetAllUser,
    DenyRegisterUser,
    ChangePassword
}