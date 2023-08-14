import * as tsconfigPaths from 'tsconfig-paths';

import * as tsConfig from '../../tsconfig.json';

const baseUrl = tsConfig.compilerOptions.baseUrl;
const paths = tsConfig.compilerOptions.paths;

tsconfigPaths.register({
  baseUrl,
  paths,
});
