import React from "react";
import classNames from "classnames";

import "./new-item.scss";
import AddButton from "../Button/AddButton";
import Button from "../Button/Button";

class NewItem extends React.Component {
  state = {
    text: "",
    isAdding: false
  };
  handleOpenAddInput = () => {
    this.setState({ isAdding: true });
  };
  handleCloseAddInput = () => {
    this.setState({ isAdding: false });
  };
  render() {
    const { text, isAdding } = this.state;
    const { placeholderText, onAddItem } = this.props;
    return (
      <div>
        <AddButton onClick={this.handleOpenAddInput} isClose={isAdding} />
        <div
          className={classNames("new-item__container", {
            "new-item__container--close": !isAdding
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
            <Button
              onClick={() => {
                this.handleCloseAddInput();
                this.setState({ text: "" });
              }}
              style={{ margin: "10px 0 10px 10px" }}
              buttonType="button--stroke"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onAddItem(text);
                this.setState({ text: "" });
              }}
              style={{ margin: "10px 0 10px 10px" }}
              buttonType="button--stroke"
            >
              Incluir
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewItem;
