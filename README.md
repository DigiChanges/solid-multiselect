# <img width="27px" src="https://github.com/solidjs/solid-site/raw/master/src/assets/logo.png" alt="Solid logo"> &nbsp;Solid MultiSelect

## Installation

```bash
## in npm
npm install @digichanges/solid-multiselect
## or in yarn
yarn add @digichanges/solid-multiselect
```

Add as a module:

```ts
import { MultiSelect, Option } from '@digichanges/solid-multiselect';
```

## Demo
[Demo codesandbox](https://codesandbox.io/s/solidjs-multiselect-demo-db55z?file=/src/main.tsx)

<img src="statics/MultiSelect_examples.png" alt="multi-select">

### Search:
<img src="statics/MultiSelect_search_examples.png" alt="multi-select">

## Example


```jsx
import { MultiSelect } from '@digichanges/solid-components'

<h3>Limit 2 elements</h3>
<MultiSelect
    style={{ chips: { color: "red", "background-color": "pink" } }}
    options={["yellow", "blue", "pink", "white"]}
    onSelect={console.log}
    onRemove={console.log}
    selectedValues={["yellow"]}
    selectionLimit={2}
/>
```
