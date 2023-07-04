import {Modal,Typography,Avatar} from "antd";
import { UserOutlined } from '@ant-design/icons';

const { Paragraph,Text } = Typography;
export default function SpecificMovie({visible,movieDetails,onCancelDetails}){
  
    console.log("movieDetails",movieDetails);
    const handleCancel=()=>{
        onCancelDetails(false);
    }
    return(
        <div>
             <Modal
            open={visible}
            title="Movie Details"
            footer={null}
            onCancel={handleCancel}
         >
            < div className="movieDet">
            <img className="modalImage" src={movieDetails.posterurl} alt="image"/>
            <h3>{movieDetails.title}</h3>
                <div className="movie-details">
                    <div>
                        {movieDetails.year}
                    </div>
                    <div>
                        {movieDetails?.duration?.substring(2,3)+" : "+movieDetails?.duration?.substring(3,5)}
                    </div>
                    <div>
                        {movieDetails.imdbRating}
                    </div>
                </div>
                <div className="plot">
                    <h4>Plot</h4>
                    <Paragraph ellipsis={{  rows: 3,
                expandable: true,
                symbol: 'more',}} >{movieDetails.storyline}</Paragraph>
                </div>
                 <div>
                    <h4 className="genres">Genres</h4>
                    <div className="genreDetails">
                   {movieDetails?.genres?.map((item,index) =>(
                        <div key={index}>{item}</div>
                    ))}
                    </div>
                </div>
                <div>
                    <h4 className="cast">Cast</h4>
                    <div className="castDetails">
                        {movieDetails?.actors?.map((item,index)=>(
                            <div key={index}>
                              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                              <br></br>
                              {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
        <style jsx>
        {`
        .movieDet{
            text-align:center
            
        }
        .modalImage{
            width:250px;
            height:250px;
        }
        .movie-details{
            display:inline-flex;
            justify-content:space-evenly;
            min-width:350px;
            max-width:400px;
        }
        .plot,.cast,.genres{
            text-align:left;
        }
       
        .genreDetails,.castDetails{
            display:flex;
            justify-content:space-around;
            flex-wrap:wrap
        }
        `

        }
       </style>
        </div>
    )
}
