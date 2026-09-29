const fs = require("fs");
const path = require("path");

// lay command user nhap vao dua vao mang process.argv tra ve
const command = process.argv[2];

if (command === "list") {
  // tra ve mang cac thu muc va file o duong dan hien tai
  const files = fs.readdirSync(".");

  // duyet qua mang duoc tra ve
  files.forEach((file) => {
    // lay thong tin cua file
    const stats = fs.statSync(file);

    if (stats.isDirectory()) {
      console.log("FOLDER:", file);
    } else {
      console.log("FILE:", file);
    }
  });
} else if (command === "create") {
  // lay file name user nhap vao
  const fileName = process.argv[3];

  if (!fileName) {
    console.log("Chưa nhập tên file, vui lòng thử lại!");
  } else {
    // lay duong dan cua file
    const filePath = path.join(__dirname, fileName);

    // kiem tra file ton tai chua
    if (fs.existsSync(filePath)) {
      console.log("Tên file đã tồn tại, vui lòng tạo file có tên khác!");
    } else {
      fs.writeFileSync(filePath, "");
      console.log("Đã tạo file:", fileName);
    }
  }
} else if (command === "read") {
  const fileName = process.argv[3];

  if (!fileName) {
    console.log("Chưa nhập tên file, vui lòng thử lại!");
  } else {
    // lay duong dan cua file
    const filePath = path.join(__dirname, fileName);

    // kiem tra file ton tai chua
    if (!fs.existsSync(filePath)) {
      console.log("Tên file không tồn tại, hãy kiểm tra lại!");
    } else {
      data = fs.readFileSync(filePath, "utf-8");
      console.log(data);
    }
  }
} else if (command === "write") {
  console.log("Xóa file");
} else if (command === "delete") {
  console.log("Xóa file");
} else {
  console.log("Command không hợp lệ!");
}
