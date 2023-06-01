import React from 'react'
import Papa from "papaparse";



const handleImportCSV = (event) => {
    if(event.target && event.target.files[0]){
        let file = event.target.files[0]
        // Parse local CSV file
        if(file && file.type !== "text/csv"){
            console.log('Only accept csv files...')
            return;
        }
        Papa.parse(file, {
            header:true,
            complete: function(results) {
                console.log("Finished:", results.data);
            }
        });
    }
    

};


const text = () => {
  return (
    <div>
        <label className='tu-css-nha' htmlFor='test' >Import</label>
        <input hidden id='test' onChange={(event) => handleImportCSV(event)} type='file'  />
        
    </div>
  )
}

export default text