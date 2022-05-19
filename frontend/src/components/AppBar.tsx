import { AppBar as MuiAppBar, Button, Toolbar } from '@mui/material';
import * as React from "react";
import { Link } from "react-router-dom";

export const AppBar: React.FC<{}> = () => {
    return (
      <MuiAppBar position="static">
          <Toolbar disableGutters sx={{paddingRight: "1em", paddingLeft: "1em", justifyContent: "end"}}>
            <Link to="/">
                <Button variant="text">Scan</Button>
            </Link>
            <Link to="/generate">
                <Button variant="text">Create</Button>
            </Link>
            <Link to="/settings">
                <Button variant="text">Settings</Button>
            </Link>
        </Toolbar>
    </MuiAppBar>
)
}

