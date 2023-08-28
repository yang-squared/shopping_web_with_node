const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type TestData {
        text: Stirng!
        views: Int!
    }
    type rootquery {
        hello: TestData!
    }
    schema {
        query: RootQuery
    }
`);