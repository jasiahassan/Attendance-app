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
      console.log(searchValue);
      const timestamp = "2024-04-03T05:41:39.633+00:00";
      const date = new Date(timestamp);

      // Extract year, month, and day components separately
      const year = date.getFullYear();
      const month = date.getMonth(); // Month starts from 0, so add 1 to get the correct month
      const day = date.getDate();

      // Construct the date string in the desired format (DD/MM/YYYY)
      const formattedDate = `${day}/${month}/${year}`;

      console.log(formattedDate); // Output: "3/4/2024"

      // Check if the search value is in date format (assuming DD/MM/YYYY format)
      const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      if (dateRegex.test(searchValue)) {
        const [day, month, year] = searchValue.split("/");
        const searchDate = new Date(`${year}-${month}-${day}`);
        console.log(searchDate);
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
