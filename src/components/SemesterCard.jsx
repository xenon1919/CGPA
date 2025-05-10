import React from 'react';
import { TextField, Grid, Box, IconButton, Typography, Tooltip } from "@mui/material";
import { Grade, CreditCard, Delete } from "@mui/icons-material";

const SemesterCard = ({
  semester,
  handleInputChange,
  removeSemester,
  semesterCount,
  isCSE,
  defaultCredits,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        width: "80%",
        marginBottom: "16px",
      }}
    >
      <Box style={{ width: "100%" }}>
        <Typography
          variant="body2"
          style={{
            color: "#1a237e",
            fontWeight: 600,
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Semester {semester.id}
        </Typography>
        <Grid
          container
          spacing={2}
          style={{
            background: "#f9fafb",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            alignItems: "center",
          }}
        >
          <Grid item xs={5}>
            <TextField
              label={`SGPA for Semester ${semester.id}`}
              variant="outlined"
              fullWidth
              type="number"
              name="sgpa"
              value={semester.sgpa}
              onChange={(e) => handleInputChange(e, semester.id)}
              InputProps={{
                startAdornment: (
                  <Grade
                    style={{ color: "#455a64", marginRight: "8px", fontSize: "20px" }}
                  />
                ),
                style: {
                  borderRadius: "8px",
                  background: "#ffffff",
                  fontSize: "16px",
                  padding: "10px",
                  height: "56px",
                },
                inputProps: { min: 0, max: 10, step: "0.01" },
              }}
              InputLabelProps={{
                style: {
                  color: "#455a64",
                  fontWeight: 500,
                  fontSize: "14px",
                },
              }}
              style={{
                transition: "all 0.2s",
              }}
              sx={{
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              required
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label={`Credits for Semester ${semester.id}`}
              variant="outlined"
              fullWidth
              type="number"
              name="credits"
              value={semester.credits}
              onChange={(e) => handleInputChange(e, semester.id)}
              disabled={isCSE && defaultCredits[semester.id] !== undefined}
              InputProps={{
                startAdornment: (
                  <CreditCard
                    style={{ color: "#455a64", marginRight: "8px", fontSize: "20px" }}
                  />
                ),
                style: {
                  borderRadius: "8px",
                  background: "#ffffff",
                  fontSize: "16px",
                  padding: "10px",
                  height: "56px",
                },
                inputProps: { min: 0, step: "0.1" },
              }}
              InputLabelProps={{
                style: {
                  color: "#455a64",
                  fontWeight: 500,
                  fontSize: "14px",
                },
              }}
              style={{
                transition: "all 0.2s",
              }}
              sx={{
                "&:hover": {
                  transform: isCSE && defaultCredits[semester.id] !== undefined ? "none" : "scale(1.02)",
                },
              }}
              required
            />
          </Grid>
          <Grid item xs={2} style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title={semesterCount === 1 ? "Cannot delete the only semester" : "Remove this semester"}>
              <span>
                <IconButton
                  onClick={() => removeSemester(semester.id)}
                  disabled={semester.id !== semesterCount || semesterCount === 1}
                  style={{
                    color: "#d32f2f",
                    background: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    transition: "all 0.2s",
                  }}
                  sx={{
                    "&:hover": {
                      background: "#ffebee",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Delete style={{ fontSize: "24px" }} />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SemesterCard;
