import React, { useEffect, useState } from 'react';
import '../CSS/Logindashboard.css';
import '../CSS/sidebar.css';
import '../CSS/BodyElements.css';
import { Avatar, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

const Orders = () => {
    const [hover_on, sethover] = useState(false);
    const [data, setdata] = useState([]);
    const [customerdata, setcustomer] = useState([]);
    const [ready, setready] = useState(false);


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

        if (data.length > 0 && !ready) {

            let customer = [];
            var obj = new Object();
            for (var i = 0; i < data.length; i++) {

                var str = data[i]["Order No_001"].toString();

                if (str.includes("Customer name")) {
                    if (obj !== {}) {
                        customer = [...customer, obj];
                        obj = new Object();
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


                if (str.includes("S.No")) {
                    let products = [];
                    for (const key in data[i + 1]) {
                        if (key === "__EMPTY")
                            products = [...products, data[i + 1][key]];
                    }
                    for (const key in data[i + 2]) {
                        if (key === "__EMPTY")
                            products = [...products, data[i + 2][key]];
                    }
                    for (const key in data[i + 3]) {
                        if (key === "__EMPTY")
                            products = [...products, data[i + 3][key]];
                    }
                    obj.thingsBought = products;
                }

            }
            customer.shift();
            setready(true);
            setcustomer(customer);
        }

        if (customerdata.length > 0 && ready) {
            console.log(customerdata)
            localStorage.setItem('readyData', JSON.stringify(customerdata));
        }

    }, [data, customerdata, ready])

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



            <div className='flexAdder'>
                <Typography id='order_typo'>List of the Orders :</Typography>
                <SortByAlphaIcon className='icon_sort' />
            </div>
            {customerdata.length > 0 && ready && customerdata.map(item =>
                <div key={item.name}>

                </div>)}



        </div>
    );


}
const Memoized_Orders = React.memo(Orders);
export default Memoized_Orders;