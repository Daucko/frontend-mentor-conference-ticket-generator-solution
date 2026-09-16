# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://github.com/Daucko/frontend-mentor-conference-ticket-generator-solution)
- Live Site URL: [Add live site URL here](https://frontend-mentor-conference-ticket-g-kappa.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Javascript

### What I learned

I used this project to master positioning of components as shown below:

```css
.bg {
  position: absolute;
...
}

.bg__swirl--tl {
  position: absolute;
...
}

.bg__ring--tl {
  position: absolute;
 ...
}

.bg__ring--tr {
  position: absolute;
  ...
}

.bg__ring {
  position: absolute;
 ...
}

.bg__swirl {
  position: absolute;
 ...}

.bg__swirl-mobile {
  position: absolute;
  ...
}
```

I also get to style for tablet screen sizes as shown below:

```css
@media (max-width: 1024px) {
  html,
  body {
    background: url('assets/images/background-tablet.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .headline {
   ...
  }
}
```

I also made use of Random Number Generation in the javaScript file. This was written as:

```js
function generateTicketNumber() {
  var n = Math.floor(Math.random() * 90000) + 10000;
  return '#' + n;
}
```

### Continued development

I want to focus more on my javaScript development.

### Useful resources

- [Example resource 1](https://stackoverflow.com/questions/8384751/css-text-gradient) - This helped me with _headline text_ color gradient styling. I really liked this pattern and will use it going forward.
- [Example resource 2](https://cssgradient.io/blog/css-gradient-text/) - This helped me with _headline text_ color gradient styling, I finally understand color gradient styling . I'd recommend it to anyone still learning this concept.
- [Example resource 3](https://codyhouse.co/nuggets/css-gradient-borders) - This is an amazing article which helped me with the knowledge of gradient border, although, I did not use it. I later found out that the svg file of the ticket structure is part of the project assets. I'd recommend it to anyone still learning this concept.
- [Example resource 4](https://medium.com/@limjoshen/gradient-borders-with-pure-css-db55c83c840b) - This is an amazing article which helped me with the knowledge of gradient border, although, I did not use it. I later found out that the svg file of the ticket structure is part of the project assets. I'd recommend it to anyone still learning this concept.

### AI Collaboration

Since the project starter files has two files that instruct AI agents and Claude to not get involve in the execution of the project, the copilot in my VS Code was deactivated. But I made use of 'claude.ai' and 'Deepseek.ai' in my browser when I got stuck on how to style the _drop zone_ properly.

## Author

- Website - [Add your name here](https://www.daucode-portfolio.vercel.app)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/daucko)
- Twitter - [@yourusername](https://www.twitter.com/daucoooflife)
