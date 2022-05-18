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

type Props = {
    onScan?: (stored: string) => any
}

export const QrReader: React.FC<Props> = ({onScan}) => {
  const reader = React.useRef<BrowserQRCodeReader>(new BrowserQRCodeReader());
  // keep a version always up to date 
  const _scan = React.useRef(onScan)
  _scan.current = onScan

  const [deviceId, setDeviceId] = React.useState<string|null>(null)

  React.useEffect(() => {
    const work = async () => {
      try {
      const videoInputDevices =
        await BrowserCodeReader.listVideoInputDevices();
      const device= findDevice(videoInputDevices)
      if(device === undefined) {
          console.error("no device found", videoInputDevices)
          return
      }
      setDeviceId(device.deviceId)
      } catch(exp) {
        // mainly catched for tests
        console.error("failed to list the devices", exp)
      }
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
              return
          }

          console.info("recorded", result)

          const text = result?.getText()
          if(text) {
            _scan.current?.(text)
          }
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
