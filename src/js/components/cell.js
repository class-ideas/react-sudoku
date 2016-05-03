import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { isEntryValid } from '../sudoku';

export default class Cell extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    frozen: PropTypes.bool.isRequired,
    highlighted: PropTypes.bool.isRequired,
    prevent: PropTypes.arrayOf(PropTypes.string).isRequired,
    active: PropTypes.bool.isRequired,
    onActivate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      inputText: isEntryValid(props.value) ? props.value : '',
      showNo: false
    }
  }

  clickHandler() {
    let { frozen, active, index, onActivate } = this.props;
    if (!frozen && !active) {
      onActivate(index);
    }
  }

  changeHandler(event) {
    let prevent = this.props.prevent;
    let value = event.target.value;
    if (value.length) {
      let inputText = value[value.length-1];
      if (!prevent.includes(inputText) && isEntryValid(inputText)) {
        this.setState({inputText});
      } else {
        this.flashNoSymbol();
      }
    } else {
      this.setState({inputText:''});
    }
  }

  updateValue() {
    let { onUpdate, index } = this.props;
    let value = this.state.inputText;
    onUpdate(index, value);
  }

  keyPressHandler(event) {
    if (event.charCode === 13) {
      // pressed return
      this.updateValue();
    }
  }

  getContents() {
    let { active, value } = this.props;
    if (active) {
      return (
        <input
          className="text-field"
          ref={r => this.input = r}
          type="text"
          autoFocus="true"
          value={this.state.inputText}
          onFocus={e => e.target.select()}
          onKeyPress={::this.keyPressHandler}
          onChange={::this.changeHandler}
          onBlur={::this.updateValue}
        />
      )
    } else {
      return (
        <span>{value}</span>
      )
    }
  }

  flashNoSymbol() {
    this.setState({showNo:true});
    setTimeout(() => this.setState({showNo:false}), 0);
  }

  render() {
    let { frozen, highlighted } = this.props;

    let className = classnames('cell', { frozen, highlighted });
    return (
      <div onClick={::this.clickHandler} className={className}>
        {this.getContents()}
        <span className={this.state.showNo ? 'show no' : 'no'}> ⃠</span>
      </div>
    )
  }
}
