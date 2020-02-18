/* sample spec file for a presentation component */

import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';

import NewCategoryBlankFields from './NewCategoryBlankFields';

let handleNewCategorySubmitCalled = false;

const props = {
  showAddCategoryBlankFields: true,
  setNewCategoryName: (category) => props.newCategoryName = category,
  hideNewCategoryFields: () => props.showAddCategoryBlankFields = false,
  handleNewCategorySubmit: (e) => handleNewCategorySubmitCalled = true,
  addCategorySaveButtonEnabled: true,
  newCategoryName: 'testCategory',
  categories: [{
        name: 'category1',
        tags: ['tag1','tag2','tag3']
    },{
        name: 'category2',
        tags: ['tag4','tag5','tag6']
    }]
};

let container;

beforeEach(() => {
  container = document.createElement('tbody');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('NewCategoryBlankFields', () => {
  it('should call submit prop callback', () => {
    act(() => {
      ReactDOM.render(<NewCategoryBlankFields {...props} />, container);
    });

    const form = container.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(handleNewCategorySubmitCalled).toBe(true);

  });

  it('update the new category prop when typing in the input field', () => {
    act(() => { ReactDOM.render(<NewCategoryBlankFields {...props} />, container); });

    const inputField = container.querySelector('form > input');
    inputField.value = 'categoryTest2';

    //fill the field
    ReactTestUtils.Simulate.change(inputField);
    //press enter
    ReactTestUtils.Simulate.keyDown(inputField, {key: "Enter", keyCode: 13, which: 13});

    expect(props.newCategoryName).toBe('categoryTest2');
  });

  it('should hide the blank fields when the cancel button is pressed', () => {
    act(() => { ReactDOM.render(<NewCategoryBlankFields {...props} />, container); });

    const cancelButton = container.querySelector('td > button');
    act(() => { cancelButton.dispatchEvent(new MouseEvent('click', {bubbles: true})); });
    
    expect(props.showAddCategoryBlankFields).toBe(false);
  });

});
