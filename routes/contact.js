//import express
const express = require("express");

// express.Router
const router = express.Router();

//import Contact model
const Contact = require("../models/Contact");

//************ Routes ******************/

/**
 * @desc: test
 * @method: Get
 * @path: "http://localhost:5000/api/contacts/test"
 * @data: no data
 * @access: public
 */

router.get("/test", (req, res) => {
  res.send({ msg: "Hello test" });
});

/**
 * @desc: add contact
 * @method: POST
 * @path: "http://localhost:5000/api/contacts/add_contact"
 * @data: req.body
 * @access: public
 */

router.post("/add_contact", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    //name and email are required
    if (!name || !email) {
      res.status(400).send({ msg: "name and email are required !!" });
      return;
    }

    //email is unique
    {
      /*const contact = Contact.findOne({ email });
    if (!contact) {
      res.status(400).send({ msg: "email should be unique !!" });
      return;
    } */
    }

    const newContact = Contact({ name, email, phone });
    await newContact.save();
    res
      .status(200)
      .send({ msg: "new contact is successfully added", newContact });
  } catch (error) {
    res.status(400).send({ msg: "Can not add contact", error });
  }
});

/**
 * @desc: get all contacts
 * @method: GET
 * @path: "http://localhost:5000/api/contacts/"
 * @data: no data
 * @access: public
 */

router.get("/", async (req, res) => {
  try {
    const contactList = await Contact.find();
    res.status(200).send({ msg: "list of contacts ", contactList });
  } catch (error) {
    res.status(400).send({ msg: "can not get all contacts ", error });
  }
});

/**
 * @desc: get a contact
 * @method: GET
 * @path: "http://localhost:5000/api/contacts/contact/:id"
 * @data: req.params
 * @access: public
 */

router.get("/contact/:id", async (req, res) => {
  try {
    const contactToFind = await Contact.findOne({ _id: req.params.id });
    res.status(200).send({ msg: "contact searched is ", contactToFind });
  } catch (error) {
    res.status(400).send({ msg: "con not find contact by this id ", error });
  }
});

/**
 * @desc: delete contact
 * @method: DELETE
 * @path: "http://localhost:5000/api/contacts/delete_contact/:id"
 * @data: req.params
 * @access: public
 */

router.delete("/delete_contact/:id", async (req, res) => {
  try {
    const contactToDelete = await Contact.findOneAndDelete({
      _id: req.params.id,
    });
    if (!contactToDelete) {
      res.status(400).send({ msg: "contact is already deleted !! " });
    }
    res
      .status(200)
      .send({ msg: "contact is successfully deleted !!", contactToDelete });
  } catch (error) {
    res.status(400).send({ msg: "Can not delete contact ", error });
  }
});

/**
 * @desc: edit contact
 * @method: PUT
 * @path: "http://localhost:5000/api/contacts/edit_contact/:id"
 * @data: req.params , req.body
 * @access: public
 */

router.delete("/edit_contact/:id", async (req, res) => {
  try {
    const contactToEdit = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res
      .status(200)
      .send({ msg: "contact is successfully updated !!", contactToEdit });
  } catch (error) {
    res.status(400).send("con not edit contact ", error);
  }
});

module.exports = router;
