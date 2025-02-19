import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseProvider = MongooseModule.forRootAsync({
  useFactory: async () => {
    const mongoose = require('mongoose');

    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/complaints_db');
      console.log('✅ Conectado a MongoDB correctamente');
    } catch (error) {
      console.error('❌ Error al conectar a MongoDB:', error.message);
      process.exit(1);
    }

    return {
      uri: 'mongodb://127.0.0.1:27017/complaints_db',
    };
  },
});
