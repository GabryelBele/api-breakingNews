import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Conexão com o banco de dados estabelecida com sucesso.");
    })
    .catch((error) => {
      console.error("Erro ao conectar ao banco de dados:", error);
    });
};

export default connectDatabase;
