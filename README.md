# useToggle hook

useToggle has a similar API to useState in that both return an array with the first item being the state and the second item being a way to update that state. However, unlike useState, useToggle's state value can only ever be a boolean.

```js
const [on, setOn] = useToggle(true);

setOn() // false
setOn() // true
setOn(false) // false
setOn(true) // true
setOn("state is still toggled") // false
```

For the full documentation, see [usehooks.com/usetoggle](https://usehooks.com/usetoggle).

## Tasks

1. useToggle should correctly establish its initial value, casting it to a boolean if it's not one
2. useToggle should toggle the state when its updater function is invoked without a value
3. useToggle should set the state to the provided value when its updater function is called with a boolean value
4. useToggle should not change the state when its updater function is called with the same boolean value
5. useToggle should toggle the state when its updater function is called with a value that isn't a boolean

## The result

The final version of your app should look and behave like this https://usehooks.com/usetoggle.
