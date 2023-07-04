import React from "react";
import {Modal, Ellipsis} from "antd";

export default 
function SpecificMovie({visible,specificMovie}){

    return(
      <div id="modalParent">
         <Modal
            open={visible}
            title="Movie specificMovie"
         
         >
            <div className="parent">
                <img className="modalImage" src={specificMovie.posterurl} alt="image"/>
                <h3>{specificMovie.title}</h3>
                <div className="movie-specificMovie">
                    <div>
                        {specificMovie.year}
                    </div>
                    <div>
                        {specificMovie?.duration?.substring(2,3)+" : "+specificMovie?.duration?.substring(3,5)}
                    </div>
                    <div>
                        {specificMovie.imdbRating}
                    </div>
                </div>
                <div className="plot">
                    <h4>Plot</h4>
                    <Ellipsis lines={2}>{specificMovie.storyline}</Ellipsis>
                </div>
            </div>
        </Modal>
       <style jsx>
        {`
        .parent{
            text-align:center
            
        }
        .modalImage{
            width:250px;
            height:250px;
        }
        .movie-specificMovie{
            display:inline-flex;
            justify-content:space-evenly;
            min-width:350px;
            max-width:400px;
        }
        .plot{
            text-align:left;
        }
        `

        }
       </style>
      </div>
    )

}
