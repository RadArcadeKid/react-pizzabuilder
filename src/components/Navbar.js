import React from 'react'
import '../index.css';
import { FaPizzaSlice } from 'react-icons/fa';

class Navbar extends React.Component {
  listener = null;
  state = {
    nav:false
  }
  constructor(props){
      super(props)
      this.handleScroll = this.handleScroll.bind(this);
  }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
   handleScroll= () => {
     if (window.pageYOffset > 19) {
         if(!this.state.nav){
           this.setState({ nav: true });
         }
     }else{
         if(this.state.nav){
           this.setState({ nav: false });
         }
     }
   }


  render(){
      const shouldScroll = !this.state.nav; //flip me back if needed
  return (
    <div>
        <div className={`Nav`}>
            <FaPizzaSlice />
            <div className={`slider ${!shouldScroll && 'closed'}`}>
                <h1 className='noselect'>
                    Pizza Builder 
                </h1>
            </div>
        </div>
    </div>



  );}

}
export default Navbar




