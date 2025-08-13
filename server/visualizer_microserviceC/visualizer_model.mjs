import mongoose from 'mongoose';
import 'dotenv/config';

const USER_DB_NAME = 'user_db';
const USER_CLASS = 'User';
const EXPENSE_CLASS = 'Expense';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'user_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: USER_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Define the schema
 */

const userSchema = mongoose.Schema({
    // TODO: Define the schema to represent users
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const User = mongoose.model(USER_CLASS, userSchema);


/**
 * Create a user of the app
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */

const expenseSchema = mongoose.Schema({
    // TODO: Define the schema to represent expenses
    date: { type: String, required: true},
    name: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    zipCode: { type: Number, required: true },
    email: { type: String, required: true}
});

const Expense = mongoose.model(EXPENSE_CLASS, expenseSchema);

const findExpensesByEmail = async (filter) => {
    const query = Expense.find(filter);
    return query;
    }

export { connect, findExpensesByEmail};