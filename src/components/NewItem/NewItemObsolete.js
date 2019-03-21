import React from "react";
import classNames from "classnames";

import "./new-item.scss";

class NewItem extends React.Component {
  state = {
    text: ""
  };
  render() {
    const { text } = this.state;
    const { placeholderText, onAddItem, onCancel, isClose } = this.props;
    return (
      <div
        className={classNames("new-item__container", {
          "new-item__container--close": isClose
        })}
      >
        <input
          className="new-item__input"
          type="text"
          placeholder={placeholderText}
          onChange={event => {
            this.setState({ text: event.target.value });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              onAddItem(event.target.value);
              this.setState({ text: "" });
            }
          }}
          value={text}
        />
        <div className="new-item__buttons__container">
          {onCancel && (
            <button
              className="new-item__button"
              onClick={() => {
                onCancel();
                this.setState({ text: "" });
              }}
            >
              Cancelar
            </button>
          )}
          <button
            className="new-item__button"
            onClick={() => {
              onAddItem(text);
              this.setState({ text: "" });
            }}
          >
            Incluir
          </button>
        </div>
      </div>
    );
  }
}

export default NewItem;
