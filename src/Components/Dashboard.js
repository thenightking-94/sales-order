import React, { useState, useRef, useEffect } from 'react';
import '../CSS/allcss.css';
import { Avatar, Typography, Button, Grid } from '@material-ui/core';

const Dashboard = (props) => {
    const [hover_on, sethover] = useState(false);




    const logout_option = () => {
        window.location.assign('/logout');
    }

    return (
        <div>
            <div id='nav'>
                <div id='logged_info'>
                    <Typography className='typo'><i style={{ color: 'black' }}>{props.match.params.name}</i></Typography>
                    &nbsp;&nbsp;
                    {hover_on && <Typography style={{ background: 'red' }} className='logged_info'>Log out</Typography>}
                    {!hover_on && <Typography className='logged_info'>Logged in</Typography>}
                    &nbsp;&nbsp;
                    <Avatar onMouseOver={() => { sethover(true) }} onMouseLeave={() => { sethover(false) }} onClick={logout_option} style={{ cursor: 'pointer' }} src={`${localStorage.getItem('img_url')}`} />
                </div>

            </div>


        </div>
    );


}
const Memoized_dashboard = React.memo(Dashboard);
export default Memoized_dashboard;