import { PrismaClient } from "@prisma/client";
import express from 'express'
const prisma=new PrismaClient();
const dataRouter=express.Router();

dataRouter.get('/data',async (req,res)=>{
    const response=await fetch('https://api.wazirx.com/api/v2/tickers')
    const data=await response.json()
    const dataArr=Object.values(data)
    const top10=dataArr.slice(0,10)
    const getData=await prisma.data.findMany()
    if(getData.length>0){
        const deleteData=await prisma.data.deleteMany()
        if(deleteData){
            console.log('Data deleted successfully')
        }
        else{
            console.log('Data not deleted')
        }
    }
    const storedData=await prisma.data.createMany({
        data:top10.map(result=>({
            name:result.name,
            last:result.last,
            buy:result.buy,
            sell:result.sell,
            volume:result.volume,
            base:result.base_unit
        }))
    })

    if(storedData){
        console.log('Data stored successfully')
    }
    else{
        console.log('Data not stored')
    }

    const fetchData=(await prisma.data.findMany())

    if(fetchData){
        return res.status(200).json(fetchData)
    }
    else{
        res.json({message:'Data not found'})
    }
})

dataRouter.get('/delete',async (req,res)=>{
    const deleteData=await prisma.data.deleteMany()
    if(deleteData){
        return res.status(200).json({message:'Data deleted successfully'})
    }
    else{
        res.json({message:'Data not deleted'})
    }
})

export default dataRouter
