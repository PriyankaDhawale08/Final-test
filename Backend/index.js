const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// MongoDB User schema
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    walletBalance: { type: Number, default: 1000 }
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB (updated connection string)
mongoose.connect('mongodb://ecommerce:priyanka@ac-svxf7ya-shard-00-00.ugavg21.mongodb.net:27017,ac-svxf7ya-shard-00-01.ugavg21.mongodb.net:27017,ac-svxf7ya-shard-00-02.ugavg21.mongodb.net:27017/Trial?ssl=true&replicaSet=atlas-jrvlfh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Signup Route
app.post('/signup', async (req, res) => {
    const { name, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = 'dummy-token'; 
            res.status(200).json({
                message: 'Login successful',
                name: user.name,
                walletBalance: user.walletBalance,
                token
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});

// Start the server
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
