import ToggleButton from "@mui/material/ToggleButton/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup"
import * as React from "react"
import { Location } from "../api/model"

type Position = Location["position"]

export type PositionSelectorProps = {
    position: Position;
    onPositionUpdate?:  (_: Position) => any;
    nullLabel?: string
}

export const PositionSelector: React.FC<PositionSelectorProps> = ({position, onPositionUpdate, nullLabel = "Unknown 😱"}) => {
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
        <ToggleButtonGroup value={position || "null"} onChange={handle} exclusive color="primary">
            <ToggleButton value="in">In</ToggleButton>
            <ToggleButton value="out">Out</ToggleButton>
            <ToggleButton value="null">{nullLabel}</ToggleButton>
        </ToggleButtonGroup>
    )
}