
#### compare 
1. imports default from package. undefined in the case A provided.
```
import utilsCase from 'utils'
```

2. imports entire module exports object with all available named
```
import * as utilsCaseWildcard from 'utils'  
```

3. same as utilsCaseWildcard above
```
var utilsCaseRequire = require('./utils1')  
```

4. import the specific named function
```
import { doSomething } from 'utils'

import { pick } from 'lodash';
```

#### to test it
```
var compareObjects = 
{
    utilsCase, utilsCaseWildcard, utilsCaseRequire
};
console.log(compareObjects);
```

#### given example
```
In case A:
//utils.js
export function doSomething()
{
//...
}


In case B:
//utils.js
export function doSomething()
{
//...
}
export default function doSomethingDefault()
{
//...
}
```
