import React from 'react';
import { Box, Typography } from "@mui/material"
import UserContext from "../../App"
const Welcome = () => {
    const { UserCon} = useContext(UserContext);
    return (
        <Box>
            <Typography>
                Welcome {UserCon && UserCon}
            </Typography>
        </Box>
    );
}

export default Welcome;
