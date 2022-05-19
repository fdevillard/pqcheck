import { BrowserCodeReader} from "@zxing/browser";

export const findDevices: () => Promise<MediaDeviceInfo[]> = async () => {
    try {
        return await BrowserCodeReader.listVideoInputDevices();
    } catch (exp) {
        console.warn("failed to list the video devices", exp)
        return []
    }
}