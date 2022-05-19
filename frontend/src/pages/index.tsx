import React from "react"
import { getLocation, setLocation as apiSetLocation } from "../api/storage"
import {Location } from "../api/model"
import { QrReader } from "../components/QrReader"
import { StatusUpdater } from "../components/statusUpdater"
import { PositionSelector } from "../components/PositionSelector"
import Box from "@mui/material/Box/Box"
import Typography from "@mui/material/Typography/Typography"

type Props = {
    deviceIndex: number 
}

export const Index: React.FC<Props> = ({deviceIndex}) => {
    const [expectedPosition, setExpectedPosition] = React.useState<Location["position"]>(null)
    const [location, setLocation] = React.useState<Location|null>(null)
    
    const isValid: boolean | null = expectedPosition === null || location === null ? null : location.position === expectedPosition;

    const onScan = (id: string) => {
        const loc = getLocation(id)
        if(loc === null) {
            return;
        }

        const newLoc: Location = {...loc, position: loc.position === "out" ? "in" : "out"}
        apiSetLocation(newLoc)
        setLocation(newLoc)
    }

    const onExpectedPositionChange = (newExpected: Location["position"]) => setExpectedPosition(newExpected)

    const onPositionUpdate = (newPosition: Location["position"]) => {
        setLocation(prev => {
            if(prev === null) {
                console.error("couldn't update null location.")
                return prev
            }
            const newLocation: Location = {...prev, position: newPosition}
            apiSetLocation(newLocation)
            return newLocation
        })
    }

    const style = isValid === null ? {} : {backgroundColor: isValid ? "red" : "green"}
    console.log(`style`, style)

    return <Box style={style} sx={{textAlign: "center"}}>
        <Typography sx={{marginBottom: "1em", marginTop: "1em"}} variant="h4" color="primary">Which position do you expect?</Typography>
        <PositionSelector
            position={expectedPosition}
            onPositionUpdate={onExpectedPositionChange}
            nullLabel="No position to expect"
        />
        <QrReader onScan={onScan} deviceIndex={deviceIndex} />
        {location !== null ? <StatusUpdater position={location.position} onPositionUpdate={onPositionUpdate} /> : null}
    </Box>
}