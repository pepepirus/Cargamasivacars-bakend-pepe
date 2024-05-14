import {ICar} from "../interface/car.interface";
import IResponse from "../interface/response.interface";
import CarModel from "../models/car.models";


export default class CarCotroller{
    async createCar (carData: ICar): Promise <IResponse>{
        try{ 
            const existingCar = await CarModel.findOne({model: carData.model})
            if (existingCar) {
                return {
                    ok: false, 
                    message: "A car with the same model already exist",
                    response: null ,
                    code: 400 
                }
            } 
            const createdCar = await CarModel.create(carData)
            return {
                ok: true,
                message: "car created",
                response: createdCar,
                code: 200
            }
        } catch (error){
            return {
                ok: false,
                message: "error creating car",
                response: error,
                code: 500
            }
        }
    }

 
    async readCar (serialNumber: String): Promise <IResponse> {
        try{
          
            const carRead = await CarModel.findOne(serialNumber)
            return {
                ok: true,
                message: "car serial number is correct",
                response: carRead,
                code: 200
            }
        } catch (error){
            return {
                ok: false,
                message: "erro server",
                response: error,
                code: 500
            }                 
        }

    }

    async updateCar (cylinders: any): Promise <IResponse> {
        
        try{
            const power = await CarModel.updateOne(cylinders) 
        
                return {
                ok: true, 
                message: "cylinder car is correct",
                response: power,
                code: 200 
            }
        
            }catch(error){
                return {
                    ok: false,
                    message: "error server ",
                    response: error,
                    code: 500
                }            
            }
        }
     async deleteCar (ICar: any): Promise <IResponse> {
        
            try{
                const brand = await CarModel.deleteMany(ICar)

                    return{
                        ok: true,
                        message: "cart successfully deleted",
                        response: brand,
                        code: 200
                    }

                }catch (error){
                    return{
                        ok: false,
                        message: "server error",
                        response: error,
                        code: 500
                    }
            }
     }
}
