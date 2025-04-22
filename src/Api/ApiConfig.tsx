const API_CONFIG = {
    erdogan: {
        url: 'http://localhost:5200',
        endpoints: {
            game: {
                getAllGames: '/game',
                createGame: '/game/create',
                updateScore: '/game/update-score',
                joinGame: '/game/join',
                getGame: '/game',
                getLiveGames: '/game/live',
                leaveGame: '/game/leave',
            },
            auth: {
                login: '/auth/login',
            },
            admin: {
                create: '/admin/create',
            }

        },
        hubs: {
            game: '/gamehub',
        }
    }
};

export default API_CONFIG;