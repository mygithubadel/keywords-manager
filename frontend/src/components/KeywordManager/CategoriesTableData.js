import React from 'react';

// renders categories list in html table format
function CategoriesTableData(props) {
    return props.categories.map((item, index) => {
        return <tr key={index}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{props.editTagIndex === index ? renderEditTagField(props) : item.tags.join(', ')}</td>
            <td>{renderActionButtons(props, index)}</td>
        </tr>
    });
}

function renderActionButtons(props, index) {
    return (
        <div>
            <button onClick={() => props.handleDeleteCategory(index)}>Delete Category</button>
            <span>&nbsp;</span>
            <button onClick={() => props.triggerEditTag(index)}>Edit Tags</button>
        </div>
    );
}

// renders edit tag input field
function renderEditTagField (props) {
    return <form onSubmit={e => props.saveEditedTag(e)}>
        <input style={{width: '90%'}} type="text" onChange={e => props.setEditTagText(e.target.value)} value={props.editTagText} />
        <button>Save</button>
    </form>;
}

export default CategoriesTableData;