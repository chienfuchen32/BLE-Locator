import React from 'react';
import ReactDOM from 'react-dom';

///////////////////////////////////////////////////////////////////////////////////////////////////////
//JSX Examples:http://www.ruanyifeng.com/blog/2015/03/react.html
var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div key={name}>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('div_array')
);

///////////////////////////////////////////////////////////////////////////////////////////////////////
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li key={child}>{child}</li>;
        })
      }
      </ol>
    );
  }
});
ReactDOM.render(
  <NotesList>
    <span>list1</span>
    <span>list2</span>
  </NotesList>,
  document.getElementById('div_list')
);
///////////////////////////////////////////////////////////////////////////////////////////////////////
//https://facebook.github.io/react/tips/children-props-type.html
var GenericWrapper = React.createClass({
  componentDidMount: function() {
    //console.log(Array.isArray(this.props.children)); // => true
  },

  render: function() {
    return <div />;
  }
});
ReactDOM.render(
  <GenericWrapper><span>123</span><span>123</span></GenericWrapper>,
  document.getElementById('div_array2')
);
///////////////////////////////////////////////////////////////////////////////////////////////////////
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'getDefaultProps test'
    };
  },

  render: function() {
     return <p> {this.props.title} </p>;
   }
});
ReactDOM.render(
  <MyTitle />,
  document.getElementById('div_props0')
);
///////////////////////////////////////////////////////////////////////////////////////////////////////
var MyComponent = React.createClass({
  handleClick: function() {
    //this.refs.myTextInput.focus();
    //console.log(this.refs.myTextInput.value);
    //console.log(this);
  },
  handleChange: function(){
    this.refs.response_myTestInput.textContent = this.refs.myTextInput.value;
    //console.log(this);
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" onChange = {this.handleChange} />
        <input type="button" value="Get Value" onClick = {this.handleClick} />
        <span ref = "response_myTestInput">123</span>
      </div>
    );
  }
});
ReactDOM.render(
  <MyComponent />,
  document.getElementById('div_handler')
);
///////////////////////////////////////////////////////////////////////////////////////////////////////
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'liked' : 'like';
    return (
      <button onClick={this.handleClick}>
        {text}
      </button>
    );
  }
});
ReactDOM.render(
  <LikeButton />,
  document.getElementById('div_like_button')
);
///////////////////////////////////////////////////////////////////////////////////////////////////////
var Input_State = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});
//textarea 元素、select元素、radio 的state用法也是一樣用handle function setState來觸發重新render
ReactDOM.render(<Input_State />,
  document.getElementById('div_input_state')
);
///
//Class Examples
class Mycomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <p>Class Template {this.props.name}</p>
      </div>
    );
  }
}
ReactDOM.render(<Mycomponent />, document.getElementById('div_1'));
///////////////////////////////////////////////////////////////////////////////////////////////////////
class MyComponent2 extends React.Component {
    handleClick(){
      //this.props.name = "changed";
    }
    // render 是 Class based 元件唯一必須的方法（method）
    render() {
        return (
            <div>
              <p className="test">Class Prop Test, {this.props.name}</p>
              <button onClick = {this.handleClick}>test</button>
            </div>
        );
    }
}

// PropTypes 驗證，若傳入的 props type 不符合將會顯示錯誤
MyComponent2.propTypes = {
  todo: React.PropTypes.object,
  name: React.PropTypes.string,
}
// Prop 預設值，若對應 props 沒傳入值將會使用 default 值
MyComponent2.defaultProps = {
 todo: {}, 
 name: '', 
}
ReactDOM.render(<MyComponent2 name = "Jeff"/>, document.getElementById('div_2'));
///////////////////////////////////////////////////////////////////////////////////////////////////////
const divStyle = {
  color: 'red',
  //backgroundImage: 'url(' + imgUrl + ')',
};
ReactDOM.render(<div style={divStyle}>{global_variable}</div>, document.getElementById('div_3'));
///////////////////////////////////////////////////////////////////////////////////////////////////////
class HelloMessage extends React.Component {
    // 若是需要綁定 this.方法或是需要在 constructor 使用 props，定義 state，就需要 constructor。若是在其他方法（如 render）使用 this.props 則不用一定要定義 constructor
    constructor(props) {
        // 對於 OOP 物件導向程式設計熟悉的讀者應該對於 constructor 建構子的使用不陌生，事實上它是 ES6 的語法糖，骨子裡還是 portotype based 物件導向程式語言。透過 extends 可以繼承 React.Component 父類別。super 方法可以呼叫繼承父類別的建構子
        super(props);
        this.state = {}
    }
    handleClick(){
      //console.log(this);//React.createClass VS extends React.Component: 原文https://toddmotto.com/react-create-class-versus-component/ 翻譯http://www.peachis.me/react-createclass-versus-extends-react-component/
    }
    // render 是唯一必須的方法，但如果是單純 render UI 建議使用 Functional Component 寫法，效能較佳且較簡潔
    render() {
        return (
            <div>
              <span>Hello {this.props.name}</span>
              <button onClick = {this.handleClick.bind(this)}>this</button>
            </div>
        )
    }
}

// PropTypes 驗證，若傳入的 props type 不是 string 將會顯示錯誤
HelloMessage.propTypes = {
  name: React.PropTypes.string,
}

// Prop 預設值，若對應 props 沒傳入值將會使用 default 值 Zuck
HelloMessage.defaultProps = {
 name: 'Zuck', 
}


ReactDOM.render(<HelloMessage name="Mark" />, document.getElementById('div_props'));
///////////////////////////////////////////////////////////////////////////////////////////////////////
class Timer extends React.Component {
    constructor(props) {
        super(props);
        // 與 ES5 React.createClass({}) 不同的是 component 內自定義的方法需要自行綁定 this context，或是使用 arrow function 
        this.tick = this.tick.bind(this);
        // 初始 state，等於 ES5 中的 getInitialState
        this.state = {
            secondsElapsed: 0,
        }
    }
    // 累加器方法，每一秒被呼叫後就會使用 setState() 更新內部 state，讓 Component 重新 render
    tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }
    // componentDidMount 為 component 生命週期中階段 component 已插入節點的階段，通常一些非同步操作都會放置在這個階段。這便是每1秒鐘會去呼叫 tick 方法
    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }
    // componentWillUnmount 為 component 生命週期中 component 即將移出插入的節點的階段。這邊移除了 setInterval 效力 
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    // render 為 class Component 中唯一需要定義的方法，其回傳 component 欲顯示的內容
    render() {
        return (
          <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
    }
}

ReactDOM.render(<Timer />, document.getElementById('div_state_timer'));
///////////////////////////////////////////////////////////////////////////////////////////////////////
// TodoApp 元件中包含了顯示 Todo 的 TodoList 元件，Todo 的內容透過 props 傳入 TodoList 中。由於 TodoList 僅單純 Render UI 不涉及內部 state 操作是 stateless component，所以使用 Functional Component 寫法。需要特別注意的是這邊我們用 map function 來迭代 Todos，需要留意的是每個迭代的元素必須要有 unique key 不然會發生錯誤（可以用自定義 id，或是使用 map function 的第二個參數 index）
const TodoList = (props) => (//The key should always be supplied directly to the components in the array, not to the container HTML child of each component in the array. https://facebook.github.io/react/docs/multiple-components.html
    <ul>
        {
            props.items.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))
        }
    </ul>
)
// 整個 App 的主要元件，這邊比較重要的是事件處理的部份，內部有
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            items: [],
            text: '',
        }
    }
    onChange(e) {
        this.setState({text: e.target.value});
    }
    handleClick(e) {
        e.preventDefault();
        //console.log(this.state);
    }
    handleSubmit(e) {
        e.preventDefault();
        const nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
        //const nextItems = this.state.items.push({text: this.state.text, id: Date.now()});
        const nextText = '';
        this.setState({items: nextItems, text: nextText});
    }
    removeid(value) {
        var items_copy = [];
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id != value){
                //items_copy.push({text: this.state.items[i].text, id: this.state.items[i].id});
                items_copy = items_copy.concat([{text: this.state.items[i].text, id: this.state.items[i].id}]);
            }
        }
        this.setState({items: items_copy});
    }
    render() {
        //模仿自<TodoList items={this.state.items}  增加一個刪除該 item的event按鈕
        var todolist;
        if(this.state.items.length != 0)
        {
          todolist = <ul>
            {
              this.state.items.map((item) => (
                  <li key={item.id}>{item.text}<button onClick={this.removeid.bind(this, item.id)}>delete</button></li>
              ))
            }
          </ul>
        }
        return (
          <div>
            <h5>TODO</h5>
            {todolist}
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.onChange} value={this.state.text} />
              <button>{'Add #' + (this.state.items.length + 1)}</button>
            </form>
          </div>
        );
    }
}
ReactDOM.render(<TodoApp />, document.getElementById('div_todo_list'));
///////////////////////////////////////////////////////////////////////////////////////////////////////
class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.rawMarkup = this.rawMarkup.bind(this);
        this.state = {
            value: 'Type some *markdown* here!',
        }
    }
    handleChange() {
            this.setState({value: this.refs.textarea.value});
        }
        // 將使用者輸入的 Markdown 語法 parse 成 HTML 放入 DOM 中，React 通常使用 virtual DOM 作為和 DOM 溝通的中介，不建議直接由操作 DOM。故使用時的屬性為 dangerouslySetInnerHTML
        rawMarkup() {
        const md = new Remarkable();
        return {__html: md.render(this.state.value)};
    }
    render() {
        return (
          <div className="MarkdownEditor">
            <h3>Input</h3>
            <textarea
              onChange={this.handleChange}
              ref="textarea"
              defaultValue={this.state.value} />
            <h3>Output</h3>
            <div
              className="content"
              dangerouslySetInnerHTML={this.rawMarkup()}
            />
          </div>
        );
    }
}
ReactDOM.render(<MarkdownEditor />, document.getElementById('div_refs'));
///////////////////////////////////////////////////////////////////////////////////////////////////////
//https://github.com/kdchang/reactjs101/blob/master/Ch04/react-component-life-cycle.md
class MyLifrCycleComponent extends React.Component {
    constructor(props) {
      super(props);
      //console.log('constructor');
      this.handleClick = this.handleClick.bind(this);
      this.state = {
        name: 'Mark',
      }
    }
    handleClick() {
      this.setState({'name': 'Zuck'});
    }
    componentWillMount() {
      this.setState({'name': 'Zuck1'});
      //console.log('componentWillMount');
    }
    componentDidMount() {
      //fetch API
      //console.log('componentDidMount');
    }
    componentWillReceiveProps() {
      //console.log('componentWillReceiveProps');
    }
    componentWillUpdate() {
      //console.log('componentWillUpdate');
    }
    componentDidUpdate() {
      //UI
      //console.log('componentDidUpdate');
    }
    componentWillUnmount() {
      //console.log('componentWillUnmount');
    }
    render() {
      return (
        <div onClick={this.handleClick}>Hi, {this.state.name}</div>
      );
    }
}

// 將 <MyLifrCycleComponent /> 元件插入 id 為 app 的 DOM 元素中
ReactDOM.render(<MyLifrCycleComponent name="Mark"/>, document.getElementById('div_life_cycle'));
///////////////////////////////////////////////////////////////////////////////////////////////////////
class UserGithub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          githubtUrl: '',
          avatarUrl: '',
        }
    }
    componentDidMount() {
        $.get(this.props.source, (result) => {
            //console.log(result);
            const data = result;
            if (data) {
              this.setState({
                    username: data.name,
                    githubtUrl: data.html_url,
                    avatarUrl: data.avatar_url
              });
            }
        });
    }
    render() {
        return (
          <div>
            <h3>{this.state.username}</h3>
            <img src={this.state.avatarUrl}  />
            <a href={this.state.githubtUrl}>Github Link</a>.
          </div>
        );
    }
}

ReactDOM.render(
  <UserGithub source="https://api.github.com/users/torvalds" />,
  document.getElementById('div_fetch')
);