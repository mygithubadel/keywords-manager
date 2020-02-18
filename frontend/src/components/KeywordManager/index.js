import React from 'react';
import {Row, Col, Table, Alert} from 'react-bootstrap';
import KeywordsService from '../../services/Keywords';

// presentation components
import CategoriesTableData from './CategoriesTableData';
import NewCategoryBlankFields from './NewCategoryBlankFields';
import CategoriesTableHeader from './CategoriesTableHeader';
import NewCategoryActionRow from './NewCategoryActionRow';

// service
const keywordsService = new KeywordsService();

// wrapper component
class KeywordManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // add new category
            showAddCategoryBlankFields: false,
            newCategoryName: '',
            addCategorySaveButtonEnabled: true,

            // edit tags
            editTagIndex: null, 
            editTagText: '',

            //alert
            alert: '',

            // categories and tags data store
            categories: [
                {
                    name: 'category1',
                    tags: ['tag1','tag2','tag3']
                },{
                    name: 'category2',
                    tags: ['tag4','tag5','tag6']
                },{
                    name: 'category3',
                    tags: ['tag7','tag8','tag9']
                }
            ]
        }
    }


    /*** ALERT ***/
    alert = (text, timeout = 2000) => {
        this.setState({alert: text});
        setTimeout(() => {
            this.setState({alert: ''});
        }, timeout);
    }

    /*** NEW CATEGORY HANDLERS ***/

    // inject the new category and its tags into the state
    injectIntoState = (category, rawTags) => {
        let categories = this.state.categories;
        categories.push({
            name: category,
            tags: rawTags.data.MeansLike.map(item => item.word)
        });
        this.setState({categories});
        this.hideNewCategoryFields();
    }

    // triggers add category state
    triggerAddNewCategory = () => {
        this.setState({showAddCategoryBlankFields: true, addCategorySaveButtonEnabled: true})
    }

    // onchange handler for new category input field
    setNewCategoryName = (newCategoryName) => {
        this.setState({newCategoryName});
    }

    // hide new category fields
    hideNewCategoryFields = () => {
        this.setState({showAddCategoryBlankFields: false, newCategoryName: ''});
    }

    // handle new category addition, fires an api to the local GraphQL server
    handleNewCategorySubmit = (e) => {
        e.preventDefault();

        // validate category name - not empty
        if(this.state.newCategoryName === '') {
            this.alert('please type in a category name');
            return false;
        }

        // validate category name - unique 
        if(this.state.categories.find(category => category.name === this.state.newCategoryName)) {
            this.alert(`category "${this.state.newCategoryName}" already exists`);
            this.setState({newCategoryName: ''});
            return false;
        }

        // disable save button, till the async transction is completed
        this.saveCategoryButtonState(false);
        
        keywordsService.fetchMeansLike(this.state.newCategoryName).then(tags => {
            this.injectIntoState(this.state.newCategoryName, tags)
        }, error => {
            this.handleError(error);
        })
    }

    // error handling
    handleError(error) {
        this.alert('an error has occured, please try again later');
        console.log(error);
        this.hideNewCategoryFields();
        this.saveCategoryButtonState(true);
    }

    // enables and disables the save button of add new category, for async loading 
    saveCategoryButtonState = (enabled) => {
        this.setState({addCategorySaveButtonEnabled: enabled});
    }


    /*** DELETE CATEGORY HANDLER ***/

    // deletes a cateogry from the store by its local index
    handleDeleteCategory = (index) => {
        let categories = this.state.categories;
        categories.splice(index, 1);
        this.setState({categories, editTagIndex: null, editTagText: ''});
    }


    /*** EDIT TAGS HANDLERS ***/

    // triggers tag editing mode
    triggerEditTag = (index) => {
        this.setState({editTagIndex: index, editTagText: this.state.categories[index].tags.join(', ')});
    }

    // sets edit tag text into state
    setEditTagText = (editTagText) => {
        this.setState({editTagText});
    }

    // saves edited tag into state
    saveEditedTag = (e) => {
        e.preventDefault();
        const newTagsString = this.state.editTagText;
        let newTagsList = newTagsString.split(',');
        let categories = this.state.categories;

        // trim spaces
        newTagsList = newTagsList.map(item => item.trim());

        // filter out tags that contain only spaces
        newTagsList = newTagsList.filter(item => item !== '');

        categories[this.state.editTagIndex].tags = newTagsList;
        
        this.setState({categories, editTagIndex: null, editTagText: ''});
    }

    render() {
        return (
            <Row className='mt-3'>
                <Col>
                    <h3>Keywords Manager</h3>
                    <Table striped bordered hover>
                        <CategoriesTableHeader />
                        <tbody>
                            <CategoriesTableData
                                categories={this.state.categories} 
                                editTagIndex={this.state.editTagIndex} 
                                editTagText={this.state.editTagText}
                                triggerEditTag={this.triggerEditTag} 
                                handleDeleteCategory={this.handleDeleteCategory} 
                                setEditTagText={this.setEditTagText}
                                saveEditedTag={this.saveEditedTag}
                            />
                            <NewCategoryBlankFields 
                                showAddCategoryBlankFields={this.state.showAddCategoryBlankFields} 
                                categories={this.state.categories} 
                                addCategorySaveButtonEnabled={this.state.addCategorySaveButtonEnabled} 
                                hideNewCategoryFields={this.hideNewCategoryFields} 
                                handleNewCategorySubmit={this.handleNewCategorySubmit}
                                setNewCategoryName={this.setNewCategoryName}
                                newCategoryName={this.state.newCategoryName}
                            />
                            <NewCategoryActionRow 
                                showAddCategoryBlankFields={this.state.showAddCategoryBlankFields} 
                                triggerAddNewCategory={this.triggerAddNewCategory}
                            />
                        </tbody>
                    </Table>
                    {this.state.alert && <Alert variant={'warning'}>{this.state.alert}</Alert>}
                </Col>
            </Row>
        );
    }

}

export default KeywordManager;
