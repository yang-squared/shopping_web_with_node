let io;

module.exports = {
    init: httpServer => {
        require('socket.io')(httpServer)(httpServer);
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket.io not initialized');
        }
        return io;
    }
}