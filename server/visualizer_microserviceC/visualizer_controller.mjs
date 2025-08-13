import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './visualizer_model.mjs';
import cors from 'cors';

const ERROR_INVALID_REQ = {Error: 'Invalid request'};
const ERROR_NOT_FOUND = {Error: "Not found"};
const PORT = process.env.PORT2;
const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, async () => {
    await users.connect()
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/expenses/:email', asyncHandler(async (req, res) => {
    console.log('Received request to get expenses for specific user---');
    const userEmail = req.params.email;
    //console.log(userEmail);

    const filter = {};
    if (userEmail !== undefined) filter.email = userEmail;

    const expenses = await users.findExpensesByEmail(filter);

    if (expenses) {
       res.status(200).json(expenses);
       console.log('Successfully obtained expenses for specific user--');
    }
    else{
        console.log('No request success')
    }
}));

