import {Spin} from "antd";

export default function Loader(){

    return(
        <div className="loader" style={{ display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',}}>
             <Spin className="spinner" size="large">
               

            </Spin>
        </div>
    )
}