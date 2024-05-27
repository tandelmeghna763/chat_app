import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import './Chat.css'
import { IoMdSend } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
const socket = io('http://localhost:5000');
const moment = require('moment');

console.log("Current Date:", moment().toString())
console.log("Current date is:", moment().date())
console.log("date & time:", moment().format('h:mm:ss a'));

const ChatApp = () => {
    const [value, setValue] = useState()
    const [msg, setMsg] = useState([])
    const handlevalue = (e) => {
        setValue(e.target.value);
    };
    const handleKeyDown = event => {
        if (event.keyCode === 13) {
            sendmsg()
        }
    };

    useEffect(() => {
        socket.emit("connectToRoom", 'm1')
        socket.on("get_msg", (reciveserver) => {
            // console.log("[get_msg]", reciveserver);
            setMsg([...msg, { data: reciveserver?.message?.value, sender: reciveserver?.message?.sender, from: 1 }]);
            // setShow(true);
        })
        return () => {
            socket.off('get_msg')
        }
    }, [msg])

    // useEffect(() => {
    //     socket.on("get_msg", (reciveserver) => {
    //         console.log("[get_msg]", reciveserver);
    //         setMsg([...msg, { data: reciveserver?.message?.value, from: 1 }]);
    //         // setShow(true);
    //     })
    // }, [msg]);

    const sendmsg = () => {
        // setShow(true);
        setMsg([...msg, { data: value, from: 2, sender: JSON.parse(localStorage.getItem('Name')) }]);
        setValue('');
        socket.emit("send_msg", { message: { value, sender: JSON.parse(localStorage.getItem('Name')) } });
    };
    console.log("recive msg", msg)
    return (
        <div className='App'>
            <div className='nav'>
                <FaUserCircle size={30}></FaUserCircle>

                <h1>{JSON.parse(localStorage.getItem('Name')) || 'WeChat'}</h1>
            </div>
            <div className='msg'>
                {
                    msg && msg?.length > 0 ? msg.map((item) => {

                        console.log(item.data)
                        return <div className='msg-list' style={{ justifyContent: item.from === 2 ? "flex-end " : "flex-start" }}>
                            <h2 className={item.from === 1 ? "server" : "client"}>
                                {/* <span className='nm'>{item.from == 1 ? item.sender : "You"}</span> */}
                                <h2>
                                    {item.data}
                                    <span className='time'>{item.from == 1 ? moment().format('h:mm:ss a') : moment().format('h:mm:ss a')}</span>
                                </h2>
                            </h2>
                            {/* <span>{item.form == 1 ? moment().format('h:mm:ss a') : ""}</span> */}
                            {/* <h2 className={item.from === 1 ? "server" : "client"}>{item.sender}</h2> */}
                        </div>
                    })

                        : <></>
                }
            </div>
            <div className='textmsg'>
                <input type="text" value={value} placeholder='Message' onChange={handlevalue} onKeyDown={handleKeyDown} className='i1' />
                <IoMdSend onClick={() => sendmsg()} size={40}></IoMdSend>
            </div>
        </div>

    )
}

export default ChatApp;