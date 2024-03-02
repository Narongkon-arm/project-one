const User = require('../models/User'); // Import User model ที่เราสร้างขึ้น
// เราสามารถใช้ User model เพื่อดำเนินการกับข้อมูลผู้ใช้ในฐานข้อมูล

module.exports = (req, res) => {
    User.create(req.body) // สร้างผู้ใช้ใหม่จากข้อมูลที่ส่งมาจาก request body
        .then(() => {
            console.log("User registered successfully!"); // บันทึกข้อความเมื่อลงทะเบียนผู้ใช้สำเร็จ
            res.redirect('/'); // Redirect ผู้ใช้ไปยังหน้าแรกหลังจากลงทะเบียนสำเร็จ
        })
        .catch((error) => {
            // console.log(error.errors); // บันทึกข้อผิดพลาดหากมีข้อผิดพลาดเกิดขึ้นในระหว่างการสร้างผู้ใช้

            if (error) {
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                req.flash('validationErrors',validationErrors)
                req.flash('data', req.body)
                return res.redirect('/register')
            }
        });
};