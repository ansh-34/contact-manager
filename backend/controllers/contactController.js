import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({ ...req.body, userId: req.userId });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(contacts);
};

export const deleteContact = async (req, res) => {
  await Contact.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Contact deleted" });
};
