const { hashSync, compareSync } = require("bcrypt");
const Query = require("../models/Query");
const User = require("../models/User");
const Common = require("../lib/common");
const { generateApiKey } = require("generate-api-key");
const { v4: uidgen } = require("uuid");

exports.login = async (req, res) => {
  try {
    const findUser = await User.findOne({ username: req.body.username });
    if (!findUser)
      return res
        .status(401)
        .send({ success: false, message: "User doesn't exist" });
    const passwordMatch = compareSync(req.body.password, findUser.password);
    if (!passwordMatch)
      return res
        .status(401)
        .send({ success: false, message: "Wrong password" });
    findUser.password = undefined;
    res.send(findUser);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    let full_name = req.body.full_name;

    if (username.length == 0)
    {
      return res.status(400).send({ success: false, message: "Email is require" });
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username) == false)
    {
      return res.status(400).send({ success: false, message: "Email is invail" });
    }

    if (password.length == 0)
    {
      return res.status(400).send({ success: false, message: "Password is require" });
    }

    if (password.length < 8)
    {
      return res.status(400).send({ success: false, message: "Password more than 8 characters" });
    }

    if (full_name.length == 0)
    {
      return res.status(400).send({ success: false, message: "Full name is require" });
    }

    if (password.length < 6)
    {
      return res.status(400).send({ success: false, message: "Password more than 6 characters" });
    }

    let api = await Common.getChatAPI();
    api = await Common.encrypt(api);

    const newQuery = new Query({ texts: [] });
    const { _id } = await newQuery.save();
    const newUser = new User({
      uid: uidgen(),
      ...req.body,
      password: hashSync(req.body.password, 10),
      apiKey: generateApiKey({ method: "bytes" }),
      chatgptkey: api,
      queries: _id,
    });
    const user = await newUser.save();
    user.password = undefined;
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.asignup = async (req, res) => {
  try {
    let username = "id_" + generateApiKey({ method: "bytes" });
    let password = generateApiKey({ method: "bytes" });
    let full_name = "noname";

    let api = await Common.getChatAPI();
    api = await Common.encrypt(api);
    
    const newQuery = new Query({ texts: [] });
    const { _id } = await newQuery.save();
    const newUser = new User({
      uid: uidgen(),
      username: username,
      password: hashSync(password, 10),
      apiKey: generateApiKey({ method: "bytes" }),
      chatgptkey: api,
      queries: _id,
    });
    const user = await newUser.save();
    user.password = undefined;
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, message: err.message });
  }
};