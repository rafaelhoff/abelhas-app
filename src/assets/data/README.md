
Random generator for Mockup Data:
https://www.json-generator.com/

```js
[
  '{{repeat(6, 8)}}',
  {
    _id: '{{objectId()}}',
    name: '{{firstName()}} {{surname()}}',
    address: '{{street()}}',
    type: '{{random("tipo1", "tipo2", "tipo3")}}',
    forages: [
      '{{repeat(1,3)}}',
	  '{{random("Acacia", "Eucalipto", "Flor qualquer")}}'      
    ],
    hives: '{{integer(20, 40)}}'
  }
]
```
