import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './user_model.mjs';
import cors from 'cors'

const ERROR_INVALID_REQ = {Error: 'Invalid request'};
const ERROR_NOT_FOUND = {Error: "Not found"};
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, async () => {
    await users.connect()
    console.log(`Server listening on port ${PORT}...`);
});

function isValid(req) {
    const expectedKeys = ['date', 'name', 'amount', 'zipCode', 'category','userEmail'];
    const inputKeys = Object.keys(req.body);
    const date = req.body.date;
    const name = req.body.name;
    const amount = req.body.amount;
    const zipCode = req.body.zipCode;
    const category = req.body.category;
    const userEmail = req.body.userEmail;

   if (inputKeys.length !== 6 || !inputKeys.every(key => expectedKeys.includes(key))) {
            return false;
        }
    
    // check to make sure year is equal to current year
    const currentDate = new Date();
    const fullYear = currentDate.getFullYear();
    const twoDigitYear = fullYear.toString().slice(-2); 
    const fourDigitYear = fullYear.toString().slice(-4);   
    if (date.slice(-2) !== twoDigitYear) {
        return false;
    }
    if (date.split('-')[2].length == 4 && date.slice(-4) !== fourDigitYear) {
        return false;
    }
  
  return true;
}

app.post('/register', asyncHandler(async (req, res) => {

    // Check if name and email address already exist. If it does inform user name and email address taken
    const {email, name} = req.body;
    const user = await users.findUserByEmail({email: email})

    if (user) {
        if (user.name === name) {
            res.json("Name and Email Already Exist");
        }else{
            res.json("Email Already Exists");
        }
    } else {
         const newUser = await users.createUser(req.body.name,
                                                req.body.email,
                                                req.body.password
                                                )
         res.status(201).json(newUser);
    }

   

}));

app.post('/login', asyncHandler(async (req, res) => {

    const {email, password} = req.body;
    const user = await users.findUserByEmail({email: email})

    if (user) {
        if (user.password === password) {
            //console.log(user.name);
            //res.json("Success")
            res.status(200).json({"name": user.name});
        } else {
            res.json("The password is not correct")
        }
    } else {
        res.json("No record exists")
    }
    //res.status(201).json(user);

}));

app.post('/expenses', asyncHandler(async (req, res) => {

    if(!isValid(req)){
        res.status(400).json(ERROR_INVALID_REQ)
    } else {
        console.log(req.body.date, req.body.name, req.body.zipCode, req.body.userEmail);
        const expense = await users.createExpense(req.body.date, 
                                req.body.name, 
                                req.body.amount,
                                req.body.zipCode,
                                req.body.category,
                                req.body.userEmail);
        res.status(201).json(expense);
    }
    
}));

app.get('/expenses', asyncHandler(async (req, res) => {

    // Extract possible query parameters
    const { date, name, amount, zipCode, category } = req.query;

    // Build filter object based on query parameters
    const filter = {};
    if (date !== undefined) filter.date = date;
    if (name !== undefined) filter.name = name;
    if (amount !== undefined) filter.amount = amount;
    if (zipCode !== undefined) filter.zipCode = zipCode;
    if (category !== undefined) filter.category = category;
    
    const expense = await users.retrieveExpenses(filter);
    res.status(200).json(expense);
}));

app.get('/expenses/:email', asyncHandler(async (req, res) => {

    const userEmail = req.params.email;
    //console.log(userEmail);

    const filter = {};
    if (userEmail !== undefined) filter.email = userEmail;

    const expenses = await users.findExpensesByEmail(filter);

    if (expenses) {
       res.status(200).json(expenses);
       //console.log(expenses)
    }
    else{
        console.log('No request success')
    }
}));

app.delete('/expenses/:_id', asyncHandler(async (req, res) => {
    const expenseId = req.params._id;

    const expense = await users.deleteExpenseById(expenseId);

    if (expense) {
        res.status(204).json(expense);
        console.log('expense deleted')
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

app.put('/expenses/:_id', asyncHandler(async (req, res) => {
    const expenseId = req.params._id;
    //console.log(expenseId);
    const date = req.body.date;
    const name = req.body.name;
    const amount = req.body.amount;
    const zipCode = req.body.zipCode;
    const category = req.body.category;
    const email = req.body.userEmail;
    console.log(name, amount, date, category, date, email);

    if(!isValid(req)){
        res.status(400).json(ERROR_INVALID_REQ)
    } else{
        const expense = await users.updateExpenseById(expenseId, date, 
                                                    name, amount, 
                                                    zipCode, category, email);

        if (expense) {
            console.log('successful edit');
            res.status(200).json(expense);
        }
        else {
            console.log('edit expense failed')
            res.status(404).json(ERROR_NOT_FOUND);
        }
    }
}));
