import React from "react";
import { useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import { Location } from "../api/model";
import { newLocation } from "../api/storage";

export const Generate: React.FC<{}> = () => {
  const [params] = useSearchParams();
  const clean = params.get("info");
  const [location, setLocation] = React.useState<Location | null>(null)
  const component = React.useRef<any>(null);

  React.useEffect(() => {
    if(clean !== "" && clean !== null) {
      setLocation(newLocation(clean))
    }
  }, [clean])

  if (location === null) {
    return <p>No info, no QR Code.</p>;
  }

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print QRCode</button>}
        content={() => component.current}
      />
      <div ref={component}>
        <QRCode size={120} value={location.qrCodeId} />
      </div>
    </div>
  );
};
