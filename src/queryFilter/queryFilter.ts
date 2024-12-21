import { FilterQuery, Query } from 'mongoose'

class QueryFilter<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>
        ),
      })
    }

    return this
  }

  filter() {
    const queryObj = { ...this.query }

    const excludeFields = ['search', 'sortBy','sortOrder', 'filter']

    excludeFields.forEach((el) => delete queryObj[el])

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }


  sortBy() {
    // eslint-disable-next-line prefer-const
    let sortField = (this?.query?.sortBy as string) || 'createdAt';  
    const sortOrder = (this?.query?.sortOrder as string) || 'desc'; 

    // Format sort query based on sortOrder
    const sort = sortOrder === 'asc' ? sortField : `-${sortField}`; 
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }
}


export default QueryFilter
