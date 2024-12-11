import test from './page-object-manager/pageObjectManger'

test.beforeAll(async ({}) => {
  console.log('Before all the tests...')    
});

test.afterAll(async () => {
  console.log('After all the tests...');
});

export default test