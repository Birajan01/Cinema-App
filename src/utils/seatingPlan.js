// utils/seatingPlan.js
export const generateDefaultPlan = (rows, cols) => {
    const layout = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ type: "available", booked: false });
      }
      layout.push(row);
    }
    return layout;
  };
  
  export const loadSeatingPlan = (hall, rows, cols) => {
    const stored = localStorage.getItem(`seating-${hall}`);
    return stored ? JSON.parse(stored) : generateDefaultPlan(rows, cols);
  };
  
  export const saveSeatingPlan = (hall, plan) => {
    localStorage.setItem(`seating-${hall}`, JSON.stringify(plan));
  };
  