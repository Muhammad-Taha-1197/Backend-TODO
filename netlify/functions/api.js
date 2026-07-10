import serverless from "serverless-http";
import server from "../../server.js";
import { Connection } from "../../config/db.js";

// Connect to the database
Connection();

// Export the serverless handler
export const handler = serverless(server, { basePath: '/.netlify/functions' });
