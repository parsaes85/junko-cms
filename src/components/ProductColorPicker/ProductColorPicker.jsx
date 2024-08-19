import React, { useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import DeleteIcon from "@mui/icons-material/Delete";

import "react-color-palette/css";

function ProductColorPicker({ colorList, setColorList }) {
  const [color, setColor] = useColor("#000");

  const addColorToColorList = (event) => {
    event.preventDefault()
    setColorList([...colorList, color.hex]);
  };

  const removeColorFromColorList = (colorValue) => {
    let colorListArr = colorList;
    let filteredColorListArr = colorListArr.filter(
      (color) => color !== colorValue
    );
    setColorList(filteredColorListArr);
  };

  return (
    <div className="mt-2">
      <ColorPicker
        hideInput={["rgb", "hsv"]}
        height={200}
        color={color}
        onChange={setColor}
      />
      <div className="flex justify-between items-start mt-2">
        <button
          className="border border-gray-700 text-gray-800 px-2 py-0.5 rounded whitespace-nowrap"
          onClick={addColorToColorList}
        >
          اضافه کردن
        </button>
        <div className="flex flex-wrap justify-end gap-2">
          {colorList?.map((color) => (
            <div
              key={color}
              className="flex flex-col items-center gap-1 relative group cursor-pointer"
              onClick={() => removeColorFromColorList(color)}
            >
              <div
                className={`w-12 h-9`}
                style={{ backgroundColor: color }}
              ></div>
              <p className="text-xs">{color}</p>
              <span className="absolute top-5 bg-red-500 w-full text-black text-center text-xs group-hover:bg-black group-hover:text-red-500">
                <DeleteIcon fontSize="" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductColorPicker;
