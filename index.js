const React = require('react');
const initials = require('initials');
const addPx = require('add-px');
const contrast = require('contrast');

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class UserAvatar extends React.Component {
  render() {
    let {
      borderRadius = '100%',
      src,
      srcset,
      name,
      color,
      colors = defaultColors,
      size,
      style,
      onClick,
      className,
      badgeStyle,
      badge
    } = this.props;

    if (!name)
      throw new Error('UserAvatar requires a name');

    const abbr = initials(name);
    size = addPx(size);

    const imageStyle = {
      display: 'block',
      borderRadius
    };

    const innerStyle = {
      lineHeight: size,
      textAlign: 'center',
      borderRadius,
      position:'relative'
    };

    let badgeStyleBase = {
      position: 'absolute',
      background: 'green',
      height: this.props.size/3 ,
      width: this.props.size/3,
      top: 0,
      right: 0,
      textAlign: 'center',
      verticalAlign:'middle',
      lineHeight: 1.3,
      fontSize: this.props.size/4,
      borderRadius: '100%',
      color: 'white',
    }

    badgeStyle = Object.assign({
      position: 'absolute',
      background: 'green',
      height: this.props.size/3 + 'px' ,
      width: this.props.size/3 + 'px',
      top: 0,
      right: 0,
      lineHeight:this.props.size/3 +'px',
      fontSize: this.props.size/4,
      borderRadius: '100%',
      color: 'white',
    }, badgeStyle);

    if (size) {
      imageStyle.width = innerStyle.width = innerStyle.maxWidth = size;
      imageStyle.height = innerStyle.height = innerStyle.maxHeight = size;
    }

    let inner,
      classes = [className, 'UserAvatar'];
    if (src || srcset) {
      inner = <img className="UserAvatar--img" style={imageStyle} src={src} srcSet={srcset} alt={name}/>
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = abbr;
    }

    if (innerStyle.backgroundColor) {
      classes.push(`UserAvatar--${contrast(innerStyle.backgroundColor)}`);
    }

    return (<div aria-label={name} className={classes.join(' ')} style={style}>
      <div className="UserAvatar--inner" style={innerStyle}>
        {badge?<div className='UserAvatar--badge' style={badgeStyle}>{this.props.badge}</div>:null}
        {inner}
      </div>
    </div>)
  }
}

module.exports = UserAvatar;
