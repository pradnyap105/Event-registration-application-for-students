const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GET: All students
export const getAllStudents = async () => {
  const res = await fetch(`${BASE_URL}/api/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

// GET: Single student
export const getStudentById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}`);
  if (!res.ok) throw new Error("Failed to fetch student");
  return res.json();
};

// POST: Create student
export const createStudent = async (data) => {
  const res = await fetch(`${BASE_URL}/api/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create student");
  return res.json();
};

// PUT: Update student
export const updateStudent = async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update student");
  return res.json();
};

// DELETE: Delete student
export const deleteStudent = async (id) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete student");
  return true;
};