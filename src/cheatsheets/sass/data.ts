import type { Data } from "../commons";

export const basics: Data = {
  title: "Basics",
  items: [
    {
      title: "Variables",
      cmd: `$defaultLinkColor: #46EAC2;

a {
  color: $defaultLinkColor;
}
`,
    },

    {
      title: "String interpolation",
      cmd: `$wk: -webkit-;

.rounded-box {
  #{$wk}border-radius: 4px;
}
`,
    },

    {
      title: "Comments",
      cmd: `/*
 Block comments
 Block comments
 Block comments
*/

// Line comments`,
    },

    {
      title: "Mixins",
      cmd: `@mixin heading-font {
    font-family: sans-serif;
    font-weight: bold;
}
h1 {
    @include heading-font;
}
`,
    },

    {
      title: "Nesting",
      cmd: `.markdown-body {
    a {
      color: blue;
      &:hover {
        color: red;
      }
    }
}`,
    },

    {
      title: "Extend",
      cmd: `.button {
    ···
}

.push-button {
    @extend .button;
}`,
    },

    {
      title: "@import",
      cmd: `@import './other_sass_file';
@import '/code', 'lists';

// Plain CSS @imports
@import "theme.css";
@import url(theme);
`,
    },
  ],
};

export const mixins: Data = {
  title: "Mixins",
  items: [
    {
      title: "Parameters",
      cmd: `@mixin font-size($n) {
    font-size: $n * 1.2em;
}
`,
    },

    {
      title: "Default values",
      cmd: `@mixin pad($n: 10px) {
    padding: $n;
}
`,
    },

    {
      title: "Default variables",
      cmd: `$default-padding: 10px;

@mixin pad($n: $default-padding) {
    padding: $n;
}

body {
    @include pad(15px);
}
`,
    },
  ],
};

export const colorFunctions: Data = {
  title: "Sass Color functions",
  items: [
    {
      title: "RGBA",
      cmd: `rgb(100, 120, 140)
rgba(100, 120, 140, .5)
rgba($color, .5)
`,
    },

    {
      title: "Mixing",
      cmd: `mix($a, $b, 10%)   // 10% a, 90% b
`,
    },

    {
      title: "Modifying HSLA",
      cmd: `darken($color, 5%)
lighten($color, 5%)

saturate($color, 5%)
desaturate($color, 5%)
grayscale($color)

adjust-hue($color, 15deg)
complement($color)    // like adjust-hue(_, 180deg)
invert($color)

fade-in($color, .5)   // aka opacify()
fade-out($color, .5)  // aka transparentize()
rgba($color, .5)      // sets alpha to .5`,
    },

    {
      title: "Getting individual values",
      cmd: `//HSLA
hue($color)         // 0deg..360deg
saturation($color)  // 0%..100%
lightness($color)   // 0%..100%
alpha($color)       // 0..1 (aka opacity())

//RGB

red($color)         // 0..255
green($color)
blue($color)`,
    },
  ],
};

export const otherFunctions: Data = {
  title: "Sass other functions",
  items: [
    {
      title: "Strings",
      cmd: `unquote('hello')
quote(hello)

to-upper-case(hello)
to-lower-case(hello)

str-length(hello world)
str-slice(hello, 2, 5)     // "ello" - it's 1-based, not 0-based
str-insert("abcd", "X", 1) // "Xabcd"`,
    },

    {
      title: "Units",
      cmd: `unit(3em)        // 'em'
unitless(100px)  // false
`,
    },

    {
      title: "Numbers",
      cmd: `floor(3.5)
ceil(3.5)
round(3.5)
abs(3.5)

min(1, 2, 3)
max(1, 2, 3)

percentage(.5)   // 50%
random(3)        // 0..3`,
    },

    {
      title: "Misc",
      cmd: `variable-exists(red)    // checks for $red
mixin-exists(red-text)  // checks for @mixin red-text
function-exists(redify)

global-variable-exists(red)

selector-append('.menu', 'li', 'a')   // .menu li a
selector-nest('.menu', '&:hover li')  // .menu:hover li
selector-extend(...)
selector-parse(...)
selector-replace(...)
selector-unify(...)`,
    },
  ],
};

export const featureCheck: Data = {
  title: "Feature checks",
  items: [
    {
      title: "Feature check",
      cmd: `feature-exists(global-variable-shadowing)
`,
    },

    {
      title: "Features",
      cmd: `global-variable-shadowing
extend-selector-pseudoclass
units-level-3
at-error`,
    },
  ],
};

export const loops: Data = {
  title: "Sass loops",
  items: [
    {
      title: "For loops",
      cmd: `@for $i from 1 through 4 {
    .item-#{$i} { left: 20px * $i; }
}`,
    },

    {
      title: "Each loops (simple)",
      cmd: `$menu-items: home about contact;

@each $item in $menu-items {
    .photo-#{$item} {
      background: url('#{$item}.jpg');
    }
}
`,
    },

    {
      title: "Each loops (nested)",
      cmd: `$backgrounds: (home, 'home.jpg'),
              (about, 'about.jpg');

@each $id, $image in $backgrounds {
    .photo-#{$id} {
      background: url($image);
    }
}
`,
    },

    {
      title: "While loops",
      cmd: `$i: 6;
@while $i > 0 {
    .item-#{$i} { width: 2em * $i; }
    $i: $i - 2;
}
`,
    },
  ],
};

export const otherFeatures: Data = {
  title: "Sass other features",
  items: [
    {
      title: "Condtionals",
      cmd: `@if $position == 'left' {
     position: absolute;
     left: 0;
}
@else if $position == 'right' {
     position: absolute;
     right: 0;
}
@else {
     position: static;
}
`,
    },

    {
      title: "Interpolation",
      cmd: `.#{$klass} { ... }      // Class
call($function-name)    // Functions

@media #{$tablet}
font: #{$size}/#{$line-height}
url("#{$background}.jpg")
`,
    },

    {
      title: "Lists",
      cmd: `$list: (a b c);

nth($list, 1)  // starts with 1
length($list)

@each $item in $list { ... }
`,
    },

    {
      title: "Maps",
      cmd: `$map: (key1: value1, key2: value2, key3: value3);

map-get($map, key1)
`,
    },
  ],
};
