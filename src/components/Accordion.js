import React from 'react'
import '../index.css';
import Integredient from './Ingredient'
import PropTypes from 'prop-types'
import { FaChevronDown } from 'react-icons/fa'


//TODO: state manager component for determining whether buttons can be toggled individually 
//or must be manually toggled 

export default class Accordion extends React.Component {
    constructor(props) {
        super(props)
        // const { header, options } = this.props
        
        this.state = {
            expanded: this.props.expanded,
            activeitems: [], //for determining which items are 'active' on the pizza 
        }

        this.handleExpand = this.handleExpand.bind(this);
        this.buttonsToggle = this.buttonsToggle.bind(this);

    }


    handleExpand(event){
        //flip the expanded state on the component
        this.setState({
            expanded: !this.state.expanded
        })
    }

    buttonsToggle(option){

        const { activeitems } = this.state;
        const { multiselect } = this.props;

        let localactiveitems = []; 

        //if the item is not already active         
        if(!activeitems.includes(option)){

            //AND if user is allowed to select more than one....
            if(multiselect){
                //append this item to the list of active items
                localactiveitems = [...activeitems, option];
            }
            //otherwise, its a toggle, so the ONLY active item should be the one selected
            //and all others are no longer active 
            else{

                localactiveitems = [option];
            }

        }
        else{ //otherwise, it's active, and should be toggled off (regardless of multiselect)
            localactiveitems = activeitems.filter(item => item !== option) 
        }

        this.setState({
            activeitems: localactiveitems
        })  


        //set update the selected components function: 
        return this.props.funcbuild(this.props.header, localactiveitems);
    }

    render() {
        //map each list item to an ingredient button 
        const listItems = this.props.options.map((option) => 
        <li key={option}> <Integredient name={option} isActive={this.state.activeitems.includes(option)} clickActive={this.buttonsToggle} /> </li>
        ); 


        return(
        <>
            <div className="custom-card-header" >
                <h2 className={`noselect ${this.state.expanded && 'h2active'}`} onClick={this.handleExpand}> 
                    {this.props.header}   
                    <FaChevronDown 
                        className={`icon-right ${!this.state.expanded && 'closed'}`} 
                        size={15}/>
                </h2>
                <div className={`panel ${!this.state.expanded && 'closed'}`}>
                    <ul className='ingredientcontainer'>
                        {listItems}
                    </ul>
            </div>
            </div>
        </>
        )
    }
}



Accordion.propTypes = {
    header: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    expanded: PropTypes.bool,
    multiselect: PropTypes.bool,
    funcbuild: PropTypes.func.isRequired
}

//default props for if the accordion should be expanded/and should have multiselect buttons inside! 
Accordion.defaultProps = {
    expanded: false,
    multiselect: false 
}