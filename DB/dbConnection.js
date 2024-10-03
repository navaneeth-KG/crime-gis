import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://navnt_icfoss:navaneethkg99@cluster0.pdest98.mongodb.net/crime-dashboard?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log('db connected')}).catch(e=>{console.log(e)})

export default mongoose
