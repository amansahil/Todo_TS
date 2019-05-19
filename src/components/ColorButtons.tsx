import React, {Component} from 'react';
import { connect } from 'react-redux';

import { colorChanged } from '../actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Colors {
  id: string
}

interface ActionsProps {
  colorChanged: typeof colorChanged,
}

interface Props {
  radioSelected: string
}
interface InjectedProps {
  colors: Array<Colors>
}

class ColorButtons extends Component<Props & ActionsProps & InjectedProps> {

    constructor(props: Props & ActionsProps & InjectedProps){
      super(props);
    }
  
  
    radioClick(id: string) {
      this.props.colorChanged(id)
    }
    
  
    getOpacity(options: string) {
      if(this.props.radioSelected === options ) {
        return 1;
      }
        return 0.2;
    }
  
    buttonStyle = function(this: any, options: string) {
      return {
        margin: 10,
        width: 50,
        height: 50,
        borderRadius: 50/2,
        backgroundColor: options,
        opacity: this.getOpacity(options)
      }
    }
  
    render() {
      return (
        this.props.colors.map((val: Colors) => {
          return (
            <TouchableWithoutFeedback style={this.buttonStyle(val.id)} onPress={this.radioClick.bind(this, val.id)} key={val.id} >
            </TouchableWithoutFeedback>
          );
        })
      );
    }
  
  }

  const mapStateToProps = ({ form }: any): Props => {
    const { radioSelected } = form;
    return { radioSelected};
  };

export default connect<Props, {}, ActionsProps>(mapStateToProps, { colorChanged })(ColorButtons)



