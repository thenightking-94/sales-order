import React, { useState, useRef, useEffect } from 'react';
import '../CSS/allcss.css';
import { Avatar, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { FaceRounded } from '@material-ui/icons';

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

    return (
        <div>
            <div id='nav'>

                <Button id='hambtn'>
                    <MenuIcon />
                </Button>

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


        </div>
    );


}
const Memoized_dashboard = React.memo(Dashboard);
export default Memoized_dashboard;