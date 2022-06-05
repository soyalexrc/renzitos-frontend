// material
import {grey} from "@mui/material/colors";
import {Slider, styled, TextField} from "@mui/material";
import {Box, Typography} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";

// ----------------------------------------------------------------------

const BoxStyle = styled(Box)(() => ({
  padding: "14px 16px 8px 16px",
}));

const AccordionStyle = styled(Accordion)(() => ({
  borderBottom: "solid",
  borderWidth: 2,
  borderColor: grey[100],
  borderRadius: "0 !important",
  "&::before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
    boxShadow: "none",
  },
  "& .MuiAccordionSummary-content": {
    margin: "15px 0 11px 0 !important",
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "15px 0  11px 0 !important",
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded": {
    minHeight: "48px",
  },
  "& .MuiAccordionDetails-root": {
    padding: "0px 16px 16px",
  },
}));

// ----------------------------------------------------------------------

export default function FiltersDesktop() {
  const [range, setRange] = useState([0, 10000]);

  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "")


  const handleChange = (event, newValue) => {
    setRange(newValue);
  };


  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <Box sx={{display: {xs: "none", md: "block"}}}>
      <BoxStyle>
        <TextField
          id="search"
          label="Buscar…"
          variant="outlined"
          size="small"
          fullWidth
        />
      </BoxStyle>

      <AccordionStyle defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Clasifica por</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox/>}
              label={<Typography variant="body1">En venta (10)</Typography>}
            />
            <FormControlLabel
              control={<Checkbox/>}
              label={<Typography variant="body1">Nuevo (20)</Typography>}
            />
            <FormControlLabel
              control={<Checkbox/>}
              label={<Typography variant="body1">En Stock (20)</Typography>}
            />
          </FormGroup>
        </AccordionDetails>
      </AccordionStyle>

      <Box sx={{ p: 5 }}>
        <Typography variant='h6'>Filtrar por precio</Typography>
        <Slider
          getAriaLabel={() => 'price slider'}
          value={range}
          size='large'
          max={10000}
          min={0}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <small>{addCommas(removeNonNumeric(range[0]))} $</small>
          <small>{addCommas(removeNonNumeric(range[1]))} $</small>
        </Box>
      </Box>

      <AccordionStyle defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox/>}
              label={<Typography variant="body1">Verde (4)</Typography>}
            />
            <FormControlLabel
              control={<Checkbox/>}
              label={
                <Typography variant="body1">Crema (10)</Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox/>}
              label={<Typography variant="body1">Celeste (6)</Typography>}
            />
          </FormGroup>
        </AccordionDetails>
      </AccordionStyle>
    </Box>
  );
}
