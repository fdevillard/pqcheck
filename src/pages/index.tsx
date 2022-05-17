import React from "react"
import { getLocation, setLocation as apiSetLocation } from "../api/storage"
import {Location} from "../api/model"
import { QrReader } from "../components/QrReader"

export const Index: React.FC<{}> = () => {
    const [location, setLocation] = React.useState<Location|null>(null)

    const callback = (id: string) => {
        const loc = getLocation(id)
        if(loc === null) {
            return;
        }

        const newLoc: Location = {...loc, position: loc.position === "out" ? "in" : "out"}
        apiSetLocation(newLoc)
        setLocation(newLoc)
    }

    return <div>
        <QrReader onScan={callback} />
        <p>Location:</p>
        <pre>
            {JSON.stringify(location)}
        </pre>
    </div>
}