import { userDb } from './user-db';

describe('userDb', () => {
  it('should work', () => {
    expect(userDb()).toEqual('user-db');
  });
});
