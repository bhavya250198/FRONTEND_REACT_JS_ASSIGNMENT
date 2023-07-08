import React ,{useEffect, useState} from "react";
import {BASE_URL} from "../../../constants/apiBaseUrl";

import MovieDetails from "./movieDetails";
import Loader from "../../../constants/loader";
// import styles from "./Movies.module.scss";
function Movies({type}){
    const style = {
        background: '#0092ff',
        padding: '8px 0',
      };
   const [movies, setMovies]= useState([]);
   const [favouriteLength,setFavouriteLength]=useState();
   const[favourites,setFavourites] = useState([]);
   const[loader,setLoader]= useState(true);
  
   
const callData = async()=>{
    try{
      
  const response =  await fetch(BASE_URL+"/"+type)
      .then(response => {
        return response.json()
      })
      console.log("response",response);
      let movies=response.map((item)=>({...item,favourite: item.favourite == undefined || item.favourite == null ?false:item.favourite}))
      let favouriteArrayDetails = response.map((item)=>item.favourite == undefined || item.favourite == null ?false:item.favourite);
      console.log("favouriteDetails",favouriteArrayDetails);
  const favouriteDets = await fetch(BASE_URL+"/favourites")
  .then(response => {
    return response.json()
  })
  console.log("response",favouriteDets);
  setMovies(movies);
  setFavourites(favouriteDets);

  
    
    }
    catch(error){
    console.log(error);
    }
   setLoader(false);
}

const favouriteDetails=async(item,index,details)=>{
  console.log("item",item.favourite,item);
  console.log("index",index);
  console.log("details",details);
   setLoader(true);
  if(type == "favourites"){
    
    let id = details.findIndex(i => i.title == item.title)
    let movieType = details[id].typeDetails;
    
    console.log("id"+id);
   const dataDetails = await fetch(BASE_URL+"/"+movieType)
    .then(response => {
      return response.json()
    });
    let indexDetails = dataDetails.findIndex(i=>i.title == item.title)

    //delete
    let deletFavouriteIds = details[id]["id"];
    await fetch(BASE_URL+"/favourites/"+(deletFavouriteIds),{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      
    }).then(res=>res.json()).then(result=>{
      console.log('success',result);
    }).catch(error =>{
      console.log("Error",error)
    })

    //update
    let obj = { ...item,favourite:false}
    indexDetails+=1;
    await fetch(BASE_URL+"/"+movieType+"/"+indexDetails,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    }).then(res=>res.json()).then(result=>{
      console.log('success',result);
    }).catch(error =>{
      console.log("Error",error)
    })


    //get
  const data=  await fetch(BASE_URL+"/"+type)
    .then(response => {
      return response.json()
    })

   
      console.log("data",data);
      let movies=data.map((item)=>({...item,favourite: item.favourite == undefined || item.favourite == null ?false:item.favourite}))
      setMovies(movies)
      const favouriteDets = await fetch(BASE_URL+"/favourites")
                                    .then(response => {
                                             return response.json()
                                           })
     setFavourites(favouriteDets);
    
  }
  else{
    //add and update and delete
    if(item.favourite){
      
      //updated Id
      let id = details.findIndex(i => i.title == item.title)
      
      let favouriteIndex = favourites.findIndex(i=>i.title == item.title);
      let favouriteIndexDetails = favourites[favouriteIndex]["id"];
      
      //delete
      await fetch(BASE_URL+"/favourites/"+(favouriteIndexDetails),{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        
      }).then(res=>res.json()).then(result=>{
        console.log('success',result);
      }).catch(error =>{
        console.log("Error",error)
      })

      //update
      let obj = { ...item,favourite:false}
      let ids = id+1;
      await fetch(BASE_URL+"/"+type+"/"+ids,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      }).then(res=>res.json()).then(result=>{
        console.log('success',result);
      }).catch(error =>{
        console.log("Error",error)
      })
 

      //get
   const data =   await fetch(BASE_URL+"/"+type)
      .then(response => {
        return response.json()
      })
     
        console.log("data",data);
        let movies=data.map((item)=>({...item,favourite: item.favourite == undefined || item.favourite == null ?false:item.favourite}))
        setMovies(movies)
        const favouriteDets = await fetch(BASE_URL+"/favourites")
        .then(response => {
                 return response.json()
               })
    setFavourites(favouriteDets);
      
    }
    else{
      
     //update 
     let id = index+1;
     console.log("id",id);
     let obj ={...item,favourite:true}
     //update 
     await fetch(BASE_URL+"/"+type+"/"+id,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    }).then(res=>res.json()).then(result=>{
      console.log('success',result);
    }).catch(error =>{
      console.log("Error",error)
    })
    
    //add to favourite
    let favInd = favouriteLength+1;
    let favouriteObj = {...item,id:favInd,favourite:true,typeDetails:type}
             await fetch(BASE_URL+"/favourites",{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify(favouriteObj)
            }).then(res=>res.json()).then(result=>{
              console.log('success',result);
            }).catch(error =>{
              console.log("Error",error)
            })
    
    //get service 
  const data =  await fetch(BASE_URL+"/"+type)
    .then(response => {
      return response.json()
    })
    console.log("data");
    let moviesData=data.map((item)=>({...item,favourite: item.favourite == undefined || item.favourite == null ?false:item.favourite}))
    setMovies(moviesData);
    const favouriteDets = await fetch(BASE_URL+"/favourites")
    .then(response => {
             return response.json()
           })
setFavourites(favouriteDets);
    }
  }
  setLoader(false);
}




  useEffect(()=>{
    
    callData();
    
  },[type])
  

   console.log("modal",movies,favourites);
    return(
        <div id="parent">
          {loader ? <Loader /> :
      <MovieDetails details = {movies}  createFavourite={favouriteDetails}/>}
        </div>
    )
}
export default Movies;