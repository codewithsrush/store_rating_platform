import { useEffect,useState } from "react";

import api from "../../services/api";

export default function Ratings(){

const [ratings,setRatings]=useState([]);

useEffect(()=>{

api.get("/owner/ratings").then(res=>{

setRatings(res.data.ratings);

})

},[])

return(

<div style={{padding:30}}>

<h2>Users Who Rated</h2>

<table border="1" cellPadding="10">

<thead>

<tr>

<th>User</th>

<th>Email</th>

<th>Store</th>

<th>Rating</th>

</tr>

</thead>

<tbody>

{

ratings.map((r,i)=>(

<tr key={i}>

<td>{r.name}</td>

<td>{r.email}</td>

<td>{r.store}</td>

<td>{r.rating}</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}