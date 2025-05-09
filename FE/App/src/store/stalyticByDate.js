/**
 * Tính % tăng/giảm theo chu kỳ tháng so với tháng trước
 * @param {Array<Object>} records      Mảng các bản ghi dạng { [dateField]: string, [valueField]: number, ... }
 * @param {Object}       [options]
 * @param {string}       [options.dateField='adddate']  Tên trường ngày (ISO hoặc 'dd/MM/yyyy')
 * @param {string}       [options.valueField='total']  Tên trường giá trị cần gom nhóm
 * @returns {Array<{ period: string, total: number, growth: number|null }>}
 *
 * Ví dụ kết quả:
 * [
 *   { period: '2025-02', total: 80,  growth: null   },
 *   { period: '2025-03', total: 120, growth: 50.00  },
 *   { period: '2025-04', total: 200, growth: 66.67  },
 *   …
 * ]
 */
function calculateMonthlyGrowth(records, {
    dateField = 'adddate',
    valueField = 'total',
  } = {}) {
    // 1) Gom nhóm tổng theo tháng
    const monthTotals = records.reduce((acc, rec) => {
      let d = rec[dateField];
      let dt;
      // parse ISO (ví dụ "2025-03-24T17:00:00.000Z") hoặc dd/MM/yyyy
      if (typeof d === 'string' && d.includes('T')) {
        dt = new Date(d);
      } else if (typeof d === 'string' && d.includes('/')) {
        const [day, month, year] = d.split('/').map(Number);
        dt = new Date(year, month - 1, day);
      } else if (d instanceof Date) {
        dt = d;
      } else {
        // fallback: new Date(...) — tuỳ dữ liệu
        dt = new Date(d);
      }
  
      const mm = (dt.getMonth() + 1).toString().padStart(2, '0');
      const yyyy = dt.getFullYear();
      const key = `${yyyy}-${mm}`;  // định dạng ISO month
  
      acc[key] = (acc[key] || 0) + Number(rec[valueField] || 0);
      return acc;
    }, {});
  
    // 2) Sắp xếp các period (theo thứ tự tăng dần)
    const periods = Object.keys(monthTotals).sort();
  
    // 3) Tính growth so với tháng liền trước
    const result = periods.map((period, idx) => {
      const total = monthTotals[period];
      let growth = null;
      if (idx > 0) {
        const prev = monthTotals[periods[idx - 1]];
        if (prev !== 0) {
          growth = ((total - prev) / prev) * 100;
          // làm tròn 2 chữ số thập phân
          growth = Math.round(growth * 100) / 100;
        }
      }
      return { period, total, growth };
    });
  
    return result;
  }
  