import React from 'react'
import '../index.css';
import Menu from '../components/Menu'
import Pizza from '../components/Pizza'

export default class Manager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ingredients: {}
        }



        this.updatePizza = this.updatePizza.bind(this);
    }

    updatePizza(type, items){
        const {ingredients} = this.state; 
        const updatedState = {
            ...ingredients,
            [type]: items,
            
        };

        return this.setState({ingredients:updatedState})
    }


    render() {
        return(
            <div className='big-container'>
                <div className="menucontainer">
                    <Menu pzaprops={this.updatePizza} />
                </div>
        
                <div className="pizzacontainer">
                    <Pizza ingredients={this.state.ingredients}/>
                </div>
            </div>
        )
    }
        
}


