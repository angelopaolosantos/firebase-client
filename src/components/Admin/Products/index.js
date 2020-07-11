
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';

class InventoryUpload extends Component {

  onDrop(files) {

    this.setState({ files });

    var file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {

        var productList = [];

        for (var i = 1; i < data.length; i++) {
            console.log(data[0].length)
            var newProduct = {}
 
            for(var x = 0; x <data[0].length; x++){
              var key = data[0][x]
              newProduct = { [key] : data[i][x], ...newProduct}
            }
          /*
          
          const name = data[i][0];
          const phoneNumber = data[i][1];
          const address = data[i][2];
          const classType = data[i][3];
          const newProduct = { "name": name, "phoneNumber": phoneNumber, "address": address, "class": classType };
          */
          productList.push(newProduct);
          
          fetch('https://my-ecom-project-941e6.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
          })

        
        };

        console.log(productList)
      });
    };

    reader.readAsBinaryString(file);
  }

  render() {

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;

    return (
      <div align="center" onContextMenu={(e)=> e.preventDefault()}>
        <br /><br /><br />
        <div className="dropzone">
          <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}> 
          {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
          </Dropzone>
          <br /><br /><br />
        </div>
        <h2>Upload or drop your <font size={fontSize} color="#00A4FF">CSV</font><br /> file here.</h2>
      </div>
    )
  }
}

export default InventoryUpload;
