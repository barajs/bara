# Bara Core

Basic operator of a Bara application.

## Installation

```
yarn add @bara/core

npm i --save @bara/core
```

## Usage

```javascript
import {run} from '@bara/core';
import AwesomeTrigger from 'awesome-trigger';

const awesomeApp = () => {
  return {
    triggers: [AwesomeTrigger],
  };
};

run(awesomeApp);
```
