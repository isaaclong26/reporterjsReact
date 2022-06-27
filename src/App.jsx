import React, {useEffect, useState} from 'react';
import './App.css';
import styled from 'styled-components'
import MyChartComponent from "./chart";
import Entries from "./entries"
import Nav from './nav';

var base64 = require('base-64');


const EntryDiv = styled.div`
      padding: 10px;
      height: auto;
      background-color: gray;
      color: white;
      border-radius: 10px;
      margin: 25px;

`
var dates = {
  convert:function(d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp) 
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return (
         d
      );
  },
  compare:function(a,b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return (
          isFinite(a=this.convert(a).valueOf()) &&
          isFinite(b=this.convert(b).valueOf()) ?
          (a>b)-(a<b) :
          NaN
      );
  },
  inRange:function(d,start,end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
     return (
          isFinite(d=this.convert(d).valueOf()) &&
          isFinite(start=this.convert(start).valueOf()) &&
          isFinite(end=this.convert(end).valueOf()) ?
          start <= d && d <= end :
          NaN
      );
  }
}



function Entry(data) {

  let entry = data.data
  let date = new Date(entry.date)
  let formatedDate = `${date.getMonth()}/${date.getDate()}`
    return(
      <EntryDiv className="col-lg-2">

          <h3> Project: {entry.id}</h3>
          <h3> Date: {formatedDate}</h3>
          <h3> Average Score: {entry.averageScore}</h3>

      </EntryDiv>
    )
}

function App() {
  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState([])
      const [weeks, setWeeks] = useState()


  

  useEffect(()=>{



    let login = "ck_e86cfb8fed55e87904e573fb3eb77cf1f6aa0a76";
          let password = "cs_573c74a16e5e00390d669f3f4e7973ad67a41583";
         const fetchOptions = {
          method: "GET",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           "Access-Control-Allow-Origin": "*",
           "Authorization": `Basic ${base64.encode(`${login}:${password}`)}`
          },
         }
         const bootstrapAsync = async () => {
       
           let fetchUrl =`https://reporterjsexpress.herokuapp.com/`   
            await fetch(fetchUrl, fetchOptions)
           .then(response =>response.json())
           .then((data)=>{
            // console.log(data)
            setEntries(data)


            const today = new Date();
                  const today1 = new Date();
                  const today2 = new Date();
                  const today3 = new Date();
                  const today4 = new Date();
                  
                  
                
                  let week1 = new Date(today1.setDate(today1.getDate() - 29)) 
                  let week2 = new Date(today2.setDate(today2.getDate() - 22)) 
                  let week3 = new Date(today3.setDate(today3.getDate() - 15)) 
                  let week4 = new Date(today4.setDate(today4.getDate() - 8)) 
                
                  const weeks = {
                    week1: {
                      startDate: week1,
                      endDate: week2,
                      entries: []
                    },
                    week2: {
                      startDate: week2,
                      endDate: week3,

                      entries: []
                    },
                    week3: {
                      startDate: week3,
                      endDate: week4,

                      entries: []
                    },
                    week4: {
                      startDate: week4,
                      endDate: today,

                      entries: []
                    },
                  }
                  
                
                  Object.values(data).forEach(val => {
                    let date = new Date(val.date)
                    
                        if(dates.inRange(date, weeks.week1.startDate, weeks.week2.startDate)){
                          
                          weeks.week1.entries.push(val)}
                        else if(dates.inRange(date, weeks.week2.startDate, weeks.week3.startDate)){weeks.week2.entries.push(val)}
                        else if(dates.inRange(date, weeks.week3.startDate, weeks.week4.startDate)){weeks.week3.entries.push(val)}
                        else if(dates.inRange(date, weeks.week4.startDate, today)){weeks.week4.entries.push(val)}
                
                    })
                    setWeeks(weeks)
                    ////console.log(weeks.week4)
            
                      try{
                         let totalEntries = 0;
                 
                      let projectCostM = 0
                      let conditionOfProductM = 0
                      let performanceM = 0
                      let leadTimesM = 0
                      let responseM = 0
                      let completionDateM = 0
                      let deliveryM = 0 
                      let installM = 0
                      let accountantM = 0
                     
                     
                     
                       Object.keys(weeks).forEach(key => {
                         let entries = weeks[key].entries
                         let projectCost = 0
                         let conditionOfProduct = 0
                         let performance = 0
                         let leadTimes = 0
                         let response = 0
                         let completionDate = 0
                         let delivery = 0 
                         let install = 0
                         let accountant = 0

                         let projectCostE = 0
                         let conditionOfProductE = 0
                         let performanceE = 0
                         let leadTimesE = 0
                         let responseE = 0
                         let completionDateE = 0
                         let deliveryE = 0 
                         let installE = 0
                         let accountantE = 0
                     
                         for(let x in entries) {
                           let j = entries[x] 
                           totalEntries ++;
                     
                           if(typeof j.projectCost == "number"){projectCost += j.projectCost; projectCostM += j.projectCost; projectCostE++;}
                           if(typeof j.conditionOfProduct == "number"){conditionOfProduct += j.conditionOfProduct; conditionOfProductM += j.conditionOfProduct; conditionOfProductE++;} 
                           if(typeof j.performance == "number"){performance += j.performance; performanceM += j.performance; performanceE++;}
                           if(typeof j.leadTimes == "number"){leadTimes += j.leadTimes; leadTimesM += j.leadTimes; leadTimesE++}
                           if(typeof j.response== "number"){response += j.response; responseM += j.response; responseE++}
                           if(typeof j.completionDate == "number"){completionDate += j.completionDate; completionDateM += j.completionDate; completionDateE++;}
                           if(typeof j.delivery == "number"){delivery += j.delivery; deliveryM += j.delivery; deliveryE++;}
                           if(typeof j.install == "number"){install += j.install; installM += j.install; installE++;}
                           if(typeof j.accountant == "number"){accountant += j.accountant; accountantM += j.accountant; accountantE++;}
                         }
                     
                     
                         weeks[key]["projectCost"] = Math.round((projectCost/projectCostE) * 10) / 10
                         weeks[key]["conditionOfProduct"] = Math.round((conditionOfProduct/conditionOfProductE) * 10) / 10
                         weeks[key]["performance"] = Math.round((performance/performanceE) * 10) / 10;
                         weeks[key]["leadTimes"] = Math.round((leadTimes/leadTimesE) * 10) / 10;
                         weeks[key]["response"] = Math.round((response/responseE) * 10)  / 10;
                         weeks[key]["completionDate"] = Math.round((completionDate/completionDateE) * 10) / 10;
                         weeks[key]["delivery"] = Math.round((delivery/deliveryE) * 10) / 10;
                         weeks[key]["install"] = Math.round((install/installE) * 10) /10;
                         weeks[key]["accountant"] = Math.round((accountant /accountantE) * 10) /10;
                     
                     
                         
                       });


                       let month = {
                         startDate:weeks.week1.startDate,
                         endDate: weeks.week4.endDate,
                         projectCost: Math.round((projectCostM /totalEntries) * 10) /10,
                         conditionOfProduct: Math.round((conditionOfProductM /totalEntries) * 10) /10,
                         performance: Math.round((performanceM /totalEntries) * 10) /10,
                         leadTimes: Math.round((leadTimesM /totalEntries) * 10) /10,
                         response: Math.round((responseM /totalEntries) * 10) /10,
                         completionDate: Math.round((completionDateM /totalEntries) * 10) /10,
                         delivery: Math.round((deliveryM /totalEntries) * 10) /10,
                         install: Math.round((installM /totalEntries) * 10) /10,
                         accountant: Math.round((accountantM /totalEntries) * 10) /10,
                       }


                       weeks['month']= month
                      setChartData(weeks)
                      setIsLoading(false)






                     }
                     catch(e) {
                       ////console.log(e)
                     }
                  


          })
         }
         bootstrapAsync();
         
      },[])     
  





      if(isLoading){
        return(
          <div><h1>Loading</h1></div>
        )
      }
  else{
    let totWeek = weeks.week4.entries.length;
    let totMonth = weeks.week4.entries.length+ weeks.week3.entries.length+ weeks.week2.entries.length+ weeks.week1.entries.length
    let weekEntries = weeks.week4.entries 
    // for(x in weekEntries){
    //   let entry = weekEntries[x];
    //   ////console.log(entry.question2)
    // }


  return (
    <div className='container-fluid'>
      <Nav></Nav>

    <div className="row">
      <MyChartComponent data={chartData} />
    </div>

  

    <div className='row'>
        <Entries weeks={weeks} entries={entries}></Entries>
    </div>
    </div>
  );
}
}

export default App;
