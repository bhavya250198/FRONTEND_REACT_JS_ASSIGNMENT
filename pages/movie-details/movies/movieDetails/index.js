import { useEffect, useState } from "react";
import {List,Card} from "antd";
import {  EllipsisOutlined, HeartOutlined } from '@ant-design/icons';
import SpecificMovie from "../modal/modal.js";
export default function MovieDetails({details,createFavourite}){

    const [modalVisible,setModalVisible] = useState(false);
    const [detailsDet,setDetailsDet] = useState({});
    const [colorArray,setColorArray] = useState([...details.map(item=>item.favourite)]);
    
  console.log('colorArray',colorArray);
    const getFavourites = async(item,index) =>{
         

         console.log("item",item);
         console.log("index",index);

        // colorArray[index]=true;
      createFavourite(item,index,details);
       
        setColorArray([...colorArray]);
        
      }
      const getDetails =(item)=>{
        console.log("item",item);
        setModalVisible(true);
        setDetailsDet({...item});
      }
      const handleCancelStatus =(data)=>{
        setModalVisible(data);
      }
     
      console.log("colorArray",colorArray);
      console.log("modalDetails",modalVisible,detailsDet);
return(
    <div id="parent">
          <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={details}
    renderItem={(item,index) => (
      <List.Item>
        <Card
        cover={
          <img
            alt="example"
            className="images"
            src={item.posterurl}
          />
        } 
        actions={[
          <HeartOutlined  style={{color:colorArray[index]?"red":""} }  onClick={()=>{getFavourites(item,index)}}  />,
          <EllipsisOutlined onClick={()=>{getDetails(item)}} key="ellipsis" />,
        ]}
        >
       <h4>{item.title}</h4>
       
        </Card>
      </List.Item>
    )}
  />
   {modalVisible && 
 <div><SpecificMovie visible={modalVisible} movieDetails={detailsDet} onCancelDetails={handleCancelStatus}/></div>} 
    <style jsx>{`
        #parent{
          .ant-card-cover{
              display:flex;
              justify-content: center;
              padding:5px;
              margin:5px;
          .images{
              height:200px;
              width:200px;
              
          }
          .favourite{
            background-color:red;
          }
          .unfavourite{
            background-color:white;
          }
          
      }
      }
      `}</style>
    </div>
)
}