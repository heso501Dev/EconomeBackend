const db = require('../config/database');

db.connect();

// user profile info
const userProfile = async (req, callback) => {
    try {
      const email = req.user.email;
      const result = await db.query(`SELECT * FROM "User" WHERE email = $1`, [ email]);
      callback(null, result.rows); 
    } catch (err) {
      callback(err, null); 
    }
  };

// user Expenses
const userExpenses = async (req, callback)=> {
    try{
        const userId = req.user.user_id;
        const result = await db.query(`SELECT * FROM "expenses" WHERE user_id = $1`, [userId]);
        callback(null, result.rows);
    } catch (err) {
        callback(err, null);
    }
}

// user Income
const userIncome = async (req, callback) => {
    try{
        const userId = req.user.user_id;
        const result = await db.query(`SELECT * FROM "income" WHERE user_id = $1`, [userId]);
        callback(null, result.rows);
    } catch (err) {
        callback(err, null);
    }
}

// user Assets
const userAssets = async (req, callback) => {
    try{
        const userId = req.user.user_id;
        const result = await db.query(`SELECT * FROM "assets" WHERE user_id = $1`, [1]);
        callback(null, result.rows);
    } catch (err) {
        callback(err, null);
    }
}

module.exports = {userProfile, userExpenses, userIncome, userAssets};