'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const appConfig = require('../config');

// In-memory token blacklist (untuk production gunakan Redis atau database)
const tokenBlacklist = new Set();

const register = async (request, h) => {
  try {
    const { email, password, name } = request.payload;

    // Validasi input
    if (!email || !password || !name) {
      return Boom.badRequest('Email, password, and full name are required');
    }
    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Boom.badRequest('Invalid email format');
    }
    // Validasi apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return Boom.conflict('Email already registered');
    }
    // Validasi apakah email adalah @gmail.com
    // (Jika ingin membatasi hanya @gmail.com, bisa diaktifkan)
    // Jika ingin membatasi hanya @gmail.com, uncomment baris berikut
    if (!email.endsWith('@gmail.com')) {
      return Boom.badRequest('Email must be a @gmail.com address');
    }
    // Validasi apakah password memenuhi kriteria
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return Boom.badRequest('Password must contain letters, numbers, and at least 1 special character');
    }
    // Hash password sebelum menyimpan ke database
    // Menggunakan bcrypt untuk meng-hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Menggunakan Sequelize untuk membuat user baru
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name
    });

    return h.response({
      status: 'success',
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    }).code(201);
  } catch (error) {
    console.error('Registration error:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return Boom.unauthorized('Invalid email or password');
    }

    // Tambahkan log untuk cek password hash
    if (!user.password) {
      console.error('User found but password is null:', user);
      return Boom.badImplementation('User password is missing in database');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return Boom.unauthorized('Invalid email or password');
    }

    // Tambahkan log untuk cek config JWT
    if (!appConfig.jwt || !appConfig.jwt.secret || !appConfig.jwt.expiresIn) {
      console.error('JWT config missing:', appConfig.jwt);
      return Boom.badImplementation('JWT configuration error');
    }

    const token = Jwt.token.generate(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      {
        key: appConfig.jwt.secret,
        algorithm: 'HS256',
        expiresIn: appConfig.jwt.expiresIn
      }
    );

    return h.response({
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return Boom.badImplementation(error.message || 'Internal server error');
  }
};

const logout = async (request, h) => {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Boom.unauthorized('No token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Add token to blacklist
    tokenBlacklist.add(token);

    return h.response({
      status: 'success',
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const getUserProfile = async (request, h) => {
  try {
    // JWT middleware sudah memverifikasi token, jadi langsung ambil dari credentials
    const userId = request.auth.credentials.userId;

    // Menggunakan Sequelize untuk mendapatkan data user
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'full_name']
    });

    // Jika user tidak ditemukan, kembalikan error 404
    if (!user) {
      return Boom.notFound('User not found');
    }

    return h.response({
      status: 'success',
      data: {
        userId: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return Boom.badImplementation('Internal server error');
  }
};

// Function to check if token is blacklisted
const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};

module.exports = {
  register,
  login,
  logout,
  getUserProfile,
  isTokenBlacklisted
};