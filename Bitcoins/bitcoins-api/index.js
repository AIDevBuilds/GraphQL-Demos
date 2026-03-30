const { ApolloServer, gql } = require('apollo-server')
const { Bitcoins, sequelize } = require('./models')

const port = process.env.PORT || '4000'

// typeDefs, resolvers

const typeDefs = gql`
type Bitcoin {
    name: String!
    symbol: String!
    price: String!
    imageUrl: String!
    favorite: Boolean
}
type Query {
    bitcoins(offset: Int, limit: Int): [Bitcoin]
    favorite:[Bitcoin]
}
type Mutation {
    addCoin(symbol: String!): Bitcoin
    removeCoin(symbol: String!): Bitcoin
}
`

const mapAttributes = (model, { fieldNodes }) => {
    // get field of the Model (Columns of the table)
    const columns = new Set(Object.keys(model.rawAttributes))
    const requested_attributes = fieldNodes[0].selectionSet.selections.map(({ name: { value } }) => value)
    //filter the attributes against the columns
    return requested_attributes.filter(attribute => columns.has(attribute))
}
// resolver map

const resolvers = {
    Query: {
        bitcoins: async (_, { offset = 0, limit = 10 }, context, info) => {
            const bitcoins = await Bitcoins.findAll({
                limit,
                offset,
                order: [['id', 'ASC',]],
                attributes: mapAttributes(Bitcoins, info)
            })
            return bitcoins
        },
        favorite: async (parent, args, context, info) => {
            const bitcoins = await Bitcoins.findAll({
                where: { favorite: true },
                attributes: mapAttributes(Bitcoins, info)
            })
            return bitcoins
        }
    },
    Mutation: {
        addCoin: async (_, { symbol }, context, info) => {
            const [updated] = await Bitcoins.update({ favorite: true }, {
                where: { symbol: symbol }
            })
            
            if (updated) {
                const updatedCoin = await Bitcoins.findOne({
                    where: { symbol: symbol },
                    attributes: mapAttributes(Bitcoins, info)
                })

                return updatedCoin
            }

            throw new Error('Bitcoin not updated')
        },
        removeCoin: async (_, { symbol }, context, info) => {
            const [updated] = await Bitcoins.update({ favorite: false }, {
                where: { symbol: symbol }
            })
            if (updated) {
                const updatedCoin = await Bitcoins.findOne({
                    where: { symbol: symbol },
                    attributes: mapAttributes(Bitcoins, info)
                })

                return updatedCoin
            }

            throw new Error('Bitcoin not updated')
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({ port }, () => console.log(`Server running at http://localhost:${port}`))