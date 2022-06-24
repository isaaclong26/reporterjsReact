import React,{useState} from "react";
import styled from "styled-components"

// Overall Container 
const EntriesContainer = styled.div`


`


// Individual Card
const EntryDiv = styled.div`
text-align: center;
border-radius: 10px;
font-size: 1.2rem;
background-color:#f0f0f0;

`

const TFTButton = styled.button`
width: 100%;
margin:auto;
color:white;
border:none;
font-size: 2rem;


`
const Scores = styled.div`
text-align: justify;
justify-content: space-between;
background-color: white;
margin-bottom: 10px;
border-radius: 5px;

`

const Yorns = styled.div`
justify-content: space-between;
margin-bottom: 10px;
border-radius: 5px;
background-color: rgba(171, 184, 195, .3);
`
const Comments = styled.div`
text-align: justify;
justify-content: space-between;
margin-bottom: 10px;
border-radius: 5px;
`

const EntryCard = ({entry, key })=>{
    let yorns = false;
    let commentsClass = "col-lg-6"
    if(entry.Yorn1 !== "" || entry.Yorn2 !== "" || entry.Yorn3 !== ""){
        yorns = true;
        commentsClass = "col-lg-12"
    }
    
    console.log(entry)
    let comments = []
    if(entry.question1 !== ""){
        comments.push(entry.question1)
    }
    if(entry.question2 !== ""){
        comments.push(entry.question2)
    }

    let scoresToDisplay = []
    var background;
    let total = 0;
    let count = 0;
   Object.keys(entry).map(key=>{
    let val = entry[key]
        
      
        if(typeof val == "number"){
                    total+= val;
                    count++
                    scoresToDisplay.push(key)
        }
        return val;
    })
    let ave = (total/count).toFixed(1);
    if(ave >= 8){
        background = 'rgba(67, 150, 57, .8)'
    }
    else{
        background = 'rgba(145, 47, 64, .8)'
    }





    return(
        <div className="col-lg-4 my-5">

            <EntryDiv  className="container">
                <div className="row">

                    <h2>{entry.Title} - {entry.id}</h2>
                    <h3 style={{backgroundColor: background, color:"white", borderRadius: "5px"}}>Average Score - {ave}</h3>

                </div>
                <div className="row">

                    <Scores className="col-lg-6 ">
                        <h3 style={{textDecoration: 'underline 2px'}}>Score Breakdown</h3>
                        {scoresToDisplay.map(key=>

                            <p><span style={{fontWeight: "bold"}}>{key}</span>: <span style={{float: "right"}}>{entry[key]}</span></p>

                        )}

                    </Scores>
                    {yorns&&
                        <Yorns className= "col-lg-6">
                        <h3 style={{textDecoration: 'underline 2px'}}>Text Questions</h3>
                    {entry.Yorn1 !== "" && <p><span style={{fontWeight: "bold", textDecoration: 'underline 1px'}}>Is Solar Innovations® a brand that you trust?</span> - {entry.Yorn1}</p>}
                    {entry.Yorn2 !== "" && <p><span style={{fontWeight: "bold", textDecoration: 'underline 1px'}}>Would you buy a Solar Innovations® product again?</span> - {entry.Yorn2}</p>}
                        {entry.Yorn3 !== "" && <p> <span style={{fontWeight: "bold", textDecoration: 'underline 1px'}}>Would you recommend Solar Innovations® to others?</span> - {entry.Yorn3}</p>}
                        </Yorns>
                    }
                    

                </div>

                {comments.length > 0 && 
                <Comments className={commentsClass}>
                    <h3 style={{textDecoration: 'underline 2px', textAlign: "center"}}>Comments</h3>
                    {comments.map(comment =>
                            <span>{comment}</span>
                        )}
                </Comments>
                }
            </EntryDiv>

        </div>

    )
}


const Entries = ({weeks, entries})=>{


    const [tFT, setTFT]= useState(false)
    const [toggleColor, setToggleColor] = useState(['#439639', '#abb8c3']);
    //false = week true = month; default to week
  

        let totWeek = weeks.week4.entries.length;
        let totMonth = weeks.week4.entries.length+ weeks.week3.entries.length+ weeks.week2.entries.length+ weeks.week1.entries.length;


    const btnSwitch = ()=>{
        setToggleColor([toggleColor[1], toggleColor[0]])
    }

    return(
        <EntriesContainer className='container-fluid'>

            <h1 className="text-center">Warranty Form Submissions</h1>
            <div className="row my-3">
                <div className="col-lg-6 p-0">
                    <TFTButton  style={{ backgroundColor:`${toggleColor[0]}` }} onClick={function(){setTFT(false); btnSwitch()}}>Submissions This Week - {totWeek}</TFTButton>
                </div>
                <div className="col-lg-6 p-0">
                    <TFTButton style={{ backgroundColor:`${toggleColor[1]}` }} onClick={function(){setTFT(true); btnSwitch()}}>Submissions This Month - {totMonth}</TFTButton>
                </div>
            </div>
        <div className="row">
        {tFT 
        ? <>{entries.map((entry, index) => <EntryCard entry={entry} id={index}></EntryCard>)}</>
        
        : <> {weeks.week4.entries.map((entry, index) => <EntryCard entry={entry} id={index}></EntryCard>)}</>
       }
       </div>
        </EntriesContainer>
    )
}


export default Entries

