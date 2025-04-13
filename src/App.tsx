import { useState } from 'react'
import './App.css'
import {data} from './data'

interface User {
  id:number,
  name:string,
  age:number,
  email:string
}

function App() {
  const [filter,setFilter] = useState<boolean>(false);
  const [sortKey,setSortKey] = useState<string>('Name');
  const [sortOrder,setSortOrder] = useState<string>('asc');

  function handleFilter(){
    setFilter(!filter)
  }
  function handleSortName(){
    if(sortKey === 'Name'){
      setSortOrder(sortOrder === 'asc'?'desc':'asc')
    }else{
      setSortKey('Name')
      setSortOrder('asc')
    }
  }
  function handleSortAge(){
    if(sortKey === 'Name'){
      setSortKey('Age')
      setSortOrder('asc')
    }else{
      setSortOrder(sortOrder === 'asc'?'desc':'asc')
    }
  }

  const filteredData = filter? data.filter(item => item.age >30):data
  const sortedData = [...filteredData].sort((a:User,b:User):number => {
    if (sortKey === 'Name'){
      return sortOrder === 'asc'?
      a.name.localeCompare(b.name)
      :b.name.localeCompare(a.name)
    }else if (sortKey === 'Age'){
      return sortOrder === 'asc'?
      a.age - b.age
      :b.age - a.age
    }
    return 0;
  }
  )
  
  return <div className="container">
    <button onClick={handleFilter}>over 30</button>
    <table>
      <thead>
        <tr>
          <th style={{cursor:'pointer'}} onClick={handleSortName}>Name {sortKey === 'Name' && (sortOrder === 'asc'? '↑': '↓')}</th>
          <th style={{cursor:'pointer'}} onClick={handleSortAge}>Age {sortKey === 'Age' && (sortOrder === 'asc'? '↑': '↓')}</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(item => (
           <tr key={item.id}>
           <td>{item.name}</td>
           <td>{item.age}</td>
           <td>{item.email}</td>
         </tr>
        ))}
      </tbody>
    </table>
  </div>
}

export default App