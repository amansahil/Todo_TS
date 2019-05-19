import React, {Component} from 'react';
import {StyleSheet, View, FlatList, ViewStyle } from 'react-native';
import { connect } from 'react-redux';

import { submitForm, clearItems } from '../actions'
import { Header, ListItem, Confirm } from '../components'
import { taskType } from '../lib/types';

interface ActionProps {
  clearItems: typeof clearItems,
  submitForm: typeof submitForm,
}

interface Props {
  taskObj: Array<taskType>,
  style: ViewStyle
}

interface State {
  showModal: boolean,
  modalAction: string
}

class ListScreen extends Component<Props & ActionProps, State>{

  constructor(props: Props & ActionProps) {
    super(props);
    this.state = { showModal: false, modalAction: '' };
  }

  confirmAction = (arg: string) => {
    this.setState({ showModal: true, modalAction: arg })
  }

  delete() {
    let newObj: Array<taskType>

    newObj = this.props.taskObj

    var removeIndex = newObj.map(function(item) { return item.key; })
                       .indexOf(this.state.modalAction);
    ~removeIndex && newObj.splice(removeIndex, 1);

    this.update(newObj.reverse());
    
    this.hideModal()
  }

  hideModal() {
    this.setState({ showModal: false })
  }

  markDone = (arg: string) => {
    let newObj: Array<taskType>

    newObj = this.props.taskObj
    newObj.forEach(function(obj) {
      if(obj.key == arg) {
        obj.done = !obj.done;
      }
    })   

    this.update(newObj.reverse());
  }

  update(newObj: Array<taskType>) {
    this.props.clearItems();

    newObj.map((data) => {
      this.props.submitForm(data)
    })
  }

  renderItem(item: taskType) {
    return (
      <ListItem
        data={item}
        delete={this.confirmAction.bind(this)}
        markDone={this.markDone.bind(this)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Todo" />  
        <FlatList
          style={this.props.style}
          data={this.props.taskObj}
          renderItem={({item}) => this.renderItem(item)}
        />

        <Confirm
          visible={this.state.showModal}
          onAccept={this.delete.bind(this)}
          onDecline={this.hideModal.bind(this)}
        >
          Are you sure you want to delete this ?
        </Confirm>
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {taskObj: state.list};
}

export default connect(mapStateToProps, { submitForm, clearItems })(ListScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  }
});