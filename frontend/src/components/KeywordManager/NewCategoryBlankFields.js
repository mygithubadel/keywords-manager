import React from 'react';

// blank fields for a new category
function NewCategoryBlankFields(props) {
    return props.showAddCategoryBlankFields ? (<tr>
        <td>{props.categories.length + 1}</td>
        <td>
            <form onSubmit={e => props.handleNewCategorySubmit(e)}>
                <input value={props.newCategoryName} onChange={(event) => props.setNewCategoryName(event.target.value)} type="text" name="category" />
                <button disabled={!props.addCategorySaveButtonEnabled}>Save</button>    
            </form>
        </td>
        <td><small>* initial tags will be fetched automatically</small></td>
        <td><button onClick={props.hideNewCategoryFields}>Cancel</button></td>
    </tr>) : null;
}

export default NewCategoryBlankFields;