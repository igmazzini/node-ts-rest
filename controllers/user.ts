import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req:Request, res:Response ) =>{

    try {

        const users = await User.findAll();

        res.json({       
            users
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg:error
        });
    }
   
}
export const getUser = async (req:Request, res:Response ) =>{

    const {id} = req.params;

    try {

        const user = await User.findByPk(id);

        if( user ){

            return res.json({
                user
            });

        }


        res.status(404).json({
            msg:`Not user found with id: ${id}`
        });

       
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg:error
        });
    }

   

}
export const createUser = async (req:Request, res:Response ) =>{

   const { body } = req;

    try {   

        const existEmail = await User.findOne({
            where:{
                email: body.email
            }
        });

        if(existEmail){
            return res.status(500).json({
                msg:`User already exist qith this email: ${body.email}`
            });
        }
        
        const user = await User.create(body);     
        

        res.json({
           user
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            msg:error
        });
    }

}

export const updateUser = async (req:Request, res:Response ) =>{

    const {id} = req.params;
    const { body } = req;

    try {       
       

        const user = await User.findByPk(id);       

        if( !user ){
            return res.status(500).json({
                msg:`Not user found with id: ${id}`
            });
        }


       await  user.update(body,{
            where:{id:id},          
            
        },);          
        
        res.json({
           user
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            msg:error
        });
    }

}
export const deletUser = async (req:Request, res:Response ) =>{

    const {id} = req.params;
  

    try {  
     
        const user = await User.findByPk(id);

        if( !user ){
            return res.status(500).json({
                msg:`Not user found with id: ${id}`
            });
        }

        //await user.destroy();

        await  user.update({status:0},{
            where:{id:id},            
        },);   
               

        res.json({
           user
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            msg:error
        });
    }

}




