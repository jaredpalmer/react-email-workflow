import { Flex, curry } from 'jsxstyle';

const Center = curry(Flex, {
  justifyContent: 'center',
  alignItems: 'center',
});

export default Center;
