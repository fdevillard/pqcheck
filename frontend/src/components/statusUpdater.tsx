import { Typography } from "@mui/material";
import * as React from "react";
import { PositionSelector, PositionSelectorProps } from "./PositionSelector";


type Props = PositionSelectorProps 

export const StatusUpdater: React.FC<Props> = ({position, ...positionProps}) => {
    const title = position === null ? "We don't know where the person is 😱" : `User found`
    return <div>
        <Typography variant="h5">{title}</Typography>
        <PositionSelector {...positionProps} position={position} />
    </div>
}