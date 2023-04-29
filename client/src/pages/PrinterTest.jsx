import React, { useState, useEffect } from 'react';
import qz from 'qz-tray';
import waiteressImage from '../assets/waiteress.png';

const PrinterTest = () => {
    qz.websocket.connect().then(()=>{
        var config = qz.configs.create("POS-80C");
        var data = [
            { type: 'raw', format: 'image', data: 'https://i.ibb.co/f4m85br/icon-1.png', options: { language: "escp", dotDensity: 'double' } },
            '\x1B' + '\x40',          // init
            '\x1B' + '\x61' + '\x31', // center align
            'BD HASSAN 2 ' + '\x0A',
            '\x0A',                   // line break
            'www.pub-maroc.com' + '\x0A',     // text and line break
            '\x0A',                   // line break
            '\x0A',                   // line break
            'daba' + '\x0A',
            '\x0A',                   // line break
            '\x0A',                   // line break    
            '\x0A',
            'Transaction # 99999 server: 3' + '\x0A',
            '\x0A',
            '\x0A',
            '\x0A',
            '\x1B' + '\x61' + '\x30', // left align
            'amlo zwin (Qty 4)       999999.9999' + '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
            '\x0A',
            'XXXXXXXXXXXXXXXX------XXXXXXXXXXXXXXXXXXXX' + '\x0A',       
            '\x1B' + '\x45' + '\x0D', // bold on
            'Here\'s some tests text!',
            '\x1B' + '\x45' + '\x0A', // bold off
            '\x0A' + '\x0A',
            '\x1B' + '\x61' + '\x32', // right align
            '\x1B' + '\x21' + '\x30', // em mode on
            'KHAY SAMIH',
            '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
            '\x0A' + '\x0A',
            '\x1B' + '\x61' + '\x30', // left align
            '------------------------------------------' + '\x0A',
            '\x1B' + '\x4D' + '\x31', // small text
            'KHAY BADRE' + '\x0A',
            '\x1B' + '\x4D' + '\x30', // normal text
            '------------------------------------------' + '\x0A',
            'NICE',
            '\x1B' + '\x61' + '\x30', // left align
            '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
            '\x1B' + '\x69',          // cut paper (old syntax)
         // '\x1D' + '\x56'  + '\x00' // full cut (new syntax)
         // '\x1D' + '\x56'  + '\x30' // full cut (new syntax)
         // '\x1D' + '\x56'  + '\x01' // partial cut (new syntax)
         // '\x1D' + '\x56'  + '\x31' // partial cut (new syntax)
            '\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
                                                         // **for legacy drawer cable CD-005A.  Research before using.
         // Star TSP100-series kick-out ONLY
         // '\x1B' + '\x70' + '\x00' /* drawer 1 */ + '\xC8' + '\xC8' + '\x1B' + '\x1F' + '\x70' + '\x03' + '\x00',
         // '\x1B' + '\x70' + '\x01' /* drawer 2 */ + '\xC8' + '\xC8' + '\x1B' + '\x1F' + '\x70' + '\x03' + '\x00',
        ];
        qz.print(config, data).catch(function(e) { console.error(e); });
    })
  return (
    <div>
      <h2>Available Printers:</h2>
      <ul>
      </ul>
    </div>
  );
};

export default PrinterTest;