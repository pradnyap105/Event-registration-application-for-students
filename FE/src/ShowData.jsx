import { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "./api/studentApi";

const emptyRow = {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    rollNo: "",
    collegeName: "",
    gender: "",
    mobileNo: "",
    email: "",
    bloodGroup: "",
};

export default function ShowData() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Fetch data when page loads
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents();

                // 🔁 Map backend → frontend
                const mappedData = data.map((s) => ({
                    id: s.id,
                    firstName: s.first_name || "",
                    middleName: s.middle_name || "",
                    lastName: s.last_name || "",
                    dob: s.dob || "",
                    rollNo: s.roll_number || "",
                    collegeName: s.college_name || "",
                    gender: s.gender || "",
                    mobileNo: s.contact_number || "",
                    email: s.email || "",
                    bloodGroup: s.blood_group || "",
                }));

                setRows(mappedData.length ? mappedData : [emptyRow]);
            } catch (err) {
                console.error(err);
                setError("Failed to load student data");
                setRows([emptyRow]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // 🔹 Handle input change
    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index] = { ...updatedRows[index], [field]: value };
        setRows(updatedRows);
    };

    const handleRemove = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {
            await deleteStudent(id); // ✅ API call

            // ✅ Update UI after successful delete
            setRows((prevRows) =>
                prevRows.filter((row) => row.id !== id)
            );
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete student");
        }
    };

    const updateData = async (id) => {
        try {
            await updateStudent(id, rows[id]);
            alert("Student updated successfully");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update student");
        }
    };
    return (
        <div className="p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Student Data
            </h2>

            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        {[
                            "First Name",
                            "Middle Name",
                            "Last Name",
                            "DOB",
                            "Roll No",
                            "College Name",
                            "Gender",
                            "Mobile No",
                            "Email",
                            "Blood Group",
                            "Action",
                        ].map((head) => (
                            <th key={head} className="border px-3 py-2 text-left">
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                            {Object.keys(emptyRow).map((field) => (
                                <td key={field} className="border px-2 py-1">
                                    <input
                                        type={field === "dob" ? "date" : "text"}
                                        value={row[field]}
                                        onChange={(e) =>
                                            handleChange(index, field, e.target.value)
                                        }
                                        className="w-full rounded border px-2 py-1"
                                    />
                                </td>
                            ))}

                            <td className="border px-2 py-1 text-center flex gap-2">
                                <button
                                    onClick={() => handleRemove(row.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() => handleRemove(row.id)}
                                    className="bg-green-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}