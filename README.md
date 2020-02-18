

## Architecture:

### Frontend

- **Wrapper Component [components/KeywordManager/index.js]** : a stateful component that contains the main logic, event handlers and renders the presentation components;
	-  Presentation / View Components:
        - CategoriesTableData: reads the categories list into table row(s)
        -  CategoriesTableHeader: table header
        -  NewCategoryActionRow: the row that contains the "Add Category" button
        -  NewCategoryBlankFields: the blank field that appears when clicking on "Add Category"

- **API Service Class [services/Keywords.js]**
	- contains a simple class where an instance of it can be used to interface with the GraphQL API that is included within this project

- **[components/KeywordManager/NewCategoryBlankFields.spec]** sample test spec file for a presentation component, demonstrating a few unit tests using **react-test-utils** and **react-dom**
- **React Bootstrap**

### Backend
- an endpoint that serves a GraphQL API
- queries the related words [MeansLike] and filters the top 10 results ( by highest scores ) from Datamuse
- listens to port 4000
___

Adil Abu-Saif
adil.abusaif@outlook.com


