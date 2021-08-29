const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');

const {zookeepers} = require('../data/zookeepers.json');
const { TestWatcher } = require('@jest/core');
const { create } = require('domain');
const { hasUncaughtExceptionCaptureCallback } = require('process');

jest.mock('fs');

test('create a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        {name: 'Hyde', id: '24', age: 28, favoriteAnimal: 'Lion'}, zookeepers
    );
    expect(zookeeper.name).toBe('Hyde');
    expect(zookeeper.id).toBe('24');
    expect(zookeeper.age).toEqual(28);
    expect(zookeeper.favoriteAnimal).toBe('Lion');
});

test('filters by query', () => {
    const startingZookeepers = [
        
            {
            "id": "0",
            "name": "Kim",
            "age": 28,
            "favoriteAnimal": "dolphin"
            },
            {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
            }
        ];
        const updatedZookeepers = filterByQuery({favoriteAnimal: 'dolphin'}, startingZookeepers);
        expect(updatedZookeepers.length).toEqual(1);
});

test('find by id', () => {
    const startingZookeepers = [
        
        {
        "id": "0",
        "name": "Kim",
        "age": 28,
        "favoriteAnimal": "dolphin"
        },
        {
        "id": "1",
        "name": "Raksha",
        "age": 31,
        "favoriteAnimal": "penguin"
        }
    ];
    const result = findById('1', startingZookeepers);
    expect(result.name).toBe('Raksha');
});

test('validates age', () => {
    const zookeeper = {
        "id": "3",
        "name": "Linda",
        "age": 48,
        "favoriteAnimal": "otter"
    };
    const invalidZookeeper = {
        "id": "3",
        "name": "Linda",
        "age": "48",
        "favoriteAnimal": "otter"
    };
    const result = validateZookeeper(zookeeper);
    const result1 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result1).toBe(false);
})
