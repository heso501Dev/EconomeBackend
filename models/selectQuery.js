const db = require('../config/database');

async function surreal_connect() {
	try {
		// Connect to the database
		await db.connect('ws://127.0.0.1:8000');
		// Signin as a namespace, database, or root user
		await db.signin({
			username: 'root',
			password: 'root',
		});
		// Select a specific namespace / database
		await db.use({ ns: 'test', db: 'test' });
	} catch (e) {
		console.error('ERROR', e);
	}
}
surreal_connect()

// user profile info
const userProfile = async (req, callback) => {
    try {
      const email = req.user.email;
      const result = await db.query(`SELECT * FROM user WHERE email = $1`, [email]);
      callback(null, result.rows); 
    } catch (err) {
      callback(err, null); 
    }
  };

// user Expenses
const userExpenses = async (req, callback)=> {
    try{
        const userId = req.user.user_id;
        const result = await db.query(`select * from $1->has->transactions->contains->node;`, [userId]);
        callback(null, result);
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
