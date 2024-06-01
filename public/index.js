const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const functions = require('firebase-functions')
    
require('dotenv').config();

const app = express();
app.use(express.json());
////////////////////////////


// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
});

const db = admin.firestore();

// Admin Login Route - Generate Token
app.post('/token', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userRef = db.collection('admins').doc(username);
        const doc = await userRef.get();

        if (!doc.exists || doc.data().password !== password) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ access_token: token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Revoke Token Route
app.post('/revoke', (req, res) => {
    const { token } = req.body;

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token');
            }
            // Add token to blacklist or handle revocation logic
            res.send('Token revoked');
        });
    } catch (error) {
        console.error('Error revoking token:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


exports.api = functions.https.onRequest(app)