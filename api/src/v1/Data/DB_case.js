let cases = [
    { 
        id: 1, 
        status: 'Open', 
        priority: 'High', 
        owner: 'Henrik', 
        description: 'Initial setup of project A.', 
        title: 'Project A Setup',
        date: '2025-10-25',
        customer: 'Tech Innovations',
        caseNumber: 'TI-2025-1001'
    },
    { 
        id: 2, 
        status: 'In Progress', 
        priority: 'Medium', 
        owner: 'Thor', 
        description: 'Review Q4 customer feedback.', 
        title: 'Q4 Feedback Review',
        date: '2025-10-26',
        customer: 'Global Logistics',
        caseNumber: 'GL-2025-1002'
    },
    { 
        id: 3, 
        status: 'Closed', 
        priority: 'Low', 
        owner: 'Tobias', 
        description: 'Final document submission for client B.', 
        title: 'Client B Docs',
        date: '2025-10-20',
        customer: 'Local Business',
        caseNumber: 'LB-2025-1003'
    },
];

//functions

// Get all objects
const getAllCases = () => {
    return [...cases];
}

// Add object
const addCase = (caseItem) => {
    const id = cases.length ? cases[cases.length - 1].id + 1 : 1; // Ensure the ID is unique by checking the length of the movies array
    const newCase = { id, ...caseItem };
    cases.push(newCase);
    return newCase;
}

// Get object by id
const getCaseById = (id) => {
    id = parseInt(id);
    if (isNaN(id)) return null; // Return null if id is not a number
    return cases.find((caseItem) => caseItem.id === id); // // Ensure the id is a number with parseInt
}

// Delete object by id
const deleteCaseById = (id) => {
    id = parseInt(id); // Ensure the ID is a number
    if (isNaN(id)) return false; // Handle invalid IDs

    // makes index = id of movie
    const index = cases.findIndex((caseItem) => caseItem.id === id);

    // Check if index is not -1/does not exist | if it does exist, delete it by splicing. Splicing removes the element at the specified index
    if (index !== -1) {
        cases.splice(index, 1);
        return true;
    }
    return false;
}

// Update object by id
const updateCaseById = (id, updatedCase) => {
    id = parseInt(id); // Ensure the ID is a number
    if (isNaN(id)) return false; // Handle invalid IDs

    // makes index = id of object | check if id/object exists | if it does, update it.
    const index = cases.findIndex((caseItem) => caseItem.id === id);
    if (index !== -1) {
        cases[index] = { ...cases[index], ...updatedCase };
        return cases[index];
    }
    return null;
}


module.exports = {
    getAllCases,
    addCase,
    getCaseById,
    deleteCaseById,
    updateCaseById
}