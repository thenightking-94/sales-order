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
                {window.innerWidth > 768
                    && <div><Typography className='typo'><i style={{ color: 'black' }}>{props.match.params.name}</i>&nbsp;</Typography>
                        <p style={{ fontFamily: 'ITC Charter', color: 'black' }}>{localStorage.getItem('email_id')}</p></div>
                }
                {window.innerWidth < 768 &&
                    <div><Typography className='typo'><i style={{ color: 'black' }}>{props.match.params.name}</i>&nbsp;</Typography>
                        <p style={{ fontFamily: 'Helvetica', fontVariant: 'small-caps', color: 'black' }}>{localStorage.getItem('email_id')}</p></div>
                }
                <span id='logged_info'>
                    {hover_on && <Typography style={{ background: '#e88d14', padding: '3px', borderRadius: '4px', color: 'white' }} className='logged_info'>Log out</Typography>}
                    {!hover_on && <Typography className='logged_info'>Logged in</Typography>}
                    &nbsp;&nbsp;&nbsp;
                    <Avatar onMouseOver={() => { sethover(true) }} onMouseLeave={() => { sethover(false) }} onClick={logout_option} style={{ cursor: 'pointer' }} src={`${localStorage.getItem('img_url')}`} />
                </span>
            </div>


        </div>
    );


}
const Memoized_dashboard = React.memo(Dashboard);
export default Memoized_dashboard;