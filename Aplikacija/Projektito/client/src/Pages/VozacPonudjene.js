import React from 'react'
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import VozacPonudjeneListItem from './VozacPonudjeneListItem';
const VozacPonudjene = () => {
    const {user, setUser } = useContext(UserContext);
    const config = {
        headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
      };
    const [currentItems,setCurrentItems] = useState([]);
    const [ready, setReady] = useState(false);
    const [order,setOrder] = useState("ASC")
    useEffect(() => {
      if(user)
        {
        try{
          axios.get(`/Tura/GetPonudjenjaTuraVozac/${user.id}`, config).then((response) => {
            setCurrentItems(response.data);
            console.log(response.data)
            setReady(true);
          });
        }
        catch(err)
        {
          console.log(err.message)
        } 
    }        
    }, [ready,user]);
    const sorting = (col)=> {
      if(order==="ASC")
      {
        const sorted = [...currentItems].sort((a,b)=>
            a[col] > b[col] ? 1 : -1
        );
        setCurrentItems(sorted);
        setOrder("DSC");
      }
      if(order==="DSC")
      {
        const sorted = [...currentItems].sort((a,b)=>
            a[col] < b[col] ? 1 : -1
        );
        setCurrentItems(sorted);
        setOrder("ASC");
      }
    }
  if (!ready) {
    return "Loading...";
  }
  else{
  
    return (
      
      <div className="flex flex-col mt-2 items-center ">
        <h3>Ponudjene ture</h3>
        <div className="overflow-auto w-2/3">
            <table className="w-full text-sm text-left text-gray-500  shadow-md ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                      <tr>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("tipRobe")}>
                          Vrsta Robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("tezinaRobe")}>
                          Tezina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("duzinaRobe")}>
                          Duzina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("sirinaRobe")}>
                          Sirina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("visinaRobe")}>
                          Visina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("pocetnaGeografskaSirina")}>
                          Zapremina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Od
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Do
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("status")}>
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("duzina")}>
                          Duzina ture
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("datumPocetka")}>
                          Datum pocetka
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("predvidjeniKraj")}>
                          Predvidjeni kraj
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap" onClick={()=>sorting("kompanijaNaziv")}>
                          Ime Kompanije
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Potvrdi
                        </th>
                      </tr>
                    </thead>

                    <tbody className='text-center'>
                      {currentItems.map((item, ind) => (
                        <VozacPonudjeneListItem item={item} key={ind} />
                      ))}
                      {currentItems.length === 0 && (
                        <tr>
                          <th colSpan="10" className="text-center">
                            Nemate aktivnih ruta
                          </th>
                        </tr>
                      )}
                    </tbody>
                  </table>
              </div>
      </div>
    )
  }
}

export default VozacPonudjene