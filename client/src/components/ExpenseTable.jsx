import ExpenseRow from "./ExpenseRow";

function ExpenseTable({expenses, onDelete, onEdit}) {
    //console.log(expenses);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount (USD)</th>
                        <th>ZipCode</th>
                        <th>Category</th>
                    </tr> 
                </thead>
                <tbody>
                    {expenses.map((expense, index) =>{
                        if (expense) {
                            //console.log(expense._id);
                        
                            return <ExpenseRow expense={expense} key={index} onDelete={onDelete} onEdit={onEdit} />
                                        }
                        })}
                </tbody>
            </table>
        </div>
);
}

export default ExpenseTable;