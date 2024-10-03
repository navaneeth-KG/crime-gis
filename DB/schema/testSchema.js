import { Schema,model } from "mongoose";
const propertySchema = Schema({})
const geometrySchema = Schema({})
const testSchema = Schema({type:String,properties:propertySchema,geometry:geometrySchema})


const test = model('test',testSchema)



export default test