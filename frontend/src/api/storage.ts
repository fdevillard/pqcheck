import {Location} from "./model"
import {sha256} from "js-sha256"
import { v4 as uuidv4} from "uuid"

const storage = window.localStorage

export const setLocation = (location: Location): void => {
    storage.setItem(location.qrCodeId, JSON.stringify(location))
}

export const newLocation = (info: string): Location => {
    const uuid = uuidv4()
    console.log(`uuid: ${uuid}`)
    const id = sha256(`${info}-${uuid}`)
    const location: Location = {
        qrCodeId: id,
        info: info,
        position: null
    }
    setLocation(location)
    return location
}

export const getLocation = (id: string): Location | null => {
    const elem = storage.getItem(id)
    if(elem === null) {
        return null
    }

    return JSON.parse(elem) as Location
}

