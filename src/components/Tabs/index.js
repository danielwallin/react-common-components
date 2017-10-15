import React, { Component } from "react";
import "./tabs.scss";
import classnames from "classnames";
import PropTypes from "prop-types";

/**
 *  <Tabs selected="0">
        <Tab label="Tab 1">
            <p>This is my tab 1 contents!</p>
        </Tab>
        <Tab label="Tab 2">
            <p>This is my tab 2 contents!</p>
        </Tab>
        <Tab label="Disabled tab" disabled>
            <p>This is my tab 3 contents!</p>
        </Tab>
    </Tabs>
 */
export default class Tabs extends Component {
  static propTypes = {
    selected: PropTypes.string,
    indicatorclass: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
      .isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected ? props.selected : "0",
      indicatorpos: 0,
      styles: {
        right: 0,
        left: 0
      }
    };
  }

  componentDidMount() {
    let ref = `tab${this.state.selected}`;
    this.setStyles(this.refs[ref]);
  }

  setStyles(ref) {
    this.setState({
      styles: {
        left: `${ref.offsetLeft}px`,
        right:
          this.refs.tabWrapper.offsetWidth -
          ref.offsetWidth -
          ref.offsetLeft +
          "px"
      }
    });

  }

  renderTitles() {
    const self = this;

    let pos = {
      left: this.state.indicatorpos
    };

    let indicatorcls = classnames("indicator", this.props.indicatorclass);

    function labels(child, index) {
      const { disabled, label, className } = child.props;

      let linkClass = classnames(
        className,
        self.state.selected === index ? "active" : ""
      );
      let tabref = `tab${index}`;
      let cls = classnames("tab", className, disabled ? "tabs-disabled" : "");

      return (
        <li ref={tabref} className={cls} key={index}>
          <a
            className={linkClass}
            onClick={self.handleClick.bind(self, index)}
            href="#"
          >
            {label}
          </a>
        </li>
      );
    }
    return (
      <div ref="tabWrapper" className="tabs-wrapper relative">
        <ul className="tabs__labels">
          {Object.keys(this.props.children).map(index => {
            return labels(this.props.children[index], index);
          })}
        </ul>
        <div className={indicatorcls} style={this.state.styles} />
      </div>
    );
  }

  renderContent() {
    return (
      <div className="tabs-content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  handleClick(index, e) {
    e.preventDefault();
    this.setState(
      {
        selected: index
      },
      function() {
        let ref = "tab" + this.state.selected;
        this.setStyles(this.refs[ref]);
      }
    );
  }

  render() {
    console.log(this.props.children);
    return (
      <div className="tabs">
        {this.renderTitles()}
        {this.renderContent()}
      </div>
    );
  }
}