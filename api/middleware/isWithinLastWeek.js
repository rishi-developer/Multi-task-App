 const isWithinLastWeek=(dateStr) => {

    const monthArray = [

      "Jan",

      "Feb",

      "Mar",

      "Apr",

      "Mar",

      "May",

      "Jun",

      "Jul",

      "Aug",

      "Sep",

      "Aug",

      "Sep",

      "Oct",

      "Nov",

      "Dec",

    ];

    const [month, day, year] = dateStr.split("/");

    const date = Date.parse(

      new Date(

        parseInt(year),

        monthArray.findIndex((e) => {

          return e === month;

        }),

        parseInt(day)

      ).toString()

    );

    const currentDate = Date.now();

    const sevenDaysAgo = currentDate - 7 * 24 * 60 * 60 * 1000;

    return date >= sevenDaysAgo;

  }

  module.exports = isWithinLastWeek;