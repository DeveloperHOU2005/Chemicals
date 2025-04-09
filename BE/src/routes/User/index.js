import { Router } from "express";

const router = Router();

router.get('/', (req, res)=>{
    res.json({status: 200, data: 'Data user'})
})


export default router