import React from "react";

export default function InputBox({ inputTitle, inputId, inputDefaultValue }) {
  return (
    <>
      <div className="form-group">
        <span>{inputTitle}</span>
        <input
          className="form-field"
          type="text"
          id={inputId}
          defaultValue={inputDefaultValue}
        />
      </div>
    </>
  );
}
