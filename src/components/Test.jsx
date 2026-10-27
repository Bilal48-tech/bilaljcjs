import { useState } from "react";

// File ka naam Test hai, isliye function ka naam bhi Test rakha hai
function Test() {
  // 1. Initial Students State Array
  const [students, setStudents] = useState([
    { id: "1", name: "Rohan Ahmed", books: ["HTML Basics", "CSS Secrets"] },
    { id: "2", name: "Sana Khan", books: ["JavaScript Ninja", "React Up & Running"] },
    { id: "3", name: "Zain Ali", books: ["Node.js Guide"] }
  ]);

  // Form Field States
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [booksInput, setBooksInput] = useState(""); 
  
  // Track if we are in "Edit Mode"
  const [isEditing, setIsEditing] = useState(false);

  // --- CRUD ACTIONS ---

  // 1. CREATE & UPDATE (Save)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !name) return alert("Please fill ID and Name");

    const booksArray = booksInput
      .split(",")
      .map((b) => b.trim())
      .filter((b) => b !== "");

    if (isEditing) {
      // UPDATE existing student
      setStudents(
        students.map((student) =>
          student.id === id ? { ...student, name, books: booksArray } : student
        )
      );
      setIsEditing(false);
    } else {
      // CREATE new student (Check duplicates first)
      if (students.some((student) => student.id === id)) {
        return alert("Student ID already exists!");
      }
      setStudents([...students, { id, name, books: booksArray }]);
    }

    // Reset Form fields
    setId("");
    setName("");
    setBooksInput("");
  };

  // 2. EDIT (Populate form fields)
  const handleEdit = (student) => {
    setIsEditing(true);
    setId(student.id); 
    setName(student.name);
    setBooksInput(student.books.join(", "));
  };

  // 3. DELETE
  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== studentId));
    }
  };

  // 4. RESET FORM
  const clearForm = () => {
    setIsEditing(false);
    setId("");
    setName("");
    setBooksInput("");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Student Registry System</h2>

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", marginBottom: "30px", border: "1px solid #ddd" }}>
        <h3>{isEditing ? "✏️ Update Student Records" : "➕ Add New Student"}</h3>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Student ID:</label>
          <input 
            type="text" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
            disabled={isEditing} 
            placeholder="e.g. 4" 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Full Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g. Bilal Shah" 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Issued Books (Comma separated values):</label>
          <input 
            type="text" 
            value={booksInput} 
            onChange={(e) => setBooksInput(e.target.value)} 
            placeholder="e.g. Git Essentials, Clean Code" 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button type="submit" style={{ backgroundColor: isEditing ? "#2196F3" : "#4CAF50", color: "white", padding: "10px 15px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}>
          {isEditing ? "Update Data" : "Add Student"}
        </button>
        {isEditing && (
          <button type="button" onClick={clearForm} style={{ marginLeft: "10px", backgroundColor: "#bbb", color: "black", padding: "10px 15px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* READ: Interactive Students Table View */}
      <h3>📋 Student Database</h3>
      <table border="1" cellPadding="12" style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", textAlign: "left" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Assigned Books (Array Items)</th>
            <th>Manage Entries</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>No student records found.</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td style={{ fontWeight: "bold" }}>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  {student.books.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {student.books.map((book, idx) => (
                        <li key={idx} style={{ color: "#555" }}>{book}</li>
                      ))}
                    </ul>
                  ) : (
                    <span style={{ color: "#aaa", fontStyle: "italic" }}>No books assigned</span>
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(student)} style={{ backgroundColor: "#FF9800", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", marginRight: "5px" }}>Edit</button>
                  <button onClick={() => handleDelete(student.id)} style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// File name ke mutabik Test export hoga
export default Test;
