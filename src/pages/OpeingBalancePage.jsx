import { useState } from "react";
import API from "../api/api";

const OpeningBalancePage = () => {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/balance", form);
    alert("Saved");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">

      <input placeholder="Cash" onChange={e=>setForm({...form, openingCash:e.target.value})}/>
      <input placeholder="SBI Current" onChange={e=>setForm({...form, openingSbiCurrentBank:e.target.value})}/>
      <input placeholder="SBI Savings" onChange={e=>setForm({...form, openingSbiSavingsBank:e.target.value})}/>
      <input placeholder="Edistrict" onChange={e=>setForm({...form, openingEdistrict:e.target.value})}/>
      <input placeholder="PSA" onChange={e=>setForm({...form, openingPSA:e.target.value})}/>

      <button className="bg-green-600 text-white p-2">Save</button>

    </form>
  );
};

export default OpeningBalancePage;