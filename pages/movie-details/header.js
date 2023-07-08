import React ,{ useEffect, useState} from "react";
import { Tabs } from 'antd';
import Movies from "../movie-details/movies";

const items = [
  {
    key: '1',
    label: `In Theatres`,
    children: <Movies type={"movies-in-theatres"}/>,
  },
  {
    key: '2',
    label: `Upcoming`,
    children: <Movies type={"movies-coming"}/>,
  },
  {
    key: '3',
    label: `Top Rated`,
    children: <Movies type={"top-rated-movies"}/>,
  },
  {
    key: '4',
    label: `Top Rated-India`,
    children: <Movies type={"top-rated-india"}/>,
  },
  {
    key: '5',
    label: `Favourites`,
    children: <Movies type={"favourites"}/>,
  }
];
function Header(){
  const[key,setKey] = useState("1");
 const {TabPane} = Tabs;
  const onChange = (key) => {
    console.log(key);
    setKey(key);
  };
  useEffect(()=>{
   
  },[key])
   return(
    <div>
        <Tabs  activeKey={key}  onChange={onChange} >
        <TabPane tab="In Theatres" key="1">
        {key === '1' && <Movies type={"movies-in-theatres"}/>}
      </TabPane>
      <TabPane tab="Upcoming" key="2">
        {key === '2' && <Movies type={"movies-coming"}/>}
      </TabPane>
      <TabPane tab="Top Rated" key="3">
        {key === '3' && <Movies type={"top-rated-movies"}/>}
      </TabPane>
      <TabPane tab="Top Rated-India" key="4">
        {key === '4' && <Movies type={"top-rated-india"}/>}
      </TabPane>
      <TabPane tab="Favourites" key="5">
        {key === '5' && <Movies type={"favourites"}/>}
      </TabPane>
        </Tabs>
    </div>
   )
}
export default Header;