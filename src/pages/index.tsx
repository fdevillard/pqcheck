import React from "react"
import { getLocation, setLocation as apiSetLocation } from "../api/storage"
import {Location } from "../api/model"
import { QrReader } from "../components/QrReader"
import { StatusUpdater } from "../components/statusUpdater"

export const Index: React.FC<{}> = () => {
    const [location, setLocation] = React.useState<Location|null>(null)

    const onScan = (id: string) => {
        const loc = getLocation(id)
        if(loc === null) {
            return;
        }

        const newLoc: Location = {...loc, position: loc.position === "out" ? "in" : "out"}
        apiSetLocation(newLoc)
        setLocation(newLoc)
    }

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

    return <div>
        <QrReader onScan={onScan} />
        {location !== null ? <StatusUpdater location={location} onPositionUpdate={onPositionUpdate} /> : null}
    </div>
}