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

const createUser = async (name, email, password) => {
    // Call the constructor to create an instance of the model class User
    const user = new User({ name: name, email: email, password: password});
    // Call save to persist this object as a document in MongoDB
    return user.save();
}

const findUserByEmail = async (email) => {
    // Find user with given email
    //console.log(email);
    const query = User.findOne(email);
    return query;
}

const createExpense = async (date, name, amount, zipCode, category, email) => {
    // Call the constructor to create an instance of the model class Expense
    const expense = new Expense({ date: date, name: name, amount: amount, zipCode: zipCode, category: category,
                                    email:email
                                });
    // Call save to persist this object as a document in MongoDB
    return expense.save();
}

const retrieveExpenses = async (filter) => {
    const query = Expense.find(filter);
    return query.exec();
}

const findExpensesByEmail = async (filter) => {
    // Find expenses with given email
    const query = Expense.find(filter);
    //console.log(query);
    return query;
    }

const deleteExpenseById = async (id) => {
    // findByIdandDelete returns the deleted document if any, otherwise returns null
    const result = await Expense.findByIdAndDelete(id);
    return result;
}

const updateExpenseById = async (id, date, name, amount, zipCode, category, email) => {
    const expense = await Expense.findById(id);
    if (!expense) {
        return undefined;
    }

    else {
        const expenseProperties = {}
        if (date != undefined && date != expense.date) expenseProperties.date = date;
        if (name != undefined && name != expense.name) expenseProperties.name = name;
        if (amount != undefined && amount != expense.amount) expenseProperties.amount = amount;
        if (zipCode != undefined && zipCode != expense.zipCode) expenseProperties.zipCode = zipCode;
        if (category != undefined && category != expense.category) expenseProperties.category = category;
        if (email != undefined && email != expense.email) expenseProperties.email = email;
        Object.assign(expense, expenseProperties);
        
        return expense.save();
    }
}

export { connect, createUser, findUserByEmail, createExpense,
        retrieveExpenses, findExpensesByEmail, deleteExpenseById, updateExpenseById
};