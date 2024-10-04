import express from 'express'
import cors from 'cors'
import mongoose from './DB/dbConnection.js'
import test from './DB/schema/testSchema.js'


const app = express()
app.use(express.json())
app.use(cors())



app.get('/states',async(req,res)=>{
    const states = await test.aggregate([{$group: {
        _id: "$properties.STATE/UT"  
      }}])
      console.log(states)
      res.json(states)
})

app.get('/year',async(req,res)=>{
    const year= await test.aggregate([{
        $group: {
          _id: "$properties.YEAR"
        }
      },{
        $sort: {
          _id: 1
        }
      }])
      console.log(year)
      res.json(year)
})

app.get('/time',async(req,res)=>{
  const time= await test.aggregate([{$match:{'properties.STATE/UT':'KERALA'}},{
      $group: {
        _id: "$properties.time"
      }
    },{
      $sort: {
        _id: 1
      }
    }])
    console.log(time)
    res.json(time)
})


app.get('/district',async(req,res)=>{
  // const {state} = req.params
  const district= await test.aggregate([{$match: {
    "properties.STATE/UT":"KERALA",
    
  }},{
    $group: {
      _id: "$properties.DISTRICT",
  
    },
    
  
  }
  ])

 res.json(district)
}
)
  

//get total crime details
app.get('/total',async(req,res)=>{
const totalData = await test.aggregate(
  [
    {
      $group: {
        _id: null,
        MURDER: { $sum: "$properties.MURDER" },
        ATTEMPT_TO_MURDER: { $sum: "$properties.ATTEMPT TO MURDER" },
        CULPABLE_HOMICIDE_NOT_AMOUNTING_TO_MURDER: { $sum: "$properties.CULPABLE HOMICIDE NOT AMOUNTING TO MURDER" },
        RAPE: { $sum: "$properties.RAPE" },
        CUSTODIAL_RAPE: { $sum: "$properties.CUSTODIAL RAPE" },
        OTHER_RAPE: { $sum: "$properties.OTHER RAPE" },
        KIDNAPPING_AND_ABDUCTION: { $sum: "$properties.KIDNAPPING & ABDUCTION" },
        KIDNAPPING_AND_ABDUCTION_OF_WOMEN_AND_GIRLS: { $sum: "$properties.KIDNAPPING AND ABDUCTION OF WOMEN AND GIRLS" },
        KIDNAPPING_AND_ABDUCTION_OF_OTHERS: { $sum: "$properties.KIDNAPPING AND ABDUCTION OF OTHERS" },
        DACOITY: { $sum: "$properties.DACOITY" },
        ROBBERY: { $sum: "$properties.ROBBERY" },
        BURGLARY: { $sum: "$properties.BURGLARY" },
        THEFT: { $sum: "$properties.THEFT" },
        AUTO_THEFT: { $sum: "$properties.AUTO THEFT" },
        RIOTS: { $sum: "$properties.RIOTS" },
        CRIMINAL_BREACH_OF_TRUST: { $sum: "$properties.CRIMINAL BREACH OF TRUST" },
        CHEATING: { $sum: "$properties.CHEATING" },
        COUNTERFEITING: { $sum: "$properties.COUNTERFIETING" },
        ARSON: { $sum: "$properties.ARSON" },
        HURT_GRIEVOUS_HURT: { $sum: "$properties.HURT/GREVIOUS HURT" },
        DOWRY_DEATHS: { $sum: "$properties.DOWRY DEATHS" },
        ASSAULT_ON_WOMEN_WITH_INTENT_TO_OUTRAGE_HER_MODESTY: { $sum: "$properties.ASSAULT ON WOMEN WITH INTENT TO OUTRAGE HER MODESTY" },
        INSULT_TO_MODESTY_OF_WOMEN: { $sum: "$properties.INSULT TO MODESTY OF WOMEN" },
        CRUELTY_BY_HUSBAND_OR_HIS_RELATIVES: { $sum: "$properties.CRUELTY BY HUSBAND OR HIS RELATIVES" },
        IMPORTATION_OF_GIRLS_FROM_FOREIGN_COUNTRIES: { $sum: "$properties.IMPORTATION OF GIRLS FROM FOREIGN COUNTRIES" },
        CAUSING_DEATH_BY_NEGLIGENCE: { $sum: "$properties.CAUSING DEATH BY NEGLIGENCE" }
      }
    },{
      $project: {
        _id:0
      }
    }
  ]
  
)
res.json(totalData)

})

//get total data year wise 
app.get('/total/:year',async(req,res)=>{
  const {year} = req.params
  const yearWiseTotalData = await test.aggregate([
    {
      $match: {
        "properties.YEAR":Number(year)
      }
    },
    {
      $group: {
        _id: null,
        MURDER: { $sum: "$properties.MURDER" },
        ATTEMPT_TO_MURDER: { $sum: "$properties.ATTEMPT TO MURDER" },
        CULPABLE_HOMICIDE_NOT_AMOUNTING_TO_MURDER: { $sum: "$properties.CULPABLE HOMICIDE NOT AMOUNTING TO MURDER" },
        RAPE: { $sum: "$properties.RAPE" },
        CUSTODIAL_RAPE: { $sum: "$properties.CUSTODIAL RAPE" },
        OTHER_RAPE: { $sum: "$properties.OTHER RAPE" },
        KIDNAPPING_AND_ABDUCTION: { $sum: "$properties.KIDNAPPING & ABDUCTION" },
        KIDNAPPING_AND_ABDUCTION_OF_WOMEN_AND_GIRLS: { $sum: "$properties.KIDNAPPING AND ABDUCTION OF WOMEN AND GIRLS" },
        KIDNAPPING_AND_ABDUCTION_OF_OTHERS: { $sum: "$properties.KIDNAPPING AND ABDUCTION OF OTHERS" },
        DACOITY: { $sum: "$properties.DACOITY" },
        ROBBERY: { $sum: "$properties.ROBBERY" },
        BURGLARY: { $sum: "$properties.BURGLARY" },
        THEFT: { $sum: "$properties.THEFT" },
        AUTO_THEFT: { $sum: "$properties.AUTO THEFT" },
        RIOTS: { $sum: "$properties.RIOTS" },
        CRIMINAL_BREACH_OF_TRUST: { $sum: "$properties.CRIMINAL BREACH OF TRUST" },
        CHEATING: { $sum: "$properties.CHEATING" },
        COUNTERFEITING: { $sum: "$properties.COUNTERFIETING" },
        ARSON: { $sum: "$properties.ARSON" },
        HURT_GRIEVOUS_HURT: { $sum: "$properties.HURT/GREVIOUS HURT" },
        DOWRY_DEATHS: { $sum: "$properties.DOWRY DEATHS" },
        ASSAULT_ON_WOMEN_WITH_INTENT_TO_OUTRAGE_HER_MODESTY: { $sum: "$properties.ASSAULT ON WOMEN WITH INTENT TO OUTRAGE HER MODESTY" },
        INSULT_TO_MODESTY_OF_WOMEN: { $sum: "$properties.INSULT TO MODESTY OF WOMEN" },
        CRUELTY_BY_HUSBAND_OR_HIS_RELATIVES: { $sum: "$properties.CRUELTY BY HUSBAND OR HIS RELATIVES" },
        IMPORTATION_OF_GIRLS_FROM_FOREIGN_COUNTRIES: { $sum: "$properties.IMPORTATION OF GIRLS FROM FOREIGN COUNTRIES" },
        CAUSING_DEATH_BY_NEGLIGENCE: { $sum: "$properties.CAUSING DEATH BY NEGLIGENCE" }
      }
    },{
      $project: {
        _id:0
      }
    }
  ]
  )

  res.json(yearWiseTotalData)



})

app.get('/stacked-bar-chart',async(req,res)=>{
  const data= await test.aggregate([{$match: {
    "properties.STATE/UT":"KERALA",
    
  }},{
    $group: {
      _id: "$properties.time",
      fieldN: {
        $push:{district:"$properties.DISTRICT",total:{$add:["$properties.RAPE","$properties.MURDER"]}}
      }
    }
    
  
    
  },{
    $sort: {
      _id:1
    }
  }])
    
 res.json(data)
})


app.get('/year-graph',async(req,res)=>{


  const data = await test.aggregate([{$match: {
    "properties.STATE/UT":"KERALA"
  }},
   
  {
    $group: {
      _id: "$properties.YEAR",
      fieldN: {
        $push:{district:"$properties.DISTRICT",total:{$add:["$properties.RAPE","$properties.MURDER"]}}
      }
    }
  },
  {
    $sort: {
      _id:1
  }}])
  res.send(data)

})


app.get('/line-graph',async(req,res)=>{


  const data = await test.aggregate([{
    $match: {
      "properties.STATE/UT":"KERALA",
      "properties.YEAR":2002
    }
  }
  ,
  {
    $group: {
      _id: "$properties.DISTRICT",
      MURDER: { $sum: "$properties.MURDER" },
          ATTEMPT_TO_MURDER: { $sum: "$properties.ATTEMPT TO MURDER" },
          CULPABLE_HOMICIDE_NOT_AMOUNTING_TO_MURDER: { $sum: "$properties.CULPABLE HOMICIDE NOT AMOUNTING TO MURDER" },
          RAPE: { $sum: "$properties.RAPE" },
          CUSTODIAL_RAPE: { $sum: "$properties.CUSTODIAL RAPE" },
          OTHER_RAPE: { $sum: "$properties.OTHER RAPE" },
          KIDNAPPING_AND_ABDUCTION: { $sum: "$properties.KIDNAPPING & ABDUCTION" },
          KIDNAPPING_AND_ABDUCTION_OF_WOMEN_AND_GIRLS: { $sum: "$properties.KIDNAPPING AND ABDUCTION OF WOMEN AND GIRLS" },
          KIDNAPPING_AND_ABDUCTION_OF_OTHERS: { $sum: "$properties.KIDNAPPING AND ABDUCTION OF OTHERS" },
          DACOITY: { $sum: "$properties.DACOITY" },
          ROBBERY: { $sum: "$properties.ROBBERY" },
          BURGLARY: { $sum: "$properties.BURGLARY" },
          THEFT: { $sum: "$properties.THEFT" },
          AUTO_THEFT: { $sum: "$properties.AUTO THEFT" },
          RIOTS: { $sum: "$properties.RIOTS" },
          CRIMINAL_BREACH_OF_TRUST: { $sum: "$properties.CRIMINAL BREACH OF TRUST" },
          CHEATING: { $sum: "$properties.CHEATING" },
          COUNTERFEITING: { $sum: "$properties.COUNTERFIETING" },
          ARSON: { $sum: "$properties.ARSON" },
          HURT_GRIEVOUS_HURT: { $sum: "$properties.HURT/GREVIOUS HURT" },
          DOWRY_DEATHS: { $sum: "$properties.DOWRY DEATHS" },
          ASSAULT_ON_WOMEN_WITH_INTENT_TO_OUTRAGE_HER_MODESTY: { $sum: "$properties.ASSAULT ON WOMEN WITH INTENT TO OUTRAGE HER MODESTY" },
          INSULT_TO_MODESTY_OF_WOMEN: { $sum: "$properties.INSULT TO MODESTY OF WOMEN" },
          CRUELTY_BY_HUSBAND_OR_HIS_RELATIVES: { $sum: "$properties.CRUELTY BY HUSBAND OR HIS RELATIVES" },
          IMPORTATION_OF_GIRLS_FROM_FOREIGN_COUNTRIES: { $sum: "$properties.IMPORTATION OF GIRLS FROM FOREIGN COUNTRIES" },
          CAUSING_DEATH_BY_NEGLIGENCE: { $sum: "$properties.CAUSING DEATH BY NEGLIGENCE" }
    }
  },
  {
    $addFields: {
      name: "$_id"
    }
  },{
    $project: {
    "_id":0
    }
  }])
  res.send(data)

})

app.get('/crime',async(req,res)=>{

  const data = await test.aggregate([{$limit: 1},
    {$project: {
      _id:0,
      type:0,
      geometry:0,
      "properties.STATE/UT":0,
      "properties.DISTRICT":0,
      "properties.Address":0,
      "properties.time":0,
      "properties.lat":0,
      "properties.lon":0,
      "properties.lsgd":0,
      "properties.YEAR":0,
      
    }}])
    const crimeArr =[]
    for(const[key,value] of Object.entries(data[0].properties)){

    crimeArr.push(key)


    };

    res.json(crimeArr)
    
})
app.listen(4000,()=>{console.log('server is running http://localhost:4000');
})