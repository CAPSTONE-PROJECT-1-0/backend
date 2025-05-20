'use strict';

const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

// Database sederhana (dalam produksi, gunakan database sesungguhnya)
const users = [];

const register = async (request, h) => {
    try {
        const { username, password, name } = request.payload;
        
        // Cek jika username sudah ada
        if (users.some(user => user.username === username)) {
            return Boom.conflict('Username already exists');
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = {
            id: nanoid(),
            username,
            password: hashedPassword,
            name
        };
        
        users.push(user);
        
        return h.response({
            status: 'success',
            message: 'User registered successfully',
            data: {
                userId: user.id,
                name: user.name
            }
        }).code(201);
    } catch (error) {
        return Boom.badImplementation(error);
    }
};

const login = async (request, h) => {
    try {
        const { username, password } = request.payload;
        
        const user = users.find(u => u.username === username);
        if (!user) {
            return Boom.unauthorized('Invalid username or password');
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return Boom.unauthorized('Invalid username or password');
        }
        
        // Buat token JWT
        const token = Jwt.token.generate(
            {
                userId: user.id,
                username: user.username,
                name: user.name
            },
            {
                key: 'your_super_secret_key', // Ganti dengan secret key yang kuat
                algorithm: 'HS256',
                ttlSec: 3600 // 1 jam
            }
        );
        
        return h.response({
            status: 'success',
            message: 'Login successful',
            data: {
                token,
                userId: user.id,
                name: user.name
            }
        });
    } catch (error) {
        return Boom.badImplementation(error);
    }
};

const logout = async (request, h) => {
    try {
        // Dalam implementasi nyata, Anda mungkin ingin menambahkan token ke daftar hitam
        return h.response({
            status: 'success',
            message: 'Logout successful'
        });
    } catch (error) {
        return Boom.badImplementation(error);
    }
};

const getUserProfile = async (request, h) => {
    try {
        const userId = request.auth.credentials.userId;
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return Boom.notFound('User not found');
        }
        
        return h.response({
            status: 'success',
            data: {
                userId: user.id,
                username: user.username,
                name: user.name
            }
        });
    } catch (error) {
        return Boom.badImplementation(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    getUserProfile
};