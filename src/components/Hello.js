// 在js中引入css文件
import './Hello.css';
// 在js中引入sass文件
import './Hello.scss';

import React, {Component} from 'react';

// 直接在js中定义样式，内嵌样式
let style = {
    backgroundColor: 'pink'
}

export default class Hello extends Component {
    render() {
        return (
            <div>
                <h1 style={style}>webpack_example</h1>
                <br/>
                <img/>
            </div>
        )
    }
}
