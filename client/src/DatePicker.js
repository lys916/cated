import React, { PureComponent } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

export default class App extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
         {/* <div> */}
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
         <div>
         <label>
            Date
         </label>
         <br/>
         <DatePicker 
         style={{margin: '0px 5px 0px 0px'}}
         id="outlined-bare"
         margin="dense"
         // className={classes.textField}
         variant="outlined"
            value={selectedDate} 
            onChange={this.handleDateChange} 
         />
         </div>
         <div>

         <label>
            Time
         </label>
         <br/>
         <TimePicker 
         style={{margin: '0px 0px 0px 5px'}}
         id="outlined-bare"
         margin="dense"
         // className={classes.textField}
         variant="outlined"
            value={selectedDate} 
            onChange={this.handleDateChange} />
            </div>
         </div>
      </MuiPickersUtilsProvider>
    );
  }
}