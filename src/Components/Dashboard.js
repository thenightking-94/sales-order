import React, { useEffect, useRef, useState } from 'react';
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
    const [uploadComplete, setComplete] = useState(false);
    const [file, setfile] = useState({});
    const [data, setdata] = useState([]);
    const [cols, setcols] = useState([]);
    const [counter, setcounter] = useState(0);
    const delay = useRef();

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
        if (data.length > 0 && cols.length > 0 && uploadComplete) {
            localStorage.setItem('items', JSON.stringify(data));
            delay.current = setInterval(() => {
                setcounter(counter => counter + 1);
            }, 1000);
        }
        if (counter == 5) {
            clearInterval(delay.current);
            window.location.assign('/orders')
        }

        return () => { clearInterval(delay.current) }

    }, [data, cols, uploadComplete, counter])

    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0])
            setfile(files[0]);
    }
    const handleFile = () => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            setdata(data);
            setcols(make_cols(ws['!ref']));
            setComplete(true)
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
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
                    <span style={uploadComplete ? {} : { position: 'fixed', top: '20px' }} className="btn_icons"  >
                        <p className="icon_upper_main" >K</p>
                    </span>
                    {
                        data && uploadComplete && <span className="btn_icons"  >
                            <ShoppingCartIcon className="icon_upper" />
                            <p id='side_icon'>Cart</p>
                        </span>
                    }
                    {
                        data && uploadComplete && <span className="btn_icons"  >
                            <AddShoppingCartIcon className="icon_upper" />
                            <p id='side_icon'>Add to Cart</p>
                        </span>
                    }
                    {
                        data && uploadComplete && <span className="btn_icons" >
                            <InfoIcon className="icon_upper" />
                            <p id='side_icon'>Info</p>
                        </span>
                    }
                </div>
            </div>

            <div className='flexAdder' id='footer'>
                <p>©&nbsp;Shubham Chatterjee</p>
            </div>




            <div className='main_body'>
                <div className='flexAdder'>
                    <Typography className='typo_body' ><u> {uploadComplete ? 'Place Order' : 'Upload sales data'}</u></Typography>
                </div>

                <br />

                <div className='flexAdder'>
                    <div className='salesdata_block'>
                        <p id='para_typo'>
                            Kindly upload your sales data in excel sheet format to proceed
                        </p>
                        <br />
                        {!uploadComplete && <input type="file" className="form-control file_loader" id="file" accept={SheetJSFT} onChange={handleChange} />}
                        <br />
                        <input type='submit'
                            className='process_btn'
                            value={uploadComplete && data ? "Uploaded !!" : "Process your data"}
                            onClick={handleFile} />
                        <br />
                        {uploadComplete && counter != 0 &&
                            <p style={{ fontSize: '15px', textAlign: 'center', fontFamily: 'Helvetica' }}>
                                Please hold on while we re-direct you in &nbsp;{5 - counter}&nbsp;seconds.....
                            </p>
                        }

                    </div>

                </div>
            </div>



        </div>
    );


}
const Memoized_dashboard = React.memo(Dashboard);
export default Memoized_dashboard;