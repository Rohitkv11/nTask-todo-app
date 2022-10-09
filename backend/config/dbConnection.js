import mongoose from "mongoose";
import chalk from 'chalk';


const connectDB = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(chalk.blue("Database connected succesfully"));
    } catch (error) {
      console.log(chalk.red(`Error: ${error.message}`));
    }       
  };
  
  export default connectDB;
