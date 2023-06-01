#! /usr/bin/env node

console.log(
    'This script populates some items and categories. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/item");
  const Category = require("./models/category");
  
  const items = [];
  const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
    async function main() {
        console.log("Debug: About to connect");
        await mongoose.connect(mongoDB);
        console.log("Debug: Should be connected?");
        await createCategories();
        await createItems();
        console.log("Debug: Closing mongoose");
        mongoose.connection.close();
    }
    
    async function itemCreate(name, description, category, number_in_stock, price) {
        const item = new Item({ 
            name: name, 
            description: description,
            category: category,
            number_in_stock: number_in_stock,
            price: price
        });
        await item.save();
        items.push(item);
        console.log(`Added item: ${name}`);
    }

    async function categoryCreate(name, description) {
        const category = new Category({ 
            name: name,
            description: description
        });
        await category.save();
        categories.push(category);
        console.log(`Added categiry: ${name}`);
    }

    async function createCategories() {
        console.log("Adding categories");
        await Promise.all([
        categoryCreate("GPU", "A graphics processing unit (GPU)"),
        categoryCreate("CPU", "A central processing unit (CPU)"),
        categoryCreate("RAM", "Random-access memory (RAM)"),
        ]);
    }

    async function createItems() {
        console.log("Adding items");
        await Promise.all([
        itemCreate("Nvidia RTX 4090", "The most powerful graphics card available", categories[0], 10, 999),
        itemCreate("AMD RX 7900XTX", "Top graphics card model available from AMD", categories[0], 15, 999),
        itemCreate("Intel i9 13900k", "Flagship unlocked processor from Intel", categories[1], 25, 799),
        itemCreate("AMD 7950X3D", "Fastest consumer CPU with stacked cache memory", categories[1], 5, 799),
        itemCreate("Corsair DDR4", "Last generation memory from Corsair", categories[2], 20, 49),
        itemCreate("Kingston DDR5", "Latest and greatest from Kingston", categories[2], 30, 99),
    ]);
    }

