const admin = require("firebase-admin");

const serviceAccount = require("../firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://prm-assist-portal-default-rtdb.firebaseio.com"
  });

const userCrud = require('../crud/crud-user');
const selector = require('../selectors/user');


const StoreToken =  async (req, res, next) => { 
    try {
        //console.log(JSON.stringify(.id))
        var {userId,fcmToken } = req.body;
        const user = await userCrud.read(selector.byId(userId));
        if(user.length > 0)
        {
            var fcm = user[0].fcmToken;
            if(fcm && fcm.length)
            {
                fcm.push(fcmToken)
            }
            else
            {
                fcm = [fcmToken]
            }
            var updatedUser = {...user[0],fcmToken:fcm};
            
            var response= await userCrud.create(updatedUser);
            
            // se
            if(response.ok)
            {
                res.status(201).json({updatedUser, msg: `User Data Updated`});
            }
            
        }
        else
        {
            res.status(400).json({user, msg: `No Data Found for user id "${userId}"`});
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}

const SendNotification =  async (req, res, next) => { 
    try {
        
        //console.log(JSON.stringify(.id))
        var {userId,notificationTitle,notificationText } = req.body;
        const user = await userCrud.read(selector.byId(userId));
        if(user.length >0)
        {
            // const registrationToken = user[0].fcmToken[0];
            // const message = {
            //     notification: {
            //       title: notificationTitle,
            //       body: notificationText
            //     },
            //     data: {
            //       account: "Savings",
            //       balance: "$3020.25"
            //     }
            //   };
            // const options ={
            //     priority: "high",
            //     timeToLive: 60 * 60 * 24
            //   };
            // await admin.messaging().sendToDevice(registrationToken, message, options).then(function(response) {
            //     if(response.successCount === 1)
            //     {
            //         res.status(200).json({ message: "Successfully sent notifications! id:"+response.results[0].messageId });
            //     }
            //     if(response.failureCount === 1)
            //     {
            //         res.status(400).json({ errors: "Error while sending notifications :"+response.results[0].error });
            //     }
            //   }).catch(err=>{
            //       console.log(err)
            //   })
             const registrationTokens = user[0].fcmToken;                 
              const message = {
                notification: {
                    title: notificationTitle,
                    body: notificationText
                  },
                  data: {
                    account: "Savings",
                    balance: "$3020.25"
                  },
                tokens: registrationTokens,
              };
              
              admin.messaging().sendMulticast(message).then((response) => {
            const failedTokens = [];
            const successTokens = [];
              
                    if (response.failureCount > 0) {
                        
                        response.responses.forEach((resp, idx) => {
                          if (!resp.success) {
                            failedTokens.push(resp.error.message+"-"+registrationTokens[idx]);
                          }
                        });
                      }
                      if (response.successCount > 0) {
                        
                        response.responses.forEach((resp, idx) => {
                          if (resp.success) {
                            successTokens.push("success :"+registrationTokens[idx]);
                          }
                        });
                      }
        
            res.status(200).json({message:response.successCount + ' messages were sent successfully '+response.failureCount + ' messages failed',erros:failedTokens,success:successTokens});
                });
              
        }
        else
        {
            res.status(400).json({ errors: "No user found for user id: "+userId });
        }
       
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}

module.exports = { StoreToken,SendNotification };