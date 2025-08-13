function ConvertedExpenseRow({expense}) {
    return (
      <tr>
        <td>{expense.date}</td>
        <td>{expense.name}</td>
        <td>{expense.amount}</td>
        <td>{expense.zipCode}</td>
        <td>{expense.category}</td>
      </tr>
    )
}

export default ConvertedExpenseRow;