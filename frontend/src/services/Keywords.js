export default class KeywordsService {

    apiRoot = 'http://localhost:4000/';
    
    // build MeansLike query
    getMeansLikeQuery = (word) => {
        return {query: `{ MeansLike(word: "${word}") { word } }`};
    }

    // wraps (fetch) with a new promise for a simpler interface when using it inside a component
    fetchMeansLike = (word) => {
        return new Promise((resolve, reject) => {
            fetch(this.apiRoot, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify(this.getMeansLikeQuery(word))
            }).then(response => {
                if(response.ok) {
                    response.json().then(responseBody => {
                        resolve(responseBody);
                    }, error => {
                        reject(error);
                    })
                } else {
                    reject({responseStatusCode: response.status});
                }
            }, error => {
                reject(error);
            });
        });
    }
}