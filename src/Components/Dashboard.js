import React, { useState } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import '../CSS/Logindashboard.css';
import '../CSS/sidebar.css';
import '../CSS/BodyElements.css';
import { Avatar, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InfoIcon from '@material-ui/icons/Info';

const Dashboard = (props) => {
    const [hover_on, sethover] = useState(false);


    const logout_option = () => {
        window.location.assign('/logout');
    }
    const InitialsMobile = (str) => {
        let res = '', val = '';
        str += ' ';
        for (var i = 0; i < str.length; i++) {
            if (str[i] != ' ')
                res += str[i];
            else {
                val += res[0];
                res = '';
            }


        }
        return val;
    }
    const handleChange = () => {

    }
    const handleFile = () => {

    }
    return (
        <div className='background_body'>
            <div id='nav'>
                <input className='searchBox' type='text' placeholder='Search Products....' />

                <div id='logged_info'>
                    {window.innerWidth > `${760}` && <Typography className='typo'><i style={{ color: 'black' }}>{props.match.params.name}</i></Typography>}
                    &nbsp;&nbsp;
                    {hover_on && window.innerWidth > `${760}` && <Typography style={{ background: 'red' }} className='logged_info'>Log out</Typography>}
                    {!hover_on && window.innerWidth > `${760}` && <Typography className='logged_info'>Logged in</Typography>}
                    &nbsp;&nbsp;
                    {window.innerWidth > `${760}` && <Avatar onMouseOver={() => { sethover(true) }} onMouseLeave={() => { sethover(false) }} onClick={logout_option} style={{ cursor: 'pointer' }} src={`${localStorage.getItem('img_url')}`} />}
                    {window.innerWidth < `${760}` && <Avatar onClick={logout_option} style={{ cursor: 'pointer', background: 'green' }} >{InitialsMobile(props.match.params.name)}</Avatar>}
                </div>

            </div>

            <div className='sidebar'>
                <div id='upper_icons'>
                    <span className="btn_icons"  >
                        <p className="icon_upper_main" >K</p>
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




            <div className='main_body'>
                <div className='flexAdder'>
                    <Typography className='typo_body' > Place Order</Typography>
                </div>

                <br />

                <div className='flexAdder'>
                    <div className='salesdata_block'>
                        <p id='para_typo'>
                            Kindly upload your sales data excel sheet to proceed
                        </p>
                        <br/>
                        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
                        <br />
                        <input type='submit'
                            value="Upload Sales data"
                            onClick={handleFile} />
                    </div>

                </div>
            </div>



        </div>
    );


}
const Memoized_dashboard = React.memo(Dashboard);
export default Memoized_dashboard;