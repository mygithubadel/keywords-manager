import React from 'react';

// categories table header
function CategoriesTableHeader(props) {
    return <thead>
        <tr>
            <th width={'5%'}>#</th>
            <th width={'20%'}>Categories</th>
            <th width={'60%'}>Keywords</th>
            <th width={'15%'}>Actions</th>
        </tr>
    </thead>;
}

export default CategoriesTableHeader;