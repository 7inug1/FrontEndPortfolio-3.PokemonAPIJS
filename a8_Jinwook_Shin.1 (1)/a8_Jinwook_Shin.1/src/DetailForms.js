import React from "react"
import axios from "axios";

class NumberChooser extends React.Component{


render(){

        return <>
            
            <form>
                <label>
                number of images:
                    <input type='number' min='0' max={this.props.formProps.images.length} value={this.props.formProps.number} onChange={this.handleNumberChange}/>
                </label>
            </form>
            
            <form onSubmit={this.handleCommentSubmit}>
                Submit a comment:
                    <textarea onChange={this.handleCommentChange} value={this.props.formProps.newComment}></textarea>
                <input type='submit' value='Submit comment' />
            </form>
            
            
        </>;
            
    }