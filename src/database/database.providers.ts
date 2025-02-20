import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseProvider = MongooseModule.forRootAsync({
  useFactory: async () => {
    const mongoose = require('mongoose');

    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Conectado a MongoDB correctamente');
    } catch (error) {
      console.error('❌ Error al conectar a MongoDB:', error.message);
      process.exit(1);
    }

    return {
      uri: process.env.MONGO_URI,
    };
  },
});
