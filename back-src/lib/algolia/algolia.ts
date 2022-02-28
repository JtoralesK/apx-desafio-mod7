import  algoliasearch from"algoliasearch"

const client = algoliasearch('1QT2GEA4O3', process.env.PASSWORD_ALGOLIA);
const index = client.initIndex('products');
export {index}