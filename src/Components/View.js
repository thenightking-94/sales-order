import React, { useEffect, useState, useRef } from 'react';
import '../CSS/Logindashboard.css';
import '../CSS/sidebar.css';
import '../CSS/BodyElements.css';
import { Avatar, Typography, Grid, Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import Pdf from "react-to-pdf";

const View = (props) => {
    const [hover_on, sethover] = useState(false);
    const [data, setdata] = useState({});
    const [gotData, setgotData] = useState(false);
    const ref = useRef();
    const options = {
        orientation: 'landscape',
    };
    const logout_option = () => {
        window.location.assign('/logout');
    }
    const InitialsMobile = (str) => {
        let res = '', val = '';
        str += ' ';
        for (var i = 0; i < str.length; i++) {
            if (str[i] !== ' ')
                res += str[i];
            else {
                val += res[0];
                res = '';
            }


        }
        return val;
    }
    useEffect(() => {
        let array = [], res = new Object();
        array = JSON.parse(localStorage.getItem('readyData'));
        console.log(array)
        for (var i = 0; i < array.length; i++) {
            if (array[i].name.toString().includes(props.match.params.viewname))
                res = { ...res, ...array[i] };
        }
        console.log(res)
        setgotData(true);
        setdata(res);
    }, [])

    return (
        <div className='background_body'>

            <div id='nav'>
                <p className='header_place_of_search'>Order details of&nbsp;{props.match.params.viewname}</p>
                <div id='logged_info'>
                    {window.innerWidth > `${760}` && <Typography className='typo'><i style={{ color: 'black' }}>{localStorage.getItem('name_user')}</i></Typography>}
                    &nbsp;&nbsp;
                    {hover_on && window.innerWidth > `${760}` && <Typography style={{ background: 'red' }} className='logged_info'>Log out</Typography>}
                    {!hover_on && window.innerWidth > `${760}` && <Typography className='logged_info'>Logged in</Typography>}
                    &nbsp;&nbsp;
                    {window.innerWidth > `${760}` && <Avatar onMouseOver={() => { sethover(true) }} onMouseLeave={() => { sethover(false) }} onClick={logout_option} style={{ cursor: 'pointer' }} src={`${localStorage.getItem('img_url')}`} />}
                    {window.innerWidth < `${760}` && <Avatar onClick={logout_option} style={{ cursor: 'pointer', background: 'green' }} >{InitialsMobile(localStorage.getItem('name_user'))}</Avatar>}
                </div>

            </div>

            <div className='sidebar'>
                <div id='upper_icons'>
                    <span className="btn_icons"  >
                        <p className="icon_upper_main" onClick={() => { window.location.assign("/dashboard/" + localStorage.getItem('name_user')) }} >K</p>
                    </span>
                    <span className="btn_icons"  >
                        <ShoppingCartIcon className="icon_upper" />
                        <p id='side_icon'>Cart</p>
                    </span>
                    <span className="btn_icons"  >
                        <AddShoppingCartIcon className="icon_upper" />
                        <p id='side_icon'>Add to Cart</p>
                    </span>
                    <span className="btn_icons" >
                        <InfoIcon className="icon_upper" />
                        <p id='side_icon'>Info</p>
                    </span>
                </div>
            </div>

            <div className='flexAdder' id='footer'>
                <p>©&nbsp;Shubham Chatterjee</p>
            </div>

            {
                gotData && data &&
                <div ref={ref} className='flexAdderCol background_user'>
                    <span className='flexAdder'><p id='view_para'>Name:</p><p id='data_view'>&nbsp;&nbsp;{props.match.params.viewname}</p></span>
                    <br />
                    <br />
                    <span className='flexAdder'><p id='view_para'>Invoice Address:</p><p id='data_view'>&nbsp;&nbsp;{data.address}</p></span>
                    <br />
                    <br />
                    <span className='flexAdder'><p id='view_para'>Billing data:</p><p id='data_view'>&nbsp;&nbsp;{data.orderDate}</p></span>
                    <br />
                    <br />
                    <span id='view_para'>Items purchased :</span>

                    <ul className='flexAdderCol' >
                        {data.thingsBought.map(item =>
                            <li id='data_view' key={item} className="flexAdder_cus">
                                {item}
                                <br />
                            </li>)}
                    </ul>
                </div>
            }

            {/*generating pdf-button rendering*/}

            <Grid container direction='row' justify='center' alignItems='center'>
                <Pdf targetRef={ref} options={window.innerWidth > `${768}` ? options : ''} scale={window.innerWidth > `${768}` ? 1.0 : 1.5} filename={`${props.match.params.viewname + "_invoice.pdf"}`}>
                    {({ toPdf }) => <Button onClick={toPdf} style={{
                        pointerEvents: data ? 'auto' : 'none',
                        background: data ? '#FAEC9C' : '#dcdcdc'
                    }} className='btn'>
                        Generate Invoice Pdf
                    </Button>}
                </Pdf>
            </Grid>


        </div >
    );


}
const M_View = React.memo(View);
export default M_View;