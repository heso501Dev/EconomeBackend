const { userProfile, userExpenses, userIncome, userAssets } = require('../models/selectQuery');


// Retrieve User Profile
const getProfile = (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
    }
    // User is authenticated, fetch user profile
    userProfile(req, (err, rows) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send user profile information
            res.json(rows);
        }
    });
};
// Retrieve User Expenses
const getExpenses = (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
    } else {

        // User is auth. , fetch the Expenses
        userExpenses(req, (err, rows) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            } else {
                // Send user Expenses 
                res.json(rows);
            }
        });
    }
}
// Retrieve User Income
const getIncome = (req, res) => {
   // Check if the user is authenticated
   if (!req.isAuthenticated()) {
    return res.status(401).send('User is not authenticated');
} else {
    userIncome(req, (err, rows)=> {
        if(err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send user Income
            res.json(rows);
        }
    })
}}
// Retrieve User Assets
const getAssets = (req, res) => {
    // Check if the user is authenticated
   if (!req.isAuthenticated()) {
    return res.status(401).send('User is not authenticated');
} else {
    userAssets(req, (err, rows)=> {
        if(err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send user Income
            res.json(rows);
        }
    })
}}
module.exports = { getProfile, getExpenses, getIncome, getAssets };