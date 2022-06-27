import React,{useEffect, useState} from "react"
import styled from "styled-components"


const NavCont = styled.div`
position: fixed;
z-index: 3;
height: 75%;
width: 4vw;
border-radius: 0 20px  20px 0;
color:white;
text-align: center;
padding: 10px;
background-color: orange;
pointer-events:none;
transition: 
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


const Nav = ()=>{
    const [menuVis, setMenuVis] = useState(false)

  

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
                    <button  style={{pointerEvents:"auto"}} onClick={(e)=> {e.stopPropagation(); console.log("test")}}>Delete</button>
                </NavCont>
                )}
        

        </NavContFixed>
        

        
    </>
    )
}


export default Nav;