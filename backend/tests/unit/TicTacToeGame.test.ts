import { TicTacToeGame } from '../../src/services/game/TicTacToeGame';
import { describe, test, expect } from 'vitest';

describe('TicTacToeGame', () => {

// =========={ SET 1: INITIALIZATION }==========
    // Test 1
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


// =========={ SET 2: PLACING PIECES }==========


    test('if player puts down a piece, the board should return the correct state', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');

        game.makeMove(1, 1, 'X');

        const board = game.getPublicState();


        expect(board[1][1]).toBe('X');


    });


    test('if player places on an occupied space, it should not work', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');

        game.makeMove(1, 1, 'X');
        game.makeMove(1, 1, 'O');


        const board = game.getPublicState();


        expect(board[1][1]).toBe('X');
    });

    test('if player tries to move twice, it should not work', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');

        game.makeMove(1, 1, 'X');
        game.makeMove(1, 2, 'X');


        const board = game.getPublicState();


        expect(board[1][2]).toBe(null);
    });

// =========={ SET 3: INVALID MOVES }==========

    test('(NEG) if a player tries an invalid move it should return false, and it should not change turns, and should not place a piece', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');

        const moveResult = game.makeMove(-1, -2, 'X');

        const board = game.getPublicState();
        const currentTurn = game.getCurrentTurn();

        expect(currentTurn).toBe('X');
        expect(moveResult).toBe(false);

        board.forEach(row => {row.forEach(cell => expect(cell).toBeNull())});

    });

    test('(POS) if a player tries an invalid move it should return false, and it should not change turns, and should not place a piece', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');

        const moveResult = game.makeMove(100, 100, 'X');

        const board = game.getPublicState();
        const currentTurn = game.getCurrentTurn();

        expect(currentTurn).toBe('X');
        expect(moveResult).toBe(false);

        board.forEach(row => {row.forEach(cell => expect(cell).toBeNull())});
    });

// ========={ SET 4: CHECK WIN/DRAW }==========

    test('If the board is full, it should return a draw', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');

        game.makeMove(0, 1, 'X'); // X
        game.makeMove(0, 0, 'O'); // O
        game.makeMove(1, 0, 'X'); // X
        game.makeMove(0, 2, 'O'); // O
        game.makeMove(1, 1, 'X'); // X
        game.makeMove(1, 2, 'O'); // O
        game.makeMove(2, 0, 'X'); // X
        game.makeMove(2, 1, 'O'); // O
        const finalMove = game.makeMove(2, 2, 'X'); // X - final move

        expect(finalMove).toBe(true);
        expect(game.getGameOver()).toBe('draw');

    });

// ========={ SET 5: WIN CONDITIONS }==========

    // Horizontal wins
    test('X wins with top row', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        
        game.makeMove(0, 0, 'X'); // X
        game.makeMove(1, 0, 'O'); // O
        game.makeMove(0, 1, 'X'); // X
        game.makeMove(1, 1, 'O'); // O
        const winningMove = game.makeMove(0, 2, 'X'); // X wins
        
        expect(winningMove).toBe(true);
        expect(game.getGameOver()).toBe('X');
    });

    test('O wins with middle row', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        
        game.makeMove(0, 0, 'X'); // X
        game.makeMove(1, 0, 'O'); // O
        game.makeMove(0, 1, 'X'); // X
        game.makeMove(1, 1, 'O'); // O
        game.makeMove(2, 0, 'X'); // X
        const winningMove = game.makeMove(1, 2, 'O'); // O wins
        
        expect(winningMove).toBe(true);
        expect(game.getGameOver()).toBe('O');
    });

    test('X wins with bottom row', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        
        game.makeMove(2, 0, 'X'); // X
        game.makeMove(0, 0, 'O'); // O
        game.makeMove(2, 1, 'X'); // X
        game.makeMove(0, 1, 'O'); // O
        const winningMove = game.makeMove(2, 2, 'X'); // X wins
        
        expect(winningMove).toBe(true);
        expect(game.getGameOver()).toBe('X');
    });

    // Vertical wins
    test('X wins with left column', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        
        game.makeMove(0, 0, 'X'); // X
        game.makeMove(0, 1, 'O'); // O
        game.makeMove(1, 0, 'X'); // X
        game.makeMove(0, 2, 'O'); // O
        const winningMove = game.makeMove(2, 0, 'X'); // X wins
        
        expect(winningMove).toBe(true);
        expect(game.getGameOver()).toBe('X');
    });

    test('O wins with middle column', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        
        game.makeMove(0, 0, 'X'); // X
        game.makeMove(0, 1, 'O'); // O
        game.makeMove(0, 2, 'X'); // X
        game.makeMove(1, 1, 'O'); // O
        game.makeMove(1, 0, 'X'); // X
        const winningMove = game.makeMove(2, 1, 'O'); // O wins
        
        expect(winningMove).toBe(true);
        expect(game.getGameOver()).toBe('O');
    });

    test('X wins with right column', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        
        game.makeMove(0, 2, 'X'); // X
        game.makeMove(0, 0, 'O'); // O
        game.makeMove(1, 2, 'X'); // X
        game.makeMove(0, 1, 'O'); // O
        const winningMove = game.makeMove(2, 2, 'X'); // X wins
        
        expect(winningMove).toBe(true);
        expect(game.getGameOver()).toBe('X');
    });

    // Diagonal wins
    test('X wins with main diagonal (top-left to bottom-right)', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        
        game.makeMove(0, 0, 'X'); // X
        game.makeMove(0, 1, 'O'); // O
        game.makeMove(1, 1, 'X'); // X
        game.makeMove(0, 2, 'O'); // O
        const winningMove = game.makeMove(2, 2, 'X'); // X wins
        
        expect(winningMove).toBe(true);
        expect(game.getGameOver()).toBe('X');
    });

    test('O wins with anti-diagonal (top-right to bottom-left)', () => {
        const game = new TicTacToeGame('game1', 'player1', 'player2');
        
        game.makeMove(0, 0, 'X'); // X
        game.makeMove(0, 2, 'O'); // O
        game.makeMove(0, 1, 'X'); // X
        game.makeMove(1, 1, 'O'); // O
        game.makeMove(1, 0, 'X'); // X
        const winningMove = game.makeMove(2, 0, 'O'); // O wins
        
        expect(winningMove).toBe(true);
        expect(game.getGameOver()).toBe('O');
    });

});

