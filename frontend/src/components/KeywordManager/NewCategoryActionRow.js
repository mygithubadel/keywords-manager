import React from 'react';

// new category row and button
function NewCategoryActionRow(props) {
    return <tr>
        <td colSpan="4">
            <button 
                disabled={props.showAddCategoryBlankFields} 
                onClick={props.triggerAddNewCategory}>
                    Add Category
            </button>
        </td>
    </tr>;
}

export default NewCategoryActionRow;