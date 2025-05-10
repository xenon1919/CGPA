import React, { useState } from "react";
import { Container, Button, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Box, Tooltip } from "@mui/material";
import { AddCircle, Calculate, School } from "@mui/icons-material";
import Swal from 'sweetalert2';
import SemesterCard from "../components/SemesterCard";

const defaultCredits = {
  1: 16.5,
  2: 20.5,
  3: 22,
  4: 24,
  5: 21,
  6: 22,
  7: 20,
  8: 14,
};

export default function Home() {
  const [semesters, setSemesters] = useState([]);
  const [cgpa, setCgpa] = useState(0);
  const [isCSE, setIsCSE] = useState(null);
  const [openDialog, setOpenDialog] = useState(true);

  const handleCSEChoice = (choice) => {
    setIsCSE(choice);
    setOpenDialog(false);
    setSemesters([
      { id: 1, sgpa: "", credits: choice ? defaultCredits[1] : "" },
    ]);
  };

  const isSemesterValid = (sem) => {
    const sgpa = parseFloat(sem.sgpa);
    const credits = parseFloat(sem.credits);
    return (
      !isNaN(sgpa) && sgpa >= 0 && sgpa <= 10 &&
      !isNaN(credits) && credits > 0
    );
  };

  const addSemester = () => {
    const allFilled = semesters.every(isSemesterValid);
    if (!allFilled) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Fields",
        text: "Please enter valid SGPA (0–10) and credits (>0) for all semesters before adding a new one.",
        confirmButtonColor: "#3f51b5",
        showClass: { popup: "animate__animated animate__fadeIn" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
      });
      return;
    }
    const newId = semesters.length + 1;
    if (newId > 8) {
      Swal.fire({
        icon: "error",
        title: "Semester Limit",
        text: "Cannot add more than 8 semesters.",
        confirmButtonColor: "#3f51b5",
        showClass: { popup: "animate__animated animate__fadeIn" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
      });
      return;
    }
    setSemesters([
      ...semesters,
      {
        id: newId,
        sgpa: "",
        credits: isCSE && defaultCredits[newId] ? defaultCredits[newId] : "",
      },
    ]);
  };

  const removeSemester = (id) => {
    if (semesters.length <= 1) {
      Swal.fire({
        icon: "error",
        title: "Cannot Delete",
        text: "Cannot delete the last semester. At least one semester is required.",
        confirmButtonColor: "#3f51b5",
        showClass: { popup: "animate__animated animate__fadeIn" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
      });
      return;
    }
    if (id !== semesters[semesters.length - 1].id) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Deletion",
        text: "You can only delete the last semester.",
        confirmButtonColor: "#3f51b5",
        showClass: { popup: "animate__animated animate__fadeIn" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
      });
      return;
    }
    setSemesters(semesters.filter((sem) => sem.id !== id));
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === "sgpa") {
      sanitizedValue = value.replace(/[^0-9.]/g, "");
      const numValue = parseFloat(sanitizedValue);
      if (sanitizedValue && (isNaN(numValue) || numValue < 0 || numValue > 10)) {
        Swal.fire({
          icon: "error",
          title: "Invalid SGPA",
          text: "SGPA must be between 0 and 10.",
          confirmButtonColor: "#3f51b5",
          showClass: { popup: "animate__animated animate__fadeIn" },
          hideClass: { popup: "animate__animated animate__fadeOut" },
        });
        return;
      }
    } else if (name === "credits") {
      sanitizedValue = value.replace(/[^0-9.]/g, "");
      const numValue = parseFloat(sanitizedValue);
      if (sanitizedValue && (isNaN(numValue) || numValue <= 0)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Credits",
          text: "Credits must be greater than 0.",
          confirmButtonColor: "#3f51b5",
          showClass: { popup: "animate__animated animate__fadeIn" },
          hideClass: { popup: "animate__animated animate__fadeOut" },
        });
        return;
      }
    }

    const updatedSemesters = semesters.map((sem) =>
      sem.id === id ? { ...sem, [name]: sanitizedValue } : sem
    );
    setSemesters(updatedSemesters);
  };

  const calculateCGPA = () => {
    const allFilled = semesters.every(isSemesterValid);
    if (!allFilled) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Data",
        text: "Please ensure all semesters have valid SGPA (0–10) and credits (>0).",
        confirmButtonColor: "#3f51b5",
        showClass: { popup: "animate__animated animate__fadeIn" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
      });
      return;
    }
    const totalGradePoints = semesters.reduce(
      (sum, sem) => sum + (parseFloat(sem.sgpa) * parseFloat(sem.credits)),
      0
    );
    const totalCredits = semesters.reduce(
      (sum, sem) => sum + parseFloat(sem.credits),
      0
    );
    const calculatedCGPA =
      totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    setCgpa(calculatedCGPA);
    Swal.fire({
      icon: "success",
      title: "CGPA Calculated!",
      text: `Your CGPA is ${calculatedCGPA}.`,
      confirmButtonColor: "#3f51b5",
      showClass: { popup: "animate__animated animate__fadeIn" },
      hideClass: { popup: "animate__animated animate__fadeOut" },
    });
  };

  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "40px", fontFamily: "Roboto, sans-serif" }}
    >
      <Box
        style={{
          background: "linear-gradient(180deg, #e8eaf6, #ffffff)",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          style={{
            fontWeight: 700,
            color: "#1a237e",
            letterSpacing: "1px",
          }}
        >
          Welcome to CGPA Calculator
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "#546e7a", marginTop: "8px" }}
        >
          Easily calculate your CGPA with a few clicks!
        </Typography>
      </Box>

      <Dialog open={openDialog} onClose={() => handleCSEChoice(false)}>
        <DialogTitle style={{ color: "#1a237e", fontWeight: 600 }}>
          Are you a CSE student?
        </DialogTitle>
        <DialogContent>
          <Typography style={{ color: "#546e7a" }}>
            If you're a Computer Science and Engineering student, we'll pre-fill
            default credits for semesters 1–8. Otherwise, you can enter credits
            manually.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCSEChoice(false)}
            style={{
              color: "#d32f2f",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            No
          </Button>
          <Button
            onClick={() => handleCSEChoice(true)}
            style={{
              background: "#3f51b5",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "8px",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {isCSE !== null && (
        <Card
          elevation={6}
          style={{
            padding: "24px",
            borderRadius: "16px",
            background: "linear-gradient(145deg, #ffffff, #f0f4f8)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              style={{
                fontWeight: 700,
                color: "#1a237e",
                marginBottom: "16px",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <School style={{ fontSize: "32px" }} />
              CGPA Calculator
            </Typography>

            <Typography
              variant="h6"
              align="center"
              style={{
                color: "#455a64",
                fontWeight: 500,
                marginBottom: "12px",
                fontStyle: "italic",
              }}
            >
              CGPA = <b>Σ(SGPA × Credits) / Σ(Credits)</b>
            </Typography>

            <Card
              style={{
                background: "#e3f2fd",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "24px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="body1"
                align="center"
                style={{
                  color: "#1565c0",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                {isCSE
                  ? "Enter your SGPA for each semester. Credits are pre-filled for CSE students."
                  : "Enter your SGPA and credits for each semester below."}
              </Typography>
            </Card>

            {semesters.map((sem) => (
              <SemesterCard
                key={sem.id}
                semester={sem}
                handleInputChange={handleInputChange}
                removeSemester={removeSemester}
                semesterCount={semesters.length}
                isCSE={isCSE}
                defaultCredits={defaultCredits}
              />
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginTop: "24px",
              }}
            >
              <Tooltip title="Add a new semester to enter more grades">
                <Button
                  variant="contained"
                  onClick={addSemester}
                  style={{
                    background: "linear-gradient(45deg, #3f51b5, #5c6bc0)",
                    color: "#ffffff",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(63,81,181,0.3)",
                    transition: "transform 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  sx={{
                    "&:hover": {
                      transform: "scale(1.05)",
                      background: "#5c6bc0",
                    },
                  }}
                >
                  <AddCircle style={{ fontSize: "20px" }} />
                  Add Semester
                </Button>
              </Tooltip>

              <Tooltip title="Calculate your CGPA based on entered data">
                <Button
                  variant="outlined"
                  onClick={calculateCGPA}
                  style={{
                    borderColor: "#00796b",
                    color: "#00796b",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontWeight: 600,
                    textTransform: "none",
                    borderWidth: "2px",
                    boxShadow: "0 4px 12px rgba(0,121,107,0.2)",
                    transition: "transform 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  sx={{
                    "&:hover": {
                      transform: "scale(1.05)",
                      background: "#e0f2f1",
                      borderColor: "#00695c",
                    },
                  }}
                >
                  <Calculate style={{ fontSize: "20px" }} />
                  Calculate CGPA
                </Button>
              </Tooltip>
            </div>

            {cgpa !== 0 && (
              <Typography
                variant="h5"
                align="center"
                style={{
                  marginTop: "32px",
                  color: "#263238",
                  fontWeight: 600,
                }}
              >
                Your CGPA is:{" "}
                <span style={{ color: "#00796b", fontWeight: 700 }}>{cgpa}</span>
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      <Box
        style={{
          marginTop: "24px",
          textAlign: "center",
          padding: "16px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="body2"
          style={{
            color: "#455a64",
            fontWeight: 500,
          }}
        >
          Made with ❤️ by{" "}
          <a
            href="https://xenoverse.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#3f51b5",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Xenon
          </a>
        </Typography>
      </Box>
    </Container>
  );
}
