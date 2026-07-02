import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {

const [data,setData]=useState([]);

useEffect(()=>{

api.get("/owner/dashboard").then(res=>{

setData(res.data.data);

});

},[]);

return(

<div style={{padding:30}}>

<h2>Store Owner Dashboard</h2>

{
data.map(store=>(

<div key={store.id}>

<h3>{store.name}</h3>

<p>Average Rating : {store.averageRating||0}</p>

<p>Total Ratings : {store.totalRatings}</p>

<hr/>

</div>

))
}

</div>

)

}