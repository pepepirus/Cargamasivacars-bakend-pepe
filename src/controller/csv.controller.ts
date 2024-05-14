import MasivCarsUtils from '../utils/csv.utils'
import IResponse from '../interface/response.interface'
import CarModel from "../models/car.models";



export default class MasivCars{
    private masivCarsUtils: MasivCarsUtils;
    constructor(){
        this.masivCarsUtils = new MasivCarsUtils;
    }
    async massiveLoad(fileCSV:any): Promise<IResponse>{
        try {
            if(!fileCSV){
                return { ok: false, message: "No file upload", response: null, code: 400 }
            }
            const { file } = fileCSV;
            if(!(file.mimetype === "text/csv")){
                return { ok: false, message: "No file csv", response: null, code: 400 }
            }
            const cars = await this.masivCarsUtils.csvToJson(fileCSV);
            
            let carSaves = [] as any;
            let carUpdates = [] as any;
            for(let car of cars){
                const carFind = await CarModel.findOne({serialNumber: car.serialNumber}) as any
                if (carFind){
                    const carUpdate = await CarModel.findByIdAndUpdate(carFind._id,car)
                    carUpdates.push(carUpdate)
                }else{
                    const carSave = await CarModel.create(car) as any
                    carSaves.push(carSave)
                }
               
            }
            const carResponse ={
                carSaves,
                carUpdates
            }
            return { ok: true, message: "upload", response:carResponse, code: 201 }
        } catch (error) {
            return { ok: false, message: "Ocurred Errore", response: null, code: 500 }
        }
    }
}