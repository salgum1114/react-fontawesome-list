# react-fontawesome-list

Fontawesome5 Free icon list component developed as React.js.

# Install

- npm install --save react-fontawesome-list

# Getting Started

## Basic
```
import React, { Component } from 'react';
import { Icons } from 'react-fontawesome-list'

class ExampleList extends Component {
  render() {
    <div>
      <Icons />
    </div>
  }
}
```

## React-Fontawesome-List + Ant.Design Modal
```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'antd';

import { Icon, Icons } from 'react-fontawesome-list';

class IconChooser extends Component {
    handlers = {
        onOk: () => {
            const { icon } = this.state;
            const { onChange } = this.props;
            if (onChange) {
                onChange(icon);
            }
            this.setState({
                visible: false,
            });
        },
        onCancel: () => {
            this.modalHandlers.onHide();
        },
        onClick: () => {
            this.modalHandlers.onShow();
        },
        onClickIcon: (icon) => {
            this.setState({
                icon,
            }, () => {
                const { onChange } = this.props;
                if (onChange) {
                    onChange(icon);
                }
                this.modalHandlers.onHide();
            });
        },
    }

    modalHandlers = {
        onShow: () => {
            this.setState({
                visible: true,
            });
        },
        onHide: () => {
            this.setState({
                visible: false,
            });
        },
    }

    static propTypes = {
        onChange: PropTypes.func,
    }

    state = {
        icon: {},
        visible: false,
    }

    render() {
        const { onOk, onCancel, onClick, onClickIcon } = this.handlers;
        const { icon, visible } = this.state;
        const label = (
            <React.Fragment>
                <span style={{ marginRight: 8 }}>
                    {'Icon'}
                </span>
                <Icon name={icon.name} prefix={icon.prefix} />
            </React.Fragment>
        );
        return (
            <React.Fragment>
                <Form.Item label={label} colon={false}>
                    <Button onClick={onClick}>
                        {'Choose Icon from Library'}
                    </Button>
                </Form.Item>
                <Modal
                    onOk={onOk}
                    onCancel={onCancel}
                    width="80%"
                    visible={visible}
                    bodyStyle={{ margin: 16, height: '600px' }}
                >
                    <Icons ref={(c) => { this.iconsRef = c; }} onClick={onClickIcon} search />
                </Modal>
            </React.Fragment>
        );
    }
}

export default IconChooser;
```
![image](https://user-images.githubusercontent.com/19975642/43623837-6340b80e-971e-11e8-880a-f07795ecc26f.png)

# Icons
## props

| `PropName` | `Default` | `PropTypes` |
| --- | :---: | :---: |
| `onClick` | | function (icon) |
| `search` | false | Boolean |
| `grid` | 4 | String or Number |
| `icons` | [ ] | Array |
| `icon` | | Object |
| `selected` | false | Boolean |
| `style` | { width: '100%', height: '100%' } | Object |
| `iconStyle` | { } | Object |

# Icon
## props

| `PropName` | `Default` | `PropTypes` |
| --- | :---: | :---: |
| `name` | | String |
| `color` | | String |
| `style` | | Object |
| `className` | | String |
| `size` | 1 | Number |
| `innerIcon` | | String |
| `innerColor` | | String |
| `innerClassName` | | String |
| `innerSize` | 1 | Number |
| `prefix` | fas | String |

# Demo

- git clone https://github.com/salgum1114/react-fontawesome-list.git - Clone the project
- npm start - Run script
- http://localhost:8080 - Host access

