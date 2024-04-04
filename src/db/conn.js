const mongoose = require("mongoose");

mongoose.connect(process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.error(`Error connecting to MongoDB: ${e.message}`);
});
