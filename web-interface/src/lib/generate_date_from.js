export function generate_date_from() {
  // get current date
  const date_from_obj = new Date();

  // get current month
  const current_month = date_from_obj.getMonth();

  // set current date to 5 month ago
  date_from_obj.setMonth(current_month - 5);

  // get year
  const from_year = date_from_obj.getFullYear();

  // get month
  const from_mont = String(date_from_obj.getMonth() + 1).padStart(2, "0");

  // get date
  const from_date = String(date_from_obj.getDate()).padStart(2, "0");

  let default_from_date = `${from_year}-${from_mont}-${from_date}`;

  return default_from_date;
}
