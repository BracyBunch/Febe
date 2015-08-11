var React = require('react');
var Modal = require('react-modal');

var appElement = document.getElementById('login');

Modal.setAppElement(appElement);
Modal.injectCSS();

module.exports = React.createClass({
  test: function() {
    console.log("working")
  },
  getInitialState: function() {
    return { 
      modalIsOpen: false 
    };
  },

  openModal: function() {
    console.log("test")
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h2>Sign In</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
});
