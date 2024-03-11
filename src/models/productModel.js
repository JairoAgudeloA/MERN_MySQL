// models/productModel.js
//creacion modelo producto

import {dbconfig} from '../config/db.config'
import mysql from 'mysql2/promise';

const pool = mysql.createPool(dbconfig);

//obtener todos los productos

// getAll 

export const getProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

//obtener un producto por su id.
//getById

export const getProductById = async (productId)=>{
    const[rows] = await pool.query('SELECT * FROM products WHERE id=?',[productId]);
    return rows[0];
};

//agregar un nuevo producto

export const createProudct = async (productData) => {
    const {name,price,description} = productData;
    const [result] = await pool.query('INSERT INTO products (name,price,description) VALUES (?,?,?)',[name,price,description]);
    return result.insertId;
};

//actualizar un producto existente
//updateProduct

export const updateProduct = async (productId,productData) => {
    const {name,price,description} = productData;
    await pool.query('UPDATE products SET name=?,price=?,description=? WHERE id=?',[name,price,description,productId]);
};

//eliminar un producto existente
//delete 

export const deleteProduct = async (productoId) => {
    if(productoId){
        await pool.query('DELETE FROM products WHERE id=?',[productoId]);
    }else{
        throw new Error('El id del producto no puede ser nulo');
    }
}
