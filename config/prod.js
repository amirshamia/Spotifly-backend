export default {
	dbURL: process.env.MONGO_URL ||'mongodb+srv://amir:<amirsh123>@cluster0.dsf6xvr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp',
	dbName: process.env.DB_NAME || 'station',
}
