import { Box, CircularProgress } from '@mui/material'
import React from 'react'
export default function CustomLoader() {
    return (
        <div>
            <Box sx={{ height: "calc(123vh - 218px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        </div >
    )
}