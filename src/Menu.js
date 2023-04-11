import { useNavigate } from 'react-router-dom'
import './Menu.css'
import {useState,useEffect} from 'react'
const Menu = () =>{
    const page = useNavigate()
    const [FullName,ChangeFull] = useState("Loading")
    const [DetailsOfPro,ChangeDetailsOfPro] = useState({_id:undefined,Name:undefined,Brand:undefined,Img:"https://images.pexels.com/photos/3589903/pexels-photo-3589903.jpeg?cs=srgb&dl=pexels-inga-seliverstova-3589903.jpg&fm=jpg&_gl=1*13xp3rt*_ga*Mzg5MjQ1ODkuMTY4MTE4MDAxMg..*_ga_8JE65Q40S6*MTY4MTE4MDAyNC4xLjEuMTY4MTE4MDEzOC4wLjAuMA..",Price:undefined})
    const [Emailid,ChangeEmail] = useState(undefined)
    const [TypeofUser,ChangeType] = useState(true)
    // true for admin and false for non admin
    const [ArrFeed,ChangeArr] = useState([])
    const [ImgAdd,ChangeImg] = useState("https://images.pexels.com/photos/3589903/pexels-photo-3589903.jpeg?cs=srgb&dl=pexels-inga-seliverstova-3589903.jpg&fm=jpg&_gl=1*13xp3rt*_ga*Mzg5MjQ1ODkuMTY4MTE4MDAxMg..*_ga_8JE65Q40S6*MTY4MTE4MDAyNC4xLjEuMTY4MTE4MDEzOC4wLjAuMA..")
    useEffect(()=>{
        Token()
        AdminOrNot()
        Feed()
    },[])

    const Feed = async() =>{
        const Request = await fetch("/Inv",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({status:true})
        })
        const Response = await Request.json()
        console.log(Response)
        ChangeArr(Response.Arr)
    }

    const AdminOrNot = () =>{
        if (TypeofUser == true){
            document.getElementById("AddNew").style.display = "block"
        }
        if (TypeofUser == false){
            document.getElementById("AddNew").style.display = 'none'
        }
    }
    const Token = async()=>{
        const Request = await fetch("/Token",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({status:true})
        })
        const Response = await Request.json()
        if (Response.status == false){
            page("/Login")
        }
        if (Response.status == true){
            ChangeType(Response.Type)
            ChangeEmail(Response.Email)
            ChangeFull(Response.FullName)
        }
    }

    const AddInvt = async() =>{
        const Data = {
            Name:document.getElementById("Name").value,
            Brand:document.getElementById("Brand").value,
            Price:document.getElementById("Price").value,
            Img:document.getElementById("Img").value
        }
        const Request = await fetch("/AddInv",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(Data)
        })
        const Response = await Request.json()
        if (Response.status == true){
            alert("It is Submiited")
        }
    }
    
    const ChangeImgSrc = () =>{
        const Imgadd = document.getElementById("Img2").value
        ChangeImg(Imgadd)
    }

    const Card = (props)=>{
        const callfun = ()=>{
            BuyInv(props)
        }
        const CallFun2 = () =>{
            ChangeDetailsOfPro(props)
            ChangeImg(props.Img)
            console.log(DetailsOfPro)
            document.getElementById("EditInv").style.display = "flex"
            document.getElementById("Feed").style.display = "none"
        }
        if (TypeofUser == false){
            return ( 
                <div id = "Card">
                <img  src = {props.Img}/>
                <div id = "DetailsofCard">
                    <p>{props.Name}</p>
                    <p>{props.Brand}</p>
                    <strong>${props.Price}</strong>
                    <button onClick={callfun} id = "BuyButton">Buy</button>
                </div>    
            </div>
            )
        }
        if (TypeofUser == true){
            return ( 
                <div id = "Card">
                <img  src = {props.Img}/>
                <div id = "DetailsofCard">
                    <p>{props.Name}</p>
                    <p>{props.Brand}</p>
                    <strong>${props.Price}</strong>
                    <button onClick={CallFun2} id = "BuyButton">Edit</button>
                </div>    
            </div>
            )
        }
    }
    const CloseAddInv = () =>{
        page("/")
        page("/Menu")
        document.getElementById("AddInv").style.display = "none"
        document.getElementById("AddNew").style.display = "block"
        document.getElementById("Feed").style.display = "flex"
    }
    const OpenAddInv = () =>{
        document.getElementById("AddInv").style.display = "flex"
        document.getElementById("AddNew").style.display = "none"
        document.getElementById("Feed").style.display = "none"
    }
    const BuyInv = (data) =>{
        ChangeDetailsOfPro(data)
        document.getElementById("BuyInv").style.display = "flex"
        document.getElementById("Feed").style.display = "none"
    }
    const CloseInv = () =>{
        document.getElementById("BuyInv").style.display = "none"
        document.getElementById("Feed").style.display = "flex"
    }

    const AddToCart = async() =>{
        const Quantity = document.getElementById("qty").value
        if (Quantity == ""){
            
            alert("Enter The Quantity")
        }
        if (Quantity != ""){
            const no = Quantity
            const Data = {
                ...DetailsOfPro,
                Email:Emailid,
                Quantity:no
            }
            console.log(Data)
            const Request = await fetch("/AddCart",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(Data)
            })
            const Response = await Request.json()
            console.log(Response)
            }
        }
        const EditInv = async()=>{
            console.log("i am working")
            const id = DetailsOfPro._id
            const Data = {
                id:id,
                Name:document.getElementById("Name2").value,
                Price:document.getElementById("Price2").value ,
                Brand:document.getElementById("Brand2").value ,
                Img:document.getElementById("Img2").value
            }
            if (Data.Name != "" && Data.Price != "" && Data.Brand != "" && Data.Img != ""){
            const Request = await fetch("/Edit",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(Data)
            })
            const Response = await Request.json()
        }
        }
        const CloseEditInv = () =>{
            document.getElementById("EditInv").style.display = "none"
            document.getElementById("Feed").style.display = "flex"
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
                   {ArrFeed.map((data)=><Card Name = {data.Name} Brand = {data.Brand} Img = {data.Img} Price = {data.Price}/>)}
                </div>
               
            </div>
            <div id = "AddInv">
                <h1>Add Inventory</h1>
                
                <input id = "Name" type = "text" placeholder = "Enter The Name"/>
                <input id = "Brand" type = 'text' placeholder='Enter The Brand'/>
                <input id = "Price" type = "text" placeholder='Enter The Price' />
                <input onChange = {ChangeImgSrc} id = "Img" type = "text" placeholder='Enter The Imgaddress'/>
                <img src = {ImgAdd}/>
                <button onClick={AddInvt}>Submit</button>
                <button onClick={CloseAddInv}>Close</button>

            </div>
            <button onClick = {OpenAddInv} id = "AddNew">Add</button>

            <div id = "BuyInv">
                <img  src = {DetailsOfPro.Img} />
                 <h2>{DetailsOfPro.Name}</h2>
                <p>{DetailsOfPro.Brand}</p>
                <strong>${DetailsOfPro.Price}</strong>
                <input id = "qty" type = "text" placeholder='Enter The Quantity'/>
                <button onClick={AddToCart}>Buy</button>
                <button onClick={CloseInv}>Close</button>
            </div>

            <div id = "EditInv">
                <h1>Edit Inventory</h1>
                
                <input id = "Name2" type = "text" placeholder = {DetailsOfPro.Name}/>
                <input id = "Brand2" type = 'text' placeholder={DetailsOfPro.Brand}/>
                <input id = "Price2" type = "text" placeholder={DetailsOfPro.Price}/>
                <input onChange = {ChangeImgSrc} id = "Img2" type = "text" placeholder='Enter The Imgaddress'/>
                <img src = {ImgAdd}/>
                <button onClick={EditInv}>Change</button>
                <button onClick={CloseEditInv}>Close</button>

            </div>
        </div>
    )
}
export default Menu