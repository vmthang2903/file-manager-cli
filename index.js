const fs = require("fs");

const command = process.argv[2];

if (command === "list") {
  const files = fs.readdirSync(".");

  files.forEach((file) => {
    const stats = fs.statSync(file);

    if (stats.isDirectory()) {
      console.log("FOLDER:", file);
    } else {
      console.log("FILE:", file);
    }
  });
} else if (command === "create") {
  console.log("Tạo file");
} else if (command === "read") {
  console.log("Đọc file");
} else if (command === "delete") {
  console.log("Xóa file");
} else {
  console.log("Command không hợp lệ!");
}
