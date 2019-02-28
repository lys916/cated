import React, { PureComponent } from 'react';

// material ui date picker
import DateFnsUtils from '@date-io/date-fns';
// import MomentUtils from '@date-io/moment';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';

import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
// react day picker
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
// console.log(MuiPickersUtilsProvider);
function disableWeekends(date) {
   return date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 4;
 }


export default class App extends PureComponent {
  state = {
    selectedDate: null
  }


  render() {
      console.log(this.props);
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
         {/* <div> */}
         <div style={{width: '100vw'}}>
         <div style={{paddingRight: '40px'}}>
         <label>
            Date*
         </label>
         {this.props.dateError ? <span style={{color: 'red', fontSize: 13}}> &nbsp; Date is required.</span> : null }
         <br/>
         
         <DatePicker
         disablePast
         shouldDisableDate={disableWeekends}
         // formatDate={(date)=>{return 'testing date'}}
         style={{marginTop: 0,width: '100%'}}
         id="outlined-bare"
         margin="dense"
         // className={classes.textField}
         variant="outlined"
            value={this.props.date} 
            onChange={this.props.handleDateChange} 
         />
         </div>
         {/* <div>

         <label>
            Time*
         </label>
         <br/>
         <TimePicker 
         minutesStep={10}
         style={{margin: '0px 0px 0px 5px'}}
         id="outlined-bare"
         margin="dense"
         name="time"
         // className={classes.textField}
         variant="outlined"
            value={this.state.selectedDate} 
            onChange={this.handleDateChange} />
            </div> */}
         </div>
      </MuiPickersUtilsProvider>
    );
  }
}