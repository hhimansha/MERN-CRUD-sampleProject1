const router = require("express").Router();
let Student = require("../models/student.js");

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    });

    newStudent.save().then(() => {
        res.json("Student Added");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    });
});

// fetch all users
router.route("/").get((req, res) => {
    Student.find().then((students) => {
        res.json(students);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    });
});

// update user details
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;

    // another method to request values. (restructure method)
    const { name, age, gender } = req.body;

    const updateStudent = {
        name,
        age,
        gender
    };

    try {
        const update = await Student.findByIdAndUpdate(userId, updateStudent);
        res.status(200).json({ status: "User updated", user: update });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with updating user", error: err.message });
    }
});

// delete user
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    try {
        await Student.findByIdAndDelete(userId);
        res.status(200).json({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with deleting user", error: err.message });
    }
});

// fetch only one user details
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    try {
        const user = await Student.findById(userId);
        res.status(200).json({ status: "User fetched", user: user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with fetching user", error: err.message });
    }
});

module.exports = router;
