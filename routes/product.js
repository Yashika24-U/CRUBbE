import express from "express";
import {client} from "../index.js"


const router = express.Router();


router.post("/",async(req,res)=>{
    const newProducts = req.body;
    const result  = await client
    .db("crud")
    .collection("products")
    .insertMany(newProducts)
    res.send(result)
});


router.get("/",async(req,res)=>{
    const result = await client
    .db("crud")
    .collection("products")
    .find()
    .toArray();
    res.send(result)
});


router.get("/:id",async(req,res)=>{
    const {id} = req.params;
    console.log(req.params)
    const result = await client
    .db("crud")
    .collection("products")
    .findOne({id:id});
   result ? res.send(result):res.send({message:"No products Found"})

});



router.delete("/:id",async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const result = await client
    .db("crud")
    .collection("products")
    .deleteOne({id:id})
    result ? res.send(result)
    : res.status(404).send({message:"No products Found"})
    
});


router.put("/:id",async(req,res)=>{
    const {id} = req.params;
    const updatedProducts = req.body;
    const result = await client
    .db("crud")
    .collection("products")
    .updateOne({id:id},{$set : updatedProducts})
   res.send(result)
   


})




































export const productsRouter = router;
