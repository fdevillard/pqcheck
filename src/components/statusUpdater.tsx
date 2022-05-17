import { Typography } from "@mui/material";
import * as React from "react";
import { Location } from "../api/model";
import { PositionSelector, PositionSelectorProps } from "./PositionSelector";


type Props = PositionSelectorProps & {
    location: Location;
}

export const StatusUpdater: React.FC<Props> = ({location, onPositionUpdate}) => {
    const title = location.position === null ? "We don't know where the person is 😱" : `User found`
    return <div>
        <Typography variant="h5">{title}</Typography>
        <PositionSelector location={location} onPositionUpdate={onPositionUpdate}  />
    </div>
}