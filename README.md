# particles-bg

[![NPM](https://img.shields.io/npm/v/particles-bg.svg)](https://www.npmjs.com/package/particles-bg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> React component for particles backgrounds

This project refers to the source code of the [Proton](https://a-jie.github.io/Proton/) official website, I packaged it into a component. You can use it casually in your own projects

### Online demo
* demo1 [https://stackblitz.com/edit/react-a6pm3w](https://stackblitz.com/edit/react-a6pm3w?file=index.js)
* demo2 [https://stackblitz.com/edit/react-bpv9fc](https://stackblitz.com/edit/react-bpv9fc?file=index.js)

![](https://github.com/lindelof/particles-bg/blob/master/image/01.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/02.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/03.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/04.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/05.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/06.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/07.jpg?raw=true)

## Install

```bash
npm install --save particles-bg
```

## Usage

```jsx
import React, { Component } from 'react'

import ParticlesBg from 'particles-bg'

class Example extends Component {
  render () {
    return (
      <div>...</div>
      <ParticlesBg type="circle" bg={true} />
    )
  }
}
```

## Parameter Description
```jsx
<ParticlesBg color="#ff0000" num={200} type="circle" bg={true} />
```
#### * type - Is the type of particle animation
Is the type of particle animation, Random is a random selection
```js
"color"
"ball"
"lines"
"thick"
"circle"
"cobweb"
"polygon"
"square"
"tadpole"
"fountain"
"random"
```

#### * num - The number of particles emitted each time, generally not set

#### * color - The background color or particle color of the particle scene
Notice: which should be an array under type=`color`

#### * bg - Set to html background
Is set the following properties
```css
position: "absolute",
zIndex: -1,
top: 0,
left: 0
```

## License

https://opensource.org/licenses/MIT
