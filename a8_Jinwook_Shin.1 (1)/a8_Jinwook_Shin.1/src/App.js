import React from "react";
import Chooser from "./Chooser.js";
import Details from "./Details.js";
import axios from "axios";

class App extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            dogs: [],
            current: undefined
        }

        this.ChooseDog = this.ChooseDog.bind(this); 
    }
    
    componentDidMount(){
        axios.get(`https://dog.ceo/api/breeds/list/all`)
        .then(results => {
                this.setState({
                    dogs: Object.keys(results.data.message)
                });
            
            this.setState({
                current: this.state.dogs[0]
            });
        });
    }

    ChooseDog(dog) {
        this.setState({
            current:dog
        })
    }
    
    render(){
        return <> 
            <h1>Assignment 8: Advanced Dog App</h1>
            <div className="app">
                <Chooser dogs={this.state.dogs} chooseDog={this.ChooseDog} />
                <Details current={this.state.current}/>
            </div>
        </>;
    }
}

export default App;