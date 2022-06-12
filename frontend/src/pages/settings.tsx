import { Container, FormControl, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import * as React from "react";
import { findDevices } from "../tools/qrscanner";

type Props = {
    deviceIndex?:number 
    onSelectDeviceIndex?: (_: number)=> any
}

export const Settings: React.FC<Props> = ({deviceIndex, onSelectDeviceIndex}) => {
  const [allDevices, setAllDevices] = React.useState<Array<MediaDeviceInfo>>(
    []
  );
  React.useEffect(() => {
    const work = async () => {
      const all = await findDevices();
      console.log("all devices", all)
      setAllDevices(all);
    };
    work();
  }, []);

  return (
    <FormControl fullWidth>
      <Stack>
        <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{padding: "1em"}}
        >
          <Select
            labelId="form-camera-pick"
            id="form-camera-pick-select"
            label={<Typography>Camera</Typography>}
            autoWidth
            // ensure the component is _controlled_ by avoiding `undefined` value
            value={deviceIndex}
            onChange={(event) => {
                console.log("received event for device pick", event)
                onSelectDeviceIndex?.(Number(event.target.value))
            }}
            sx={{minWidth: "10em"}}
            fullWidth
            disabled={allDevices.length === 0}
          >
            {allDevices.map((device, i) => (
              <MenuItem key={String(i)} value={Number(i)}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </Paper>
        </Container>
      </Stack>
    </FormControl>
  );
};
