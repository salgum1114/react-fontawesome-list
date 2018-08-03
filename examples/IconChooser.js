import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'antd';

import { Icon, Icons } from '../index.js';

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
