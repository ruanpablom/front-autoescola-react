import React from "react";

const List = ({ ItemComponent, items, props }) => (
  <div style={{ flex: "100%" }}>
    {items.map(item => (
      <ItemComponent key={item.id} item={item} {...props} />
    ))}
  </div>
);

export default List;
