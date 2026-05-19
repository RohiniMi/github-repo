import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://github-repo-xlbk.onrender.com/students";

export default function App() {

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    roll: "",
    admission: "",
    email: "",
    sem: "",
    github: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update student
  const submit = async () => {

    if (Object.values(form).some((v) => v === "")) {
      alert("Fill all fields!");
      return;
    }

    try {

      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API, form);
      }

      setForm({
        name: "",
        roll: "",
        admission: "",
        email: "",
        sem: "",
        github: "",
      });

      fetchStudents();

    } catch (error) {
      console.log(error);
    }
  };

  // Edit student
  const editStudent = (s) => {

    setForm({
      name: s.name,
      roll: s.roll,
      admission: s.admission,
      email: s.email,
      sem: s.sem,
      github: s.github,
    });

    setEditingId(s.id);
  };

  return (
    <div className="app">

      <div className="container">

        {/* Header */}

        <div className="header">
          <h1>Student Dashboard</h1>
          <p>Manage students and monitor GitHub repositories</p>
        </div>

        {/* Form */}

        <div className="form-card">

          <div className="form-top">
            <h2>
              {editingId ? "Update Student" : "Add Student"}
            </h2>

            <div className="emoji-box">
              🎓
            </div>
          </div>

          <div className="form-grid">

            <input
              name="name"
              placeholder="Student Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="roll"
              placeholder="Roll Number"
              value={form.roll}
              onChange={handleChange}
            />

            <input
              name="admission"
              placeholder="Admission Number"
              value={form.admission}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Personal Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="sem"
              placeholder="Branch & Section"
              value={form.sem}
              onChange={handleChange}
            />

            <input
              name="github"
              placeholder="GitHub Repository URL"
              value={form.github}
              onChange={handleChange}
            />

          </div>

          <button
            className="submit-btn"
            onClick={submit}
          >
            {editingId ? "Update Student" : "Add Student"}
          </button>

        </div>

        {/* Table */}

        <div className="table-card">

          <div className="table-header">
            <h2>Student Records</h2>
          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Admission</th>
                  <th>Email</th>
                  <th>Branch</th>
                  <th>GitHub</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {students.map((s, index) => (
                  <tr
                    key={s.id}
                    className={index % 2 === 0 ? "even" : "odd"}
                  >

                    <td className="name">{s.name}</td>

                    <td>{s.roll}</td>

                    <td className="violet">{s.admission}</td>

                    <td className="pink">{s.email}</td>

                    <td className="green">{s.sem}</td>

                    <td>
                      <a
                        href={s.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Repo
                      </a>
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => editStudent(s)}
                      >
                        Edit
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}