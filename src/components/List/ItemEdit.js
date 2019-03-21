import React from "react";

import "./list-item.scss";
import IconButton from "../Button/IconButton";

class ItemEdit extends React.Component {
  state = {
    isEditing: false
  };
  handleEdit = () => {
    this.setState({ isEditing: true });
  };
  handleCancel = () => {
    this.setState({ isEditing: false });
  };
  handleSave = id => {
    this.setState({ isEditing: false });
    this.props.onEdit(id, this.input.value);
  };
  render() {
    const { isEditing } = this.state;
    const { item, onEdit, onDelete, extraTexts, children } = this.props;
    return (
      <div className="list-item__container">
        {!isEditing ? (
          <React.Fragment>
            <div className="list-item__text__container">
              <span className="list-item__text">{item.text}</span>
              {extraTexts &&
                extraTexts.map((extraText, index) => (
                  <span key={index} className="list-item__text">
                    {extraText}
                  </span>
                ))}
            </div>
            {onEdit && <IconButton onClick={this.handleEdit} icon="edit" />}
            {onDelete && (
              <IconButton
                onClick={() => {
                  onDelete(item.id);
                }}
                icon="delete"
              />
            )}
            {children}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              type="text"
              className="list-item__input"
              defaultValue={item.text}
              ref={c => {
                this.input = c;
              }}
            />
            <IconButton onClick={() => this.handleSave(item.id)} icon="save" />
            <IconButton onClick={this.handleCancel} icon="close" />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ItemEdit;
