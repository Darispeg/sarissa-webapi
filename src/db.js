const { connect } = require("mongoose")

const connectDB = async () => {
    try {
        await connect("mongodb+srv://darispeg:charizard@emicluster.cygln.mongodb.net/sarisa?retryWrites=true&w=majority");        
        console.info('Mongodb connected');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { connectDB };