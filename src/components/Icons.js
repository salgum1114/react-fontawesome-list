import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/index.less';
import Icon from './Icon';
import icons from '../libs/fontawesome-5.2.0/metadata/icons.json';

class Icons extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        search: PropTypes.bool,
        grid: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        icons: PropTypes.array,
        icon: PropTypes.object,
        selected: PropTypes.bool,
        style: PropTypes.object,
        iconStyle: PropTypes.object,
    }

    static defaultProps = {
        search: false,
        grid: 4,
        icons: [],
        icon: null,
        selected: false,
        style: { width: '100%', height: '100%' },
        iconStyle: {},
    }

    state = {
        icons: this.props.icons,
        icon: this.props.icon,
        length: this.props.icons.length,
    }

    componentWillMount() {
        const searchIcons = this.search();
        this.setState({
            ...searchIcons,
        });
    }

    getPrefix = (style) => {
        let prefix = 'fas';
        if (style === 'brands') {
            prefix = 'fab';
        } else if (style === 'regular') {
            prefix = 'far';
        }
        return prefix;
    }

    getIcons = (textSearch) => {
        const lowerCase = textSearch.toLowerCase();
        const filteredIcons = Object.keys(icons)
            .filter(icon => icon.includes(lowerCase) || icons[icon].search.terms.some(term => term.includes(lowerCase)))
            .map(icon => ({ [icon]: icons[icon] }));
        return {
            icons: filteredIcons,
            length: filteredIcons.length,
        };
    }

    search = (textSearch) => {
        const filteredIcons = this.getIcons(textSearch || '');
        this.setState({
            ...filteredIcons,
        });
        return filteredIcons;
    }

    click = (icon) => {
        const { onClick } = this.props;
        this.setState({
            icon,
        });
        if (onClick) {
            const name = Object.keys(icon)[0];
            const prefix = this.getPrefix(icon[name].styles[0]);
            const { unicode } = icon[name];
            const selectedIcon = {
                name,
                prefix,
                unicode,
            };
            this.setState({
                icon: selectedIcon,
            });
            onClick(selectedIcon);
        }
    }

    render() {
        const { search, grid, style, iconStyle } = this.props;
        const newIconStyle = {
            ...iconStyle,
            width: `${100 / grid}%`,
        };
        return (
            <div style={style}>
                {
                    search ? (
                        <div className="rfl-header">
                            <input placeholder={`Search ${this.state.length} icons for...`} onChange={(e) => { this.search(e.target.value); }} />
                        </div>
                    ) : null
                }
                <div className="rfl-body">
                    {
                        this.state.icons.map((icon) => {
                            const name = Object.keys(icon)[0];
                            const metadata = icon[name];
                            const prefix = this.getPrefix(metadata.styles[0]);
                            return (
                                <div className={`rfl-icon ${this.props.selected && this.state.icon && this.state.icon.name === name ? 'selected' : ''}`} style={newIconStyle} onClick={this.click.bind(this, icon)} key={name}>
                                    <div className="rfl-icon-top">
                                        <Icon name={name} size={3} prefix={prefix} />
                                    </div>
                                    <div className="rfl-icon-bottom">
                                        {name}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Icons;
