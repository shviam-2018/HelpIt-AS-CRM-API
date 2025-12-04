const { getAllCases, addCase, getCaseById, deleteCaseById, updateCaseById} = require('../Data/DB_case');


const fetchAllCases = async (req, res) => {
    try {
        const cases = await getAllCases();
        res.status(200).json({ success: true, data: cases});
    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

const getSingleCase = async (req, res) => {
    try {
        const caseItem = await getCaseById(req.params.id);

        res.status(200).json({ success: true, data: caseItem});
    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};



const createCase = async (req, res) => {
    try {
        const { status, priority, owner, description, title, date, customer, caseNumber } = req.body;

        const newCase = await addCase({ status, priority, owner, description, title, date, customer, caseNumber });

        res.status(201).json({ success: true, data: newCase});
    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};


const updateCase = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, priority, owner, description, title, date, customer, caseNumber } = req.body;

        const updatedCase = await updateCaseById(id, { status, priority, owner, description, title, date, customer, caseNumber });

        res.status(200).json({ success: true, data: updatedCase});

    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

const deleteCase = async (req, res) => {
    try {

        const { id } = req.params;
        const deleted = await deleteCaseById(id);

        res.status(200).json({ success: true, message: "Case deleted" });

    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};


module.exports = { fetchAllCases, getSingleCase, createCase, updateCase, deleteCase };