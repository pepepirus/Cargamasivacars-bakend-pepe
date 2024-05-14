import { Router, Request, Response } from "express";
import MasivCars from "../controller/csv.controller"

const router = Router()
const masiveCars = new MasivCars ()


router.post('/massive-Load', async( req: Request, res: Response) =>{
    try {
        
        const file = req.files;
        const response = await masiveCars.massiveLoad(file)
        return res.status( response.code ).json( response );
    } catch (err:any) {
        return res.status( err.code ? err.code: 500).json(err)
    }
})

export default router