import { MdDelete } from "react-icons/md";

function DeleteRow({expense, onDelete}) {

    return (
        <>
            <MdDelete onClick={(e) => {
                e.preventDefault();
                //console.log(`delete functionality for ${expense._id}`);
                const confirmDelete = window.confirm("You are about to delete the expense. Do you want to continue?");
                if (confirmDelete) {
                    onDelete(expense._id);
                }
            }}/>
        </>
    )
}

export default DeleteRow;