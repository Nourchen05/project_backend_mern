const add_contact = async (req, res) => {
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
};

module.exports = controllers = { add_contact };
