// endpoint to get all the images for a certain breed of dog: https://dog.ceo/api/breed/{breedname}/images

import React from "react"
import axios from "axios";
let slicedImagesArray = [];
// App component by making a class
class Details extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            images: [],
            number: 1,
            newComment: "",
            comments: []
        }
        
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
        
    componentDidUpdate(prevProps, prevState){
        // load new updated images here
        // prevProps: old props. (before update) Useful because you can check to see if new props are the same as old props.
        
        // Q. Check if the current dog breed value has changed. 
        // If it has, use an Axios request to the Dog API to get an array of images for the current breed.
        // When you get the array, update the images state to store this data.
        // console.log("current dog in cDU" + this.props.current);
        // console.log("prevProps.current: " + prevProps.current )
        // console.log("this.props.current: " + this.props.current)
        // console.log("this.state.number1: " + this.state.number)
        if(prevProps.current !== this.props.current){
            // console.log("props not same")   
            
            axios.get(`https://dog.ceo/api/breed/${this.props.current}/images`)
            .then(results=>{
                this.setState({
                    images:results.data.message
                });
                // console.log("slicedImagesArray: " + slicedImagesArray)
                // console.log("this.state.number2: " + this.state.number)
                slicedImagesArray = this.state.images.slice(this.state.number)
                // console.log("slicedImagesArray2: " + slicedImagesArray)
            })
            .catch(error=>console.log(error));
        }
    }
    
    handleNumberChange(event) {
        this.setState({
            number:event.target.value
        })
    }
    
    handleCommentChange(event) {
        // Update newComment in state
        this.setState({
            newComment:event.target.value
        })
    }
    
    handleCommentSubmit(event) {
        event.preventDefault();
        // Post a new comment to '/comments'
        let cloneComments = (this.state.comments).slice();
        console.log("cloneComments: " + cloneComments);
        cloneComments.push(this.state.newComment);
        
        this.setState({

            newComment: "",
            comments: cloneComments
        })
        axios.post('/comments', {breed: this.props.current, text: this.state.comments})
        .then(results=>{
            console.log(results.data);
        })
        .catch(error=>console.log(error));
        
    }
    
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
            
            <form>
                <label>
                number of images:
                    <input type='number' min='0' max={this.state.images.length} value={this.state.number} onChange={this.handleNumberChange}/>
                </label>
            </form>
            
            <form onSubmit={this.handleCommentSubmit}>
                Submit a comment:
                    <textarea onChange={this.handleCommentChange} value={this.state.newComment}></textarea>
                <input type='submit' value='Submit comment' />
            </form>
            
            <div className="comments">
                <ul>
                    {this.state.comments.map(comment=><li key={comment}>{comment}</li>)}
                </ul>
            </div>
        </>;
            
    }
}
// {this.state.dogs.map(dog=><li key={dog}><button onClick={()=>this.props.handleChooseNumber(dog)}>{dog}</button></li>)}
export default Details;