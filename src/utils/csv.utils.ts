import csvToJson from "convert-csv-to-json";
import path from "path";
import fs from "fs"

export default class MasivCarsUtils{
    private dirCsv = path.join(__dirname, '../uploads/csv')
    //dirrecion completa donde se guardara dirCsv

    async csvToJson(fileCSV:any){
        const { file } = fileCSV;
        const dir = path.join(this.dirCsv, 'name.csv');
        //Suber el archivo y al mismo crea la carpeta
        await file.mv(dir);
        
        
        let dataJson = csvToJson.parseSubArray('*',',').fieldDelimiter(',').supportQuotedField(true).formatValueByType(true).getJsonFromCsv(dir);
        console.log(dataJson)  
        
        await fs.promises.unlink(dir);

        return dataJson;
}
}