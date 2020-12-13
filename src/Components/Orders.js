import React, { useEffect, useState } from 'react';
import '../CSS/Logindashboard.css';
import '../CSS/sidebar.css';
import '../CSS/BodyElements.css';
import { Avatar, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InfoIcon from '@material-ui/icons/Info';

const Orders = (props) => {
    const [hover_on, sethover] = useState(false);
    const [data, setdata] = useState([]);
    const [customer, setcustomer] = useState([]);


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

    useEffect(() => {
        setdata(JSON.parse(localStorage.getItem('items')))
    }, [])

    useEffect(() => {
        if (data) {
            console.log(data)
            let customer = [];
            var obj = new Object();
            for (var i = 0; i < data.length; i++) {

                var str = data[i]["Order No_001"].toString();

                if (str.includes("Customer name")) {
                    if (obj != {}) {
                        customer = [...customer, obj];
                        var obj = new Object;
                    }
                    obj.name = str;
                }

                if (str.includes("Delivery & Invoice address")) {
                    for (const key in data[i]) {
                        if (key !== "Order No_001")
                            obj.address = data[i][key];
                    }
                }
                if (str.includes("Order placed date:")) {
                    for (const key in data[i]) {
                        if (key !== "Order No_001")
                            obj.orderDate = data[i][key];
                    }
                }

            }

            setcustomer(customer);

        }

    }, [data])

    return (
        <div className='background_body'>

            <div id='nav'>
                <input className='searchBox' type='text' placeholder='Search Products....' />

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




        </div>
    );


}
const Memoized_Orders = React.memo(Orders);
export default Memoized_Orders;