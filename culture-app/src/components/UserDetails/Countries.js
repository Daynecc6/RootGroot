import React from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ISO6391 from "iso-639-1";
import countries from "i18n-iso-countries";
import english from "i18n-iso-countries/langs/en.json";

countries.registerLocale(english);

const Countries = ({ handleBack, handleInputChange, formData, errors }) => {
  const countryList = Object.values(countries.getNames("en")).map((name) => ({
    name,
  }));
  return (
    <>
      <FormControl
        fullWidth
        error={!!errors.languages_spoke}
        variant="outlined"
        margin="normal"
      >
        <InputLabel id="languages-spoke-label">Languages Spoke</InputLabel>
        <Select
          labelId="languages-spoke-label"
          label="Languages Spoke"
          name="languages_spoke"
          value={formData.languages_spoke}
          onChange={handleInputChange}
          multiple
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Change this value to adjust the dropdown height
              },
            },
          }}
        >
          {ISO6391.getLanguages(ISO6391.getAllCodes())
            .sort((a, b) => {
              const aSelected = formData.languages_spoke.includes(a.name);
              const bSelected = formData.languages_spoke.includes(b.name);

              if (aSelected && !bSelected) return -1;
              if (!aSelected && bSelected) return 1;

              return a.name.localeCompare(b.name);
            })
            .map((language) => (
              <MenuItem key={language.code} value={language.name}>
                {language.name}
              </MenuItem>
            ))}
        </Select>
        {errors.languages_spoke && (
          <FormHelperText>{errors.languages_spoke}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.birth_country}
        variant="outlined"
        margin="normal"
      >
        <InputLabel id="birth-country-label">Birth Country</InputLabel>
        <Select
          labelId="birth-country-label"
          label="Birth Country"
          name="birth_country"
          value={formData.birth_country}
          onChange={handleInputChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Change this value to adjust the dropdown height
              },
            },
          }}
        >
          {countryList
            .sort((a, b) => {
              const aSelected = formData.birth_country === a.name;
              const bSelected = formData.birth_country === b.name;

              if (aSelected && !bSelected) return -1;
              if (!aSelected && bSelected) return 1;

              return a.name.localeCompare(b.name);
            })
            .map((country) => (
              <MenuItem key={country.name} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
        </Select>
        {errors.birth_country && (
          <FormHelperText>{errors.birth_country}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.countries_worked}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Countries you have worked in."
          name="countries_worked"
          value={formData.countries_worked}
          onChange={handleInputChange}
        />
        {errors.countries_worked && (
          <FormHelperText>{errors.countries_worked}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.countries_lived}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Countries lived in."
          name="countries_lived"
          value={formData.countries_lived}
          onChange={handleInputChange}
        />
        {errors.countries_lived && (
          <FormHelperText>{errors.countries_lived}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.countries_studied}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Countries you have studied in."
          name="countries_studied"
          value={formData.countries_studied}
          onChange={handleInputChange}
        />
        {errors.countries_studied && (
          <FormHelperText>{errors.countries_studied}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.countries_volunteered}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Countries you have volunteered in."
          name="countries_volunteered"
          value={formData.countries_volunteered}
          onChange={handleInputChange}
        />
        {errors.countries_volunteered && (
          <FormHelperText>{errors.countries_volunteered}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.countries_traveled}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Countries you have traveled to."
          name="countries_traveled"
          value={formData.countries_traveled}
          onChange={handleInputChange}
        />
        {errors.countries_traveled && (
          <FormHelperText>{errors.countries_traveled}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.countries_bucket}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Countries on your bucket list."
          name="countries_bucket"
          value={formData.countries_bucket}
          onChange={handleInputChange}
        />
        {errors.countries_bucket && (
          <FormHelperText>{errors.countries_bucket}</FormHelperText>
        )}
      </FormControl>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleBack}
          variant="contained"
          sx={{ width: "120px", height: "40px" }}
        >
          Back
        </Button>

        <Box sx={{ width: "16px" }} />

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "120px", height: "40px" }}
        >
          Done
        </Button>
      </Box>
    </>
  );
};

export default Countries;
