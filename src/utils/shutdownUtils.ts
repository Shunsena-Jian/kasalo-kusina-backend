import { type Server } from 'http';
import mongoose from 'mongoose';
import knex from '../config/knex.js';

export function setupGracefulShutdown(server: Server) {
    const gracefulShutdown = async (signal: string) => {
        console.log(`Recevied ${signal}. Closing server...`);

        server.close(async() => {
            console.log('HTTP server closed.');

            try {
                await mongoose.connection.close(false);
                console.log('MongoDB connection closed.');

                await knex.destroy();
                console.log('MySQL connection closed.');

                console.log('Server closed.');
                process.exit(0);
            } catch (err) {
                console.error('Error during shutdown: ', err);
                process.exit(1);
            }
        });

        setTimeout(() => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}