import './Menu.css'
import {useState,useEffect} from 'react'
const Menu = () =>{
    const [FullName,ChangeFull] = useState("Loading")
    useEffect(()=>{
        Token()
    },[])

    const Token = async()=>{
        const Request = await fetch("/Token",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({status:true})
        })
        const Response = await Request.json()
        ChangeFull(Response.FullName)
    }
    return(
        <div id = "Main">
            <div id = "Nav">
                <h1>Banana Corporation</h1>
                <div id = "NavButton"> 
                    <button>{FullName}</button>
                    <button>Logout</button>
                </div>
            </div>
            <div id = "Container">
                <div id = "Feed">
                    <div id = "Card">
                        <img  src = "https://images.pexels.com/photos/3589903/pexels-photo-3589903.jpeg?cs=srgb&dl=pexels-inga-seliverstova-3589903.jpg&fm=jpg&_gl=1*13xp3rt*_ga*Mzg5MjQ1ODkuMTY4MTE4MDAxMg..*_ga_8JE65Q40S6*MTY4MTE4MDAyNC4xLjEuMTY4MTE4MDEzOC4wLjAuMA.." />
                        <div id = "DetailsofCard">
                            <p>Macbook Pro</p>
                            <p>Apple</p>
                            <p>$1500</p>
                            
                        </div>    
                    </div>
                </div>
                <div id = "cart"></div>
            </div>
        </div>
    )
}
export default Menu