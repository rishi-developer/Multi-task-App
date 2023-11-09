const newConnection = require("../database/db");
const updateUserDetails = async (data) => {
  let pool = newConnection();
  try {
    await pool.query(
      "INSERT INTO user_details (emp_id,department,email_id,name,total_points,photo_url,designation,mobile_number,location) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        data.EmployeeCode,
        data.DepartmentName,
        data.Email,
        data.EmployeeName,
        0,
        data.ImagePath,
        data.Designation,
        data.MobileNumber,
        data.Location,
      ]
    );
  } catch (err) {
    console.log(err.message);
    try {
      await pool.query(`UPDATE user_details SET 
                department = '${data.DepartmentName}',
                emp_id = '${data.EmployeeCode}',
                photo_url = '${data.ImagePath}'
                WHERE LOWER("email_id") = '${data.Email.toLowerCase()}'
            `);
    } catch (err) {
      console.log(err);
    }
  } finally {
    pool.end();
  }
};
module.exports = updateUserDetails;