class apiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    this.query = this.query.find(queryObj);
    return this;
  }

  search() {
    if (this.queryString.search) {
      const regex = new RegExp(this.queryString.search, "i");
      this.query = this.query.find({
        $or: [{ email: { $regex: regex } }],
      });
    }
    return this;
  }
}

module.exports = apiFeatures;
