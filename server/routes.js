const express = require("express");
const router = express.Router();
const Task = require("./model/taskModel");
const User = require("./model/userModel");
const { json } = require("stream/consumers");
const bcrypt = require("bcrypt");

router.use(express.urlencoded({ extended: false }));

// Enable CORS if needed

router.post("/task", async (req, res) => {
  try {
    // console.log(req.body);
    const task = new Task(req.body);
    await task.save();
    res.status(200).json({ message: "Task created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/alltasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    // console.log(tasks);
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.get("/alltasks/:id", async (req, res) => {
  try {
    console.log(req.params.id);

    const tasks = await Task.find({ id: req.params.id });
    console.log(tasks);
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await Task.deleteOne({ id: req.params.id });
    // res.redirect('http://localhost:3000')
  } catch (err) {
    console.log(err);
  }
});
router.patch("/check/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const task = await fetch("http://localhost:5000/alltasks/" + req.params.id);
    const jsonData = await task.json();
    console.log(jsonData);
    const check = jsonData[0].completed;
    // console.log(completed);
    await Task.updateOne({ id: req.params.id }, { completed: !check });
  } catch (err) {
    console.log(err);
  }
});
router.post("/register", async (req, res) => {
  try {
    const { userid, password } = req.body;
    const idCheck = await User.findOne({ userid });
    if (idCheck) {
      return res.json({ msg: "ID already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userid,
      password: hashedPassword,
    });
    delete user.password;
    console.log(req.body);
    // res.redirect("http://localhost:3000/");
    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { userid, password } = req.body;
    const idCheck = await User.findOne({ userid: userid });
    if (!idCheck) {
      alert("incorrect username or password");
      res.json("Wrong username or password");
    }
    const isPasswordValid = await bcrypt.compare(password, idCheck.password);
    // console.log("yupo");
    if (!isPasswordValid) {
      alert("incorrect username or password");
      res.json("Wrong username or password");
    }
    delete idCheck.password;
    // console.log(usernameCheck);

    res.json({ status: true, user: idCheck });
    // res.redirect("http://localhost:3000/");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
