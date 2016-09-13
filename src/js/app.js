import React from 'react';
import ReactDOM from 'react-dom';

import Hello from '../components/Hello.js';

ReactDOM.render(
    <div>
        <h1>Hello World !</h1>
        <Hello/>
    </div>,
    document.getElementById('app')
);