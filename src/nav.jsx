import React,{useEffect, useState} from "react"
import styled from "styled-components"
import chartLogo from "./chartLogo.png";
import entryLogo from "./Voting.png"
import commentsLogo from "./comments.png"
import MyChartComponent from "./chart";
import Entries from "./entries";
import CommentsDiv from "./comments"

const NavCont = styled.div`
position: fixed;
z-index: 3;
height: 30%;
width: 4vw;
border-radius: 0 20px  20px 0;
color:white;
text-align: center;
padding: 10px;
background-color: rgba(171, 184, 195);
pointer-events:none;
margin-top: 19vh;
`
const NavContFixed = styled.div`
position: fixed;
z-index: 2;
height: 75%;
width: 5vw;
color:white;
text-align: center;
padding: 10px 10px 10px 0 px;
margin-top: 12.5vh;
left:0;


`
const NavLogo = styled.img`
max-width:100%;
background: transparent;
width: 100%;
margin: 15px 0; 
`
const Nav = ({chartData, entries, weeks, comments})=>{
    const [menuVis, setMenuVis] = useState(true)
    const [chartVis, setChartVis] = useState(true)
    const [entriesVis, setEntriesVis] = useState(false)
    const [commentsVis, setCommentsVis] = useState(false)



  

      useEffect(()=>{

        document.getElementById("fixed").addEventListener("mouseover", function( event ) {
            event.preventDefault();

            setMenuVis(true)
        });
        document.getElementById("fixed").addEventListener("mouseleave", function( event ) {
            event.preventDefault();
            setMenuVis(false)
        });

      })
     



    return(
        <>
        
       
        <NavContFixed id="fixed">
 {menuVis && (
                <NavCont>
                    <NavLogo className="navLogo" src={chartLogo}  style={{pointerEvents:"auto"}} onClick={(e)=> {e.stopPropagation(); setChartVis(!chartVis)}}/>
                    <NavLogo className="navLogo" src={entryLogo}  style={{pointerEvents:"auto"}} onClick={(e)=> {e.stopPropagation(); setEntriesVis(!entriesVis)}}/>
                    <NavLogo className="navLogo" src={commentsLogo}  style={{pointerEvents:"auto"}} onClick={(e)=> {e.stopPropagation(); setCommentsVis(!commentsVis)}}/>
                    

                </NavCont>
                )}
        

        </NavContFixed>

        <div className='container-fluid'>
   

{chartVis && 
    <div className="row">
      <MyChartComponent data={chartData}  entries={entries}/>
    </div>
}
  
{entriesVis &&
    <div className='row'>
        <Entries weeks={weeks} entries={entries}></Entries>
    </div>
   
 }    

 {commentsVis &&
    <div className='row'>
        <CommentsDiv data={comments}></CommentsDiv>
    </div>
   
 }            
 </div>
        
    </>
    )
}


export default Nav;