import React from "react";
import { useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";

export const Generate: React.FC<{}> = () => {
  const [params] = useSearchParams();
  const clean = params.get("info");
  const component = React.useRef<any>(null);

  if (clean === null) {
    return <p>No info, no QR Code.</p>;
  }

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print QRCode</button>}
        content={() => component.current}
      />
      <div ref={component} style={{ width: "1cm" }}>
        <QRCode size={64} value={clean} />
      </div>
    </div>
  );
};
