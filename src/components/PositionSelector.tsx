import ToggleButton from "@mui/material/ToggleButton/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup"
import * as React from "react"
import { Location } from "../api/model"

type Position = Location["position"]

export type PositionSelectorProps = {
    location: Location;
    onPositionUpdate?:  (_: Position) => any;
}

export const PositionSelector: React.FC<PositionSelectorProps> = ({location, onPositionUpdate}) => {
    const handle = (_: any, newPosition: string|null) => {
        if(newPosition === "null") {
            newPosition = null
        }
        if(newPosition === "in" || newPosition === "out" || newPosition === null) {
            const asPosition = newPosition as (Position | null)
            onPositionUpdate?.(asPosition)
        } 
    }
    return (
        <ToggleButtonGroup value={location.position || "null"} onChange={handle} exclusive color="primary">
            <ToggleButton value="in">In</ToggleButton>
            <ToggleButton value="out">Out</ToggleButton>
            <ToggleButton value="null">Unknown 😱</ToggleButton>
        </ToggleButtonGroup>
    )
}