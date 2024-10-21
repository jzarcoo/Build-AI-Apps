/**
 * Format a date to YYYY-MM-DD
 * @param {Date} date
 * @returns {string} formatted date in YYYY-MM-DD
 */
function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

/**
 * Get date n days ago
 * @param {number} n the number of days to subtract from today
 * @returns {string} the date n days ago
 */
function getDateNDaysAgo(n) {
    const now = new Date(); // current date and time
    now.setDate(now.getDate() - n); // subtract n days
    return formatDate(now);
}

/**
 * Get start and end dates
 * @returns {object} start and end dates
 */
export const dates = {
    startDate: getDateNDaysAgo(3), // alter days to increase/decrease data set
    endDate: getDateNDaysAgo(1) // leave at 1 to get yesterday's data
}