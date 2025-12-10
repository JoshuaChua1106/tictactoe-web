import { TicTacToeGame } from '../../src/services/game/TicTacToeGame';

describe('TicTacToeGame', () => {
    test('should initialize with empty board and X starts first', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        const board = game.getPublicState();
        
        // Check board is 3x3 and all cells are null
        expect(board).toHaveLength(3);
        board.forEach(row => {
            expect(row).toHaveLength(3);
            row.forEach(cell => {
                expect(cell).toBeNull();
            });
        });
    });
});

