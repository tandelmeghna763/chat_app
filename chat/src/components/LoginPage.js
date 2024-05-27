import React from 'react';
import './LoginPage.css';
import { useState } from 'react';
import ChatApp from './ChatApp';

const LoginPage = () => {
    const [meetingID, updatemeetingID] = useState(() => {
        const x = localStorage.getItem('meetingID');
        const save = JSON.parse(x);
        return save || '';

    });
    const [Id, setId] = useState('');
    const [Name, setName] = useState('');

    const save = () => {
        localStorage.setItem('meetingID', JSON.stringify(Id));
        updatemeetingID(Id);
        localStorage.setItem('Name', JSON.stringify(Name));
        updatemeetingID(Name);
    };

    return (
        <>
            {meetingID ? (
                <ChatApp />
            ) : (
                <div className="container">
                    <h1 style={{ marginBottom: "20px" }}>WeChat</h1>
                    <div>
                        <input type="text" value={Name} placeholder="Enter User Name" onChange={(e) => setName(e.target.value)}></input>
                        <input
                            type="text"
                            value={Id}
                            placeholder="Enter Meeting ID"
                            onChange={(e) => setId(e.target.value)}
                        ></input>
                        <button onClick={() => save()}>Join Meeting</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginPage;
