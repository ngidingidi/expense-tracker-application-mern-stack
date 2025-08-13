import DeleteRow from "./DeleteRow";
import EditRow from "./EditRow";

function ExpenseRow({expense, onDelete, onEdit}) {
    return (
      <tr>
        <td>{expense.date}</td>
        <td>{expense.name}</td>
        <td>{expense.amount}</td>
        <td>{expense.zipCode}</td>
        <td>{expense.category}</td>
        <td><EditRow expense={expense} onEdit={onEdit} /></td>
        <td><DeleteRow expense={expense} onDelete={onDelete} /></td>
      </tr>
    )
}

export default ExpenseRow;