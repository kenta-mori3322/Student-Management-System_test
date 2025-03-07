const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const filters = {
        name: req.query.name,
        className: req.query.className,
        section: req.query.section,
        roll: req.query.roll
    };
    
    const students = await getAllStudents(filters);
    
    res.status(200).json({
        success: true,
        data: students
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;
    
    const result = await addNewStudent(studentData);
    
    res.status(201).json({
        success: true,
        message: result.message
    });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const studentData = req.body;
    
    // Combine the ID with the student data
    const payload = {
        id,
        ...studentData
    };
    
    const result = await updateStudent(payload);
    
    res.status(200).json({
        success: true,
        message: result.message
    });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const student = await getStudentDetail(id);
    
    res.status(200).json({
        success: true,
        data: student
    });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const reviewerId = req.user.id; // Assuming the authenticated user's ID is available in req.user
    
    const result = await setStudentStatus({
        userId: id,
        reviewerId,
        status
    });
    
    res.status(200).json({
        success: true,
        message: result.message
    });
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    // This is a new function to handle student deletion
    // Note: You'll need to implement the deleteStudent service function
    const { id } = req.params;
    
    // This service function needs to be implemented in students-service.js
    const result = await deleteStudent(id);
    
    res.status(200).json({
        success: true,
        message: "Student deleted successfully"
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent
};
