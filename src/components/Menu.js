import React from 'react'
import '../index.css';
import Accordion from './Accordion'

export default class Menu extends React.Component {

    render() {
        //each button/menu item is stored in an array 

        const sizes = ['Small - 10', 'Medium - 12', 'Large - 16']
        const crusts = ['White', 'Wheat', 'Gltn Free']
        const sauces = ['Marinara']
        const cheeses = ['Mozzarella', 'Cheddar']
        const toppings = ['Pepperoni', 'Xtra Pepp.', 'Sausage', 'Bacon', 'Ham', 'Mushrooms', 'Onions', 'Jalapeños', 'Garlic', 'Pineapple', 'Blk. Olives', 'Anchovies', 'Spinach']
        const checkout = ['Delivery', 'Pickup']


        return (
            <div>
                <Accordion header='Size' options={sizes} expanded={true} funcbuild={this.props.pzaprops} />
                <Accordion header='Crust' options={crusts} funcbuild={this.props.pzaprops} />
                <Accordion header='Sauce' options={sauces} funcbuild={this.props.pzaprops} />
                <Accordion header='Cheese' options={cheeses} funcbuild={this.props.pzaprops} />
                <Accordion header='Toppings' options={toppings} multiselect={true} funcbuild={this.props.pzaprops} />
                <Accordion header='Checkout' options={checkout} funcbuild={this.props.pzaprops} />
            </div>
        )
    }
}