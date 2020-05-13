import React, { useState } from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';

import image from './images/image.png';
import { Paper, Switch } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      data: {},
      country: '',
      darkMode:false
    }
  }
  
  
  
  
  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  clickHandler =() => {
    this.setState({
      darkMode:!this.state.darkMode
    })
  }
  
  render() {
    
//var darkMode=false;
const theme = createMuiTheme({
  palette: {
    type: this.state.darkMode?'dark':'light',
  },
});
    const { data, country } = this.state;

    return (
      <ThemeProvider theme={theme}>
      <Paper square>
      <div className={styles.container}>
      <Switch checked={this.state.darkMode} onChange={this.clickHandler}/>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> 
      </div>
      </Paper>
      </ThemeProvider>
    );
  }
}

export default App;