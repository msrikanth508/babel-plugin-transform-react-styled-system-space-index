# babel-plugin-transform-react-styled-system-space-index
This babel plugin helps to transform react styled component [space](https://styled-system.com/api#space) property.

# Prerequisite

You should be familiar with CSS-in-JS library such as [Styled Components](https://github.com/styled-components/styled-components) or [Emotion](https://github.com/emotion-js/emotion) and [styled-system](https://styled-system.com). 
Themed components enable flexible user interface styles. [Styled-system](https://styled-system.com/guides/theming) adds extra favour on top of CSS-in-JS libraries, it is a collection of utility functions that add style props to your React components and allows you to control styles based on global theme constants or design tokens. 

## Problem Statement
[Styled-system](https://styled-system.com/guides/theming) has space property specially intended for use with margin, padding, and other layout-related CSS properties. A space scale can be defined as either a plain object or an array, but by convention an array is preferred. 

```jsx
{
  space: [0, 4, 8, 12, 20, 24, 28]
}
```
The entire component development drives through these design tokens and these tokens are single source of truth. But problem appears when you want to update this array because all your react components are consuming this property extensively in the entire project. For example, design team wants to introduce new value like `16`.

```jsx
{
  space: [0, 4, 8, 12, 16, 20, 24, 28]
}
```
After adding new value to space property, we have to update indexes in all components and it is tedious job😞. To avoid manual updates, This plugin avoids manual updates and transforms old code to new with desired changes. Feel free to update the condition in `src/index.js` based on your requirements.

## Usage

```sh
npm run code-mod
```

## Examples

#### 1.
> Input

```jsx
function Component(){}

Component.defaultProps = {
  p: 2,
  px: [3, 2, 5, "7"],
  py: [2, 0],
  pl: [3],
  m: "3",
};
```

> Output

```jsx
function Component() {}

Component.defaultProps = {
  p: 2,
  px: [4, 2, 6, "8"],
  py: [2, 0],
  pl: [4],
  m: "4"
};
```
#### 2.

> Input

```jsx
function Component(){}
Component.defaultProps.mr = 5;
Component.defaultProps["ml"] = 5;
```

> Output

```jsx
function Component() {}
Component.defaultProps.mr = 6;
Component.defaultProps["ml"] = 6;
```

#### 3.

> Input

```jsx
<Component pr={3} mode m="4" p={2} pl="1" mr={[4,5]} />
```

> Output

```jsx
<Component pr={4} mode m="5" p={2} pl="1" mr={[5, 6]} />
```