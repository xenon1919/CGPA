import React, { useState } from "react";
import { Container, Button, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Box, Tooltip } from "@mui/material";
import { AddCircle, Calculate, School } from "@mui/icons-material";
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

  const addSemester = () => {
    const newId = semesters.length + 1;
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
    if (semesters.length > 1) {
      setSemesters(semesters.filter((sem) => sem.id !== id));
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updatedSemesters = semesters.map((sem) =>
      sem.id === id ? { ...sem, [name]: value } : sem
    );
    setSemesters(updatedSemesters);
  };

  const calculateCGPA = () => {
    const totalGradePoints = semesters.reduce(
      (sum, sem) => sum + (parseFloat(sem.sgpa) * parseFloat(sem.credits) || 0),
      0
    );
    const totalCredits = semesters.reduce(
      (sum, sem) => sum + (parseFloat(sem.credits) || 0),
      0
    );
    const calculatedCGPA =
      totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    setCgpa(calculatedCGPA);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "40px", fontFamily: "Roboto, sans-serif" }}>
      <Box style={{ background: "linear-gradient(180deg, #e8eaf6, #ffffff)", padding: "16px", borderRadius: "12px", marginBottom: "24px", textAlign: "center" }}>
        <Typography variant="h3" style={{ fontWeight: 700, color: "#1a237e", letterSpacing: "1px" }}>
          Welcome to CGPA Calculator
        </Typography>
        <Typography variant="body1" style={{ color: "#546e7a", marginTop: "8px" }}>
          Easily calculate your CGPA with a few clicks!
        </Typography>
      </Box>

      <Dialog open={openDialog} onClose={() => handleCSEChoice(false)}>
        <DialogTitle style={{ color: "#1a237e", fontWeight: 600 }}>Are you a CSE student?</DialogTitle>
        <DialogContent>
          <Typography style={{ color: "#546e7a" }}>
            If you're a Computer Science and Engineering student, we'll pre-fill default credits for semesters 1–8. Otherwise, you can enter credits manually.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCSEChoice(false)} style={{ color: "#d32f2f", textTransform: "none", fontWeight: 600 }}>No</Button>
          <Button onClick={() => handleCSEChoice(true)} style={{ background: "#3f51b5", color: "#ffffff", textTransform: "none", fontWeight: 600, padding: "8px 16px", borderRadius: "8px" }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {isCSE !== null && (
        <Card elevation={6} style={{ padding: "24px", borderRadius: "16px", background: "linear-gradient(145deg, #ffffff, #f0f4f8)" }}>
          <CardContent>
            <Typography variant="h4" align="center" style={{ fontWeight: 700, color: "#1a237e", marginBottom: "16px", letterSpacing: "0.5px" }}>
              <School style={{ fontSize: "32px" }} /> CGPA Calculator
            </Typography>

            <Typography variant="h6" align="center" style={{ color: "#455a64", fontWeight: 500, marginBottom: "12px", fontStyle: "italic" }}>
              CGPA = <b>Σ(SGPA × Credits) / Σ(Credits)</b>
            </Typography>

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

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
              <Tooltip title="Add a new semester to enter more grades">
                <Button variant="contained" onClick={addSemester} style={{ background: "linear-gradient(45deg, #3f51b5, #5c6bc0)", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", fontWeight: 600, textTransform: "none" }}>
                  <AddCircle style={{ fontSize: "20px" }} /> Add Semester
                </Button>
              </Tooltip>

              <Tooltip title="Calculate your CGPA based on entered data">
                <Button variant="outlined" onClick={calculateCGPA} style={{ borderColor: "#00796b", color: "#00796b", padding: "12px 24px", borderRadius: "8px", fontWeight: 600, textTransform: "none", borderWidth: "2px" }}>
                  <Calculate style={{ fontSize: "20px" }} /> Calculate CGPA
                </Button>
              </Tooltip>
            </div>

            {cgpa !== 0 && (
              <Typography variant="h5" align="center" style={{ marginTop: "32px", color: "#263238", fontWeight: 600 }}>
                Your CGPA is: <span style={{ color: "#00796b", fontWeight: 700 }}>{cgpa}</span>
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      <Box style={{ marginTop: "24px", textAlign: "center", padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}>
        <Typography variant="body2" style={{ color: "#455a64", fontWeight: 500 }}>
          Made with ❤️ by{" "}
          <a href="https://xenoverse.netlify.app" target="_blank" rel="noopener noreferrer" style={{ color: "#3f51b5", textDecoration: "none", fontWeight: 600 }}>
            Xenon
          </a>
        </Typography>
      </Box>
    </Container>
  );
}
