import React, { useState, useEffect } from 'react';
import { Box, } from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles';
import Coingecko from './components/Coingecko/';
import CryptoTable from './components/CryptoTable/';

import NumberFormat from 'react-number-format';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';



const useStyles = makeStyles((theme) => ({
  app:{

  },
  table: {

  },
  img:{
    maxWidth: 20
  },
  tableContainer:{
    marginTop: 30,
    width: '50vw',
    margin: '0 auto',
  },
  linearProgress:{
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  linearProgress:{
    height: '100vh'
  }
}));

function App() {

  const [coinList, setCoinList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const loadAllCoins = async () =>{
      let coins = await Coingecko.getAllCoins();
      setCoinList(coins);
      console.log(coins);
    }

    loadAllCoins();
  }, []);


  
  return (
    <Box className={classes.app}>
      {coinList.length <= 0 &&
      <Box  className={classes.linearProgress}>
        <LinearProgress/>
      </Box>
      }
      <TableContainer component={Paper} classes={{root: classes.tableContainer}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>#</strong></TableCell>
              <TableCell><strong>Coin</strong></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><strong>Price</strong></TableCell>
              <TableCell align="right"><strong>24h Volume</strong></TableCell>
              <TableCell align="right"><strong>Mkt Cap</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinList.map((item, index) => (
              <TableRow key={item.market_cap_rank}>
                <TableCell component="th" scope="row">{item.market_cap_rank}</TableCell>
                <TableCell><img src={item.image} className={classes.img}/></TableCell>
                <TableCell><strong>{item.name}</strong> ({item.symbol})</TableCell>
                <TableCell align="right">
                  <NumberFormat value={item.current_price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat value={item.total_volume} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </TableCell>
                <TableCell align="right">
                <NumberFormat value={item.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>

      </Box>
    </Box>
  );
}

export default App;
