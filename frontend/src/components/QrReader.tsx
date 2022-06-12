import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import React from "react";
import { findDevices } from "../tools/qrscanner";

type Props = {
  onScan?: (stored: string) => any;
  deviceIndex: number;
};

export const QrReader: React.FC<Props> = ({ onScan, deviceIndex }) => {
  const [selectedDeviceId, setSelectedDeviceId] = React.useState<
    string | undefined
  >(undefined);
  const reader = React.useRef<BrowserQRCodeReader>(new BrowserQRCodeReader());
  // keep a version always up to date
  const _scan = React.useRef(onScan);
  _scan.current = onScan;

  React.useEffect(() => {
    // ensure no concurrent changes when the component has been unmount
    let isRunning = true;
    const work = async () => {
      // find the first device if no selected one
      const devices = await findDevices();
      console.log("found devices", devices, deviceIndex);
      const idx = deviceIndex > 0 ? deviceIndex : 0;
      if (deviceIndex < devices.length) {
        isRunning && setSelectedDeviceId(devices[idx].deviceId);
      }
    };
    work();
    return () => {
      isRunning = false;
    };
  }, [deviceIndex]);

  React.useEffect(() => {
    let isRunning = true;
    let promise: Promise<IScannerControls> | undefined = undefined;
    const work = () => {
      if (reader.current === undefined || selectedDeviceId === undefined) {
        return;
      }

      const previewElem = document.querySelector("#video-container > video");
      if (previewElem === null) {
        console.warn("couldn't locate video element");
        return;
      }

      try {
        promise = reader.current.decodeFromVideoDevice(
          selectedDeviceId,
          previewElem as HTMLVideoElement,
          (result, error) => {
            if (error) {
              return;
            }

            console.info("recorded", result);

            const text = result?.getText();
            if (text) {
              isRunning && _scan.current?.(text);
            }
          }
        );
      } catch (exp) {
        console.warn("fail to acquire video device", exp);
      }
    };
    work();

    return () => {
      isRunning = false;
      promise?.then(
        (control) => control.stop(),
        (exp) => console.warn("failed to run promise", exp)
      );
    };
  }, [reader, selectedDeviceId]);

  return (
    <div id="video-container">
      <video />
    </div>
  );
};
