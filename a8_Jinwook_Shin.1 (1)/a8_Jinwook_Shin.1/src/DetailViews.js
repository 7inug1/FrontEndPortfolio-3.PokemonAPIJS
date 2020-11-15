import React from "react"
import axios from "axios";

class NumberChooser extends React.Component{
    render(){
        return <>
            <div className="details">
                <h2>{this.props.current}</h2>
                    <div className="images">
                        <ul>
                           {slicedImagesArray.slice(-this.state.number).map(image=><li key={image}><img src={image} /></li>)}
                        </ul>
                   </div>
            </div>
            
            <div className="comments">
                <ul>
                    {this.state.comments.map(comment=><li key={comment}>{comment}</li>)}
                </ul>
            </div>
        </>;
            
    }
}