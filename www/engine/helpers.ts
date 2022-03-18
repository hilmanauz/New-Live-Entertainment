const getDataByExternalId = (email: any) => {
  return ({
    operations: [{
      // @ts-ignore
      operation: "Select",
      instruction: {
        table: "users",
        name: "data",
        populate: [],
        limit: 25,
        offset: 0,
        orderBy: {
          id: "ASC"
        },
        condition: {
          "$or": [
            {
              "external_id": {
                "$eq": email
              }
            }
          ]
        },
        params: {}
      }
    }]
  })
}

export type UserInstance = {
  age: string
  city: string
  gender: string
  id: 24
  name: string
  username: string
};

export { getDataByExternalId }