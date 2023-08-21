export const schema = gql`
  type Invoice {
    id: Int!
    createdAt: DateTime!
    updateAt: DateTime!
    status: InvoiceStatus!
    title: String!
    description: String!
    issueAt: DateTime!
    dueAt: DateTime!
    sellerLogo: String
    sellerName: String!
    sellerAddress: String
    sellerPhone: String
    sellerEmail: String
    buyerName: String!
    buyerAddress: String
    buyerPhone: String
    buyerEmail: String
    lineItems: JSON!
    paymentTerms: String!
  }

  enum InvoiceStatus {
    OUTSTANDING
    PAID
    LATE
  }

  type Query {
    invoices: [Invoice!]! @requireAuth
    invoice(id: Int!): Invoice @requireAuth
  }

  input CreateInvoiceInput {
    updateAt: DateTime!
    status: InvoiceStatus!
    title: String!
    description: String!
    issueAt: DateTime!
    dueAt: DateTime!
    sellerLogo: String
    sellerName: String!
    sellerAddress: String
    sellerPhone: String
    sellerEmail: String
    buyerName: String!
    buyerAddress: String
    buyerPhone: String
    buyerEmail: String
    lineItems: JSON!
    paymentTerms: String!
  }

  input UpdateInvoiceInput {
    updateAt: DateTime
    status: InvoiceStatus
    title: String
    description: String
    issueAt: DateTime
    dueAt: DateTime
    sellerLogo: String
    sellerName: String
    sellerAddress: String
    sellerPhone: String
    sellerEmail: String
    buyerName: String
    buyerAddress: String
    buyerPhone: String
    buyerEmail: String
    lineItems: JSON
    paymentTerms: String
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice! @requireAuth
    updateInvoice(id: Int!, input: UpdateInvoiceInput!): Invoice! @requireAuth
    deleteInvoice(id: Int!): Invoice! @requireAuth
  }
`
