export const READ_CSV = 'READ_CSV';

export function readCSV(data: object[]) {
  return {
    type: READ_CSV,
    data
  };
}
