import React, { useState,useEffect   } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


function BankPayrolls(){
    
  const [pageNumber, setPageNumber] = useState(0);
  const employeesPerPage = 5;
  const pagesVisited = pageNumber * employeesPerPage;
  const [employees, setEmployees] = useState([])
  const fetchUserData = () => {
    fetch("http://127.0.0.1:8000/api/payrolls/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setEmployees(data)
      }).catch(e=>{
        console.log(e)
      })
  }
  
  
  useEffect(() => {
    fetchUserData()
  }, [])

  function downloadPayrollCSV() {
    fetch('http://127.0.0.1:8000/api/csv/bank/')
      .then(response => {
        // Create a blob object from the CSV data
        return response.blob();
      })
      .then(blob => {
        // Create a URL for the blob object
        const url = window.URL.createObjectURL(new Blob([blob]));
  
        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'payroll.csv');
        document.body.appendChild(link);
  
        // Trigger the download
        link.click();
  
        // Remove the temporary link element
        link.parentNode.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading CSV:', error);
      });
  }
  const displayEmployees = employees
    .slice(pagesVisited, pagesVisited + employeesPerPage)
    .map((employee) => {
      return (
        <tr key={employee.id}>
        <td>
       <div className="form-outline">
       {employee.id} 
            </div>
            
      </td>

      
      <td>
         <div className="form-outline">
         {employee.employee_name} 
              </div>
              
        </td>
        <td>
                <div className="form-outline">
               {employee.net_pay}
            </div>
        </td>
        <td>
                <div className="form-outline">
               {employee.bank_account}
            </div>
        </td>










         
        
        </tr>
      );
    });

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    < >
    <div className='container'>
        
    <td><button className='btn btn-primary' onClick={downloadPayrollCSV}>Change to csv</button></td>
    <Link to={`/`}> <button className="btn btn-dark" >Go Back</button></Link>
      <table
        id="dtBasicExample"
        className='table table-bordered '
        
        width="100%" border="0" cellspacing="0" cellpadding="0"
      >
        <thead>
          
          
          <tr>
          <th className="th-sm">ID</th>
          <th className="th-sm">Name</th>
          <th className="th-sm">Payrolls</th>
          <th className="th-sm">Bank Account</th>
            
          </tr>
        </thead>
        <div>
          
        </div>
        <tbody>{displayEmployees}</tbody>
       
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'pagination'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
      />
    </div>
    </>
  );


}

export default BankPayrolls