# Quy ước Routes

## Đối tượng học viên:

Prefix: /

## Đối tượng admin:

Prefix: /admin

## Đối tượng giảng viên:

Prefix: /teacher

## Đối tượng xác thực (Authentication):

Prefix: /auth
- Tổng quan phần mềm
  + Phần mềm dành cho các đối tượng Admin, Giảng viên,Sinh viên
  + Giao diện thân thiện dễ sử dụng
  + Các module có đầy đủ các chức năng:
    1.Thêm sửa xóa danh sách
    2.Import, Export bằng file excel (xlsx)
    3.Sắp xếp các thứ tự hiển thị các cột trong Table
    4.Ẩn/Hiện các cột trong Table
    5.Phân trang, tùy chỉnh số dòng trên 1 trang
    6.Chức năng lọc tìm kiếm thông tin 
- Xây dựng website bán hàng sử dụng Nodejs + Express + Mysql Các kỹ thuật sử dụng:
  + Các chức năng liên quan đến Authentication(Xác thực 2 yếu tố 2FA thông qua mail,Xác thực đăng nhập 1 lần,Mật khẩu 1 lần OTP hoặc mã Pin,..)
  + Phân quyền theo vai trò 
  + Đăng nhập qua mạng xã hội Google,Facebook
  + Một tài khoản chỉ đăng nhập được 1 thiết bị
  + Mail xác thực tài khoản và reset mật khẩu Kèm một số chức năng khác
