import express from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types"
import { prismaClient } from "@repo/db/client";
const app = express();


app.post("/signup", (req,res)=> {
    // db call 
    const ParsedData = CreateUserSchema.safeParse(req.body);
    if(!ParsedData.success) {
        res.json({
            message : "Incorrect Inputs"
        });
        return ;
    }
    try {
        prismaClient.user.create({
            data:{
                email : ParsedData.data?.username,
                password : ParsedData.data.password,
                name : ParsedData.data.name
            }
        });
    
        res.json({
            userId: 123
        });
    }
    catch(e) {
        res.status(411).json({
            message : "User already exist with this username"
        })   
    }
});


app.post("/signin", (req,res)=> {
    
    const userId = 1;
    const token = jwt.sign({userId},JWT_SECRET);

    res.json({
        token : token
    })
});



app.post("/room", middleware, (req,res)=> {
    // db call 
    res.json({
        roomId : 123
    })
})



app.listen(3001);
