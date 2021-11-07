const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

//describe.only ejecuta sólo este test. Y no los demás
//de los otros archivos.
describe('utils - build message', () => {
  it('should return the respective message', () => {
    const result = buildMessage('movie', 'create');
    const expected = 'movie created';
    assert.deepStrictEqual(result, expected);
  });

  describe('When all the movies are listed', () => {
    it('should return the respective message', () => {
      const result = buildMessage('movie', 'list');
      const expected = 'movies listed';
      assert.deepStrictEqual(result, expected);
    });
  });
});
