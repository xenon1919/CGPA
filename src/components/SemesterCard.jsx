import React from 'react';
import { TextField, Grid, Box, IconButton, Typography, Tooltip } from "@mui/material";
import { Grade, CreditCard, Delete } from "@mui/icons-material";

const SemesterCard = ({ semester, handleInputChange, removeSemester, semesterCount, isCSE, defaultCredits }) => {
  return (
    <Box style={{ display: "flex", justifyContent: "center", margin: "auto", width: "80%", marginBottom: "16px" }}>
      <Box style={{ width: "100%" }}>
        <Typography variant="body2" style={{ color: "#1a237e", fontWeight: 600, marginBottom: "8px", textAlign: "center" }}>
          Semester {semester.id}
        </Typography>
        <Grid container spacing={2} style={{ background: "#f9fafb", padding: "16px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", alignItems: "center" }}>
          <Grid item xs={isCSE && defaultCredits[semester.id] ? 10 : 5}>
            <TextField
              label={`SGPA for Semester ${semester.id}`}
              variant="outlined"
              fullWidth
              type="number"
              name="sgpa"
              value={semester.sgpa}
              onChange={(e) => handleInputChange(e, semester.id)}
              InputProps={{
                startAdornment: <Grade style={{ color: "#455a64", marginRight: "8px", fontSize: "18px" }} />,
              }}
              required
            />
          </Grid>
          <Grid item xs={isCSE && defaultCredits[semester.id] ? 10 : 5}>
            <TextField
              label={`Credits for Semester ${semester.id}`}
              variant="outlined"
              fullWidth
              type="number"
              name="credits"
              value={semester.credits || (isCSE ? defaultCredits[semester.id] : "")}
              onChange={(e) => handleInputChange(e, semester.id)}
              InputProps={{
                startAdornment: <CreditCard style={{ color: "#455a64", marginRight: "8px", fontSize: "18px" }} />,
              }}
              required
            />
          </Grid>
          <Grid item xs={2} container justifyContent="center" alignItems="center">
            <Tooltip title="Remove this semester">
              <IconButton onClick={() => removeSemester(semester.id)} style={{ backgroundColor: "#d32f2f", color: "#ffffff", borderRadius: "50%" }}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SemesterCard;
