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
      const searchValue = this.queryString.search;

      // Check if the search value is in date format (assuming DD/MM/YYYY format)
      const dateRegex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;

      if (dateRegex.test(searchValue)) {
        const [year, month, day] = searchValue.split("/");
        const searchDate = new Date(`${year}-${day}-${month}`);
        const startOfDay = new Date(
          searchDate.getFullYear(),
          searchDate.getMonth(),
          searchDate.getDate()
        );
        const endOfDay = new Date(
          searchDate.getFullYear(),
          searchDate.getMonth(),
          searchDate.getDate() + 1
        );

        this.query = this.query.find({
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        });
      } else {
        const regex = new RegExp(searchValue, "i");
        this.query = this.query.find({
          $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
            { role: { $regex: regex } },
          ],
        });
      }
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 4;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = apiFeatures;
