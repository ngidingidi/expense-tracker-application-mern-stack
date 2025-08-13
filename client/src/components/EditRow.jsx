import { FaEdit } from "react-icons/fa";

function EditRow({expense, onEdit}) {

    return (
        <>
            <FaEdit onClick={(e)=> {
                e.preventDefault();
                //console.log(`edit functionality for ${expense.name}`)
                onEdit(expense);
            }}/>
        </>
    )
}

export default EditRow;