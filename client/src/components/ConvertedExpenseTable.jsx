import ConvertedExpenseRow from "./ConvertedExpenseRow";
import { useState } from "react";

function ConvertedExpenseTable({expenseData, loadExpenses}){

    const [converted, setConverted] = useState(false);
    const [backConverted, setBackConverted] = useState(true);

    const handleConversion = async () => {
        try {
            const response = await fetch(
                `http://localhost:3002/convert`, {
                    method: 'PUT', 
                    headers: {'Content-type': 'application/json'}, 
                    body: JSON.stringify(expenseData)
                }
            );

            if (response.status === 200){
                alert("Sucessfully converted amount!");
                loadExpenses();
                //setConverted(true);
                //setBackConverted(false);

            } else {
                alert("Failed to convert, status code = " + response.status);
            }
        } catch (err){
            alert(error.message);
        }
    };

    const handleBackConversion = async () => {
        try {
            const response = await fetch(
                `http://localhost:3002/back-convert`, {
                    method: 'PUT', 
                    headers: {'Content-type': 'application/json'}, 
                    body: JSON.stringify(expenseData)
                }
            );

            if (response.status === 200){
                alert("Sucessfully converted amount!");
                loadExpenses();
                //setConverted(false);
                //setBackConverted(true);

            } else {
                alert("Failed to convert, status code = " + response.status);
            }
        } catch (err){
            alert(error.message);
        }
    };

    return (
        <>
            <button onClick={handleConversion} className="curr-conv">
                Convert (MXN)
            </button>
            <button className="curr-conv" onClick={handleBackConversion} >
                Convert (USD)
            </button>

        <table border="5"> 
        <thead>
            <tr> 
                <th> Date </th>
                <th> Name </th> 
                <th> Amount </th> 
                <th> Zipcode </th> 
                <th> Category </th> 
            </tr>
        </thead>

        <tbody> 
            {expenseData.map((item, i) => 
                <ConvertedExpenseRow expense={item} key={i} />
            )}
        </tbody>
        </table>
        </>
    );
}

export default ConvertedExpenseTable;