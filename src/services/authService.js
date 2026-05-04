const bcrypt = require("bcrypt");
const { readUsers, writeUsers } = require("../models/userModel");
const { generateToken } = require("../utils/jwt");
const { randomUUID } = require("crypto");

async function registerUser({ name, email, password }) {
    const users = await readUsers();

    const existing = users.find(u => u.email === email);
    if (existing) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: randomUUID(),
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);

    const token = generateToken({ id: newUser.id, email });

    return { user: { id: newUser.id, name, email }, token };
}

async function loginUser({ email, password }) {
    const users = await readUsers();

    const user = users.find(u => u.email === email);
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken({ id: user.id, email });

    return { user: { id: user.id, name: user.name, email }, token };
}

module.exports = {
    registerUser,
    loginUser,
};