"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./router/routes"));
const dbConnection_1 = require("./db/dbConnection");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
(0, dbConnection_1.dbConnection)({ database: 'tender', username: 'postgres', password: 'oppoa33f' });
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
