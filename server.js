import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expressListEndpoints from "express-list-endpoints";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const { Schema, model } = mongoose;

// Define mongoose Schema since more complex than just using mongoose model
const ticketSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true // gör att det inte blir dubbla id:n av misstag
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
    // minlength: 5,
    // maxlength: 140
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high']
    // default: low
  },
  user_email: {
    type: String,
    required: true
  }
});

const Ticket = model('Ticket', ticketSchema);

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(expressListEndpoints(app));
});

app.get("/tickets", async (req, res) => {
  const tickets = await Ticket.find().exec();
  // const tickets = await Ticket.find().sort({ createdAt: 'desc' }).limit(20).exec();
  res.json(tickets);
});

app.post("/tickets", async (req, res) => {
  //Retrieve info that is sent by the user to our API endpoint
  // I use {} around message to make sure ONLY message can be sent in by the user, not hearts and createdAt.
  const { title, body, priority, user_email } = req.body;

  try {
    // Hämta högsta existerande id
    const latestTicket = await Ticket.findOne().sort({ id: -1 }).exec();
    const nextId = latestTicket ? latestTicket.id + 1 : 1;

    const ticket = new Ticket({
      id: nextId,
      title,
      body,
      priority,
      user_email
    });

    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(400).json({ message: "Could not save ticket to database", error: err.errors });
  }
});

app.get("/tickets/:id", async (req, res) => {
  const { id } = req.params;
  const ticket = await Ticket.findOne({ id: Number(id) }).exec();

  res.json(ticket);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
