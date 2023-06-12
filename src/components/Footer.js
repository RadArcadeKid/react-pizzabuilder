import React from 'react'
import '../index.css';


export default class Footer extends React.Component {
    state = {
        opacity: '1'
    };

    componentDidMount() {
        if (typeof window !== "undefined") {
          window.onscroll = () => {
            let currentScrollPos = window.pageYOffset;
            let maxScroll = document.body.scrollHeight - window.innerHeight;
            if ((currentScrollPos > 0 && currentScrollPos <= maxScroll)) {
              this.setState({ opacity: "0" })
            } else {
              this.setState({ opacity: "1" })
            }
          }

          window.onresize = () => {
              console.log('onresize')
            if(document.body.scrollHeight - window.innerHeight > 0){
                this.setState({opacity: '0'})
            }
          }
        }
    }
    




    render() {
        return(
            <footer className='cust-footer' style={{ opacity: `${this.state.opacity}`}}>
                <p className='tinyText'>© 2023 Jackie Henson. All Rights Reserved. For DEMO purposes only, no actual pizza will be ordered. </p>
            </footer>
        )
    }
}
