import React ,{useState} from "react";
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
    children: <Movies type="favourites"/>,
  }
];
function Header(){
  const[key,setKey] = useState("1");
  const onChange = (key) => {
    console.log(key);
    setKey(key);
  };
   return(
    <div>
        <Tabs  activeKey={key} items={items} onChange={onChange} />
    </div>
   )
}
export default Header;