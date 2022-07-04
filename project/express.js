const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
//const cashModel = require("./dbmodels");

//to handle json type api calls
app.use(express.json());
app.use(express.urlencoded());
const food = ["kabab", "nihari", "daal rice"];
app.use(cors());
const {
  createEntry,
  getAllEntries,
  getOneEntry,
  deleteEntry,
  updateEntry,
} = require("./modelOperations");
const cashModel = require("./dbmodels");

mongoose
  .connect(
    "mongodb+srv://Asadm26:OpenCode.mdbA26@clustera26.zhmri.mongodb.net/JQAPI?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("Connected with mongodb");
    /* let e = await createEntry("Testing for Asim",300,"abcdefg"); 
    console.log(e); */
    /* let e = await deleteEntry("629fa3acac6ba6aa33e50554");
    console.log(e); */
  })
  .catch(() => {
    console.log("Error while connecting with database");
  });

//read or fetch requests
app.get("/api/expense", async (req, res) => {
  let e = await getAllEntries();
  res.send(e);
});
//fetch single product
app.get("/api/expense/:id", async (req, res) => {
  let e = await getOneEntry(req.params.id);
  res.send(e);
});

//Post - create request
app.post("/api/expense", async (req, res) => {
  //1st is starting index, 2nd is no. of records to be deleted. here the only one itself
  /* food.push(req.body.name);
  res.send(food); */
  let obj = req.body;
  console.log("Posting: ", obj);
  let entry = await createEntry(obj.title, obj.price, obj.description);
  res.send(entry);
});

//Put - update request
app.put("/api/expense/:id", async (req, res) => {
  let obj = req.body;
  console.log("Updating", obj);
  try {
    let entry = await cashModel.findById(req.params.id);
    entry.title = req.body.title;
    entry.price = req.body.price;
    entry.description = req.body.description;
    await entry.save();
    res.send(entry);
  } catch (err) {
    console.log("error occured while updating" + err.message);
    res.send("Error while updating");
  }

  /* try {
    let CashModel = await cashModel.findById(req.params.id);
    CashModel.title = req.body.title;
    CashModel.price = req.body.price;
    CashModel.description = req.body.description;
    await CashModel.save();
    console.log(CashModel);
    res.send(CashModel);
  } catch (err) {
    console.log("Put Route " + err.message);
  } */
});

//delete request
app.delete("/api/expense/:id", async (req, res) => {
  //1st is starting index, 2nd is no. of records to be deleted. here the only one itself
  /* food.splice(req.params.id, 1);
  res.send(food); */
  let entry = await deleteEntry(req.params.id);
  console.log("Deleted", entry);
  res.send(entry);
});

app.listen(3030);
