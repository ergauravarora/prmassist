const userCrud = require('../crud/crud-user');
const selector = require('../selectors/user');
var uuid = require('uuid');


const RegisterUser  = async (req, res, next) => {
    try {
            const response = await userCrud.create(req.body);
            console.log(response);
            res.status(201).json({response, msg: `Saved successfully`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const GetUser = async (req, res, next) => {
    try {
        //console.log(JSON.stringify(.id))
        var {id } = req.query;
        const response = await userCrud.read(selector.byId(id));
        console.log(response);
        // se
        res.status(201).json({response, msg: `User Data`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const UpdateUser =  async (req, res, next) => {
    try {
        //console.log(JSON.stringify(.id))
        var {id } = req.query;
        const user = await userCrud.read(selector.byId(id));
        if(user.length > 0)
        {
            var updatedUser = {...user[0],...req.body};
            
            var response= await userCrud.create(updatedUser);
            
            // se
            res.status(201).json({response, msg: `User Data Updated`});
        }
        else
        {
            res.status(400).json({user, msg: `No Data Found for user id "${id}"`});
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const AddUserToTravelCompanionList = async (req, res, next) => {
    try 
    {
        var {firebaseid } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {


            if(response[0].travelCompanions && response[0].travelCompanions.length >0)
            {
                const emailExists = response[0].travelCompanions.some(travelCompanion => travelCompanion.email === req.body.email);
                if(emailExists) 
                {
                    res.status(400).json({'message' : "Email Already Exist"});    
                    return     
                }
                
                const phoneNumberExists = response[0].travelCompanions.some(travelCompanion => travelCompanion.phoneNumber === req.body.phoneNumber);
                if(phoneNumberExists) 
                {
                    res.status(400).json({'message' : "Phone Number Already Exist"});        
                    return 
                }
                response[0].travelCompanions.push(req.body);
            }
            else
            {
                response[0].travelCompanions = [];
                response[0].travelCompanions.push(req.body);
            }
            
            const resp = await userCrud.update(response[0]);
    
            if(resp.ok)
            {
                res.status(201).json({resp, msg: `Saved successfully`});    
            }
            else
            {
                res.status(400).json({'message' : "Data doesn't Updated"});    
            }
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const GetTravelCompanionList= async (req, res, next) => {
    try {
        var {firebaseid } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            var travelCompanions= response[0].travelCompanions;
            res.status(200).json({travelCompanions, msg: `Travel Companion List`});    
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) 
    {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const DeleteTravelCompanionEntry= async (req, res, next) => {
    try {
        var {firebaseid,email } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            var travelCompanions= response[0].travelCompanions;
            var travelCompanionToDelete = travelCompanions.find(travelCompanion => travelCompanion.email === email);
            
            if(!travelCompanionToDelete)
            {
                res.status(400).json({'message' : "No Travel Companion for this email"});    
                return
            }

            travelCompanions.pop(travelCompanionToDelete);

            response[0].travelCompanions = travelCompanions;
            const resp = await userCrud.update(response[0]);
    
            if(resp.ok)
            {
                res.status(201).json({resp, msg: `Deleted Successfully`});    
            }
            else
            {
                res.status(400).json({'message' : "Data doesn't Updated"});    
            }
            res.status(200).json({travelCompanions, msg: `Travel Companion List`});    
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const AddPayementMethod = async (req, res, next) => {
    try 
    {
        var {firebaseid } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {


            if(response[0].payments && response[0].payments.length >0)
            {
                const cardNumberExists = response[0].payments.some(payment => payment.cardNumber === req.body.cardNumber);
                if(cardNumberExists) 
                {
                    res.status(400).json({'message' : "Card Number Exists"});    
                    return     
                }
                
                response[0].payments.push({...req.body,id:uuid.v1()});
            }
            else
            {
                response[0].payments = [];
                response[0].payments.push({...req.body,id:uuid.v1()});
            }
            
            const resp = await userCrud.update(response[0]);
    
            if(resp.ok)
            {
                res.status(201).json({resp, msg: `Saved successfully`});    
            }
            else
            {
                res.status(400).json({'message' : "Data doesn't Updated"});    
            }
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const GetPayementMethods = async (req, res, next) => {
    try {
        var {firebaseid } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            var payments= response[0].payments;
            if(payments && payments.length >0)
            {
                res.status(200).json({payments, msg: `Payment List`});    
            }
            else
            {
                res.status(200).json({payments, msg: `No Data in Payment List`});    
            }
            
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const DeletePayementMethod = async (req, res, next) => {
    try {
        var {firebaseid,id } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            var payments= response[0].payments;
            var paymentsToDelete = payments.find(payment => payment.id === id);
            
            if(!paymentsToDelete)
            {
                res.status(400).json({'message' : "No Payments for this id"});    
                return
            }

            payments.pop(paymentsToDelete);

            response[0].payments = payments;
            const resp = await userCrud.update(response[0]);
    
            if(resp.ok)
            {
                res.status(201).json({resp, msg: `Deleted Successfully`});    
            }
            else
            {
                res.status(400).json({'message' : "Data doesn't Updated"});    
            }
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const AddTravelDocument = async (req, res, next) => {
    try 
    {
        var {firebaseid } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {


            if(response[0].travelDocuments && response[0].travelDocuments.length >0)
            {
                const travelDocumentExists = response[0].travelDocuments.some(travelDocument => travelDocument.passportNumber === req.body.passportNumber);
                if(travelDocumentExists) 
                {
                    res.status(400).json({'message' : "Travel Document Exists"});    
                    return     
                }
                
                response[0].travelDocuments.push({...req.body,id:uuid.v1()});
            }
            else
            {
                response[0].travelDocuments = [];
                response[0].travelDocuments.push({...req.body,id:uuid.v1()});
            }
            
            const resp = await userCrud.update(response[0]);
    
            if(resp.ok)
            {
                res.status(201).json({resp, msg: `Saved successfully`});    
            }
            else
            {
                res.status(400).json({'message' : "Data doesn't Updated"});    
            }
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    }  catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const GetTravelDocuments = async (req, res, next) => {
    try {
        var {firebaseid } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            var travelDocuments= response[0].travelDocuments;
            if(travelDocuments && travelDocuments.length >0)
            {
                res.status(200).json({travelDocuments, msg: `Travel Documents List`});    
            }
            else
            {
                res.status(200).json({msg: `No data in Travel Documents List`});    
            }
            
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const DeleteTravelDocument = async (req, res, next) => {
    try {
        var {firebaseid,id } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            var travelDocuments= response[0].travelDocuments;
            var travelDocumentsToDelete = travelDocuments.find(payment => payment.id === id);
            
            if(!travelDocumentsToDelete)
            {
                res.status(400).json({'message' : "Travel Documents for this id"});    
                return
            }

            travelDocuments.pop(travelDocumentsToDelete);

            response[0].travelDocuments = travelDocuments;
            const resp = await userCrud.update(response[0]);
    
            if(resp.ok)
            {
                res.status(201).json({resp, msg: `Deleted Successfully`});    
            }
            else
            {
                res.status(400).json({'message' : "Data doesn't Updated"});    
            }
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const AddQrData = async (req, res, next) => {
    try 
    {
        var {firebaseid } = req.query;
        console.log(req.body.flightNumber)
        console.log(req.file.filename)
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            if(response[0].qrCode && response[0].qrCode.length >0)
            {
                var qrObj = {
                    qrImage:"/Upload/"+req.file.filename,
                    flightNumber:req.body.flightNumber,
                    id:uuid.v1()
                }
                
                response[0].qrCode.push(qrObj);
            }
            else
            {
                response[0].travelDocuments = [];
                var qrObj = {
                    qrImage:"/Upload/"+req.file.filename,
                    flightNumber:req.body.flightNumber,
                    id:uuid.v1()
                }
                
                response[0].qrCode.push(qrObj);
            }
            
            const resp = await userCrud.update(response[0]);
    
            if(resp.ok)
            {
                res.status(201).json({resp, msg: `Saved successfully`});    
            }
            else
            {
                res.status(400).json({'message' : "Data doesn't Updated"});    
            }
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const GetQrDatas = async (req, res, next) => {
    try {
        var {firebaseid } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            var qrCode= response[0].qrCode;
            if(qrCode && qrCode.length >0)
            {
                res.status(200).json({qrCode, msg: `Qr Code List`});    
            }
            else
            {
                res.status(200).json({msg: `No data in Qr Code List`});    
            }
            
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}
const DeleteQrData = async (req, res, next) => {
    try {
        var {firebaseid,id } = req.query;
        const response = await userCrud.read(selector.byFirebaseId(firebaseid));
        if(response.length >0)
        {
            var qrCode= response[0].qrCode;
            var qrCodeToDelete = qrCode.find(qr => qr.id === id);
            
            if(!qrCodeToDelete)
            {
                res.status(400).json({'message' : "Travel Documents for this id"});    
                return
            }

            qrCode.pop(qrCodeToDelete);

            response[0].qrCode = qrCode;
            const resp = await userCrud.update(response[0]);
    
            if(resp.ok)
            {
                res.status(201).json({resp, msg: `Deleted Successfully`});    
            }
            else
            {
                res.status(400).json({'message' : "Data doesn't Updated"});    
            }
        }
        else
        {
            res.status(400).json({'message' : "No user matching this id"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}


module.exports = { DeleteQrData,GetQrDatas,AddQrData,DeleteTravelDocument,AddTravelDocument,GetTravelDocuments,AddPayementMethod,GetPayementMethods,DeletePayementMethod,RegisterUser,GetUser,UpdateUser,AddUserToTravelCompanionList,GetTravelCompanionList,DeleteTravelCompanionEntry };