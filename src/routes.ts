import { Router, Request, Response } from "express";
import CarCotroller from "./controller/car.controllers";


const router = Router()
const carController = new CarCotroller()

router.post('/createCar', async (req: Request, res: Response) => {
    try {
        const response = await carController.createCar(req.body)
        res.status(response.code).json(response)

    }catch(error){
        res.status(500).json({
            ok: false,
            message: "internal server error",
            error
        })
    }
})

router.get('/getCar', async (req: Request, res: Response) =>{
    const serialNumber = req.body
    try {
        const response = await carController.readCar(serialNumber)
        res.status(response.code).json(response)

        }catch(error){
        res.status(500).json({
          ok:false, 
          message: "internal server error",
          error 
        })
    }
})

router.put('/putCar', async (req: Request, res: Response) =>{
    const cylinders = req.body
    try{
        const response = await carController.updateCar(cylinders)
        res.status(response.code).json(response)

        }catch(error){
            res.status(500).json({
                ok:false,
                message: "Internal server error",
                error
            })
        }
})
router.delete('/deleteCar', async( req: Request, res: Response) =>{
     const company = req.body
    
     try {
        const response = await carController.deleteCar(company)
        res.status(response.code).json(response)

     }catch(error){
        res.status(500).json({
                ok: false,
                message: "Internal server error",
                error
        })
}
})

export default router