import { ChromePicker , CirclePicker} from "react-color"
import {colors} from "@/features/editor/types";
import {rgbObjectToString} from "@/features/editor/utils";


interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
}

export const ColorPicker = ({
        value, onChange
    }: ColorPickerProps) => {
    return (
        <div className={"w-full space-y-5"}>
            <ChromePicker
                color={value}
                className="border rounded-lg"
                onChange={(color) => {
                    const formattedValue = rgbObjectToString(color.rgb)
                    onChange(formattedValue)
                }}

            />

            <CirclePicker
                color={value}
                colors={colors}
                onChange={(color) => {
                    const formattedValue = rgbObjectToString(color.rgb)
                    onChange(formattedValue)
                }}
            />

        </div>
    )
}