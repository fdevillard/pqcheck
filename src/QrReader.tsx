import { BrowserCodeReader, BrowserQRCodeReader } from "@zxing/browser";
import React from "react";

const findDevice = (devices: Array<MediaDeviceInfo>): MediaDeviceInfo | undefined=> {
    const pred = (info: MediaDeviceInfo): boolean => {
        if(info.kind !== "videoinput") {
            return false
        }
        console.log(`device`, info)
        return true;
    }
    return devices.find(pred)
}

export const QrReader: React.FC<{}> = () => {
  const reader = React.useRef<BrowserQRCodeReader>(new BrowserQRCodeReader());
  const [deviceId, setDeviceId] = React.useState<string|null>(null)

  React.useEffect(() => {
      const work = async () => {
      const videoInputDevices =
        await BrowserCodeReader.listVideoInputDevices();
      const device= findDevice(videoInputDevices)
      if(device === undefined) {
          console.error("no device found", videoInputDevices)
          return
      }
      setDeviceId(device.deviceId)
    }
    work()
  })

  React.useEffect(() => {
      if(reader.current === undefined || deviceId === null) {
          return;
      }

      const previewElem = document.querySelector("#video-container > video");
      if(previewElem === null) {
          console.warn("couldn't locate video element")
          return
      }

      const promise = reader.current.decodeFromVideoDevice(deviceId, previewElem as HTMLVideoElement, (result, error) => {
          if(error) {
              console.warn(`couldn't record due to error: ${error}`)
              return
          }

          console.info(`recorded: ${result}`)
      })

      return () => {
          promise.then(control => control.stop())
      }
  }, [deviceId, reader])


  return (
    <div id="video-container">
      <video />
    </div>
  );
};
