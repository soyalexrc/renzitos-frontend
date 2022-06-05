// material
import { grey } from "@mui/material/colors";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from 'react';

export default function SortDesktop() {
  const [ orderBy, setOrderBy ] = useState('')
  return (
    <Box
      sx={{
        height: "76.88px",
        px: 3,
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "solid",
        borderWidth: 2,
        borderColor: grey[100],
      }}
    >
      <FormControl
        sx={{
          width: 200,
          "& fieldset": { border: "none" },
          "& .MuiInputLabel-root.Mui-focused": {
            display: "none",
          },
        }}
        size="small"
      >
        <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          placeholder="Ordenar por"
          value={orderBy}
          onChange={e => setOrderBy(e.target.value)}
        >
          <MenuItem value="price" disabled>
            Ordenar por
          </MenuItem>
          <MenuItem value="Mayor a menor">Mayor a menor</MenuItem>
          <MenuItem value="Menor a mayor">Menor a mayor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
