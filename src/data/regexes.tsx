export const regexes: Record<string, RegExp >= {
    // Regex for a valid game ID: 4 digits
    gameId: /^[0-9]{4}$/,
    // Regex for a valid player name: 2-20 characters, alphanumeric and spaces
    playerName: /^[a-zA-Z0-9 ]{2,20}$/
}