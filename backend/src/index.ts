import { app } from './app.js';
import { config } from './config.js';

app.listen(config.port, () => console.log(`Tetarasa API listening at http://localhost:${config.port}`));
