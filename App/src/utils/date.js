/**
 * Chuyển đổi chuỗi ngày ISO sang định dạng "dd/mm/yyyy"
 * @param {string} isoDate - Chuỗi ngày theo định dạng ISO (VD: "2025-03-24T17:00:00.000Z")
 * @returns {string} - Chuỗi ngày đã được format theo "dd/mm/yyyy"
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
  
    let day = date.getDate();
    let month = date.getMonth() + 1; // Vì getMonth() trả về từ 0 đến 11
    const year = date.getFullYear();
  
    // Định dạng lại để ngày và tháng luôn có 2 chữ số
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
  
    return `${day}/${month}/${year}`;
  }
  
export default {
    formatDate
}