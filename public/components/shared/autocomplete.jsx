var _ = require('lodash');
var React = require('react');
var ajax = require('../../utils/fetch');

var AutocompleteForm = React.createClass({
  propTypes: {
    'values': React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]),
    'min_chars': React.PropTypes.number,
    'multi': React.PropTypes.bool,
    'on_change': React.PropTypes.func,
    'placeholder': React.PropTypes.string.isRequired,
    'url': React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      'min_chars': 3,
      'multi': true,
      'values': {}
    };
  },
  getInitialState: function() {
    var values = {};
    if (Array.isArray(this.props.values)) {
      this.props.values.forEach(function(item) {
        values[item.id] = item.name;
      });
    } else {
      values = this.props.values;
    }

    return {
      'last_fetch': Date.now(),
      'value': '',
      'values': values,
      'options': {},
      'active': 0
    };
  },
  componentWillMount: function() {
    if (this.props.min_chars === 0) {
      this.fetch_options();
    }
  },
  get_selections: function() {
    return this.state.values;
  },
  get_selections_array: function() {
    if (this.props.multi) {
      return _.map(this.state.values, function(name, id) {
        return {'id': id, 'name': name};
      });
    } else {
      var id = Object.keys(this.state.values)[0];
      return {'id': id, 'name': this.state.values[id]};
    }
  },
  fetch_options: function() {
    this.setState({'last_fetch': Date.now()});
    ajax(this.props.url + this.state.value).then(function(res) {
      return res.json();
    }).then(function(data) {
      var options = {};
      data.forEach(function(item) {
        options[item.id] = item.name;
      }.bind(this));

      this.setState({'options': this.filter_options(options)});
    }.bind(this));
  },
  filter_options: function(options) {
    return _.omit(options, Object.keys(this.state.values));
  },
  handle_change: function(e) {
    this.setState({'value': e.target.value}, function() {
      if (this.state.value.length >= this.props.min_chars && Date.now() - this.state.last_fetch > 2) {
        this.fetch_options();
      } else if (this.state.value.length < this.props.min_chars) {
        this.setState({'options': {}});
      }
    });
  },
  handle_select: function(id) {
    var values = _.extend({}, this.state.values);
    values[id] = this.state.options[id];
    this.setState({
      'values': values,
      'value': ''
    }, function() {
      this.setState({'options': (this.props.min_chars === 0) ? this.filter_options(this.state.options) : {}});
      if (this.props.on_change) this.props.on_change(this.state.values);
    });
  },
  handle_remove: function(id) {
    var values = _.extend({}, this.state.values);
    delete values[id];
    this.setState({'values': values}, function() {
      this.fetch_options();
      if (this.props.on_change) this.props.on_change(this.state.values);
    });
  },
  handle_key: function(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      this.setState({'active': (this.state.active + 1 < Object.keys(this.state.options).length) ? this.state.active + 1 : 0});
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      this.setState({'active': (this.state.active - 1 >= 0) ? this.state.active - 1 : Object.keys(this.state.options).length - 1});
    } else if (e.key === 'Enter') {
      this.handle_select(Object.keys(this.state.options)[this.state.active]);
    }
  },
  render: function() {
    var classes = 'autocomplete-input form-control';
    if (Object.keys(this.state.values).length > 0 && !this.props.multi) classes += ' hidden';
    return (
      <div className='autocomplete-container dropdown'>
        <input type='text' className={classes} placeholder={this.props.placeholder} data-toggle='dropdown'
         value={this.state.value} onChange={this.handle_change} onKeyDown={this.handle_key} />
        <SelectionList remove_handler={this.handle_remove} values={this.state.values}/>
        <SelectDropdown select_handler={this.handle_select} options={this.state.options} active={this.state.active}/>
      </div>
    );
  }
});

var SelectDropdown = React.createClass({
  propTypes: {
    'select_handler': React.PropTypes.func.isRequired,
    'options': React.PropTypes.object,
    'active': React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      'options': {},
      'active': 0
    };
  },
  select_option: function(e) {
    e.preventDefault();
    this.props.select_handler(e.target.dataset.id);
  },
  render: function() {
    if (!Object.keys(this.props.options).length) return <ul className='autocomplete-dropdown'></ul>;
    var index = -1;
    return (
      <ul className='autocomplete-dropdown dropdown-menu'>
        {_.map(this.props.options, function(name, id) {
          index++;
          var classes = 'autocomplete-dropdown-item';
          if (index === this.props.active) classes += ' active';
          return <li key={id} className={classes}><a data-id={id} data-name={name} onClick={this.select_option}>{name}</a></li>;
        }.bind(this))}
      </ul>
    );
  }
});

var SelectionList = React.createClass({
  propTypes: {
    'remove_handler': React.PropTypes.func.isRequired,
    'values': React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      'values': {}
    };
  },
  remove_handler: function(e) {
    this.props.remove_handler(e.target.dataset.id);
  },
  render: function() {
    return (
      <div className='autocomplete-list'>
        {_.map(this.props.values, function(name, id) {
          return <h4 className="label-inline"> <span key={id} onClick={this.remove_handler} data-id={id} data-name={id} className='autocomplete-list-item label label-color'>{name}</span> </h4>;
        }.bind(this))}
      </div>
    );
  }
});

module.exports = AutocompleteForm;
