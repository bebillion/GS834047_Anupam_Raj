// import * as XLSX from "xlsx";

// // Define a generic interface for dynamic Excel data
// export interface ExcelData {
//   [sectionName: string]: Record<string, unknown>[]; // Each section holds an array of objects
// }

// export const parseExcelFile = async (file: File): Promise<ExcelData> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       try {
//         if (!e.target?.result) {
//           return reject(new Error("Failed to read file."));
//         }

//         const data = new Uint8Array(e.target.result as ArrayBuffer);
//         const workbook = XLSX.read(data, { type: "array" });

//         if (workbook.SheetNames.length === 0) {
//           return reject(new Error("The uploaded Excel file contains no sheets."));
//         }

//         let structuredData: ExcelData = {};

//         // Loop through all sheets and convert them dynamically
//         workbook.SheetNames.forEach((sheetName) => {
//           const worksheet = workbook.Sheets[sheetName];

//           // Convert sheet data to JSON
//           let jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

//           // Store the data under its sheet name
//           structuredData[sheetName] = jsonData;
//         });

//         console.log("Dynamic JSON Data:", structuredData); // Debugging output
//         resolve(structuredData);
//       } catch (error) {
//         console.error("Error parsing Excel file:", error);
//         reject(new Error("Error parsing the Excel file."));
//       }
//     };

//     reader.onerror = (error) => reject(new Error("File read error: " + error));
//     reader.readAsArrayBuffer(file);
//   });
// };
