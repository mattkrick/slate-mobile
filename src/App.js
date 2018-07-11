import React from 'react';
import './App.css';
// Import React!
import {Editor} from 'slate-react'
import {Value} from 'slate'
import HugeDocument from './/HugeDoc';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
})

class App extends React.Component {
  state = {value: initialValue, html: '<b>test</b>'}

  constructor(props) {
    super(props)
    // window.addEventListener('compositionstart', this.onCompositionStart)
    // window.addEventListener('compositionupdate', (e) => {
    //   console.log('window comp update', e.data)
    // })
  }

  onChange = ({value, change}) => {
    // if (socket.readyState === 1) {
    //   socket.send('foo')
    // }
    // console.log('setting state', value.toJS())
    this.setState({value})
  }
  onKeyDown = (event, change) => {
    // socket.send(event.key)
  }
  //
  // onCompositionStart = (event, change) => {
  //   socket.send('comp start', event.data)
  // }
  onCompositionStart = (event, change) => {
    // console.log('compositionstart', event.data)
    // socket.send('comp start', event.data)
  }
  onCompositionUpdate = (event, change) => {
    // console.log('update', event.data)
  }
  onCompositionEnd = (event, change) => {
    // console.log('end', event.data)
  }
  onBeforeInput = (event) => {
    // socket.send('input', event.key)
  }

  setRef =(c) => {
    if (c) {
      this.ref = c
    }
  }

  emitChange = (event) => {
    var html = this.ref.innerHTML;
    console.log('input', event.nativeEvent.inputType)
    this.setState({html: html})
  }

  // shouldComponentUpdate(){
  //   return false;
  // }

  setValue = (newValue) => {
    this.setState({
      value2: newValue
    })
  }

  render() {
    // return <HugeDocument/>
    return (
      <div>
        <Editor
          onCompositionStart={this.onCompositionStart}
          onCompositionUpdate={this.onCompositionUpdate}
          onCompositionEnd={this.onCompositionEnd}
          value={this.state.value}
          onChange={this.onChange}
          onBeforeInput={this.onBeforeInput}
          onKeyDown={this.onKeyDown}
          spellCheck
        />
        <div
          ref={this.setRef}
          onInput={this.emitChange}
          contentEditable
          dangerouslySetInnerHTML={{__html: this.state.html}}></div>
        {/*<div contentEditable>Away</div>*/}
        <input onKeyPress={() => console.log('KEYPRESS')}/>
      </div>
    )
  }
}

// return (
//   <input onCompositionStart={this.onCompositionStart}/>
// )

export default App;
