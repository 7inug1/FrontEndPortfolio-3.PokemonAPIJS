import React from "react"


class Chooser extends React.Component{
    render(){
        return <> 
            <div className="chooser">
                <h2>Choose a dog</h2>
                <ul>
                    {this.props.dogs.map(dog=><li key={dog}><button onClick={()=>this.props.chooseDog(dog)}>{dog}</button></li>)}
                </ul>
            </div>
        </>;
    }
}

export default Chooser;