import React,{useEffect, useState} from "react";
import Chart from "react-apexcharts";

const MyChartComponent = ( {data, entries} ) => {

    console.log(entries)
    const [currentWeek, setCurrentWeek] = useState([]);
    const [month, setMonth] = useState([]);
    useEffect(()=>{
        let month = data.month
        let week = data.week4
    setMonth([month.projectCost, month.conditionOfProduct, month.performance, month.leadTimes, month.response, month.completionDate, month.install, month.accountant])
    setCurrentWeek([week.projectCost, week.conditionOfProduct, week.performance, week.leadTimes, week.response, week.completionDate, week.install, week.accountant])

    },[data])

  const options = { 
      
    chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: 'top',
              },
            }
          },
        //   stroke: {
        //     show: true,
        //     width: 1,
        //     colors: ['#fff']
        //   },
        //   tooltip: {
        //     shared: true,
        //     intersect: false
        //   },
          xaxis: {
            categories: ["Project Cost", 
            "Condition of Product",
            "Performance",
            "Lead Times"
            , "Responsiveness", 
            "Completion Date"
            , "Shipment/Delivery", 
            "Installation",          
            "Accountant"],
          },
          yaxis:{
              max:10,
          },
          colors: [function({ value, seriesIndex, w }) {
            if (value >= 8) {
                return '#439639'
            } else {
                return '#912F40'
            }
          }, ],

          title: {
            text: `Warranty Scores Current Week Against Rolling Month`,
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '14px',
              fontWeight:  'bold',
             
              color:  '#263238'
            },
        }
       
      

     }
     let series = [
         
         {name: "Month",
             data: month},
         {name:"Week",
             data: currentWeek}
     ]
     
     ;
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart col-lg-9 mx-auto">
          <Chart
            options={options}
            series= {series}
            type= 'bar'
          />
        </div>
      </div>
    </div>
  );
};

export default MyChartComponent;