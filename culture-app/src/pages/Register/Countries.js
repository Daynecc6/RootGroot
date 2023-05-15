import React from "react";
import {
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
        error={!!errors.birth_country}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
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

      <FormControl
        fullWidth
        error={!!errors.languages_spoke}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
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
        error={!!errors.countries_worked}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <InputLabel id="countries-worked-label">
          Countries you have worked in
        </InputLabel>
        <Select
          labelId="countries-worked-label"
          label="Countries you have worked in"
          name="countries_worked"
          value={formData.countries_worked}
          onChange={handleInputChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Change this value to adjust the dropdown height
              },
            },
          }}
          multiple // Allows multiple selections
        >
          <MenuItem value="N/A">N/A</MenuItem>
          {countryList
            .sort((a, b) => {
              const aSelected = formData.countries_worked.includes(a.name);
              const bSelected = formData.countries_worked.includes(b.name);

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
        {errors.countries_worked && (
          <FormHelperText>{errors.countries_worked}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.countries_lived}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <InputLabel id="countries-lived-label">Countries lived in</InputLabel>
        <Select
          labelId="countries-lived-label"
          label="Countries lived in"
          name="countries_lived"
          value={formData.countries_lived}
          onChange={handleInputChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Change this value to adjust the dropdown height
              },
            },
          }}
          multiple // Allows multiple selections
        >
          {countryList
            .sort((a, b) => {
              const aSelected = formData.countries_lived.includes(a.name);
              const bSelected = formData.countries_lived.includes(b.name);

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
        {errors.countries_lived && (
          <FormHelperText>{errors.countries_lived}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.countries_studied}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <InputLabel id="countries-studied-label">
          Countries you have studied in
        </InputLabel>
        <Select
          labelId="countries-studied-label"
          label="Countries you have studied in"
          name="countries_studied"
          value={formData.countries_studied}
          onChange={handleInputChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Change this value to adjust the dropdown height
              },
            },
          }}
          multiple // Allows multiple selections
        >
          {countryList
            .sort((a, b) => {
              const aSelected = formData.countries_studied.includes(a.name);
              const bSelected = formData.countries_studied.includes(b.name);

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
        {errors.countries_studied && (
          <FormHelperText>{errors.countries_studied}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.countries_volunteered}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <InputLabel id="countries-volunteered-label">
          Countries you have volunteered in
        </InputLabel>
        <Select
          labelId="countries-volunteered-label"
          label="Countries you have volunteered in"
          name="countries_volunteered"
          value={formData.countries_volunteered}
          onChange={handleInputChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Change this value to adjust the dropdown height
              },
            },
          }}
          multiple // Allows multiple selections
        >
          <MenuItem value="N/A">N/A</MenuItem>
          {countryList
            .sort((a, b) => {
              const aSelected = formData.countries_volunteered.includes(a.name);
              const bSelected = formData.countries_volunteered.includes(b.name);

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
        {errors.countries_volunteered && (
          <FormHelperText>{errors.countries_volunteered}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.countries_traveled}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <InputLabel id="countries-traveled-label">
          Countries you have traveled to
        </InputLabel>
        <Select
          labelId="countries-traveled-label"
          label="Countries you have traveled to"
          name="countries_traveled"
          value={formData.countries_traveled}
          onChange={handleInputChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Change this value to adjust the dropdown height
              },
            },
          }}
          multiple // Allows multiple selections
        >
          <MenuItem value="N/A">N/A</MenuItem>
          {countryList
            .sort((a, b) => {
              const aSelected = formData.countries_traveled.includes(a.name);
              const bSelected = formData.countries_traveled.includes(b.name);

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
        {errors.countries_traveled && (
          <FormHelperText>{errors.countries_traveled}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.countries_bucket}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <InputLabel id="countries-bucket-label">
          Countries on your bucket list
        </InputLabel>
        <Select
          labelId="countries-bucket-label"
          label="Countries on your bucket list"
          name="countries_bucket"
          value={formData.countries_bucket}
          onChange={handleInputChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Change this value to adjust the dropdown height
              },
            },
          }}
          multiple // Allows multiple selections
        >
          <MenuItem value="N/A">N/A</MenuItem>
          {countryList
            .sort((a, b) => {
              const aSelected = formData.countries_bucket.includes(a.name);
              const bSelected = formData.countries_bucket.includes(b.name);

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
          marginBottom: "64px",
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
