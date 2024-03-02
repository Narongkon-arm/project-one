const mongoose = require('mongoose'); // เรียกใช้งานไลบรารี mongoose
const Schema = mongoose.Schema; // สร้างออบเจ็กต์ Schema จาก mongoose
const bcrypt = require('bcrypt'); // เรียกใช้งานไลบรารี bcrypt เพื่อทำการเข้ารหัสรหัสผ่าน

// กำหนด Schema ของผู้ใช้
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'] // ต้องระบุอีเมล (required)
    },
    password: {
        type: String,
        required: [true, 'Please provide password'] // ต้องระบุรหัสผ่าน (required)
    }
});

// Middleware สำหรับเข้ารหัสรหัสผ่านก่อนบันทึกลงฐานข้อมูล
UserSchema.pre('save', function(next) {
    const user = this; // 'this' คือเอกสารผู้ใช้ปัจจุบัน

    // เข้ารหัสรหัสผ่านโดยใช้ bcrypt
    bcrypt.hash(user.password, 10) // 10 เป็น saltRounds
        .then(hash => {
            user.password = hash; // กำหนดรหัสผ่านเป็นค่าที่ถูกเข้ารหัสแล้ว
            next(); // ดำเนินการบันทึกต่อไป
        })
        .catch(error => {
            console.error(error); // บันทึกข้อผิดพลาดที่เกิดขึ้นระหว่างการเข้ารหัส
        });
});

// สร้างโมเดลผู้ใช้ด้วย UserSchema
const User = mongoose.model('User', UserSchema);

module.exports = User; // ส่งออกโมเดล User เพื่อให้สามารถใช้งานในไฟล์อื่นๆ