const fs = require('fs');
const path = require('path');

const sessionFilePath = path.resolve(__dirname, 'sessions/sessions.json');

function readSessionsFromFile() {
    try {
        const data = fs.readFileSync(sessionFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

function writeSessionsToFile(sessions) {
    try {
        fs.writeFileSync(sessionFilePath, JSON.stringify(sessions, null, 2));
    } catch (err) {
        console.error('Error writing sessions to file:', err);
    }
}

module.exports = function(session) {
    return function(req, res, next) {
        const sessions = readSessionsFromFile();

        // Save session data to the file
        req.session.save = () => {
            sessions[req.sessionID] = req.session;
            writeSessionsToFile(sessions);
        };

        // Load session data from the file
        req.session.reload = () => {
            req.session = sessions[req.sessionID] || {};
        };

        next();
    };
};