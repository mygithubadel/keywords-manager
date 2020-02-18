const { ApolloServer, gql } = require("apollo-server");
const { RESTDataSource } = require('apollo-datasource-rest');

/**
 * helper function. used to sort an array of objects according to a specific field
 * @param {a}				first item 
 * @param {b}				second item
 * @param {sortDirection}	desc or asc
 * @param {targetField}		sort according to targetField within the object
 */
function arraySortCompareFunction (a, b, sortDirection = 'desc', targetField) {
	if (a['targetField'] > b['targetField']) {
		return sortDirection === 'desc' ? -1 : 1;
	}
	if (b['targetField'] > a['targetField']) {
		return sortDirection === 'desc' ? 1 : -1;
	}

	return 0;
}

/**
 * an implementation for a datasource to DataMuseAPI
 */
class DataMuseAPI extends RESTDataSource {
	
	constructor() {
		super();
		this.baseURL = 'https://api.datamuse.com/';
	}

	async getMeansLike(word, limit=10) {

		let meansLikeList = await this.get('/words?ml=' + encodeURI(word));

		// sort by score, descending
		meansLikeList.sort((a,b) => arraySortCompareFunction(a, b, 'desc', 'score'));

		// splice, limit items
		meansLikeList.splice(limit);

		return meansLikeList;
	}

}

const typeDefs = gql`
  type MeansLike {
    word: String
    score: String
	tags: [String]
  }

  type Query {
    MeansLike(word: String, limit: Int): [MeansLike]
  }
`;

const resolvers = {
  Query: {
	MeansLike: async (_source, { word, limit }, { dataSources }) => {
      return dataSources.DataMuseAPI.getMeansLike(word, limit);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      DataMuseAPI: new DataMuseAPI()
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
