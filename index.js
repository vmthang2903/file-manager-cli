const fs = require("fs");
const path = require("path");
const readline = require("readline");

// lay command tu tham so dong lenh
const command = process.argv[2];

// lay file name user nhap vao
const fileName = process.argv[3];

// lay noi dung user nhap vao
const content = process.argv.slice(4).join(" ");

if (command === "list") {
  // tra ve mang cac thu muc va file o duong dan hien tai
  const files = fs.readdirSync(__dirname);

  // duyet qua mang duoc tra ve
  files.forEach((file) => {
    // lay thong tin cua file
    const stats = fs.statSync(path.join(__dirname, file));

    if (stats.isDirectory()) {
      console.log("FOLDER:", file);
    } else {
      console.log("FILE:", file);
    }
  });
} else if (command === "create") {
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
  if (!fileName) {
    console.log("Chưa nhập tên file, vui lòng thử lại!");
  } else {
    // lay duong dan cua file
    const filePath = path.join(__dirname, fileName);
    // kiem tra file ton tai chua
    if (!fs.existsSync(filePath)) {
      console.log("Tên file không tồn tại, hãy kiểm tra lại!");
    } else {
      // lay data trong file -> in ra console
      const data = fs.readFileSync(filePath, "utf-8");
      console.log(data);
    }
  }
} else if (command === "write") {
  if (!fileName) {
    console.log("Chưa nhập tên file, vui lòng thử lại!");
  } else if (!content) {
    console.log("Chưa nhập nội dung, hãy kiểm tra lại!");
  } else {
    // lay duong dan cua file
    const filePath = path.join(__dirname, fileName);

    // ghi noi dung vao file
    fs.writeFileSync(filePath, content);
    console.log("Đã ghi nội dung vào file:", fileName);
  }
} else if (command === "append") {
  if (!fileName) {
    console.log("Chưa nhập tên file, vui lòng thử lại!");
  } else if (!content) {
    console.log("Chưa nhập nội dung, hãy kiểm tra lại!");
  } else {
    // lay duong dan cua file
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) {
      console.log("Tên file không tồn tại, hãy kiểm tra lại!");
    } else {
      // ghi noi dung vao file
      fs.appendFileSync(filePath, "\n" + content);
      console.log("Đã ghi thêm nội dung vào file:", fileName);
    }
  }
} else if (command === "delete") {
  if (!fileName) {
    console.log("Chưa nhập tên file, vui lòng thử lại!");
  } else {
    // lay duong dan cua file
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) {
      console.log("Tên file không tồn tại, hãy kiểm tra lại!");
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        `Bạn có chắc chắn muốn xoá file \"${fileName}\"? (y/n) -> `,
        (answer) => {
          const normalizedAns = answer.trim().toLowerCase();
          if (normalizedAns === "y") {
            fs.unlinkSync(filePath);
            console.log("Đã xoá file:", fileName);
          } else if (normalizedAns === "n") {
            console.log("Không xoá file!");
          } else {
            console.log("Command không hợp lệ!");
          }

          rl.close();
        },
      );
    }
  }
} else if (command === "help") {
} else if (command === "rename") {
  console.log("rename");
} else {
  console.log("Command không hợp lệ!");
}
