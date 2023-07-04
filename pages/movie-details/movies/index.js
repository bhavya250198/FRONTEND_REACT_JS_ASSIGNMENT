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
      
    await fetch(BASE_URL+"/"+type)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log("data",data);
        let movies=data.map((item)=>({...item,favourite: item.favourite == undefined || item.favourite == null ?false:item.favourite}))
        setMovies(movies)

      })
     
      await fetch(BASE_URL+"/favourites")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setFavouriteLength(data.length)

      })
    
    }
    catch(error){
    console.log(error);
    }
   setLoader(false);
}




  useEffect(()=>{
      callData();
    
  },[type])
  
  const favouriteDetails=async(item,index,details)=>{
    console.log("item",item.favourite,item);
    console.log("index",index);
    console.log("details",movies);
     
    if(type == "favourites"){
      //remove
      let id = movies.findIndex(i => i.title == item.title)
      let movieType = movies[id].typeDetails;
      var movies=[]
      console.log("id"+id);
      await fetch(BASE_URL+"/"+movieType)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log("data",data);
        movies=data;

      })
      console.log("data"+movies);
      debugger;
      let indexDetails = movies.findIndex(i=>i.title == item.title)
      //delete
      await fetch(BASE_URL+"/favourites/"+(id),{
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
      await fetch(BASE_URL+"/"+typeDetails+"/"+indexDetails,{
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
      await fetch(BASE_URL+"/"+type)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log("data",data);
        let movies=data.map((item)=>({...item,favourite: item.favourite == undefined || item.favourite == null ?false:item.favourite}))
        setMovies(movies)

      })
    }
    else{
      //add and update and delete
      if(item.favourite){
        debugger;
        let id = details.findIndex(i => i.title == item.title)
        let movieType = details[id].typeDetails;
        var movies=[]
        console.log("id"+id);
        await fetch(BASE_URL+"/"+movieType)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log("data",data);
          movies=data;
  
        })
        console.log("data"+movies);
        debugger;
        let indexDetails = movies.findIndex(i=>i.title == item.title)
        //delete
        await fetch(BASE_URL+"/favourites/"+(id),{
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
        await fetch(BASE_URL+"/"+typeDetails+"/"+indexDetails,{
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
        await fetch(BASE_URL+"/"+type)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log("data",data);
          let movies=data.map((item)=>({...item,favourite: item.favourite == undefined || item.favourite == null ?false:item.favourite}))
          setMovies(movies)
  
        })
      }
      else{
        debugger;
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
      await fetch(BASE_URL+"/"+type)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log("data",data);
        let movies=data.map((item)=>({...item,favourite: item.favourite == undefined || item.favourite == null ?false:item.favourite}))
        setMovies(movies)

      })
      }
    }
  }
   console.log("modal",movies);
    return(
        <div id="parent">
          {loader ? <Loader /> :
      <MovieDetails type={type} details = {movies} createFavourite={favouriteDetails}/>}
        </div>
    )
}
export default Movies;