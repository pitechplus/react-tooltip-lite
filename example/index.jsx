import React from 'react';
import ReactDOM from 'react-dom';

import Tooltip from '../src/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tipOpen: false };

    this.toggleTip = this.toggleTip.bind(this);
    this.bodyClick = this.bodyClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.bodyClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.bodyClick);
  }

  tipContentRef;

  buttonRef;

  toggleTip() {
    this.setState(prevState => ({ tipOpen: !prevState.tipOpen }));
  }

  bodyClick(e) {
    if ((this.tipContentRef && this.tipContentRef.contains(e.target)) || this.buttonRef.contains(e.target)) {
      return;
    }

    this.setState({ tipOpen: false });
  }

  render() {
    const { tipOpen } = this.state;
    const text = 'you can have compound alignments you can have compound alignment';
    return (
      <div className="wrapper">
        <h1>React tooltip-lite examples</h1>

        <section>
          <h3>Basic:</h3>

          <div className="flex-spread">
            <Tooltip content="By default the text is above the element" className="target" tipContentClassName="foo">
              Target
            </Tooltip>

            <Tooltip content="It'll center if it has room" className="target" tipContentClassName="">
              Target
            </Tooltip>

            <Tooltip content="you can specify 'direction' (up, down, left, right) too" direction="down" className="target" tipContentClassName="">
              t
            </Tooltip>
          </div>
        </section>

        <section>
          <h3>In a paragraph</h3>
          <p>
            For&nbsp;
            <Tooltip content="Go to google" direction="right" tagName="span">
              <a href="http://google.com" target="_blank" rel="noopener noreferrer">inline text</a>
            </Tooltip>
            , a right or left tip works nicely. The tip will try to go the desired way and flip if there is not
            enough&nbsp;
            <Tooltip content="Go to google" direction="right" tagName="span" distance={20}>
              <a href="http://google.com" target="_blank" rel="noopener noreferrer">space</a>
            </Tooltip>
            . Shrink the window and see how the tip behaves when close to the&nbsp;
            <Tooltip content="Go to google" direction="right" tagName="span">
              <a href="http://google.com" target="_blank" rel="noopener noreferrer">edge</a>
            </Tooltip>
            . You can also force the direction of the tip and it will allow itself&nbsp;
            <Tooltip className="target" tipContentClassName="" content="this direction is forced" direction="right" tagName="span" forceDirection>to go off screen</Tooltip>
            .
          </p>
        </section>

        <section>
          <h3>Html Contents</h3>

          <p>
            You can also have a tooltip with&nbsp;
            <Tooltip
              content={(
                <div>
                  <h4 className="tip-heading">An unordered list to demo some html content</h4>
                  <ul className="tip-list">
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                    <li>Four</li>
                    <li>Five</li>
                  </ul>
                </div>
              )}
              direction="down"
              tagName="span"
              className="target"
              tipContentClassName=""
            >
              Html content
            </Tooltip>
            .
          </p>

          <p>
            By specifying the prop &quot;tipContentHover&quot; as true, you can persist hover state when cursor is over the tip.  This allows for links
            in your tip, copying contents and other behaviors.  Here&apos;s an&nbsp;
            <Tooltip
              content={(
                <div>
                  You can copy this text, or click this&nbsp;
                  <a href="https://www.npmjs.com/package/react-tooltip-lite" target="_blank" rel="noopener noreferrer">link</a>
                </div>
              )}
              tagName="span"
              direction="right"
              className="target"
              tipContentClassName=""
              tipContentHover
            >
              example
            </Tooltip>
            .
          </p>
        </section>

        <section>
          <h3>Colors</h3>

          You can pass&nbsp;
          <Tooltip
            tagName="span"
            className="target"
            tipContentClassName=""
            color="blue"
            background="red"
            content="The color for this is defined by props"
          >
            color options as props
          </Tooltip>
          &nbsp;
          or use a&nbsp;
          <Tooltip
            tagName="span"
            className="target customTip"
            direction="right"
            content="The color for this tip is defined by examples/index.css"
          >
            css stylesheet.
          </Tooltip>
        </section>

        <section>
          <h3>Wrap anything as a target</h3>
          <Tooltip content="this is lorem ipsum">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt egestas sapien quis lacinia. Praesent ut sem leo.
            Curabitur vel dolor eu nulla ultrices efficitur a ut mauris. Nulla non odio non nibh venenatis commodo non vitae magna.
            Nunc porttitor, dolor nec sodales commodo, velit elit auctor arcu, sed dapibus nibh lacus sit amet nunc.
            Phasellus enim dui, blandit sed faucibus sit amet, feugiat vel urna. Vivamus ut lacus sollicitudin, dignissim risus vel,
            iaculis leo. Donec lobortis, turpis nec pulvinar venenatis, orci nunc semper sem, nec ornare nisl nisi ut ligula. Integer
            ut tempus elit. Cras luctus, tellus id vestibulum accumsan, purus velit mattis erat, euismod tempor mauris elit eget metus.
            Vivamus interdum ex sed egestas tincidunt.
          </Tooltip>

          <div className="imageWrapper">
            <Tooltip content="you can wrap images of course too" styles={{ display: 'inline-block' }} direction="right">
              <img src="/example/reactLogo.svg" alt="react logo" />
            </Tooltip>

            <Tooltip
              content="this image is absolute positioned"
              styles={{ display: 'inline-block', position: 'absolute', top: '0', right: 0 }}
              direction="right"
              className="image2"
            >
              <img src="/example/reactLogo.svg" alt="react logo" />
            </Tooltip>
          </div>

        </section>

        <section>
          <h3>Custom events</h3>
          <p>
            <Tooltip content="this uses hover but also closes on click" className="target" tipContentClassName="" tagName="span" eventOff="onClick">
              Close on click
            </Tooltip>
          </p>

          <p>
            <Tooltip
              content="opens on a click and closes on mouse out"
              className="target"
              tipContentClassName=""
              tagName="span"
              eventOn="onClick"
              eventOff="onMouseOut"
              useHover={false}
            >
              Open on click
            </Tooltip>
          </p>

          <p>
            <Tooltip content="this uses hover but also closes on click" className="target" tipContentClassName="" tagName="span" eventToggle="onClick">
              Toggle on click
            </Tooltip>
          </p>
        </section>
        <section>
          <h3>Default styles</h3>
          <p>
            pass the
            {'"defaultStyles"'}
            prop as true to get up and running quick and easy
          </p>
          <p>
            <Tooltip content="styled with defaults" className="target" tipContentClassName="" useDefaultStyles tagName="span">
              See default styles
            </Tooltip>
          </p>
        </section>
        <section id="qwerty" style={ { position: 'relative' } }>
          <h3>Controlled by props</h3>

          <button
            type="button"
            ref={(el) => { this.buttonRef = el; }}
            onClick={this.toggleTip}
          >
            {tipOpen ? 'close' : 'open'}
          </button>
          <br />
          <br />
          <Tooltip
            content={(
              <div ref={(el) => { this.tipContentRef = el; }} className="controlled-example">
                <div className="controlled-example_header">
                  Hello
                  <button type="button" className="controlled-example_close-button" onClick={this.toggleTip}>&times;</button>
                </div>
                This tip is controlled by the button, you can also click outside the tip or on the&nbsp;
                {'"x"'}
                &nbsp;to close it
              </div>
            )}
            contentParentId="qwerty"
            isOpen={tipOpen}
            tagName="span"
            direction="down-start"
            forceDirection
          >
            click the button
          </Tooltip>
        </section>

        <section>
          <h3>Distance and arrow size</h3>

          <div className="flex-spread">
            <Tooltip content="This has an arrowSize of 20, where the default is 10" className="target" tipContentClassName="" arrowSize={20}>Larger arrowSize</Tooltip>
            <Tooltip content="This has an arrowSize of 5, where the default is 10" className="target" tipContentClassName="" arrowSize={5}>Smaller arrowSize</Tooltip>
            <Tooltip content="This has a distance prop of 20, where the default is arrowSize" className="target" tipContentClassName="" distance={20}>Increase distance</Tooltip>
            <Tooltip content="This has a distance prop of 0, where the default is the arrowSize" className="target" tipContentClassName="" distance={0}>Decrease distance</Tooltip>
          </div>
        </section>


        <section>
          <h3>Alignment</h3>

          <div className="flex-spread">
            <span id="e1" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="right" className="target" tipContentClassName="" arrow={false} contentParentId="e1">
              right
            </Tooltip>
            </span>

            <span id="e2" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="left" className="target" tipContentClassName="" arrow={false} contentParentId="e2">
              left
            </Tooltip>
            </span>

            <span id="e3" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="down" className="target" tipContentClassName="" arrow={false} contentParentId="e3">
              down
            </Tooltip>
            </span>

            <span id="e4" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="up" className="target" tipContentClassName="" arrow={false} contentParentId="e4">
              up
            </Tooltip>
            </span>
          </div>
          <br />
          <br />
          <div className="flex-spread">
            <span id="r1" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="right" className="target" tipContentClassName="" contentParentId="r1">
              right
            </Tooltip>
            </span>

            <span id="r2" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="left" className="target" tipContentClassName="" contentParentId="r2">
              left
            </Tooltip>
            </span>

            <span id="r3" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="down" className="target" tipContentClassName="" contentParentId="r3">
              down
            </Tooltip>
            </span>

            <span id="r4" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="up" className="target" tipContentClassName="" contentParentId="r4">
              up
            </Tooltip>
            </span>
          </div>
        </section>

        <section>
          <h3>Alignment</h3>

          <div className="flex-spread">
            <Tooltip content="you can have compound alignments you can have compound alignments you can have compound alignments" forceDirection={true} direction="right" className="target" tipContentClassName="" arrow={false} >
              right
            </Tooltip>

            <Tooltip content={ text } direction="left" className="target" tipContentClassName="" arrow={false}>
              left
            </Tooltip>

            <Tooltip content={ text } direction="down" className="target" tipContentClassName="" arrow={false}>
              down
            </Tooltip>

            <Tooltip content={ text } direction="up" className="target" tipContentClassName="" arrow={false}>
              up
            </Tooltip>
          </div>
          <br />
          <br />
          <div className="flex-spread">
            <Tooltip content={ text } direction="right" className="target" tipContentClassName="">
              right
            </Tooltip>

            <Tooltip content={ text } direction="left" className="target" tipContentClassName="">
              left
            </Tooltip>

            <Tooltip content={ text } direction="down" className="target" tipContentClassName="">
              down
            </Tooltip>

            <Tooltip content={ text } direction="up" className="target" tipContentClassName="">
              up
            </Tooltip>
          </div>
        </section>


        <section>
          <h3>Compound Alignment</h3>

          <div className="flex-spread">
            <span id="q1" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="right-start" className="target" tipContentClassName="" arrow={false} contentParentId="q1">
              right-start
            </Tooltip>
            </span>

            <span id="q2" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="right-end" className="target" tipContentClassName="" arrow={false} contentParentId="q2">
              right-end
            </Tooltip>
            </span>

            <span id="q3" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="left-start" className="target" tipContentClassName="" arrow={false} contentParentId="q3">
              left-start
            </Tooltip>
            </span>

            <span id="q4" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="left-end" className="target" tipContentClassName="" arrow={false} contentParentId="q4">
              left-end
            </Tooltip>
            </span>

            <span id="q5" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="up-start" className="target" tipContentClassName="" arrow={false} contentParentId="q5">
              top-start
            </Tooltip>
            </span>

            <span id="q6" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="up-end" className="target" tipContentClassName="" arrow={false} contentParentId="q6">
              top-end
            </Tooltip>
            </span>

            <span id="q7" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="down-start" className="target" tipContentClassName="" arrow={false} contentParentId="q7">
              down-start
            </Tooltip>
            </span>

            <span id="q8" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="down-end" className="target" tipContentClassName="" arrow={false} contentParentId="q8">
              down-end
            </Tooltip>
            </span>
          </div>
          <br />
          <br />
          <div className="flex-spread">
            <span id="w0" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="right-start" className="target" tipContentClassName="" contentParentId="w0">
              right-start with arrow
            </Tooltip>
            </span>

            <span id="w1" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="right-end" className="target" tipContentClassName="" contentParentId="w1">
              right-end with arrow
            </Tooltip>
            </span>

            <span id="w2" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="left-start" className="target" tipContentClassName="" contentParentId="w2">
              left-start with arrow
            </Tooltip>
            </span>

            <span id="w3" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="left-end" className="target" tipContentClassName="" contentParentId="w3">
              left-end with arrow
            </Tooltip>
            </span>

            <span id="w4" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="down-start" className="target" tipContentClassName="" contentParentId="w4">
              down-start with arrow
            </Tooltip>
            </span>

            <span id="w5" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="down-end" className="target" tipContentClassName="" contentParentId="w5">
              down-end with arrow
            </Tooltip>
            </span>

            <span id="w6" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="up-start" className="target" tipContentClassName="" contentParentId="w6">
              up-start with arrow
            </Tooltip>
            </span>

            <span id="w7" style={{ display: 'inline-block', position: 'relative'}}>
            <Tooltip content={ text } direction="up-end" className="target" tipContentClassName="" contentParentId="w7">
              up-end with arrow
            </Tooltip>
            </span>
          </div>
        </section>

        <section>
          <h3>Compound Alignment</h3>

          <div className="flex-spread">
            <Tooltip content={ text } direction="right-start" className="target" tipContentClassName="" arrow={false}>
              right-start
            </Tooltip>

            <Tooltip content={ text } direction="right-end" className="target" tipContentClassName="" arrow={false}>
              right-end
            </Tooltip>

            <Tooltip content={ text } direction="left-start" className="target" tipContentClassName="" arrow={false}>
              left-start
            </Tooltip>

            <Tooltip content={ text } direction="left-end" className="target" tipContentClassName="" arrow={false}>
              left-end
            </Tooltip>

            <Tooltip content={ text } direction="up-start" className="target" tipContentClassName="" arrow={false}>
              top-start
            </Tooltip>

            <Tooltip content={ text } direction="up-end" className="target" tipContentClassName="" arrow={false}>
              top-end
            </Tooltip>

            <Tooltip content={ text } direction="down-start" className="target" tipContentClassName="" arrow={false}>
              down-start
            </Tooltip>

            <Tooltip content={ text } direction="down-end" className="target" tipContentClassName="" arrow={false}>
              down-end
            </Tooltip>
          </div>
          <br />
          <br />
          <div className="flex-spread">
            <Tooltip content={ text } direction="right-start" className="target" tipContentClassName="">
              right-start with arrow
            </Tooltip>

            <Tooltip content={ text } direction="right-end" className="target" tipContentClassName="">
              right-end with arrow
            </Tooltip>

            <Tooltip content={ text } direction="left-start" className="target" tipContentClassName="">
              left-start with arrow
            </Tooltip>

            <Tooltip content={ text } direction="left-end" className="target" tipContentClassName="">
              left-end with arrow
            </Tooltip>

            <Tooltip content={ text } direction="down-start" className="target" tipContentClassName="">
              down-start with arrow
            </Tooltip>

            <Tooltip content={ text } direction="down-end" className="target" tipContentClassName="">
              down-end with arrow
            </Tooltip>

            <Tooltip content={ text } direction="up-start" className="target" tipContentClassName="">
              up-start with arrow
            </Tooltip>

            <Tooltip content={ text } direction="up-end" className="target" tipContentClassName="">
              up-end with arrow
            </Tooltip>
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
